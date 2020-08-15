import { Login as LoginRequest, Register as RegisterRequest, AddLesson, AddTeacher } from "./requests"
import { Login as LoginReponse, Register as RegisterResponse, GetLesson as GetLessonResponse, GetTeacher } from "./responses"
import {
    InternaError,
    Error,
    InvalidCredentials,
    LoginAlreadyPresent,
    LessonDoesNotExist,
    NoReadAccess,
    NoWriteAccess,
    NoTokenPresent,
    InvalidToken,
    TokenExpired,
    TokenRevoked,
    InvalidLogin,
    InvalidPassword,
    APIError,
    TeacherDoesNotExist,
} from "./errors"
import { Payload, Lesson } from "./common"

const payloadOf = <T>(payload: T) => ({ payload })
const errorOf = <E extends APIError>(type: E["type"], rest?: Omit<E, "type">) => ({ error: { type, ...rest } })

export const login: LoginRequest = {
    login: "yarik",
    password: "LegitPasword",
}

export const loginSuccess: LoginReponse = payloadOf({
    access_token:
        "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImI2OWJkODdlLWQwNDQtMTFlYS05NWJlLTE0MTA5ZmQ2NzRkMSJ9.xYJaZTwhvncTGCLJFc2_xCnA9AYegn88VW3akEQnp18",
})

export const loginFailure = errorOf<InvalidCredentials>("invalid_credentials")

export const register: RegisterRequest = {
    first_name: "John",
    last_name: "Appleseed",
    login: "johny",
    password: "LegitPassword",
}

export const registerWithoutName: RegisterRequest = {
    first_name: "John",
    login: "johny",
    password: "LegitPassword",
}

export const registerSuccess: RegisterResponse = loginSuccess

export const registerFailure = errorOf<LoginAlreadyPresent>("login_already_present")

export const internalError = errorOf<InternaError>("internal_error")

export const getLesson: GetLessonResponse = payloadOf({
    id: "a7262da1-33ed-448c-8b7d-97263d0974f7",
    title: "Math",
    repeats: [
        {
            day: 1,
            every: 1,
            time: {
                hour: 12,
                minute: 0,
            },
        },
        {
            day: 3,
            every: 2,
            time: {
                hour: 15,
                minute: 10,
            },
        },
    ],
    teachers: ["cdf033af-e625-4fa4-b7e0-08ad096ba6dd", "291d3192-3cbf-4749-ae3f-f4834f220fda"],
})

export const lessonNotFound = errorOf<LessonDoesNotExist>("lesson_does_not_exist")

export const noLessonReadAccess = errorOf<NoReadAccess<"lesson">>("no_read_access", {
    entity_type: "lesson",
    enriry_id: "a7262da1-33ed-448c-8b7d-97263d0974f7",
})

export const noLessonWriteAccess = errorOf<NoWriteAccess<"lesson">>("no_write_access", {
    entity_type: "lesson",
    enriry_id: "a7262da1-33ed-448c-8b7d-97263d0974f7",
})

export const noTeacherReadAccess = errorOf<NoReadAccess<"teacher">>("no_read_access", {
    entity_type: "teacher",
    enriry_id: "6b7fda92-581f-4236-8127-cc39e58185a1",
})

export const noTeacherWriteAccess = errorOf<NoWriteAccess<"teacher">>("no_write_access", {
    entity_type: "teacher",
    enriry_id: "6b7fda92-581f-4236-8127-cc39e58185a1",
})

export const noTokenPresent = errorOf<NoTokenPresent>("no_token_present")
export const invalidToken = errorOf<InvalidToken>("invalid_token")
export const tokenExpired = errorOf<TokenExpired>("token_expired")
export const tokenRevoked = errorOf<TokenRevoked>("token_revoked")

export const addLesson: AddLesson = {
    title: "Math",
    repeats: [
        {
            day: 4,
            every: 2,
            time: {
                hour: 10,
                minute: 30,
            },
        },
        {
            day: 6,
            every: 1,
            time: {
                hour: 8,
                minute: 0,
            },
        },
    ],
}

export const lessonList = payloadOf<Lesson[]>([
    getLesson.payload,
    {
        id: "cb571a0e-d057-4e4e-a592-7d6343875a7e",
        title: "English",
        repeats: [
            {
                day: 2,
                every: 1,
                time: {
                    hour: 13,
                    minute: 10,
                },
            },
        ],
        teachers: ["47477195-1de3-4a67-8e8d-1060a44593d5"],
    },
])

export const emptyList = payloadOf<[]>([])

export const invalidCredentials = errorOf<InvalidCredentials>("invalid_credentials")
export const loginAlreadyPresent = errorOf<LoginAlreadyPresent>("login_already_present")
export const invalidPassword = errorOf<InvalidPassword>("invalid_password")
export const invalidLogin = errorOf<InvalidLogin>("invalid_login")

export const addTeacher: AddTeacher = {
    first_name: "Alexander",
    last_name: "Kalujnii"
}

export const getTeacher: GetTeacher = payloadOf({
    first_name: "Alexander",
    last_name: "Kalujnii",
    id: "6b7fda92-581f-4236-8127-cc39e58185a1",
    user_id: "bda8704f-b53b-49e8-8917-69bd0c00fc89"
})

export const teacherNotFound = errorOf<TeacherDoesNotExist>("teacher_does_not_exist")