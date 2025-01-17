import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import { APIService } from "~services/api/api.service";
import { AppMeta, Schema } from "~services/api/app.interface";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private schemaEndpoint = "meta/schema";
  private appEndpoint = "meta/app";

  constructor(private apiService: APIService) {}

  /**
   * Returns the application name.
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
   * Returns the database schema.
   * @returns An observable containing the database schema.
   */
  getSchema(): Observable<Schema> {
    return this.apiService.get<Schema>(this.schemaEndpoint);
  }

  /**
   * Fetch metadata about the application from the API.
   * @returns An observable containing the metadata object.
   */
  private getAppMeta(): Observable<AppMeta> {
    return this.apiService.get<AppMeta>(this.appEndpoint);
  }
}
