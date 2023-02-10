'use client'

import { db } from '@/firebase'
import { collection, orderBy, query } from 'firebase/firestore'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Message } from '@components'
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline'

interface IProps {
  chatId: string
}

const Chat: NextPage<IProps> = ({ chatId }) => {
  const { data: session } = useSession()

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          'users',
          session.user?.email!,
          'chats',
          chatId,
          'messages'
        ),
        orderBy('createdAt', 'asc')
      )
  )

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">
            請在下方輸入你想問ChatGPT的問題
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}

      {messages?.docs.map(message => (
        <Message key={message.id} message={message.data()} />
      ))}
    </div>
  )
}

export default Chat
