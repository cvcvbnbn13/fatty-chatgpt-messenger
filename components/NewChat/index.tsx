'use client'

import { db } from '@/firebase'
import { PlusIcon } from '@heroicons/react/24/solid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

const NewChat = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const handleCreateNewChat = async () => {
    const notification = toast.loading('創建對話中...')
    const doc = await addDoc(
      collection(db, 'users', session?.user?.email!, 'chats'),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    )

    await toast.success('創建成功', {
      id: notification,
    })

    router.push(`/chat/${doc.id}`)
  }

  return (
    <div
      onClick={handleCreateNewChat}
      className="border-gray-700 border mb-4 chatRow"
    >
      <PlusIcon className="h-4 w-4" />
      <p>New Chat</p>
    </div>
  )
}

export default NewChat
