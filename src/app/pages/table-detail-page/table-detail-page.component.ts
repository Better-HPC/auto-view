import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  standalone: true,
  selector: "table-detail-page",
  templateUrl: "table-detail-page.component.html",
})
export class TableDetailPageComponent {
  tableName = "";

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.tableName = params['tableName']);
  }
}
