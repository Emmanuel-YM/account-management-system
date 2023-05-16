import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from "./components/ErrorPage/Error";
import SignUp from "./components/auth/signup/signup";
import LoginPage from "./components/auth/login/login";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import TwoFactorAuthPage from "./components/auth/2fa/2fa";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/2fa" element={<TwoFactorAuthPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute path="/dashboard" element={<Dashboard />} />
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
