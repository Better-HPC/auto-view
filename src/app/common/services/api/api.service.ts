import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class APIService {

  private baseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Send a GET request to the API.
   * @param endpoint The API endpoint (relative to the base URL).
   * @param options Optional settings such as headers or query parameters.
   */
  get<T>(endpoint: string, options?: { headers?: HttpHeaders; params?: HttpParams }): Observable<T> {
    return this.http.get<T>(this.buildUrl(endpoint), options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Send a POST request to the API.
   * @param endpoint The API endpoint.
   * @param data The data to send in the request body.
   * @param options Optional settings such as headers.
   */
  post<T>(endpoint: string, data: any, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.http.post<T>(this.buildUrl(endpoint), data, options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Send a PUT request to the API.
   * @param endpoint The API endpoint.
   * @param data The data to update.
   * @param options Optional settings such as headers.
   */
  put<T>(endpoint: string, data: any, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.http.put<T>(this.buildUrl(endpoint), data, options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Send a PATCH request to the API.
   * @param endpoint The API endpoint.
   * @param data The data to update.
   * @param options Optional settings such as headers.
   */
  patch<T>(endpoint: string, data: any, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.http.patch<T>(this.buildUrl(endpoint), data, options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Send a DELETE request to the API.
   * @param endpoint The API endpoint.
   * @param options Optional settings such as headers or query parameters.
   */
  delete<T>(endpoint: string, options?: { headers?: HttpHeaders; params?: HttpParams }): Observable<T> {
    return this.http.delete<T>(this.buildUrl(endpoint), options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Resolve an API endpoint against the base URL.
   * @param endpoint The endpoint relative to the base URL.
   */
  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }

  /**
   * Handle HTTP errors.
   * @param error The error response.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error("APIService Error:", error);
    return throwError(() => new Error("An error occurred while processing the request."));
  }
}
