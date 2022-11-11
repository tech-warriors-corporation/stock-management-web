import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

import { SelectOptions } from "../../types/select";

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectComponent{
    @Input() form!: FormGroup;
    @Input() label!: string;
    @Input() placeholder!: string;
    @Input() name!: string;
    @Input() hint!: string;
    @Input() required = false;
    @Input() autofocus = false;
    @Input() options: SelectOptions = []

    control!: FormControl;

    ngOnInit(): void{
        this.control = this.form.get(this.name) as FormControl;
    }
}
