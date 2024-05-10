import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class FormService {
    constructor(private httpService: HttpClient) { }
    connect(payload:any) {
        return this.httpService.post('/api/connect',payload);
    }

}