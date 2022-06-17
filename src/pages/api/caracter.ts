import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  const IMAGE_DEFAULT = 'https://i.pinimg.com/564x/e9/7a/03/e97a03628dde5de1f81c32ac2b4dac50.jpg'

  const prisma = new PrismaClient()

  switch (method) {
    case "GET": {
      try {
        const caracter = await prisma.caracter.findMany({
          select:{
            name:true
          }
        })

        return res.status(200).json({ message: caracter })
      } catch (e) {
        return res.status(400).json({ error: e })
      }
    }
    case "POST": {
      try {
        const { body } = req
        console.log(JSON.stringify(prisma))
        const caracter = await prisma.caracter.create({
          data: {
            name: 'teste',
            age: '10'
          }
        })

        return res.status(200).json({ message: 'sucess' })
      } catch (e) {
        console.log(JSON.stringify(e))
        return res.status(400).json({ error: e })
      }

    }
  }
}
