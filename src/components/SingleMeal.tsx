import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { SingleMealType } from "../types/meal-category.types";
import { getSingleMeal } from "../services/meal-category-service";
import Loader from "../hooks/useLoader";
import { UtensilsCrossed } from "lucide-react";

const SingleMeal = () => {
  const { idMeal } = useParams();
  const [singleMeal, setSingleMeal] = useState<SingleMealType | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // =============== loadSingleMeal ========/
  useEffect(() => {
    if (!idMeal) return;
    setLoading(true);
    const loadSingleMeal = async (idMeal: number): Promise<void> => {
      try {
        const response = await getSingleMeal(Number(idMeal));
        if (!response) {
          console.error("No Response Found");
          setError(`Network Error Found!`);
        } else {
          console.log("idMeal", response[0]);
          setSingleMeal(response[0]);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(`Failed to fetch Selected Meal ${err.message}`);
          throw new Error(`Failed to fetch Selected Meal ${err.name}`);
        } else {
          console.error(`Unknown Error Found!`);
          setError(`Unknown Error Found!`);
        }
      } finally {
        setLoading(false);
      }
    };

    loadSingleMeal(Number(idMeal));
  }, [idMeal]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!singleMeal)
    return <p className="text-gray-500 text-center">No meal found.</p>;
  const { strCategory, strInstructions, strMeal, strMealThumb, strTags } =
    singleMeal;

  return (
    <div>
      {/* ====== singleCard Container =========== */}
      <div className="flex flex-wrap bg-gray-100 py-15 bg-green-400">
        {/* ========== fool Image ======= */}

        <img
          className="object-cover mx-auto w-1/2 md:w-1/4 rounded-lg"
          src={strMealThumb ? strMealThumb : "Food Image"}
        />

        {/* ============== text body container ========== */}
        <div className="flex flex-col  bg-amber-400 w-1/2">
          <h2 className="flex gap-x-1 roboto text-xl md:text-3xl">
            <UtensilsCrossed size={30} className="text-amber-600" /> Dish{" "}
            <span className="text-amber-600 text-2xl md:text-4xl"> Dash</span>
          </h2>

          <h3 className="text-xl font-semibold text-gray-700">{strMeal}</h3>
        </div>
      </div>
    </div>
  );
};

export default SingleMeal;
