import React from "react";
import "./index.css";
import "antd/dist/reset.css";
import "react-toastify/dist/ReactToastify.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AuthPage, HomePage } from "./Page";
import { AUTHPAGE, HOMEPAGEURL } from "./Constant";
import {  Footer, ScrollUpButton  } from "./Components";
import { ToastContainer } from "react-toastify";
import NavigationBar from "./Components/Nav-bar/Nav-Bar";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Web Page Navigation */}
          <Route
            path="/*"
            element={
              <>
              <NavigationBar />
                <Routes>
                  <Route path={HOMEPAGEURL} element={<HomePage />} />
                  <Route path={AUTHPAGE} element={<AuthPage />} />
                </Routes>
                <ScrollUpButton />
                <ToastContainer />
                <Footer/>
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
