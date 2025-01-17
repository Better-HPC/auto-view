import { Component, Input, OnInit } from "@angular/core";

/**
 * A generic error page presenting the user with an error code and status message.
 * The error code is determined using inputs which can be set via binding to the
 * router state. Default status messages are provided for common HTTP errors.
 */
@Component({
  standalone: true,
  selector: "app-error-page",
  templateUrl: "error-page.component.html"
})
export class ErrorPageComponent implements OnInit {
  @Input() errorCode!: string;
  @Input() errorDescription!: string;

  private defaultDescription = "An unexpected error occurred.";
  private errorCodeDescriptions: { [code: string]: string } = {
    "400": "The server received a bad request.",
    "401": "You need to log in to access this page.",
    "403": "You don't have permission to view this page.",
    "404": "We couldn't find the page you're looking for.",
    "405": "The request method is not allowed for the requested resource.",
    "408": "The server timed out while handling your request.",
    "418": "Tea kettle services are temporarily offline.",
    "429": "Too many requests have been made in a given amount of time.",
    "500": "Something went wrong on our end. Please try again later.",
    "503": "The service is currently unavailable. Please check back soon.",
    "504": "The server timed out while waiting for an upstream resource."
  };

  @Input("errorCode")
  private set _errorCode(errorCode: string) {
    this.errorCode = errorCode || "404";
  }

  ngOnInit(): void {
    this.errorDescription ||= this.errorCodeDescriptions[this.errorCode] || this.defaultDescription;
  }
}
