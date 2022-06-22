import { Header } from "../components/Header"
import { Sidebar } from "../components/Sidebar"
import { LessonContent } from "../components/LessonContent"

export function Event() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        <LessonContent />
        <Sidebar />
      </main>
    </div>
  )
}