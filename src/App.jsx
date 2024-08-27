import { useState , useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import Register from "./components/Register";
import Login from "./components/Login";
import AddMedicineFormAndList from "./components/AddMedicineFormAndList";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromStorage, logout } from './store/authSlice';
import Home from "./components/Home";
import MedicineView from "./components/MedicineView";

function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);
  return (
    <>
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home/>
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <AboutUs />
                </>
              }
            />
            <Route
              path="/register"
              element={
                <>
                  <Register />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <Login />
                </>
              }
            />
            <Route
            path="/add"
            element={
              user ? (
                <AddMedicineFormAndList />
              ) : (
                <Login/>
              )
            }
          />
          <Route
            path="/add/view/:id"
            element={
              user ? (
                <MedicineView/>
              ) : (
                <Login/>
              )
            }
          />
          </Routes>
        </BrowserRouter>
      </>
    </>
  );
}

export default App;
