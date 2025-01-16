import { AsyncPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";

import { DataService } from "../../services/data/data.service";

@Component({
  standalone: true,
  selector: "app-version-tag",
  imports: [
    AsyncPipe
  ],
  templateUrl: "version-tag.component.html",
})
export class VersionTag implements OnInit {
  version$: Observable<string> = of("");

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.version$ = this.dataService.getVersion();
  }
}
