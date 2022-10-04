import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

import { InputType } from "../../enums/input-type";
import { InputMode } from "../../enums/input-mode";

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit{
    @Input() form!: FormGroup;
    @Input() label!: string;
    @Input() placeholder!: string;
    @Input() name!: string;
    @Input() hint!: string;
    @Input() maxlength!: number;
    @Input() minlength!: number;
    @Input() inputType = InputType.TEXT;
    @Input() inputMode = InputMode.TEXT;
    @Input() required = false;
    @Input() autofocus = false;
    @Input() isPassword = false;

    control!: FormControl;
    hidePassword = true;

    ngOnInit(): void{
        this.control = this.form.get(this.name) as FormControl;
    }

    get type(): InputType{
        if (this.isPassword) return this.hidePassword ? InputType.PASSWORD : InputType.TEXT

        return this.inputType
    }
}
