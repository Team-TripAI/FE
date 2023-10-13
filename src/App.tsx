import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TestPage from "./pages/TestPage.tsx";
import MainPage from "./pages/MainPage.tsx";
import Header from "./components/Layout/Header.tsx";
import Footer from "./components/Layout/Footer.tsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
