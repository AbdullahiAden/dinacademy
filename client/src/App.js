import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/Home/HomePage";
import LoginPage from "./Pages/login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
