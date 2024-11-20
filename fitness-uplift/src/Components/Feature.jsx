import React from "react";
import Featurebox from "./Featurebox";
import fimage1 from "../images/1.svg";
import fimage2 from "../images/2.svg";
import fimage3 from "../images/3.svg";
import fimage4 from "../images/4.svg";
import { Link } from "react-router-dom";
function Feature(){
    return(
        <div id="features">
            <h1>FEATURES</h1>
            <div className="a-container">
                <Link to="/workouts"><Featurebox image={fimage1} title="Workout Plans"/></Link>
                <Link to="/nutrions"><Featurebox image={fimage2} title="Nutriens Meals"/></Link>
                <Link to="/activity"><Featurebox image={fimage3} title="Activity Tracking"/></Link>
                <Link to="/bmi"><Featurebox image={fimage4} title="BMI Genrator"/></Link>
            </div>
        </div>
    )
}
export default Feature;