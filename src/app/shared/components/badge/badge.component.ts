import { Component, Input } from '@angular/core';

import { BadgeColor } from "../../enums/badge-color";

@Component({
    selector: 'app-badge',
    template: `
        <span class="badge"
              [class.badge--green]="badgeColor.GREEN === color"
              [class.badge--orange]="badgeColor.ORANGE === color">
            {{ text }}
        </span>
    `,
    styleUrls: ['./badge.component.scss']
})
export class BadgeComponent{
    @Input() text!: string
    @Input() color!: BadgeColor

    badgeColor = BadgeColor
}
