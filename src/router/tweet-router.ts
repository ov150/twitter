import express from "express";
import { PrismaClient } from "@prisma/client"
const router = express.Router();

const prisma = new PrismaClient();


router.post('/', async (req, res) => {
    const { content, image, userId } = req.body;
    const result = await prisma.tweet.create({
        data: {
            content,
            image,
            userId,
        }
    })
    res.json({
        result
    })
})


router.get('/', async (req, res) => {
    const getAllTweets = await prisma.tweet.findMany()
    res.json({
        getAllTweets
    })
})


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const tweet = await prisma.tweet.findUnique({ where: { id: Number(id) } })
    res.json({
        tweet
    })
})



router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { content, image, userId } = req.body;
    try {
        const result = await prisma.tweet.update({
            where: {
                id: Number(id),
            },
            data: {
                content,
                image,
                userId
            }
        })
        res.json(result)
    } catch (error) {
        console.log('error for update user', error);
    }
})



router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = prisma.tweet.delete({
            where: {
                id: Number(id)
            },
        })
        res.json({
            result
        })
    } catch (error) {
        console.log('error in delete user', error);

    }
})


export default router