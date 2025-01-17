import { AsyncPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { DataService } from "~services/data/data.service";

@Component({
  standalone: true,
  selector: "app-version-tag",
  templateUrl: "version-tag.component.html",
  imports: [
    AsyncPipe
  ],
})
export class VersionTag implements OnInit {
  version$!: Observable<string>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.version$ = this.dataService.getVersion();
  }
}
