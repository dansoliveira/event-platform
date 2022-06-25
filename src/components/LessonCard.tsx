import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Lesson } from '../types/Lesson'
import { Link } from 'react-router-dom'

interface LessonCardProps extends Omit<Lesson, 'id' | 'availableAt'> {
  availableAt: Date
}

enum ELessonCardTypeLabel {
  live = 'AO VIVO',
  class = "AULA PRÁTICA",
}

const LESSON_CARD_STATUS = {
  available: {
    content: 'Conteúdo liberado',
    color: 'text-blue-500',
    icon: <CheckCircle size={20} />,
  },
  notAvailable: {
    content: 'Em breve',
    color: 'text-orange-500',
    icon: <Lock size={20} />,
  },
}

export function LessonCard(props: LessonCardProps) {
  const isLessonAvailable = isPast(props.availableAt) ? 'available' : 'notAvailable'
  const lessonStatus = LESSON_CARD_STATUS[isLessonAvailable]
  const availableDateFormatted = format(props.availableAt, "EEEE' • 'dd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR
  })

  return (
    <Link
      className="group"
      to={`/event/lesson/${props.slug}`}
    >
      <span className="text-gray-300">
        {availableDateFormatted}
      </span>

      <div className="rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500">
        <header className="flex items-center justify-between">
          <span className={`flex items-center gap-2 text-sm ${lessonStatus.color} font-medium`}>
            {lessonStatus.icon}
            {lessonStatus.content}
          </span>
          <span className="text-xs rounded py-[0.125rem] px-2 text-white border border-green-300 font-bold">
            {ELessonCardTypeLabel[props.lessonType]}
          </span>
        </header>

        <strong className="text-gray-200 mt-5 block">
          {props.title}
        </strong>
      </div>
    </Link>
  )
}