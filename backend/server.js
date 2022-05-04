const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const multer = require('multer');
const path = require("path");
const conversationRouter = require("./routes/conversation");
const MessageRouter = require("./routes/message");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("db connect successefull")
    })
    .catch(err => {
        console.log(err)
    })

app.use("/images", express.static(path.join(__dirname, "/public/images")));

app.use(express.json());
app.use(helmet());
app.use(morgan("common")); 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
})

const upload = multer({storage});
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        res.status(200).send("file uploaded successfully")
    } catch (error) {
        console.log(error)
    }
})

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", MessageRouter);

app.listen(process.env.PORT || 8080, () => {
    console.log("Server ready  run")
})