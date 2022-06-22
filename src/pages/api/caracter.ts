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
        const caracters = await prisma.caracter.findMany({
          select: {
            id: true,
            name: true,
            age: true,
            image: true,
            level: true,
            status: true
          }
        })

        return res.status(200).json({ caracters })
      } catch (e) {
        return res.status(400).json({ error: e })
      }
    }
    case "POST": {
      try {
        const { body } = req

        const customer = await prisma.caracter.create({
          data: {
            name: body.name,
            age: body.age,
            image: body.image ? body.image : IMAGE_DEFAULT,
            level: 1,
            status: {
              create: {
                life: body.life,
                maxLife: body.life,
                mana: body.mana,
                maxMana: body.mana,
                stamina: body.stamina,
                maxStamina: body.stamina
              }
            }
          }
        })

        let caracter = {
          id: customer.id,
          name: customer.name,
          age: customer.age,
          level: customer.level,
          image: customer.image,
          status: {
            life: body.life,
            maxLife: body.life,
            mana: body.mana,
            maxMana: body.mana,
            stamina: body.stamina,
            maxStamina: body.stamina
          }
        }

        return res.status(200).json({ caracter })
      } catch (e) {
        return res.status(400).json({ error: e })
      }

    }
  }
}
