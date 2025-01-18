import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataTblComponent } from "~components/data-tbl/data-tbl.component";

@Component({
  standalone: true,
  selector: "table-detail-page",
  templateUrl: "table-detail-page.component.html",
  imports: [
    DataTblComponent,
  ]
})
export class TableDetailPageComponent {
  tableName = "";

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.tableName = params["tableName"]);
  }
}
