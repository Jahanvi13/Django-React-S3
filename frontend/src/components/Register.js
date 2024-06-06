import React, { useState } from 'react';
import './Register.css';


const MyForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:8000/api/newregister/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
  
    return (
      <div className="register-container">
          <form className="register-form" onSubmit={handleSubmit}>
              <h2>Register</h2>
              <div>
                  <label>
                      Name:
                      <input type="text" name="name" value={formData.name} onChange={handleChange} />
                  </label>
              </div>
              <div>
                  <label>
                      Email:
                      <input type="email" name="email" value={formData.email} onChange={handleChange} />
                  </label>
              </div>
              <div>
                  <label>
                      Password:
                      <input type="password" name="password" value={formData.password} onChange={handleChange} />
                  </label>
              </div>
              <button type="submit">Register</button>
          </form>
      </div>
  );
};

  
export default MyForm;