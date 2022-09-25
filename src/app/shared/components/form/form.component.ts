import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent {
    @Output() formSubmit = new EventEmitter<void>();
    @Input() form!: FormGroup;
    @Input() formTitle!: string;
}
