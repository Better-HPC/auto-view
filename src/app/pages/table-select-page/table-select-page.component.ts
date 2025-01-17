import { AsyncPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import { TblSelectFormComponent, TblSelectInterface } from "~components/tbl-select-form/tbl-select-form.component";
import { DataService } from "~services/data/data.service";

@Component({
  standalone: true,
  selector: "table-select-page",
  templateUrl: "table-select-page.component.html",
  imports: [
    AsyncPipe,
    TblSelectFormComponent,
  ],
})
export class TableSelectPageComponent implements OnInit {
  public title$!: Observable<string>;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.title$ = this.dataService.getTitle();
  }

  handleFormData(formData: TblSelectInterface): void {
    void this.router.navigate(["app", formData.tableName]);
  }
}
