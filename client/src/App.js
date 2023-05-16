import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from "./components/ErrorPage/Error";
import SignUp from "./components/auth/signup/signup";
import LoginPage from "./components/auth/login/login";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import TwoFactorAuthPage from "./components/auth/2fa/2fa";
import ResetPasswordPage from "./components/auth/reset";
import ChangePinPage from "./components/auth/reset/changePin";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/2fa" element={<TwoFactorAuthPage />} />
          <Route path="/resetPassword" element={<ResetPasswordPage />} />
          <Route path="/changePin" element={<ChangePinPage />} />

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
