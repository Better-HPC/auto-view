import { Injectable } from "@angular/core";
import { map, Observable, shareReplay } from "rxjs";

import { APIService } from "~services/api/api.service";
import { AppMeta, Schema, SchemaTable } from "~services/api/app.interface";

@Injectable({
  providedIn: "root"
})
export class DataService {
  // Define API endpoints
  private schemaEndpoint = "meta/schema";
  private appEndpoint = "meta/app";

  // Cache results from API calls
  private schemaCache$!: Observable<Schema>;
  private appCache$!: Observable<AppMeta>;

  constructor(private apiService: APIService) {}

  /**
   * Fetch metadata about the application from the API.
   * The returned value is automatically cached.
   * @returns An observable containing the metadata object.
   */
  getAppMeta(): Observable<AppMeta> {
    if (!this.appCache$) {
      this.appCache$ = this.apiService.get<AppMeta>(this.appEndpoint).pipe(
        shareReplay(1)
      );
    }

    return this.appCache$;
  }

  /**
   * Returns the application name.
   * The returned value is automatically cached.
   * @returns An observable containing the application name.
   */
  getTitle(): Observable<string> {
    return this.getAppMeta().pipe(map(meta => meta.name));
  }

  /**
   * Returns the application version number.
   * @returns An observable containing the version string.
   */
  getVersion(): Observable<string> {
    return this.getAppMeta().pipe(map(meta => meta.version));
  }

  /**
   * Returns the entire database schema.
   * The returned value is automatically cached.
   * @returns An observable containing the database schema.
   */
  getSchema(): Observable<Schema> {
    if (!this.schemaCache$) {
      this.schemaCache$ = this.apiService.get<Schema>(this.schemaEndpoint).pipe(
        shareReplay(1)
      );
    }

    return this.schemaCache$;
  }

  /**
   * Returns a list of table names available in the database.
   * The returned value is automatically cached.
   * @returns An observable containing the database schema.
   */
  getTableNames(): Observable<string[]> {
    return this.getSchema().pipe(map(schema => Object.keys(schema.tables)));
  }

  /**
   * Returns the schema for a single database table.
   * The returned value is automatically cached.
   * @returns An observable containing the database schema.
   */
  getTableSchema(tableName: string): Observable<SchemaTable> {
    return this.getSchema().pipe(map(schema => schema.tables[tableName]));
  }

  getTableData(tableName: string): Observable<any> {
    return this.apiService.get<any>(`db/${tableName}`);
  }
}
