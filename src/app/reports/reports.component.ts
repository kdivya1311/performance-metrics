import { Component, inject, OnInit } from "@angular/core";
import { APIService } from "../services/api.service";
import { Employee } from "../types";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"],
})
export class ReportsComponent implements OnInit {
  employees?: Employee[];
  stars = [1, 2, 3, 4, 5];
  filteredEmployees?: Employee[] = [];
  searchTerm: string = "";

  employeeForm?: FormGroup;

  private readonly apiService = inject(APIService);
  private readonly _formBuilder = inject(FormBuilder);

  ngOnInit() {
    this.employeeForm = this._formBuilder.group({
      id: ["", Validators.required],
      name: ["", Validators.required],
      rating: [
        "",
        Validators.compose([Validators.required, Validators.min(1)]),
      ],
      designation: ["", Validators.required],
      feedback: ["", Validators.required],
    });
    this.apiService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = this.filteredEmployees = data;
    });
  }

  addEmployee(): void {
    this.employees?.push(this.employeeForm?.value);
    this.employeeForm?.reset();
  }

  onSearchChange(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredEmployees = this.employees;
    } else {
      this.filteredEmployees = this.employees?.filter((rec) =>
        rec.name.toLowerCase().includes(term)
      );
    }
  }
}
