import { EntityType, IDOf } from "./common"

export type InternalError = {
    type: "internal_error"
    message?: string
}
export type BadRequest = { 
    type: "bad_request",
    message?: string, 
    in: "path" | "query" | "header" | "body" 
}
export type UserDoesNotExist = { type: "user_does_not_exist" }
export type TeacherDoesNotExist = { type: "teacher_does_not_exist" }
export type InvalidCredentials = { type: "invalid_credentials" }
export type LoginAlreadyPresent = { type: "login_already_present" }
export type LessonDoesNotExist = { type: "lesson_does_not_exist" }
type NoAccess<Entity extends EntityType> = {
    entity_type: Entity
    /**
     * @format uuid
     */
    entity_id: IDOf<Entity>
}
export type NoReadAccess<Entity extends EntityType = EntityType> = NoAccess<Entity> & { type: "no_read_access" }
export type NoWriteAccess<Entity extends EntityType = EntityType> = NoAccess<Entity> & { type: "no_write_access" }
// export type NoAdminPermissions<Entity extends EntityType = EntityType> = NoAccess<Entity> & {
//     type: "no_admin_permissions"
// }
export type NoTokenPresent = { type: "no_token_present" }
export type InvalidToken = { type: "invalid_token" }
export type TokenExpired = { type: "token_expired" }
export type TokenRevoked = { type: "token_revoked" }
export type InvalidLogin = { type: "invalid_login" }
export type InvalidPassword = { type: "invalid_password" }

export type Unauthorized = NoTokenPresent | InvalidToken | TokenExpired | TokenRevoked

export type APIError =
    | InternalError
    | UserDoesNotExist
    | TeacherDoesNotExist
    | InvalidCredentials
    | InvalidToken
    | TokenExpired
    | NoTokenPresent
    | TokenRevoked
    | LoginAlreadyPresent
    | LessonDoesNotExist
    | NoReadAccess
    | NoWriteAccess
    | InvalidLogin
    | InvalidPassword
    | BadRequest
// | NoAdminPermissions

export type Error<E extends APIError> = { error: E }

export type SingleInternalError = Error<InternalError>
export type SingleUserDoesNotExist = Error<UserDoesNotExist>
export type SingleInvalidCredentials = Error<InvalidCredentials>
export type SingleInvalidToken = Error<InvalidToken>
export type SingleLoginAlreadyPresent = Error<LoginAlreadyPresent>
export type SingleLessonDoesNotExist = Error<LessonDoesNotExist>
export type SingleNoReadAccess<Entity extends EntityType = EntityType> = Error<NoReadAccess<Entity>>
export type SingleNoWriteAccess<Entity extends EntityType = EntityType> = Error<NoWriteAccess<Entity>>
// export type SingleNoAdminPermissions<Entity extends EntityType = EntityType> = Error<NoAdminPermissions>
export type SingleNoTokenPresent = Error<NoTokenPresent>
export type SingleTokenRevoked = Error<TokenRevoked>

export type SingleLessonNoReadAccess = SingleNoReadAccess<"lesson">
export type SingleLessonNoWriteAccess = SingleNoWriteAccess<"lesson">
// export type SingleLessonNoAdminPermissions = SingleNoAdminPermissions<"lesson">

export type SingleTeacherNoReadAccess = SingleNoReadAccess<"teacher">
export type SingleTeacherNoWriteAccess = SingleNoWriteAccess<"teacher">

export type SingleTeacherDoesNotExist = Error<TeacherDoesNotExist>

export type SingleBadRequest = Error<BadRequest>

export type SingleUnauthorized = Error<Unauthorized>

// Route specific errors
// /register 401
export type Register401 = Error<LoginAlreadyPresent | InvalidLogin | InvalidPassword>

// No Write Access in real-world
export type NoWriteAccess403<Entity extends EntityType> = Error<NoReadAccess<Entity> | NoWriteAccess<Entity>>

export type LessonNoWriteAccess403 = NoWriteAccess403<"lesson">
export type TeacherNoWriteAccess403 = NoWriteAccess403<"teacher">
