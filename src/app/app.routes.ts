import { Routes } from "@angular/router";

import { CenterLayoutComponent } from "./layouts/center-layout/center-layout.component";
import { MenuBarLayoutComponent } from "./layouts/menu-bar-layout/menu-bar-layout.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { TableDetailPageComponent } from "./pages/table-detail-page/table-detail-page.component";
import { TableSelectPageComponent } from "./pages/table-select-page/table-select-page.component";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "app",
  }, {
    path: "login",
    component: CenterLayoutComponent,
    children: [
      {path: "", component: LoginPageComponent},
    ]
  }, {
    path: "app",
    component: MenuBarLayoutComponent,
    children: [
      {path: "", component: TableSelectPageComponent},
      {path: ":tableName", component: TableDetailPageComponent},
    ]
  }
];
