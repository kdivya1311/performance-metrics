import { Observable } from "rxjs";
import { Employee, Perfomance } from "../types";

interface IApiService {
    getEmployees(): Observable<Employee[]>;
    getPerformace(): Observable<Perfomance>;
}

export { IApiService };