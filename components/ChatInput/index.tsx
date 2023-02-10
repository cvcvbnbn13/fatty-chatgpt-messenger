'use client'

import React, { useState, FormEvent } from 'react'
import ModelSelection from '../ModelSelection'
import { NextPage } from 'next'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { Message as MessageType } from '@types'
import { db } from '@/firebase'
import { toast } from 'react-hot-toast'
import useSWR from 'swr'

interface IProps {
  chatId: string
}

const ChatInput: NextPage<IProps> = ({ chatId }) => {
  const [prompt, setPrompt] = useState('')
  const { data: session } = useSession()

  // useSWR to get model
  const { data: model } = useSWR('model', {
    fallbackData: 'text-davinci-003',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value)
  }

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!prompt) return
    const input = prompt.trim()
    setPrompt('')

    const message: MessageType = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    }

    await addDoc(
      collection(
        db,
        'users',
        session?.user?.email!,
        'chats',
        chatId,
        'messages'
      ),
      message
    )

    // Toast notification

    const notification = toast.loading('ChatGPT在想怎麼回答你...')

    await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      // Toast notification to success
      toast.success('ChatGPT回答了你的問題', {
        id: notification,
      })
    })
  }

  return (
    <div className="bg-[#395e5e] text-gray-400 rounded-lg text-sm ">
      <form onSubmit={handleSendMessage} className="p-5 space-x-5 flex">
        <input
          onChange={handleChange}
          value={prompt}
          type="text"
          placeholder="問些什麼吧..."
          disabled={!session}
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:bg-gray-300"
        />

        <button
          type="submit"
          disabled={!prompt || !session}
          className="text-white font-bold hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>

      <div className="md:hidden">
        <ModelSelection />
      </div>
    </div>
  )
}

export default ChatInput
