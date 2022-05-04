const conversationRouter = require("express").Router();
const Conversation = require("../models/Conversation");


conversationRouter.post('/', async (req, res) => {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receivedId]
    });
    try {
        const savedConversation = await newConversation.save()
        res.status(200).send(savedConversation);
    } catch (error) {
        res.status(500).send(error)
    }
})

conversationRouter.get('/:userId' , async (req, res) => {
    try {
        const conversation = await Conversation.find({
          members: { $in: [req.params.userId] },
        });
        res.status(200).send({ conversation: conversation });
    } catch (error) {
        res.status(500).send(error);        
    }
})


conversationRouter.get('/find/:firstUserId/:seconUserId', async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: {$all: [req.params.firstUserId, req.params.seconUserId]}
        })
        res.status(200).send(conversation)
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = conversationRouter;
