import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipesResolverService } from './recipes-resolver.service';

const recipeRoutes: Routes = [
  {path:'', component:RecipesComponent,resolve: [RecipesResolverService], children: [
    {path:'', component:RecipeStartComponent},
    {path:'new', component:RecipeEditComponent, canActivate: [AuthGuard]},
    {path:':id', component:RecipeDetailsComponent, resolve: [RecipesResolverService]},
    {path:':id/edit', component:RecipeEditComponent, resolve: [RecipesResolverService],canActivate: [AuthGuard]},
    {path:'**', redirectTo:'/page-not-found'}
  ]}
];

@NgModule({
  imports:[
    RouterModule.forChild(recipeRoutes)
  ],
  exports:[RouterModule]
})
export class RecipeRoutingModule {}