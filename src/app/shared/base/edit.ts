import { FormGroup } from "@angular/forms";

export abstract class Edit<T>{
    protected abstract id: number
    protected abstract item: T
    abstract submitting: boolean
    abstract loading: boolean
    abstract form: FormGroup
    protected abstract get(): void
    abstract submit(): void
}
