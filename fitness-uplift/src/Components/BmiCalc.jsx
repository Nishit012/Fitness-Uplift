import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported
import Navbar from "./Navbar";
import { saveAs } from "file-saver"; // Import file-saver
import { useNavigate } from "react-router-dom";

const BmiCalc = () => {
  const [form, setForm] = useState({
    name: "",
    height: 0,
    weight: 0,
  });
  const navigate = useNavigate();
  const [bmiResult, setBmiResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error

    try {
      const response = await axios.post("http://localhost:8000/api/bmi/", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setBmiResult(response.data); // Set the result from the response

      // Save the result as a text file
      const blob = new Blob([`Name: ${form.name}\nHeight: ${form.height} cm\nWeight: ${form.weight} kg\nYour BMI is: ${response.data.bmi_value}\nBMI Category: ${response.data.bmi_category}\nCreated At: ${response.data.created_at}`], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `${form.name}_bmi_result.txt`);

    } catch (error) {
      setError("An error occurred while calculating BMI."); // Handle error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (bmiResult) {
      console.log("BMI Result:", bmiResult);
    }
  }, [bmiResult]);

  return (
    <>
      <div className="bmi-calc-container">
        <form onSubmit={handleForm}>
          Name:
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
          />
          Height:
          <input
            type="number"
            name="height"
            placeholder="Enter Height (in cm)"
            value={form.height}
            onChange={handleChange}
          />
          Weight:
          <input
            type="number"
            name="weight"
            placeholder="Enter Weight (in kg)"
            value={form.weight}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Calculating...' : 'Calculate'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {bmiResult && (
          <div>
            <p>Your BMI is: {bmiResult.bmi_value.toFixed(2)}</p>
            <p>BMI Category: {bmiResult.bmi_category}</p>
            <p>Record Created At: {new Date(bmiResult.created_at).toLocaleString()}</p>
          </div>
        )}
      </div>
      <button id="homebb" onClick={() => { navigate('/') }}>Home</button>
    </>
  );
};

export default BmiCalc;
