import LoginForm from '@/app/ui/components/organism/login-form/login-form'
import React from 'react'

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <section className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <LoginForm />
      </section>
    </main>
  )
}
