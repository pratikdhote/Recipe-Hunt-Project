import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm:NgForm; 
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editItem: Ingredient;
  
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index:number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editItem = this.shoppingListService.getEditIngredient(index);
        this.slForm.setValue({
          name:this.editItem.name,
          amount:this.editItem.amount
        });
      }
    )
  }

  onSubmit(form: NgForm){
    const editedList = new Ingredient(form.value.name,form.value.amount);
    // this.emitList.emit(editedList);
    if(this.editMode) {
      this.shoppingListService.editedIngredient(this.editItemIndex,editedList)
    } else {
      this.shoppingListService.addToIngredientList(editedList);
    }
    this.editMode = false;  
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
