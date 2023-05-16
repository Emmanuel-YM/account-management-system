import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./components/ErrorPage/Error";
import SignUp from "./components/auth/signup/signup";
import LoginPage from "./components/auth/login/login";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/signUp" element={<SignUp />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
