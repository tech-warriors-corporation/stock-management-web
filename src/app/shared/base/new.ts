import { FormGroup } from "@angular/forms";

export abstract class New {
    abstract submitting: boolean
    abstract form: FormGroup
    abstract submit(): void
}
