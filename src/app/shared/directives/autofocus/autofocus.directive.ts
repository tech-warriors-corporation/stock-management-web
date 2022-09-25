import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit {
    @Input('appAutofocus') autofocus = false;

    constructor(private element: ElementRef){}

    ngOnInit(): void {
        if (this.autofocus) setTimeout(() => this.element.nativeElement.focus(), 500);
    }
}
