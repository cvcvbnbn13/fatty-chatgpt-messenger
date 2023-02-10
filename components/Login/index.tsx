'use client'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

const Login = () => {
  const handleSignIn = () => signIn('google')

  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
      <Image
        src={require('@/assets/images/chatgpt-icon.svg')}
        alt="logo"
        width={300}
        height={300}
      />
      <button
        onClick={handleSignIn}
        className="text-white font-bold text-3xl animate-pulse"
      >
        Sign In to use ChatGPT
      </button>
    </div>
  )
}

export default Login
