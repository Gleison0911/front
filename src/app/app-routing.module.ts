import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { MedalListComponent } from './components/medal-list/medal-list.component';
import { RulesListComponent } from './components/rules-list/rules-list.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {
    path: "",
    component: CategoryListComponent
  },
  {
    path: "category",
    component: CategoryListComponent
  },
  {
    path: "medal",
    component: MedalListComponent
  },
  {
    path: "rules",
    component: RulesListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
