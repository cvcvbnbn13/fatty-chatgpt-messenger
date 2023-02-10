import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { TrashIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase'
import { toast } from 'react-hot-toast'

interface IProps {
  id: string
}

const ChatRow = ({ id }: IProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [active, setActive] = useState(false)
  const [messages] = useCollection(
    collection(db, 'users', session?.user?.email!, 'chats', id, 'messages')
  )

  const handleRoute = () => {
    router.push(`/chat/${id}`)
  }

  const handleRemoveChat = async () => {
    const notification = toast.loading('正在刪除中...')
    await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id)).then(
      () => {
        toast.success('已刪除對話', {
          id: notification,
        })
      }
    )

    router.replace('/')
  }

  const chatTitle = messages?.docs[messages?.docs.length - 1]
    ?.data()
    .text.slice(0, 20)

  useEffect(() => {
    if (!pathname) return

    setActive(pathname.includes(id))
  }, [id, pathname])

  return (
    <div
      onClick={handleRoute}
      className={`chatRow justify-between ${active && 'bg-gray-700/50'}`}
    >
      <div className="flex">
        <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
        <p className="hidden md:inline-flex truncate">
          {chatTitle ? chatTitle + '...' : 'New Chat'}
        </p>
      </div>
      <TrashIcon
        onClick={handleRemoveChat}
        className="h-5 w-5 text-gray-700 hover:text-red-700"
      />
    </div>
  )
}

export default ChatRow
