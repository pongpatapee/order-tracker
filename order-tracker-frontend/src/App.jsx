import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import OrdersPage from "./pages/OrdersPage";

function App() {
  // TODO: add theme switcher
  const { theme } = useTheme();

  return (
    <ThemeProvider>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
