import { Component, Input, OnInit } from "@angular/core";
import { MatCard } from "@angular/material/card";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatSortModule, Sort } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";

import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { environment } from "~environments/environment";
import { DataService } from "~services/data/data.service";

@Component({
  standalone: true,
  selector: "app-data-tbl",
  templateUrl: "data-tbl.component.html",
  styleUrls: ["data-tbl.component.scss"],
  imports: [
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatCard,
  ],
})
export class DataTblComponent implements OnInit {
  @Input() tableName!: string;
  @Input() displayedColumns: string[] = [];

  protected data$!: Observable<Record<string, any>[]>;
  protected pageSizeOptions: number[] = environment.pageSizeOptions;
  private pageCriteria: PageEvent | null = null;
  private sortCriteria: Sort | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.fetchTableData();
  }

  updateSorting($event: Sort) {
    this.sortCriteria = $event;
    this.fetchTableData();
  }

  updatePagination($event: PageEvent) {
    this.pageCriteria = $event;
    this.fetchTableData();
  }

  private fetchTableData(): void {
    const pageIndex = this.pageCriteria?.pageIndex || 0;
    const pageSize = this.pageCriteria?.pageSize || 10;
    const sortField = this.sortCriteria?.active || "";
    const sortOrder = this.sortCriteria?.direction || "";

    this.data$ = this.dataService.getTableData(this.tableName).pipe(
      tap(() => {
        this.dataService.getTableSchema(this.tableName).subscribe({
          next: (schema) => {
            this.displayedColumns = Object.keys(schema.columns);
          },
          error: () => {
            console.error("Failed to load schema.");
          }
        });
      }),
      catchError((error) => {
        console.error("Failed to fetch table data:", error);
        return of([]);
      })
    );
  }
}
