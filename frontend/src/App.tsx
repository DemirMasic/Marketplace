import Categories from "./views/Categories";
import CreateCategory from "./views/CreateCategory";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./views/Test";

export default function App() {
  
  return (
    <>
    
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/create" element={<CreateCategory />}>
          <Route path="car" element={<Categories />} />
          <Route path="bike" element={<Test />} />
        </Route>
        <Route path="/contact" element={<Test />} />
      </Routes>
    </BrowserRouter>
    </>
    
  );
}