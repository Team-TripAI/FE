import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage.tsx';
import Header from './components/Layout/Header.tsx';
import Footer from './components/Layout/Footer.tsx';
import BudgetMainPage from './pages/budget/BudgetMainPage.tsx';
import BudgetInputPage from './pages/budget/BudgetInputPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import ImagePage from './pages/ImagePage.tsx';
import { RecoilRoot } from 'recoil';

function App() {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Navigate to="/main" />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/imageplace" element={<ImagePage />} />
                    <Route path="/budget" element={<BudgetMainPage />} />
                    <Route path="/budget/input" element={<BudgetInputPage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </RecoilRoot>
    );
}

export default App;
