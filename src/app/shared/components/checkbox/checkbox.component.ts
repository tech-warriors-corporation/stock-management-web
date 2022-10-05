import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";

import { BooleanAsNumber } from "../../enums/boolean-as-number";

@Component({
    selector: 'app-checkbox',
    template: '<mat-checkbox [disabled]="disabled" [checked]="isChecked" (change)="onChange($event)">{{ label }}</mat-checkbox>',
})
export class CheckboxComponent {
    @Input() form!: FormGroup
    @Input() name!: string
    @Input() label!: string
    @Input() disabled = false

    private control!: FormControl

    ngOnInit(){
        this.control = this.form.get(this.name) as FormControl
    }

    get isChecked(): boolean{
        return this.control.value === BooleanAsNumber.TRUE
    }

    onChange(event: MatCheckboxChange){
        this.control.setValue(event.checked ? BooleanAsNumber.TRUE : BooleanAsNumber.FALSE)
    }
}
