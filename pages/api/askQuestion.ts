// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { queryApi } from '@libs'
import { Message as MessageType } from '@types'
import admin from 'firebase-admin'
import { adminDB } from '@/firebaseAdmin'

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body

  if (!prompt) {
    res.status(400).json({ answer: 'Please provide a prompt!' })
    return
  }

  if (!chatId) {
    res.status(400).json({ answer: 'Please provide a valid chat ID!' })
    return
  }

  // chatGPt query
  const response = await queryApi(prompt, chatId, model)

  const message: MessageType = {
    text: response || '很抱歉，ChatGPT無法回答你的問題',
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: 'ChatGPT',
      name: 'ChatGPT',
      avatar:
        'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/f5f9c186305e769c7ae49bd7ed601aa4~c5_720x720.jpeg?x-expires=1676106000&x-signature=HoZkULEEFRvpPti8Ly8Pd7ghg6I%3D',
    },
  }

  await adminDB
    .collection('users')
    .doc(session?.user?.email)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message)

  res.status(200).json({ answer: message.text })
}
