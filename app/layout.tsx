import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '霓虹段码显示器',
  description: '一个美观的霓虹段码显示器',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={`${inter.className} min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
