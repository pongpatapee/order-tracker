import { Route, Routes } from "react-router-dom";
import OrderFormPage from "./pages/OrderFormPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/order-form" element={<OrderFormPage />} />
      </Routes>
    </>
  );
}

export default App;
