import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./components/ErrorPage/Error";
import SignUp from "./components/auth/signup/signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
