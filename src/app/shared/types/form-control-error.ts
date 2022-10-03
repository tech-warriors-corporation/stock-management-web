import { ControlError } from "../enums/ControlError";

export type FormControlError = {
    key: ControlError,
    getMessage: (error: any) => string
};
