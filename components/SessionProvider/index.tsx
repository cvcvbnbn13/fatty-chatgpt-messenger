'use client'

import React from 'react'
import { Session } from 'next-auth'
import { SessionProvider as Provider } from 'next-auth/react'

interface IProps {
  children: React.ReactNode
  session: Session | null
}

const SessionProvider = ({ children, session }: IProps) => {
  return <Provider>{children}</Provider>
}

export default SessionProvider
