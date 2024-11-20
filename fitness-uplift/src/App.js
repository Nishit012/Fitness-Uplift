import React from "react";
import Home from "./Components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import { Signup } from "./Components/Signup";
import { Profile } from "./Components/Profile";
import WorkoutPlans from "./Components/WorkoutPlan";
import NutritionAndDietPlans from "./Components/NutritionAndDietPlans";
import ActivityVisualization from "./Components/ActivityVisualization";
import BmiCalc from "./Components/BmiCalc";
import Feature from "./Components/Feature";




function App() {
  return (
    
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/features" element={<Feature />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/workouts" element={<WorkoutPlans/>}/>
        <Route path="/nutrions" element={<NutritionAndDietPlans/>}/>
        <Route path="/activity" element={<ActivityVisualization/>}/>
        <Route path="/bmi" element={<BmiCalc/>}/>
      </Routes>
    </div>
    </Router>
    
  );
}

export default App;
