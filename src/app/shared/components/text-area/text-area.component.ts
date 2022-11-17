import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

import { generateUniqueId } from "../../helpers/unique-id";

@Component({
    selector: 'app-text-area',
    templateUrl: './text-area.component.html',
    styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {
    @Input() form!: FormGroup;
    @Input() label!: string;
    @Input() placeholder!: string;
    @Input() name!: string;
    @Input() hint!: string;
    @Input() maxlength!: number;
    @Input() rows = 4;
    @Input() autofocus = false;
    @Input() required = false;
    @Input() id = generateUniqueId();

    control!: FormControl;

    ngOnInit(): void {
        this.control = this.form.get(this.name) as FormControl;
    }
}
