import { Lesson, Teacher } from "./common"
import {
    APIError,
    BadRequest,
    InternalError,
    InvalidCredentials,
    InvalidLogin,
    InvalidPassword,
    InvalidToken,
    LessonDoesNotExist,
    LoginAlreadyPresent,
    NoReadAccess,
    NoTokenPresent,
    NoWriteAccess,
    TeacherDoesNotExist,
    TokenExpired,
    TokenRevoked,
} from "./errors"
import {
    AddLesson,
    AddTeacher,
    Login as LoginRequest,
    RefreshTokens,
    Register as RegisterRequest,
    UpdateLesson,
    UpdateTeacher,
} from "./requests"
import {
    GetLesson as GetLessonResponse,
    GetLessonList,
    GetTeacher,
    GetTeacherList,
    Login as LoginResponse,
    Refresh,
    Register as RegisterResponse,
} from "./responses"

const payloadOf = <T>(payload: T) => ({ payload })
const errorOf = <E extends APIError>(type: E["type"], rest?: Omit<E, "type">) => ({ error: { type, ...rest } })

export const login: LoginRequest = {
    login: "yarik",
    password: "LegitPassword",
}

export const loginSuccess: LoginResponse = payloadOf({
    access_token:
        "eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYmM1ZmNlNzQtMTNjOC0xMWViLWI4MjUtMDI0MmFjMTMwMDAzIiwidG9rZW5fb3JpZ2luIjoiN2JhMWI0NmEtNmMzNS00ZGRhLTkxY2QtYTkxYTE0MTA5ODA1IiwiZXhwIjoxNjAzMzA0MTQzLCJpYXQiOjE2MDMzMDM4NDN9.YRYxagpCgIG9nCIfBwppX6kdNXlil6XBOW0lJwYdDe0",
    refresh_token:
        "eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiYmM1ZmNlNzQtMTNjOC0xMWViLWI4MjUtMDI0MmFjMTMwMDAzIiwidG9rZW5faWQiOiI3YmExYjQ2YS02YzM1LTRkZGEtOTFjZC1hOTFhMTQxMDk4MDUiLCJleHAiOjE2MDQ1MTM0NDMsImlhdCI6MTYwMzMwMzg0M30.ymilVkZ9F05L-st8Tco2EOFxiIsDGd3qg6eFL1cSKmA",
})

export const loginFailure = errorOf<InvalidCredentials>("invalid_credentials")

export const badRequestBody = errorOf<BadRequest>("bad_request", {
    message: "expected `,` or `}` at line 4 column 2",
    in: "body",
})

export const badRequestPath = errorOf<BadRequest>("bad_request", {
    message: "invalid length: expected one of [36, 32], found 12",
    in: "path",
})

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

export const refresh: RefreshTokens = {
    refresh_token: "eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiMTFiNWIzYjgtMDhjMy0xMWViLWE2ZTgtMTQxMDlmZDY3NGQxIiwidG9rZW5faWQiOiIwMDk2NDBkOS1iODdiLTQ1ZmQtODEyZC0zZDI2YmIzYWE5NGYiLCJleHAiOjE2MDQ1MTA1ODEsImlhdCI6MTYwMzMwMDk4MX0.iG2B0lEXCfs8wNwHa5oIMBlneoDJq0yDqDzeNSBo__g"
}

export const refreshSuccess: Refresh = loginSuccess

export const internalError = errorOf<InternalError>("internal_error")

export const getLesson: GetLessonResponse = payloadOf<Lesson>({
    id: "a7262da1-33ed-448c-8b7d-97263d0974f7",
    title: "Math",
    singles: ["2020-08-17T15:10", "2020-09-21T11:30", "2020-08-11T14:00"],
    daily: [],
    weekly: [
        {
            day: 1,
            every: 1,
            start_date: "2020-08-17",
            at: "13:00:00+00:00",
        },
        {
            day: 3,
            every: 2,
            start_date: "2020-08-17",
            at: "15:10:00+00:00",
        },
    ],
    monthly: [],
    teachers: ["cdf033af-e625-4fa4-b7e0-08ad096ba6dd", "291d3192-3cbf-4749-ae3f-f4834f220fda"],
})

export const lessonNotFound = errorOf<LessonDoesNotExist>("lesson_does_not_exist")

export const noLessonReadAccess = errorOf<NoReadAccess<"lesson">>("no_read_access", {
    entity_type: "lesson",
    entity_id: "a7262da1-33ed-448c-8b7d-97263d0974f7",
})

export const noLessonWriteAccess = errorOf<NoWriteAccess<"lesson">>("no_write_access", {
    entity_type: "lesson",
    entity_id: "a7262da1-33ed-448c-8b7d-97263d0974f7",
})

export const noTeacherReadAccess = errorOf<NoReadAccess<"teacher">>("no_read_access", {
    entity_type: "teacher",
    entity_id: "6b7fda92-581f-4236-8127-cc39e58185a1",
})

export const noTeacherWriteAccess = errorOf<NoWriteAccess<"teacher">>("no_write_access", {
    entity_type: "teacher",
    entity_id: "6b7fda92-581f-4236-8127-cc39e58185a1",
})

export const noTokenPresent = errorOf<NoTokenPresent>("no_token_present")
export const invalidToken = errorOf<InvalidToken>("invalid_token")
export const tokenExpired = errorOf<TokenExpired>("token_expired")
export const tokenRevoked = errorOf<TokenRevoked>("token_revoked")

export const addLesson: AddLesson = {
    title: "Math",
    weekly: [
        {
            day: 4,
            every: 14,
            start_date: "2020-08-17",
            at: "13:00:00+00:00",
        },
        {
            day: 6,
            every: 7,
            start_date: "2020-08-17",
            at: "15:10:00+00:00",
        },
    ],
    singles: ["2020-08-17T15:10", "2020-09-21T11:30", "2020-08-11T14:00"],
}

export const lessonList: GetLessonList = payloadOf<Lesson[]>([
    getLesson.payload,
    {
        id: "cb571a0e-d057-4e4e-a592-7d6343875a7e",
        title: "English",
        singles: ["2020-08-17T15:10", "2020-09-21T11:30", "2020-08-11T14:00"],
        daily: [],
        weekly: [
            {
                day: 2,
                every: 1,
                start_date: "2020-08-17",
                at: "15:10:00+00:00",
            },
        ],
        monthly: [],
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
    last_name: "Kalujnii",
}

export const addedTeacher: GetTeacher = payloadOf<Teacher>({
    id: "6b7fda92-581f-4236-8127-cc39e58185a1",
    first_name: "Alexander",
    last_name: "Kalujnii",
})

export const getTeacher: GetTeacher = payloadOf<Teacher>({
    first_name: "Alexander",
    last_name: "Kalujnii",
    id: "6b7fda92-581f-4236-8127-cc39e58185a1",
    associated_account_id: "bda8704f-b53b-49e8-8917-69bd0c00fc89",
})

export const teacherList: GetTeacherList = payloadOf<Teacher[]>([
    getTeacher.payload,
    {
        first_name: "Yaroslav",
        last_name: "Volinko",
        id: "d380fa45-64b8-4fe1-b625-2ca03e7cb2ee",
        associated_account_id: "7a6d9baa-093d-4715-bf1c-08d75c406302",
    },
])

export const teacherNotFound = errorOf<TeacherDoesNotExist>("teacher_does_not_exist")

export const updateLesson: UpdateLesson = {
    description: "null",
    singles: ["2020-08-17T15:10", "2020-11-25T12:30"],
}

export const updateTeacher: UpdateTeacher = {
    first_name: "Daniel",
    last_name: null,
}
