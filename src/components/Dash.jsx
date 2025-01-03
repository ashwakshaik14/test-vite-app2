import { useEffect, useState } from "react";
import "react-dropdown/style.css";
// import Switch from "react-switch";
import style from "../style/Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { FiFolderPlus } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import Modal from "./Modal"; // Adjust the path as necessary
import Modal2 from "./Modal2";
import Modal3 from "./Modal3";
import Modal4 from "./Modal4";
import Modal5 from "./Modal5";

function Dash() {
  const [username, setUsername] = useState(""); // Username from backend
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  // const [checked, setChecked] = useState(false); // Theme toggle state
  const [folders, setFolders] = useState([]); // Folder list
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State for create folder modal
  const [isShareModalOpen, setIsShareModalOpen] = useState(false); // State for share modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); // For deletion loader
  const [forms, setForms] = useState([]); // State to manage the list of form buttons
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [currentFolderId, setCurrentFolderId] = useState(null); // State for current folder ID (for new form creation)
  const [isDeleteModal5Open, setIsDeleteModal5Open] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [isDeletingForm, setIsDeletingForm] = useState(false);

  // const [isDarkMode, setIsDarkMode] = useState(() => {
  //   const savedTheme = localStorage.getItem("theme");
  //   return savedTheme ? savedTheme === style.darkTheme : true; // Default to dark
  // }); 

  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === style.darkTheme : true; // Default to dark theme
  }); 

  const handleOpenDeleteModal5 = (formId) => {
    setSelectedFormId(formId); // Set the form to be deleted
    setIsDeleteModal5Open(true); // Open delete modal
  };

  const handleCloseDeleteModal5 = () => {
    setSelectedFormId(null); // Clear selected form
    setIsDeleteModal5Open(false); // Close delete modal
  };

  const navigate = useNavigate();

  // Function to open the modal
  const handleOpenModal = () => {
    setShowModal(true); // Show the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleOpenDeleteModal = (folderId) => {
    setSelectedFolderId(folderId);
    localStorage.setItem("folderId", folderId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedFolderId(null);
  };

  // Toggle the "Create Folder" modal
  const toggleCreateModal = () => {
    setIsCreateModalOpen((prev) => !prev);
    setIsShareModalOpen(false); // Close share modal if create folder modal is opened
  };

  // Toggle the "Share" modal
  const toggleShareModal = () => {
    setIsShareModalOpen((prev) => !prev);
    setIsCreateModalOpen(false); // Close create folder modal if share modal is opened
  };

  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme") || style.darkTheme; // Default to dark theme
  //   setIsDarkMode(savedTheme === style.darkTheme);
  //   document.body.className = savedTheme;
  // }, []);
  // const toggleTheme = () => {
  //   setIsDarkMode(!isDarkMode);
  //   const newTheme = !isDarkMode ? style.darkTheme : style.lightTheme;
  //   document.body.className = newTheme;
  //   localStorage.setItem("theme", newTheme);
  // };

  useEffect(() => {
    const theme = isDarkMode ? style.darkTheme : style.lightTheme;
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [isDarkMode]);

  // Toggle the theme
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  
  // Theme switch handler
  // const handleChange = (nextChecked) => {
  //   setChecked(nextChecked);
  //   const theme = nextChecked ? "dark-theme" : "light-theme";
  //   document.body.className = theme; // Apply the theme to the <body>
  //   localStorage.setItem("theme", theme); // Save theme preference
  // };

  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme") || "dark-theme"; // Default to dark theme
  //   setChecked(savedTheme === "light-theme");
  //   document.body.className = savedTheme; // Apply the saved theme
  // }, []);

  // Fetch user details on mount
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userEmail = JSON.parse(localStorage.getItem("userEmail"));
        if (!userEmail) throw new Error("Email not found in localStorage");

        const response = await fetch(
          `http://localhost:4444/api/user/details?email=${userEmail}`
        );
        if (!response.ok) throw new Error("Failed to fetch user details");

        const data = await response.json();
        if (data.name) setUsername(data.name);
        else throw new Error("Invalid user data received");
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsername();
  }, []);

  // Fetch folders when the component mounts or after a folder is created
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const userEmail = JSON.parse(localStorage.getItem("userEmail"));
        if (!userEmail) throw new Error("Email not found in localStorage");

        const response = await fetch(
          `http://localhost:4444/api/folders?email=${userEmail}`
        );
        if (!response.ok) throw new Error("Failed to fetch folders");
        const data = await response.json();
        setFolders(data);
      } catch (err) {
        console.error("Error fetching folders:", err);
        setError(err.message);
      }
    };

    fetchFolders();
  }, []); // No dependencies - runs on initial render

  // Function to create a new form
  // const handleCreateForm = (formName) => {
  //   const newForm = {
  //     _id: Date.now(), // Generate a unique ID based on the current timestamp
  //     // name: `Form ${forms.length + 1}` // Name the form incrementally (Form 1, Form 2, etc.)
  //     name: formName,
  //   };

  //   setForms([...forms, newForm]); // Add the new form to the list of forms
  // };
  const handleCreateForm = async (formName) => {
    if (!formName) {
      alert("Please provide a form name.");
      return;
    }

    const userEmail =
      JSON.parse(localStorage.getItem("userEmail")) || "default@example.com";
    const workspaceName = "DefaultWorkspace"; // Use a dynamic workspace name if available
    // let folderId = currentFolderId; // Use the current folder ID, if applicable

    // if (!folderId)
    {
      var newForm = {
        name: formName,
        email: userEmail,
        workspaceName: workspaceName,
      };
    }
    // else
    // { newForm = { name: formName, email: userEmail, workspaceName:workspaceName, folderId:folderId }; }

    try {
      const response = await fetch("http://localhost:4444/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newForm),
      });

      const savedForm = await response.json();

      if (!response.ok) {
        throw new Error(savedForm.message || "Error creating form");
      }

      // Add the form to the local state
      setForms((prev) => [...prev, savedForm]);
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Error creating form:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchForms = async () => {
      const userEmail =
        JSON.parse(localStorage.getItem("userEmail")) || "default@example.com";
      console.log(userEmail);
      const workspaceName = "DefaultWorkspace"; // Update if using dynamic workspace names

      try {
        const response = await fetch(
          `http://localhost:4444/api/forms?email=${userEmail}&workspaceName=${workspaceName}`,
          {
            headers: { Authorization: `${localStorage.getItem("token")}` },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch forms");
        }

        const data = await response.json();
        setForms(data);
      } catch (error) {
        console.error("Error fetching forms:", error);
        alert(error.message);
      }
    };

    fetchForms();
  }, []); // Run on initial load

  // Handle folder creation from modal
  const handleCreateFolder = async (folderName) => {
    if (!folderName) {
      alert("Please enter a folder name.");
      return;
    }
    const userEmail =
      JSON.parse(localStorage.getItem("userEmail")) || "default@example.com";
    const workspaceName = "DefaultWorkspace"; // Update if you have dynamic workspace names

    const requestBody = { name: folderName, email: userEmail, workspaceName };

    try {
      const response = await fetch("http://localhost:4444/api/folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to create folder");
      }

      // Successfully created, update the folder list
      setFolders((prev) => [...prev, responseData]);
    } catch (err) {
      console.error("Error creating folder:", err);
      alert(err.message);
    }
  };

  // Handle folder click to navigate to folder deta
  //ils

  const handleFolderClick = (folderId) => {
    localStorage.setItem("folderId", folderId);
    setCurrentFolderId(folderId);
    navigate(`/folders/${folderId}`);
  };

  // Handle folder deletion with loading and error handling
  const handleDeleteFolder = async () => {
    if (!selectedFolderId) return;

    setIsDeleting(true); // Set loading state
    try {
      const response = await fetch(
        `http://localhost:4444/api/folders/${selectedFolderId}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        if (response.status === 404) throw new Error("Folder not found");
        else if (response.status === 500)
          throw new Error("Server error while deleting folder");
        else throw new Error("Failed to delete folder");
      }

      // Successfully deleted; update state
      setFolders((prevFolders) =>
        prevFolders.filter((folder) => folder._id !== selectedFolderId)
      );

      setIsDeleteModalOpen(false); // Close modal
    } catch (err) {
      console.error("Error deleting folder:", err);
      alert("Error deleting folder: " + err.message); // Show error message
    } finally {
      setIsDeleting(false); // Reset loading state
    }
  };

  // Function to handle form button click and redirect to the form page
  const handleFormClick = (formId) => {
    navigate(`/form/${formId}`); // Redirect to the form page with the specific form ID
  };

  // Function to delete a form
  const handleDeleteForm = async () => {
    if (!selectedFormId) return; // Exit if no form is selected

    setIsDeletingForm(true); // Show deleting indicator

    try {
      const response = await fetch(`http://localhost:4444/api/forms/${selectedFormId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with actual token
        },
      });

      if (response.ok) {
        setForms((prevForms) =>
          prevForms.filter((form) => form._id !== selectedFormId)
        ); // Remove deleted form from state
        alert("Form deleted successfully!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete the form");
      }
    } catch (error) {
      console.error("Error deleting form:", error);
      alert(error.message);
    } finally {
      setIsDeletingForm(false); // Hide deleting indicator
      handleCloseDeleteModal5(); // Close modal
    }
  };
  // Dropdown handler
  const handleSelect = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "Logout") {
      localStorage.removeItem("userEmail");
      navigate("/login");
    } else if (selectedValue === "Settings") {
      navigate("/settings");
    }
  };

  const options = [
    `${username}'S WORKSPACE`,
    "${other}'S WORKSPACE",
    "Settings",
    "Logout",
  ];

  return (
    <div>
      {loading ? (
        <h1>Loading your details...</h1>
      ) : error ? (
        <h1>Error: {error}</h1>
      ) : (
        <>
          {/* <div className={style.nav}>
            <select className={style.dropdown} onChange={handleSelect}>
              <option value={`${username}'S WORKSPACE`}>
                {`${username.toUpperCase()}'S WORKSPACE`}
              </option>
              {options.slice(1).map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select> */}
            <div className={style.nav}>
          <select
            className={`${style.dropdown} ${isDarkMode ? style.dropdownDark : style.dropdownLight}`}
            onChange={handleSelect}
          >
            <option value={`${username}'S WORKSPACE`}>
              {`${username.toUpperCase()}'S WORKSPACE`}
            </option>
            {options.slice(1).map((option, index) => (
              <option
                  key={index}
                  value={option}
                  className={option === "Logout" ? style.logoutOption : ""}
                >                {option}
              </option>
            ))}
          </select>
            <div className={style.navRight}>
              {/* <Switch
                onChange={handleChange}
                checked={checked}
                offColor="#cccccc" // Light theme background for the toggle
                onColor="#0000ff" // Dark theme background for the toggle
                checkedIcon={false} // No custom icon for checked state
                uncheckedIcon={false} // No custom icon for unchecked state
                handleDiameter={22} // Diameter of the toggle switch
                height={20} // Height of the switch
                width={48} // Width of the switch
              /> */}
              {/* <p>light</p>
      <div className={style.toggleSwitch} onClick={toggleTheme}>
        <div className={`${style.switch} ${isDarkMode ? style.switchOn : style.switchOff}`}></div>
      </div>
      <p>dark</p>
       */}
       <p>light</p>
      <div className={style.toggleSwitch} onClick={toggleTheme}>
        {/* Ensure the toggle visually matches the theme */}
        <div className={`${style.switch} ${isDarkMode ? style.switchOn : style.switchOff}`}></div>
      </div>
      <p>dark</p>
              <button onClick={toggleShareModal}>Share</button>
              {isShareModalOpen && <Modal onClose={toggleShareModal} />}
            </div>
          </div>
          <div className={style.navLine}></div>
          <div className={style.folderContainer}>
            <button
              onClick={toggleCreateModal}
              className={`${style.folderButton} ${style.createFolderButton}`}
            >
              <FiFolderPlus /> Create a folder
            </button>

            {isCreateModalOpen && (
              <Modal2
                onClose={toggleCreateModal}
                onCreate={handleCreateFolder}
              />
            )}

            {folders.map((folder) => (
              <div key={folder._id} className={style.folderButtonContainer}>
                <button
                  className={style.folderButton}
                  onClick={() => handleFolderClick(folder._id)}
                >
                  {folder.name}
                  <span
                    className={style.bin}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents folder click event
                      handleOpenDeleteModal(folder._id); // Open delete modal
                    }}
                  >
                    <GoTrash />
                  </span>
                </button>
                
                {isDeleteModalOpen && (
                  <Modal3
                    onClose={handleCloseDeleteModal}
                    onDelete={handleDeleteFolder}
                  />
                )}
              </div>
            ))}
          </div>
          {isDeleting && <div>Deleting folder...</div>}{" "}
          {/* Show loading text */}
          <div className={style.form_bot}>
            {/* Button to create a new form, triggers modal */}

            <button className={style.create} onClick={handleOpenModal}>
              +<br />
              Create a Typebot
            </button>
            {showModal && (
              <Modal4
                onClose={handleCloseModal} // Pass close function to the modal
                onCreate={handleCreateForm} // Pass the function to create a new form
                folderId={String(currentFolderId)} // Pass the folder ID for the new form
              />
            )}
            {/* Render the Modal4 component if showModal is true */}


            {/* Render the list of form buttons */}
            {forms.map((form) => (
              <div key={form._id} className={style.formButtonContainer}>
                <button
                  className={style.formButton}
                  onClick={() => handleFormClick(form._id)} // Redirect to the form page on click
                >
                  {form.name} {/* Trash icon to delete the form */}
                  <span
                    className={style.bin1}
                    onClick={(e) => {
                e.stopPropagation(); // Prevent parent click
                handleOpenDeleteModal5(form._id); // Open delete modal
              }}                  >
                    <GoTrash />
                  </span>
                </button>
              </div>
            ))}
            {isDeleteModal5Open && (
              <Modal5
              onClose={handleCloseDeleteModal5} // Close modal handler
              onDelete={handleDeleteForm} // Delete form handler
              />
            )}

            {/* Show deleting state */}
            {isDeletingForm && <div>Deleting form...</div>}
          </div>
        </>
      )}
    </div>
  );
}

export default Dash;
