import express from "express";
import { PrismaClient } from "@prisma/client"
const router = express.Router();

const prisma = new PrismaClient();


router.post('/', async (req, res) => {
    const { email, username, name } = req.body;
    try {
        const result = await prisma.user.create({
            data: {
                email,
                username,
                name,
                bio: "hello I'm underscore"
            }
        })
        res.json({
            result
        })
    } catch (error) {
        console.log(`error`, error);
    }
})

router.get('/', async (req, res) => {
    const getAllUsers = await prisma.user.findMany()
    res.json({
        getAllUsers
    })
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        },
        include: { tweets: true }
    })
    res.json({
        user
    })
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { bio, name, image } = req.body;
    try {
        const result = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                bio,
                name,
                image,
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
        const result = prisma.user.delete({
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