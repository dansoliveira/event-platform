export type TLessonType = 'live' | 'class'

export interface Lesson {
  id: string
  title: string
  slug: string
  availableAt: string
  lessonType: TLessonType
}
