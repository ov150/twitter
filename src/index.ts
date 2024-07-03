import express from "express";
import userRoutes from "./router/user-router"
import tweetRoutes from "./router/tweet-router"
import authRoutes from "./router/auth-router"
const app = express();
const PORT = 4000 || process.env.PORT

app.use(express.json());



app.get('/', (req, res) => {
    res.json({
        message: "hello from server"
    })
})

app.use('/user', userRoutes)
app.use('/tweet', tweetRoutes)
app.use('/auth', authRoutes)
app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`);
})
