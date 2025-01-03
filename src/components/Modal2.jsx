import { useState } from "react";
import style from "../style/Modal2.module.css";
import PropTypes from "prop-types";

function Modal2({ onClose, onCreate }) {
  const [folderName, setFolderName] = useState("");

  const handleSubmit = () => {
    if (folderName.trim()) {
      onCreate(folderName); // Call onCreate to create the folder
      onClose(); // Close the modal after the folder is created
    } else {
      alert("Folder name cannot be empty");
    }
  };

  // Prevent click event propagation for modal content
  const handleModalContentClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className={style.modal} onClick={onClose}> {/* Close modal on overlay click */}
      <div
        className={style.modalContent}
        onClick={handleModalContentClick}>
        <h2>Create a New Folder</h2>

        <input
          type="text"
          placeholder="Enter folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <div className={style.cc}>
          <button onClick={handleSubmit} className={style.create}>Done</button>
          |
          <button onClick={onClose} className={style.cancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// Adding PropTypes validation
Modal2.propTypes = {
  onClose: PropTypes.func.isRequired, // Ensure onClose is a required function
  onCreate: PropTypes.func.isRequired, // Ensure onCreate is a required function
};

export default Modal2;
