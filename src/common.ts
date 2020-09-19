export type NamedEntity = {
    first_name: string
    last_name?: string
}

export type Payload<T> = { payload: T }

/**
 * @format uuid
 */
export type UUID = string

/**
 * @format uuid
 */
export type TeacherID = UUID
/**
 * @format uuid
 */
export type LessonID = UUID
/**
 * @format uuid
 */
export type TaskID = UUID
/**
 * @format uuid
 */
export type UserID = UUID

/**
 * @format uuid
 */
export type EntityID = TeacherID | LessonID | TaskID
export type EntityType = "teacher" | "lesson" | "task"
export type IDOf<Entity extends EntityType> = Entity extends "teacher"
    ? TeacherID
    : Entity extends "lesson"
    ? LessonID
    : TaskID

/**
 * @format jwt
 * @pattern [a-zA-Z0-9_=]{18,24}\.[a-zA-Z0-9_=]{48,64}\.[a-zA-Z0-9_=]{36,48}
 */
export type JWT = string

export type Monday = 1
export type Tuesday = 2
export type Wednesday = 3
export type Thursday = 4
export type Friday = 5
export type Saturday = 6
export type Sunday = 7
export type WeekDay =
    | Monday
    | Tuesday
    | Wednesday
    | Thursday
    | Friday
    | Saturday
    | Sunday

/**
 * @format date
 */
export type ISODate = string
/**
 * @format time
 */
export type ISOTime = string
/**
 * @format date-time
 */
export type ISODateTime = string

export type SingleOccurrence = ISODateTime

export interface Repetition {
    start_date: ISODate
    end_date?: ISODate
}

export interface DailyRepetition extends Repetition {
    at: ISOTime
}

export interface WeeklyRepetiotion extends Repetition {
    /**
     * @description Frequency at which lessons are to be repeated counted in weeks. 
     * If lesson were to be repeated every week, the value would be 1, biweekly - 2
     * @type integer
     * @minimum 1
     */
    every: number
    day: WeekDay
    at: ISOTime
}

export interface MonthlyRepetition extends Repetition {
    every: number
    at: ISODateTime
}

export interface Lesson {
    id: LessonID
    title: string
    singles: SingleOccurrence[]
    daily: DailyRepetition[]
    weekly: WeeklyRepetiotion[]
    monthly: MonthlyRepetition[]
    /**
     * @description Array of Teacher IDs
     * @abstract if you have read access to the lesson, you get read access to the teachers assigned to it
     * @items.format uuid
     * @items.type string
     */
    teachers: TeacherID[]
    description?: string
}

export interface Teacher extends NamedEntity {
    id: TeacherID
    associated_account_id?: UserID
    // lessons: LessonID[] // not MVP
}

export interface Task {
    id: TaskID
    name: string
    description?: string
    lesson?: LessonID
    // teacher?: TeacherID // not MVP
}

export interface User extends NamedEntity {
    id: UserID
}
