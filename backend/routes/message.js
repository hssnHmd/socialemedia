const MessageRouter = require("express").Router();
const Message = require("../models/Message");

MessageRouter.post("/", async (req, res) => {
    const newMessage = new Message(req.body)
    try {
        const savedMessage = await newMessage.save()
        res.status(200).send({savedMessage: savedMessage})
    } catch (error) {
        res.status(500).send(error)
    }
});

MessageRouter.get('/:conversationId' , async (req, res) => {
    try {
        const message = await Message.find({
          conversationId: req.params.conversationId,
        });
        res.status(200).send({ Message: message });
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = MessageRouter;
