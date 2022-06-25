import { useNavigate, useParams } from "react-router-dom";
import { useGetLessonsQuery } from "../graphql/generated";
import { LessonCard } from "./LessonCard";

export function Sidebar() {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()
  const { data } = useGetLessonsQuery()

  if (!data) {
    return (
      <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
        <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
          Cronograma das aulas
        </span>

        <div className="flex flex-col gap-8">
          <p>Carregando...</p>
        </div>
      </aside>
    )
  }
  
  if (!slug) {
    navigate(`/event/lesson/${data.lessons[0].slug}`)
  }

  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma das aulas
      </span>

      <div className="flex flex-col gap-8">
        {data.lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            title={lesson.title}
            slug={lesson.slug}
            availableAt={new Date(lesson.availableAt)}
            lessonType={lesson.lessonType}
          />
        ))}
      </div>
    </aside>
  )
}