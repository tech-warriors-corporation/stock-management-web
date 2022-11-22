import { Injectable } from '@angular/core';

import { environment } from "../../../environments/environment";
import { API } from "../../shared/interfaces/restful";

@Injectable({
    providedIn: 'root'
})
export class OutputsService implements API{
    readonly API = `${environment.api}/outputs`
}
