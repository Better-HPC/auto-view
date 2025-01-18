import { AsyncPipe } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";

import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

import { DataService } from "~services/data/data.service";

export interface TblSelectInterface {
  tableName: string;
}

@Component({
  standalone: true,
  selector: "app-tbl-select-form",
  templateUrl: "tbl-select-form.component.html",
  styleUrl: "tbl-select-form.component.scss",
  imports: [
    AsyncPipe,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class TblSelectFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<TblSelectInterface>();

  protected form!: FormGroup;
  protected allOptions: string[] = [];
  protected filteredOptions$!: Observable<string[]>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.initializeOptions();
    this.initializeForm();
    this.initializeAutocomplete();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }

  private initializeOptions(): void {
    this.dataService.getTableNames().subscribe(names => this.allOptions = names);
  }

  private initializeForm(): void {
    const escapedArr = this.allOptions.map(item => item.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"));
    const regexPattern = escapedArr.join("|");
    const regex = new RegExp(`^(${regexPattern})$`);

    this.form = new FormGroup({
      tableName: new FormControl("", [Validators.required, Validators.pattern(regex)]),
    });
  }

  private initializeAutocomplete(): void {
    this.filteredOptions$ = this.form.get("tableName")!.valueChanges.pipe(
      startWith(""),
      map(value => this.filter(value || ""))
    );
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allOptions.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
