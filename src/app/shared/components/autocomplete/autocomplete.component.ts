import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

import { map, Observable, startWith } from "rxjs";

import { InputType } from "../../enums/input-type";
import { InputMode } from "../../enums/input-mode";
import { AutocompleteOption, AutocompleteOptions } from "../../types/autocomplete";
import { SituationTextPipe } from "../../pipes/situation-text/situation-text.pipe";

const NONE_VALUE = ''

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss'],
    providers: [SituationTextPipe]
})
export class AutocompleteComponent implements OnInit{
    @Input() form!: FormGroup;
    @Input() label!: string;
    @Input() placeholder!: string;
    @Input() name!: string;
    @Input() hint!: string;
    @Input() inputType = InputType.TEXT;
    @Input() inputMode = InputMode.TEXT;
    @Input() required = false;
    @Input() autofocus = false;

    @Input('options')
    set setOptions(options: AutocompleteOptions){
        this.options = options

        this.setFilteredOptions()
    }

    options: AutocompleteOptions = [];
    control!: FormControl;
    filteredOptions!: Observable<AutocompleteOptions>;

    constructor(private situationTextPipe: SituationTextPipe){}

    ngOnInit(): void{
        this.control = this.form.get(this.name) as FormControl;

        this.setFilteredOptions()
    }

    displayText(value: number): string{
        const option = this.findOption(value)

        return option ? this.situationTextPipe.transform(option.text, option.isActive) : NONE_VALUE
    }

    private findOption(value: number): AutocompleteOption | null{
        return this.options.find(option => option.value === value) || null
    }

    private setFilteredOptions(){
        if(!this.control) return;

        this.filteredOptions = this.control.valueChanges.pipe(
            startWith(NONE_VALUE),
            map((value: string | number | null) => {
                if (typeof value === 'number') value = this.findOption(value)?.text || null
                if (!value) value = NONE_VALUE

                return this.options.filter(({ text }) => text.toLowerCase().includes((value as string).toLowerCase()))
            })
        );
    }
}
