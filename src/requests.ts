import {
    NamedEntity,
    TaskID,
    LessonID,
    TeacherID,
    UserID,
    EntityID,
    EntityType,
    SingleOccurrence,
    WeeklyRepetition,
    DailyRepetition,
    MonthlyRepetition,
    JWT,
} from "./common"

export interface Login {
    login: string
    /**
     * @format password
     */
    password: string
}

export interface RefreshTokens {
    refresh_token: JWT;
}

export interface Register extends NamedEntity {
    login: string
    /**
     * @format password
     */
    password: string
}

export interface AddTask {
    name: string
    description?: string
}

export interface AddLesson {
    title: string
    singles?: SingleOccurrence[]
    daily?: DailyRepetition[]
    weekly?: WeeklyRepetition[]
    monthly?: MonthlyRepetition[]
    description?: string
}

export interface AddTeacher extends NamedEntity {}

export interface AddPermission {
    type: "r" | "rw"
    entity_type: EntityType
    /**
     * @format uuid
     */
    entity_id: EntityID
    /**
     * @format uuid
     */
    account_id: UserID
}

export type UpdateTask = AddTask

export interface UpdateLesson {
    title?: string
    singles?: SingleOccurrence[]
    daily?: DailyRepetition[]
    weekly?: WeeklyRepetition[]
    monthly?: MonthlyRepetition[]
    description?: string | null
}

export interface UpdateTeacher {
    first_name?: string
    last_name?: string | null
}

export interface UpdateMe extends NamedEntity {}

export interface AssignTaskLesson {
    task_id: TaskID
    lesson_id: LessonID
}

export interface AssignTeacherLesson {
    teacher_id: TeacherID
    lesson_id: LessonID
}

export type DeAssignTaskLesson = AssignTaskLesson
export type DeAssignTeacherLesson = AssignTeacherLesson
