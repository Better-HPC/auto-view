import { Component } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatToolbar } from "@angular/material/toolbar";
import { RouterOutlet } from "@angular/router";

import { VersionTag } from "../../common/components/version-tag/version-tag.component";

@Component({
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatToolbar,
    RouterOutlet,
    VersionTag,
  ],
  templateUrl: "menu-bar-layout.component.html",
  styleUrl: "menu-bar-layout.component.scss"
})
export class MenuBarLayoutComponent {
  title = "Auto View";
}
