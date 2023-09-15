import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/Home/HomePage";
import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";
import Navbar from "./components/navbar/Navbar";

// for showing error messages
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Watch from "./Pages/Watch/Watch";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <ToastContainer
        autoClose={900}
        toastStyle={{ backgroundColor: "#00b2fe" }}
      />
      <Routes>
        <Route index element={<HomePage />} />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/watch" element={<Watch />} />
      </Routes>
    </div>
  );
}

export default App;
