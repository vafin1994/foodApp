import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipesService} from "../recipes.service";
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipesService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  private initForm() {
    let recipeName: string = '';
    let recipeDescription: string = '';
    let recipeImagePath: string = '';
    let ingredients: FormArray = new FormArray([])
    if (this.editMode) {
      const recipe: Recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          ingredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, [Validators.required]),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.min(1)])
          }))
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required]),
      'description': new FormControl(recipeDescription, [Validators.required]),
      'imagePath': new FormControl(recipeImagePath, [Validators.required]),
      'ingredients': ingredients
    })
  }

  addIngredient() {
    this.ingredientControls.push(new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'amount': new FormControl('', [Validators.required, Validators.min(1)])
    }))
  }

  submitForm() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // )
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onCancel();
  }

  get ingredientControls() {
    return (<FormArray>this.recipeForm.get('ingredients'));
  }

  deleteIngredient(index: number){
    this.ingredientControls.removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  protected readonly onsubmit = onsubmit;
}
