import { ControlError } from "../enums/control-error";

export type FormControlError = {
    key: ControlError,
    getMessage: (error: any) => string
};
