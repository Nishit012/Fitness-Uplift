import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const NutritionAndDietPlans = () => {
  const [dietPlans, setDietPlans] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    const fetchDietPlans = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/nutrition/diet-plans/',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }); // Adjust the endpoint as needed
        setDietPlans(response.data);
      } catch (error) {
        console.error('Error fetching diet plans:', error);
      }
    };
    fetchDietPlans();
  }, []);

  return (
    <>
    <div className="nutrition-container">
      <h1>Nutrition and Diet Plans</h1>
      {dietPlans.length > 0 ? (
        dietPlans.map((plan) => (
          <div key={plan.id} className="diet-plan">
            <h2>{plan.title}</h2>
            <h3>Nutritional Information</h3>
            <ul>
              {plan.meals.map((meal) => (
                <li key={meal.id}>
                  <strong>{meal.name}:</strong> 
                  <pre>{meal.nutritionInfo}</pre>
                </li>
              ))}
            </ul>
            <h3>Recipe</h3>
            <p>{plan.recipe}</p>
          </div>
        ))
      ) : (
        <p>No diet plans available.</p>
      )}
    </div>
    <button id="homebb" onClick={()=>{navigate('/')}}>Home</button>
    </>
  );
};

export default NutritionAndDietPlans;
