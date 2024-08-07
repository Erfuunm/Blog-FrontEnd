
import './App.css';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

// Import Pages

import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import Profile from "./pages/Profile";

// Import components

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Articles from './components/Articles/Articles';
import { AddArticle, EditArticle, Navbar, ViewArticle } from './components';

// Import Contexts

import UserProvider from "./Context/UserProvider";
import FlashProvider from './Context/FlashProvider'
import ApiProvider from "./Context/ApiProvider";
import ArticlesProvider from "./Context/ArticlesProvider";

const App = () => {


  return (
    <div className="App " >
      <FlashProvider>
        <ApiProvider>
          <UserProvider>
            <ArticlesProvider>

              <Routes>
                <Route path="/login" element={
                  <PublicRoute><LoginPage /></PublicRoute>} />

                <Route path="/register" element={
                  <PublicRoute><RegistrationPage /></PublicRoute>} />

                <Route path="*" element={
                  <PrivateRoute>
                    <Navbar />
                    <Routes>
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/articles" element={<Articles />} />
                      <Route path="/articles/add" element={<AddArticle />} />
                      <Route path="/articles/:articleId" element={<ViewArticle />} />
                      <Route path="/articles/edit/:articleId" element={<EditArticle />} />
                      <Route path="*" element={<Navigate to="/articles" />} />
                    </Routes>
                  </PrivateRoute>
                } />
              </Routes>

            </ArticlesProvider>
          </UserProvider>
        </ApiProvider>
      </FlashProvider>


    </div>


  );
}

export default App;
