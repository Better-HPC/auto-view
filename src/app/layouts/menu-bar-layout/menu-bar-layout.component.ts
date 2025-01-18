import { AsyncPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatToolbar } from "@angular/material/toolbar";
import { RouterLink, RouterOutlet } from "@angular/router";

import { Observable } from "rxjs";

import { VersionTag } from "~components/version-tag/version-tag.component";
import { DataService } from "~services/data/data.service";

@Component({
  standalone: true,
  selector: "app-menu-bar-layout",
  templateUrl: "menu-bar-layout.component.html",
  styleUrl: "menu-bar-layout.component.scss",
  imports: [
    AsyncPipe,
    MatIcon,
    MatIconButton,
    MatToolbar,
    RouterOutlet,
    VersionTag,
    RouterLink,
  ],
})
export class MenuBarLayoutComponent implements OnInit {
  public title$!: Observable<string>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.title$ = this.dataService.getTitle();
  }
}
