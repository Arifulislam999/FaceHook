import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Logoptions/Login";
import Registation from "./components/Logoptions/Registation";
import { Profile } from "./components/Profile/Profile";
import Notifications from "./components/Notifications/Notifications";
import Header from "./components/Home/Header";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route
              element={
                <>
                  <Header />
                  <Profile />
                </>
              }
              path="/profile/:id"
            />
            <Route
              element={
                <>
                  <Header />
                  <Home />
                </>
              }
              path="/"
              exact
            />
            <Route
              element={
                <>
                  <Header />
                  <Notifications />
                </>
              }
              path="/notifications"
            />
          </Route>
          <Route element={<Login />} path="/login" />
          <Route element={<Registation />} path="/registation" />
        </Routes>
      </Router>
    </>
  );
}

export default App;

// https://github.com/Learn-with-Sumit/rnext/tree/5.21
