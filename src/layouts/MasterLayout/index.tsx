import Menu from '@/components/Menu'
import React from 'react'

export default function MasterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className=' min-h-screen  bg-gray-50'>
      <Menu />

      {children}
    </div>
  )
}
