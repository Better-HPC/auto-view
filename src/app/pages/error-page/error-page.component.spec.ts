import { TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";

import { ErrorPageComponent } from "./error-page.component";

describe("ErrorPageComponent", () => {
  let component: ErrorPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
