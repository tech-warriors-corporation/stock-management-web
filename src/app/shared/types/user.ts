import { BooleanAsNumber } from "../enums/boolean-as-number";

export type User = {
    userId: number,
    userName: string,
    email: string,
    isAdmin: BooleanAsNumber,
    isActive: BooleanAsNumber,
    dtCreated: Date,
    alreadyChangedPassword: BooleanAsNumber,
    userPassword: string | null,
    dtUpdated: Date | null,
    createdByUserId: number | null,
}

export type Users = User[]

export type NewUser = {
    userName: string,
    email: string,
    userPassword: string,
    userPasswordConfirmation: string,
    isAdmin: BooleanAsNumber
}

export type EditUser = {
    userName: string,
    email: string,
}

export type ChangePasswordUser = {
    userPassword: string,
    userPasswordConfirmation: string,
}
