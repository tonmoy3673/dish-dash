// ============ mealCategory ==========//
export interface MealCategoryType {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

// ============ MealCategoryResponse ==========//
export interface MealCategoryResponse{
    categories: MealCategoryType[];
}


