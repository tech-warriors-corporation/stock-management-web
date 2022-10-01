import { Component, OnInit } from '@angular/core';

import { finalize } from "rxjs";

import { UsersService } from "./users.service";
import { User, Users } from "../../shared/types/user";
import { Base } from "../../shared/base/base";
import { Columns } from "../../shared/interfaces/table";
import { TableService } from "../../shared/components/table/table.service";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
})
export class UsersComponent extends Base<User> implements OnInit, Columns{
    protected count = 0
    protected page = 0

    loading = false;
    list: Users = [];
    columns = ['userName', 'email', 'isAdmin']

    constructor(private usersService: UsersService, public tableService: TableService){
        super()
    }

    ngOnInit(): void{
        this.get()
    }

    protected get(): void{
        this.loading = true;

        this.usersService.getList(this.page).pipe(finalize(() => this.loading = false)).subscribe(({ data, count }) => {
            this.list = data
            this.count = count as number
        })
    }
}
