import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import { APIService } from "../api/api.service";

@Injectable({
  providedIn: "root"
})
export class DataService {

  constructor(private apiService: APIService) {}

  /**
   * Fetch the application version number from the API.
   * @returns An observable containing the version string.
   */
  getVersion(): Observable<string> {
    const endpoint = "meta/app";
    return this.apiService.get<{ version: string }>(endpoint).pipe(
      map(response => response.version)
    );
  }

}
