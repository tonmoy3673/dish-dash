import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Feedback from "./pages/Feedback";
import "./index.css";
import MealType from "./components/MealType";
import SingleMeal from "./components/SingleMeal";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="feedback" element={<Feedback />}></Route>
        <Route path="mealCategories/:strCategory" element={<MealType/>}></Route>
        <Route path=":strCategory/:idMeal" element={<SingleMeal/>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
