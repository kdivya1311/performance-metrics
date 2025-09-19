import { Injectable } from "@angular/core";
import { IApiService } from "./api.stub";
import { Observable } from "rxjs";
import { Employee, Perfomance } from "../types";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class APIService implements IApiService {
  constructor(private readonly _http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this._http.get<Employee[]>("assets/employees.json");
  }

  getPerformace(): Observable<Perfomance> {
    return this._http.get<Perfomance>("assets/performance.json");
  }
}
