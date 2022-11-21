import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

import { CurrencyMaskConfig } from "ngx-currency/src/currency-mask.config";

import { InputType } from "../../enums/input-type";
import { InputMode } from "../../enums/input-mode";
import { generateUniqueId } from "../../helpers/unique-id";
import { InputLayout } from "../../enums/input-layout";
import { CurrencySymbol } from "../../enums/currency-symbol";

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
    @Input() max!: number;
    @Input() min!: number;
    @Input() inputType = InputType.TEXT;
    @Input() inputMode = InputMode.TEXT;
    @Input() layout = InputLayout.DEFAULT
    @Input() required = false;
    @Input() autofocus = false;
    @Input() isPassword = false;
    @Input() id = generateUniqueId();

    control!: FormControl;
    currencyMaskOptions!: Partial<CurrencyMaskConfig>;
    hidePassword = true;
    inputLayoutEnum = InputLayout;
    inputTypeEnum = InputType;
    inputModeEnum = InputMode;

    ngOnInit(): void{
        this.control = this.form.get(this.name) as FormControl;

        if(this.layout === InputLayout.CURRENCY)
            this.currencyMaskOptions = {
                prefix: `${CurrencySymbol.BRL} `,
                thousands: '.',
                decimal: ',',
                allowNegative: false,
                align: 'left',
                min: this.min,
                max: this.max,
            }
    }

    get type(): InputType{
        if (this.isPassword) return this.hidePassword ? InputType.PASSWORD : InputType.TEXT

        return this.inputType
    }
}
