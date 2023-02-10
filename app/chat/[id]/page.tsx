import { Chat, ChatInput } from '@components'

interface IProps {
  params: {
    id: string
  }
}

const ChatPage = ({ params: { id } }: IProps) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  )
}

export default ChatPage
