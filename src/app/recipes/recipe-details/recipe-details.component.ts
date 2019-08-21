import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  recipeDetails:Recipe;
  id:number;
  isAuth = false;
  private userSub: Subscription;

  constructor(private recipeService:RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      if(user) {
        this.isAuth = true
      }
    });


    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipeDetails = this.recipeService.getRecipe(this.id);
        }
      );
  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipeDetails.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}


