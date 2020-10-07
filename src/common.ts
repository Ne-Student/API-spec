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

/**
 * @format date-time
 */
export type SingleOccurrence = ISODateTime

export interface Repetition {
    /**
     * @description The start date, before which repetitions do not occur.
     *              start_date is inclusive (meaning, if the event is repeated on that day, it is present)
     */
    start_date: ISODate
    /**
     * @description Optional end date, after which repetitions do not occur.
     *              If end_date is not set, it is assumed that event repetition do not end.
     *              end_date is inclusive (meaning, if the event is repeated on that day, it is present)
     */
    end_date?: ISODate
}

export interface DailyRepetition extends Repetition {
    /** @description Time of day when lesson takes place */
    at: ISOTime
}

export interface WeeklyRepetition extends Repetition {
    /**
     * @description Frequency at which lessons are to be repeated counted in weeks. 
     * If lesson were to be repeated every week, the value would be 1, biweekly - 2
     * @type integer
     * @minimum 1
     */
    every: number
    /**
     * @description Day of the week when repetition occurs.
     *              1 - Monday
     *              2 - Tuesday
     *              3 - Wednesday
     *              4 - Thursday
     *              5 - Friday
     *              6 - Saturday
     *              7 - Sunday
     *              * Sorry North America *
     */
    day: WeekDay
    /** @description Time of day when lesson takes place */
    at: ISOTime
}

export interface MonthlyRepetition extends Repetition {
    /**
     * @description Frequency at which lessons are to be repeated counted in months. 
     * If lesson were to be repeated every month, the value would be 1, bimonthly - 2
     * @type integer
     * @minimum 1
     */
    every: number
    /**
     * @description This is a complicated one. 
     *              Time part is used to determine when in the day lesson occurs.
     *              From the date part only the day is used. 
     *              The day of the month is then used to provide stable day of every months repetition.
     * @todo Maybe split time of day repetition and day of the month into a separate field
     */
    at: ISODateTime
}

export interface Lesson {
    id: LessonID
    title: string
    /**
     * @description Date-times at which events will occur
     * @item.format date-time
     * @item.type string
     */
    singles: SingleOccurrence[]
    /**
     * @description Times where lesson is repeated every single (for now) day.
     */
    daily: DailyRepetition[]
    weekly: WeeklyRepetition[]
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
