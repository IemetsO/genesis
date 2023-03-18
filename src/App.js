import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/HomePage";
import Course from "./pages/Course/CoursePage"

import { Provider } from 'react-redux';
import { store } from './redux/store';
import './App.css';
import { logIn } from "./redux/auth/operations";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(logIn());
  // }, [dispatch]);
  return (
    <div className="App">
       <Provider store={store}>
        
     
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:Id" element={<Course />} />
       
      </Routes>
   
      </Provider>
    </div>
  );
}

export default App;
