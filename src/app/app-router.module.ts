import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";

  const appRoutes = [
    {
      path: "",
      component: HomeComponent
    },
    {
      path: "character/:person",
      component: HomeComponent
    },
    {
      path: "**",
      redirectTo: ""
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}