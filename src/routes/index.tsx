import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold">Jacob D. Castro</h1>
      <p className="text-lg text-neutral-500">v5 — under construction</p>
    </main>
  )
}
