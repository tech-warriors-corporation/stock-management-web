import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../core/auth/auth.service";
import { Path } from "../../shared/enums/path";

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
    constructor(private router: Router, private authService: AuthService){}

    ngOnInit(): void {
        if (!this.authService.isLogged) this.router.navigateByUrl(`/${Path.LOGIN}`);
    }
}
