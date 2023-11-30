import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage.tsx';
import Header from './components/Layout/Header.tsx';
import Footer from './components/Layout/Footer.tsx';
import BudgetMainPage from './pages/budget/BudgetMainPage.tsx';
import BudgetInputPage from './pages/budget/BudgetInputPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import ImagePage from './pages/ImagePage.tsx';
import MyPage from './pages/MyPage.tsx';
import Community from './pages/Community/Community.tsx';
import Post from './pages/Community/Post.tsx';
import { RecoilRoot } from 'recoil';
import Article from './pages/Community/Article.tsx';
import BudgetSelectPage from './pages/budget/BudgetSelectPage/BudgetSelectPage.tsx';
import { Budgets } from 'aws-sdk';
import MyArticle from './pages/Community/MyArticle.tsx';

function App() {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Navigate to="/main" />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/myArticle" element={<MyArticle />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/imageplace" element={<ImagePage />} />
                    <Route path="/budget">
                        <Route index element={<BudgetMainPage />} />
                        <Route path="/budget/input" element={<BudgetInputPage />} />
                        <Route path="/budget/select" element={<BudgetSelectPage />} />
                    </Route>
                    <Route path="/community">
                        <Route index element={<Community />} />
                        <Route path=":postId" element={<Article />} />
                        <Route path="post" element={<Post />} />
                    </Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </RecoilRoot>
    );
}
export default App;
