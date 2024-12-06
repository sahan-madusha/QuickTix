import React from "react";
import "./index.css";
import "antd/dist/reset.css";
import "react-toastify/dist/ReactToastify.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { AuthPage, BookTicket, Dashboard, HomePage, Loginsuccess } from "./Page";
import { AUTHPAGE, BOOKTICKET, DASHBOARD, HOMEPAGEURL, LOGINSUCCESS } from "./Constant";
import { Footer, ScrollUpButton } from "./Components";
import { ToastContainer } from "react-toastify";
import NavigationBar from "./Components/Nav-bar/Nav-Bar";
import { AuthProvider } from "./Context";

function App() {
  return (
    <div>
      <AuthProvider>
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
                    <Route path={LOGINSUCCESS} element={<Loginsuccess />} />
                    <Route path={DASHBOARD} element={<Dashboard />} />
                    <Route path={BOOKTICKET} element={<BookTicket />} />
                  </Routes>
                  <ScrollUpButton />
                  <ToastContainer />
                  <Footer />
                </>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
