import React from "react";
import aboutimage from "../images/about.png"
function About() {
    return (
        <div id="about">
            <div className="about-image">
                <img src={aboutimage} alt="" />
            </div>
            <div className="about-text">
                <h1>LEARN ABOUT US</h1>
                <p>At our Fitness Uplift, we’re dedicated to helping you achieve your fitness goals, no matter the season! This winter, we’re committed to providing a warm and welcoming environment where you can focus on your health and wellness.
<br />
<br />
Our experienced trainers are here to guide you through personalized fitness programs tailored to your needs. We offer a variety of classes, from high-energy workouts to calming yoga sessions, ensuring there’s something for everyone.
<br />
<br />
Join us and discover a community that supports and motivates you to stay active and engaged, even when the weather gets chilly. Together, we’ll make this winter your healthiest season yet!</p>
                <button>READ MORE</button>
            </div>
        </div>
    )
}
export default About;