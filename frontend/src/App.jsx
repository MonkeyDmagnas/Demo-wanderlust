import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ui/ScrollToTop";
import HomePage from "./Pages/HomePage";
import Signin from "./Pages/SignInPage";
import UnprotectedRoute from "./Routes/UnProtectedRoute";
import AddBlog from "./Pages/AddBlog";
import DetailsPage from "./Pages/DetailsPage";
import Signup from "./Pages/Signup";
import NotFound from "./Pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <div className="flex min-h-screen flex-col">
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="details-page/:title/:postId" element={<DetailsPage />} />

            <Route element={<UnprotectedRoute />}>
              <Route path="signin" element={<Signin />} />
              <Route path="signup" element={<Signup />} />
            </Route>
            <Route path="add-blog" element={<AddBlog />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
