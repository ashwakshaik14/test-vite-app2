// Modal4 component
import { useState } from "react";
import style from "../style/Modal2.module.css";
import PropTypes from "prop-types";

function Modal4({ onClose, onCreate, folderId }) {
  const [formName, setFormName] = useState("");

  const handleSubmit = () => {
    if (formName.trim()) {
      onCreate(formName, folderId); // Pass folderId along with form name
      onClose(); // Close the modal after the form is created
    } else {
      alert("Form name cannot be empty");
    }
  };

  const handleModalContentClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className={style.modal} onClick={onClose}>
      <div className={style.modalContent} onClick={handleModalContentClick}>
        <h2>Create a New Form</h2>
        <input
          type="text"
          placeholder="Enter form name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
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

// PropTypes validation
Modal4.propTypes = {
  onClose: PropTypes.func.isRequired, 
  onCreate: PropTypes.func.isRequired, 
  folderId: PropTypes.string.isRequired, 
};

export default Modal4;





// function Modal4({ onClose, onCreate }) {
//   const [formName, setFormName] = useState("");

//   const handleSubmit = () => {
//     if (formName.trim()) {
//       onCreate(formName); // Call onCreate to create the folder
//       onClose(); // Close the modal after the folder is created
//     } else {
//       alert("Folder name cannot be empty");
//     }
//   };

//   // Prevent click event propagation for modal content
//   const handleModalContentClick = (event) => {
//     event.stopPropagation();
//   };

//   return (
//     <div className={style.modal} onClick={onClose}> {/* Close modal on overlay click */}
//       <div
//         className={style.modalContent}
//         onClick={handleModalContentClick}>
//         <h2>Create a New Form</h2>

//         <input
//           type="text"
//           placeholder="Enter form name"
//           value={formName}
//           onChange={(e) => setFormName(e.target.value)}
//         />
//         <div className={style.cc}>
//           <button onClick={handleSubmit} className={style.create}>Done</button>
//           |
//           <button onClick={onClose} className={style.cancel}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// }

