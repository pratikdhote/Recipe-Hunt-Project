import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         "Pepperoni Pizza",
    //         "Classic Cheesy Pepperoni Pizza from Italy",
    //         "https://www.irishtimes.com/polopoly_fs/1.3668021.1539872262!/image/image.jpg_gen/derivatives/box_620_330/image.jpg",
    //         [
    //             new Ingredient("Pizza Dough", 1),
    //             new Ingredient("Pepperoni", 10),
    //             new Ingredient("Cheese", 1),
    //             new Ingredient("Pizza Sauce", 1)
    //         ]),
    //     new Recipe(
    //         "Chicken Biriyani",
    //         "Lip Smacking Biriyani from the Steets of India",
    //         "https://i2.wp.com/media.hungryforever.com/wp-content/uploads/2016/11/25174124/chettinad-chicken-biryani1.jpg?resize=1075%2C605&ssl=1",
    //         [
    //             new Ingredient("Basmati Rice Packs", 2),
    //             new Ingredient("Chicken Pieces", 20),
    //             new Ingredient("Biriyani Masala Packs", 1),
    //             new Ingredient("Onions", 3)
    //         ])
    //   ];

    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService){}  

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    } 

    getRecipe(index:number){
        return this.recipes[index];
    }
    
    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number) {
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
    }
}