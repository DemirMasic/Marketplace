import Categories from "./Categories";
import CreateCategory from "./CreateCategory";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./test";

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