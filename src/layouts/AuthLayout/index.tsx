import Image from 'next/image'
import logo from '@/assets/png/authLogo.png'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0'>
      <div className='md:w-1/3 max-w-sm'>
        <Image priority={true} height={0} width={0} src={logo} alt='logo1' />
      </div>
      <div className='md:w-1/3 max-w-sm'>{children}</div>
    </main>
  )
}
