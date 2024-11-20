import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WorkoutPlans = () => {
  const [level, setLevel] = useState('beginner');
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/workout-plans/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (response.status === 200) {
          setWorkoutPlans(response.data);
        } else {
          console.error('Error fetching workout plans');
        }
      } catch (error) {
        console.error('Failed to fetch workout plans', error);
      }
      setLoading(false);
    };

    fetchWorkoutPlans();
  }, [level]);

  const getEmbedId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/);
    return match ? match[1] : null;
  };

  return (
    <>
      <div className="workout-container">
        <h2>Personalized Workout Plans</h2>
        <div className="level-selector">
          <label>Select Difficulty Level: </label>
          <select value={level} onChange={handleLevelChange}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="workout-list">
            {workoutPlans.length > 0 ? (
              workoutPlans.map((workout, index) => (
                workout.difficulty === level && (
                  <div key={index} className="workout-item">
                    <pre>

                    {getEmbedId(workout.video_url) && (
                      <iframe 
                      src={`https://www.youtube.com/embed/${getEmbedId(workout.video_url)}`} 
                      title={workout.name} 
                      className="video-iframe" 
                      frameBorder="0" 
                      allowFullScreen 
                      ></iframe>
                    )}<h2>{workout.name}</h2>
                    </pre>
                  </div>
                )
              ))
            ) : (
              <p>No workouts available for this level.</p>
            )}
          </div>
        )}
      </div>
      <button id="homebb" onClick={() => { navigate('/') }}>Home</button>
    </>
  );
};

export default WorkoutPlans;
