import { useState } from "react";
import style from "../style/settings.module.css";
import man from "../assets/man.png";
import lock from "../assets/lock.png";
import logout from "../assets/Logout.png";
import { useNavigate } from "react-router-dom"; // Import useNavigate


const Settings = () => {
   
  const navigate = useNavigate(); // Initialize useNavigate

  const [passwordVisible, setPasswordVisible] = useState({
    email: false,
    oldPassword: false,
    newPassword: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const toggleVisibility = (field) => {
    setPasswordVisible((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("https://test-vite-app1.onrender.com/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Details updated successfully");
      } else {
        alert(data.message || "Failed to update details");
      }
    } catch (err) {
      console.error("Error updating details:", err);
    }
  };

  return (
    <div className={style.settingsContainer}>
      <br />
      <h1 className={style.settingsTitle}>Settings</h1>
      <form onSubmit={handleUpdate} className={style.settingsForm}>
        <div className={style.inputGroup}>
          <img src={man} alt="man" />
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Name"
            onChange={handleInputChange}
          />
        </div>
        <div className={style.inputGroup}>
          <img src={lock} alt="lock" />
          <input
            type={passwordVisible.email ? "text" : "password"}
            name="email"
            value={formData.email}
            placeholder="Update Email"
            onChange={handleInputChange}
          />
          <button
            type="button"
            className={style.eyeButton}
            onClick={() => toggleVisibility("email")}
          >
            {passwordVisible.email ? "👁️" : "🙈"}
          </button>
        </div>
        <div className={style.inputGroup}>
          <img src={lock} alt="lock" />
          <input
            type={passwordVisible.oldPassword ? "text" : "password"}
            name="oldPassword"
            value={formData.oldPassword}
            placeholder="Old Password"
            onChange={handleInputChange}
          />
          <button
            type="button"
            className={style.eyeButton}
            onClick={() => toggleVisibility("oldPassword")}
          >
            {passwordVisible.oldPassword ? "👁️" : "🙈"}
          </button>
        </div>
        <div className={style.inputGroup}>
          <img src={lock} alt="lock" />
          <input
            type={passwordVisible.newPassword ? "text" : "password"}
            name="newPassword"
            value={formData.newPassword}
            placeholder="New Password"
            onChange={handleInputChange}
          />
          <button
            type="button"
            className={style.eyeButton}
            onClick={() => toggleVisibility("newPassword")}
          >
            {passwordVisible.newPassword ? "👁️" : "🙈"}
          </button>
        </div>
        <button type="submit" className={style.updateButton} onClick={()=>navigate("/login")}>
          Update
        </button>
      </form>
      <button className={style.logoutButton} onClick={()=>navigate("/login")}>
        <img src={logout} alt="logout" />
        Log out
      </button>
    </div>
  );
};

export default Settings;