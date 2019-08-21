import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient("Apples", 10),
        new Ingredient("Lemons", 20)
      ];

    getIngredient(){
        return this.ingredients.slice();
    }
    
    getEditIngredient(index:number) {
        return this.ingredients[index];
    }

    addToIngredientList(shoppingList:Ingredient){
        this.ingredients.push(shoppingList);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    editedIngredient(index:number, newIngredient:Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index:number) {
        this.ingredients.splice(index,1);
        this.ingredientChanged.next(this.ingredients.slice());
    }
    
}