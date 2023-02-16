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
      avatar: require('../../assets/images/chatgpt-icons.svg'),
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
