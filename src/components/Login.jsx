import left2 from "../assets/left2.png";
import bottom2 from "../assets/bottom2.png";
import right2 from "../assets/right2.png";
import { useState } from "react";
import style from "../style/Lr.module.css";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset error when fields are updated
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Make login API request
      const response = await fetch("https://test-vite-app1.onrender.com/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed!");
      }

      const data = await response.json();

      // Store email in localStorage
      localStorage.setItem("userEmail", JSON.stringify(formData.email));

      localStorage.setItem("authToken", data.token); // Save token if needed

      alert("Login successful!");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      console.error("Error during login:", err);
      setError(err.message || "An error occurred. Please try again.");
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
        <img className={style.bottom2} src={bottom2} alt="bottom2" />
        <img className={style.right2} src={right2} alt="right2" />
      </div>

      <div className={style.loginContainer}>
        <form onSubmit={handleLogin} className={style.loginForm}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            style={{
              borderColor: error && !formData.email ? "red" : "#c4c4c4",
              outlineColor: error && !formData.email ? "red" : "black",
            }}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            style={{
              borderColor: error && !formData.password ? "red" : "#c4c4c4",
              outlineColor: error && !formData.password ? "red" : "black",
            }}
          />

          {error && <p style={{ color: "red", marginTop: "-10px" }}>{error}</p>}

          <button type="submit" className={style.loginButton}>
            Log In
          </button>

          <div className={style.orSeparator}>OR</div>

          <button type="button" className={style.googleButton}>
            <div className={style.icon}>
              <FcGoogle />
            </div>
            Log In with Google
          </button>
        </form>

        <p className={style.registerText}>
          Don’t have an account? <a href="/register">&nbsp;Register now</a>
        </p>
      </div>      
    </div>

    </>
  );
}

export default Login;
