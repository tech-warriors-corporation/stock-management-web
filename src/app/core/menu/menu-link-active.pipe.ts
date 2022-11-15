import { Pipe, PipeTransform } from '@angular/core';
import { Router } from "@angular/router";

import { Path } from "../../shared/enums/path";

@Pipe({
    name: 'menuLinkActive'
})
export class MenuLinkActivePipe implements PipeTransform {
    constructor(private router: Router){}

    transform(href: string[]): boolean {
        const link = href.join('');
        const { url } = this.router;
        const inputsOutputsRootRoute = `${Path.DEFAULT}${Path.INPUTS_OUTPUTS}`
        const inputsRootRoute = `${Path.DEFAULT}${Path.INPUTS}`
        let isActive = url.startsWith(link)

        if(!isActive) isActive = link.startsWith(inputsOutputsRootRoute) && url.startsWith(inputsRootRoute)

        return isActive;
    }
}
