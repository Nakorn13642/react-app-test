import React from "react";
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";

import { Toaster } from 'react-hot-toast';
//redux setup
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers/index";
import { createStore, applyMiddleware } from "redux";
// redux thunk
import thunk from "redux-thunk";

import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import UserPage from "./pages/UserPage";
import PrivateRoute from "./guard/auth";
import ReportPage from "./pages/ReportPage";

// create store
// const store = createStore(rootReducer);
const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {

  return (
    <>
    <Provider store={store}>
      <Router>
      <Toaster />
        <Menu />
          <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route path="/about">
                <AboutPage />
            </Route>
            <Route path="/login">
                <LoginPage />
            </Route>

            <Route 
              path="/dashboard"
              render = {
                ({ match: {url} }) => (
                  <>
                    <Switch>
                    <PrivateRoute path={`${url}/`} exact>
                      <DashboardPage />
                    </PrivateRoute>
                    <PrivateRoute path={`${url}/user`} >
                      <UserPage />
                    </PrivateRoute>
                    <PrivateRoute path={`${url}/report`} >
                      <ReportPage />
                    </PrivateRoute>
                    {/* <Route path={`${url}/*`}>
                      <NotFoundPage />
                    </Route> */}
                    </Switch>
                  </>
                )
              }
            >
            </Route>

            <Route path="*">
                <NotFoundPage />
            </Route>
          </Switch>
        <Footer />
      </Router>
    </Provider>
    </>
  );
};

export default App;
