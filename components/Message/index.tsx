import { DocumentData } from 'firebase/firestore'
import React from 'react'
import { NextPage } from 'next'

interface IProps {
  message: DocumentData
}

const Message: NextPage<IProps> = ({ message }) => {
  const isChatGPT = message.user.name === 'ChatGPT'

  return (
    <div className={`py-5 text-white ${isChatGPT && 'bg-[#436f6f]'}`}>
      <div className="flex space-x-5 px-10 max-w-4xl mx-auto">
        <img src={message.user.avatar} alt="avatar" className="h-8 w-8" />
        <p className="pt-1 text-sm ">{message.text}</p>
      </div>
    </div>
  )
}

export default Message
