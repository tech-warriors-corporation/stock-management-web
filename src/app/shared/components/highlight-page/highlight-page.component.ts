import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-highlight-page',
    templateUrl: './highlight-page.component.html',
    styleUrls: ['./highlight-page.component.scss']
})
export class HighlightPageComponent {
    @Input() highlightTitle!: string
}
