import { Route, Routes } from "react-router-dom";
import OrderFormPage from "./pages/OrderFormPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function App() {
  // TODO: add theme switcher
  const { theme } = useTheme();

  return (
    <ThemeProvider>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/order-form" element={<OrderFormPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
