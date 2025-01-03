// import { useState, useEffect } from "react";
// import PropTypes from "prop-types"; // Import PropTypes for validation
// import style from "../style/Modal.module.css";

// export default function Modal({ onClose }) {
//   const [selectedOption, setSelectedOption] = useState("");
//   const handleChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   useEffect(() => {
//     document.body.classList.add(style.activeModal);

//     return () => {
//       document.body.classList.remove(style.activeModal);
//     };
//   }, []);

//   // Stop the click event from propagating when clicking inside the modal content
//   const handleModalContentClick = (event) => {
//     event.stopPropagation();
//   };

//     // Handlers for buttons based on dropdown value
//     const handleSendInvite = () => {
//         if (selectedOption === "view") {
//           console.log("Inviting user email for",selectedOption);
//         } else {
//           console.log("Inviting user email for", selectedOption);
//         }
//       };
    
//       const handleCopyLink = () => {
//         if (selectedOption === "view") {
//           console.log("Copying link for viewing");
//         } else {
//           console.log("Copying link for editing and mode is:", selectedOption);
//         }
//       };
    

//   return (
//     <div className={style.modal} onClick={onClose}> {/* Close modal when clicking on overlay */}
//       <div onClick={handleModalContentClick} className={style.modalContent}> {/* Prevent modal close on content click */}
//         <h2>Invite by Email</h2>
//         <select id="dropdown" value={selectedOption} onChange={handleChange} className={style.drop}>
//           <option value="edit">edit</option>
//           <option value="view">view</option>
//         </select>
//         <input
//           type="email"
//           placeholder="enter the email"
//           className={style.email}
//         />
//         <br/>
//         <br/>

//         <button onClick={handleSendInvite}>send invite</button>
//         <br/>
//         <br />

//         <h2>Invite by link</h2>
//         <br/>

//         <button onClick={handleCopyLink}>copy link</button>
//         <button className={style.closeModal} onClick={onClose}>
//           X
//         </button>
//       </div>
//     </div>
//   );
// }

// // PropTypes validation
// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired, // onClose is required and must be a function
// };












import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation
import style from "../style/Modal.module.css";

export default function Modal({ onClose, workspaceLink }) {
  const [selectedOption, setSelectedOption] = useState("view"); // Default permission
  const [email, setEmail] = useState(""); // Store the email input

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    document.body.classList.add(style.activeModal);

    return () => {
      document.body.classList.remove(style.activeModal);
    };
  }, []);

  // Stop the click event from propagating when clicking inside the modal content
  const handleModalContentClick = (event) => {
    event.stopPropagation();
  };

  // Handlers for buttons based on dropdown value
  const handleSendInvite = () => {
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }
    console.log(`Sending invite to ${email} with ${selectedOption} permission`);
    alert(`Invite sent to ${email} with ${selectedOption} permission!`);
    setEmail(""); // Clear the input field
  };

  const handleCopyLink = () => {
    const permissionLink = `${workspaceLink}?permission=${selectedOption}`;
    navigator.clipboard.writeText(permissionLink); // Copy to clipboard
    alert(`Workspace link copied for ${selectedOption} permission:\n${permissionLink}`);
  };

  return (
    <div className={style.modal} onClick={onClose}> {/* Close modal when clicking on overlay */}
      <div onClick={handleModalContentClick} className={style.modalContent}> {/* Prevent modal close on content click */}
        <h2>Invite by Email</h2>

        {/* Permission Dropdown */}
        <select id="dropdown" value={selectedOption} onChange={handleChange} className={style.drop}>
          <option value="view">View</option>
          <option value="edit">Edit</option>
        </select>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter the email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={style.email}
        />
        <br />
        <button onClick={handleSendInvite}>Send Invite</button>
        <br />
        <br />

        <h2>Invite by Link</h2>
        <br/>
        <button onClick={handleCopyLink}>Copy Link</button>
        <br />
        <button className={style.closeModal} onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}

// PropTypes validation

Modal.propTypes = {
  workspaceLink: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
