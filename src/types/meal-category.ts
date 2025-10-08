// ============ mealCategory ==========//
export interface MealCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

// ============ MealCategoryResponse ==========//
export interface MealCategoryResponse{
    categories: MealCategory[];
}


