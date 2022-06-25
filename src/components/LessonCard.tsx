import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Lesson } from '../types/Lesson'
import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames'

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
  const { slug } = useParams<{ slug: string }>()
  const isLessonAvailable = isPast(props.availableAt) ? 'available' : 'notAvailable'
  const lessonStatus = LESSON_CARD_STATUS[isLessonAvailable]
  const availableDateFormatted = format(props.availableAt, "EEEE' • 'dd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR
  })
  const isActiveLesson = slug === props.slug

  return (
    <Link
      className="group"
      to={`/event/lesson/${props.slug}`}
    >
      <span className="text-gray-300">
        {availableDateFormatted}
      </span>

      <div
        className={classNames("rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500", {
          'bg-green-500': isActiveLesson,
        })}
      >
        <header className="flex items-center justify-between">
          <span className={classNames('flex items-center gap-2 text-sm font-medium', {
            'text-white': isActiveLesson, 
            [lessonStatus.color]: !isActiveLesson,
          })}>
            {lessonStatus.icon}
            {lessonStatus.content}
          </span>
          <span className={classNames("text-xs rounded py-[0.125rem] px-2 text-white border font-bold", {
            'border-white': isActiveLesson,
            'border-green-300': !isActiveLesson,
          })}>
            {ELessonCardTypeLabel[props.lessonType]}
          </span>
        </header>

        <strong className={classNames("mt-5 block", {
          'text-white': isActiveLesson,
          'text-gray-200': !isActiveLesson,
        })}>
          {props.title}
        </strong>
      </div>
    </Link>
  )
}