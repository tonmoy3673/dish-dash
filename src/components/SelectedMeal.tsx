interface SelectedMealProps {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

interface SelectedMealData{
    meal:SelectedMealProps
}

const SelectedMeal = ({ meal }:SelectedMealData) => {
  console.log("selectedMeal", meal);
  return <div>Selected Meals : {meal.idMeal}</div>;
};

export default SelectedMeal;
