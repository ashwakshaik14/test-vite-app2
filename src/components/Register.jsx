import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import left2 from '../assets/left2.png';
import bottom2 from '../assets/bottom2.png';
import right2 from '../assets/right2.png';
import { FcGoogle } from "react-icons/fc";
import { IoArrowBack } from "react-icons/io5";
import style from '../style/Lr.module.css';

function Register() {
  // Calling useNavigate inside the function component
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    Username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate passwords only if both fields have values
    if (name === "confirmPassword" || name === "password") {
      if (formData.password && formData.confirmPassword) {
        if (formData.password !== value && name === "confirmPassword") {
          setError(true);
        } else if (name === "password" && value !== formData.confirmPassword) {
          setError(true);
        } else {
          setError(false);
        }
      }
    }
  };

  const handleRegi = async (e) => {
    e.preventDefault();
  
    // Log formData before sending the request
    console.log("Form Data:", formData);
  
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError(true);
      return;
    }
    setError(false);
  
    try {
      const response = await fetch("https://test-vite-app1.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.Username, // Ensure `name` is passed correctly
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("Registered successfully");
        navigate("/login"); // Optionally, navigate to the login page after successful registration
      } else {
        console.log("Error Response:", result);
        alert(result.message || "Registration failed!");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      alert("Registration failed!");
    }
  };
  

  // Function to navigate back to the previous page
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <>
      <div className={style.ch}>

      <button className={style.back} onClick={handleGoBack}>
        <IoArrowBack />
      </button>
      <div>
        <img className={style.left2} src={left2} alt="left2" />
        <img className={style.bottom2} src={bottom2} alt='bottom2' />
        <img className={style.right2} src={right2} alt='right2' />
      </div>

      <div className={style.loginContainer}>
        <form onSubmit={handleRegi} className={style.loginForm}>
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            id="Username"
            name="Username"
            placeholder="Enter a Username"
            value={formData.Username}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
          />

          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="confirmPassword"
              style={{ color: error ? "red" : "#fff" }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                borderColor: error ? "red" : "#c4c4c4",
                outlineColor: error ? "red" : "black",
              }}
            />
          </div>

          {error && handleRegi && (
            <p style={{ color: "red", marginTop: "-10px" }}>
              Enter the same passwords in both fields.
            </p>
          )}

          <button type="submit" className={style.loginButton}>
            Sign Up
          </button>

          <div className={style.orSeparator}>OR</div>

          <button type="button" className={style.googleButton}>
            <div className={style.icon}><FcGoogle /></div>Sign Up with Google
          </button>
        </form>

        <p className={style.registerText}>
          Already have an account? <a href="/login">&nbsp;Login now</a>
        </p>
      </div>
      </div>
      
    </>
  );
}

export default Register;
