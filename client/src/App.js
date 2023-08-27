import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/Home/HomePage";
import LoginPage from "./Pages/login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
