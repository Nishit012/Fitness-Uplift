import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
Chart.register(...registerables); // Register all components

const ActivityVisualization = () => {
  const [date, setDate] = useState('');
  const [steps, setSteps] = useState('');
  const [calories, setCalories] = useState('');
  const [workoutDuration, setWorkoutDuration] = useState('');
  const [dataPoints, setDataPoints] = useState([]);
  const navigate = useNavigate();
  // Set default date to today's date in YYYY-MM-DD format
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = new Date(date).toISOString().split('T')[0];
    
    const userData = {
      date: formattedDate,
      steps: Number(steps),
      calories: Number(calories),
      workout_Duration: Number(workoutDuration),
    };
    console.log(userData)

    try {
      const response = await axios.post('http://localhost:8000/api/activity/log_activity/', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data); // Log the response data
      setDataPoints([...dataPoints, userData]);
      clearForm();
    } catch (error) {
      console.error('Error logging activity:', error.response.data); // Log the error response
    }
    
  };

  const clearForm = () => {
    setSteps('');
    setCalories('');
    setWorkoutDuration('');
  };

  const chartData = {
    labels: dataPoints.map(point => point.date),
    datasets: [
      {
        label: 'Steps',
        data: dataPoints.map(point => point.steps),
        backgroundColor: 'rgba(75,192,192,0.5)',
      },
      {
        label: 'Calories Burned',
        data: dataPoints.map(point => point.calories),
        backgroundColor: 'rgba(255,99,132,0.5)',
      },
      {
        label: 'Workout Duration (min)',
        data: dataPoints.map(point => point.workoutDuration),
        backgroundColor: 'rgba(255,206,86,0.5)',
      },
    ],
  };

  return (
    <>
    <div>
      <h2>Daily Activity Tracking</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Steps:</label>
          <input
            type="number"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Calories Burned:</label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Workout Duration (min):</label>
          <input
            type="number"
            value={workoutDuration}
            onChange={(e) => setWorkoutDuration(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {dataPoints.length > 0 && <Bar data={chartData} />}
    </div>
    <button id="homebb" onClick={() => { navigate('/') }}>Home</button>
    </>
  );
};

export default ActivityVisualization;
