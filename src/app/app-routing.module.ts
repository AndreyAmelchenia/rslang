import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes } from "@angular/router";

const appRoutes: Routes = [
  { path: "", redirectTo: "/", pathMatch: "full" }, 
  { path: "" }
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class AppRoutingModule {}
