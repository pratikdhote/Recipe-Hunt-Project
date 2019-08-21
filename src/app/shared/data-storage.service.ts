import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  isLoading = false;  

  constructor(private httpClient:HttpClient, 
              private recipeService: RecipeService,
              private authService: AuthService){}

  storeRecipes() {
    return this.httpClient.put('https://recipehunt.firebaseio.com/recipes.json',
    this.recipeService.getRecipes());
  }

  getRecipes() {
      this.isLoading = true;
    return  this.httpClient.get<Recipe[]>('https://recipehunt.firebaseio.com/recipes.json')
      .pipe(
        map( recipes => {                                                        //the map() in this line is rxjs operator
          return recipes.map(recipe => {                                         //the map here is normal js array method map() on a array(recipes). both have same name but are different function.
            return {
              ...recipe,                                                         //here we use spread operator to copy all the properties of this recipe to this object 
              ingredients: recipe.ingredients ? recipe.ingredients : []          //here we use ternary operator 
            };
          });
        }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
            this.isLoading = false;
        })
      )
        //---------------OR------------------
        // .pipe(map(
        //     (recipes) => {
        //         for(let recipe of recipes) {
        //             if(!recipe['ingredients']){
        //                 console.log(recipe);
        //                 recipe['ingredients'] = [];
        //             }
        //         }
        //         return recipes;
        //     }
        // ))
  }

}