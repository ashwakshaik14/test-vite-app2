import style from "../style/Modal3.module.css";
import PropTypes from "prop-types";


function Modal3({ onClose, onDelete }) {
  const handleDelete = () => {
    onDelete(); // Trigger the deletion logic in the parent component
    onClose(); // Close the modal
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
        <h2>
          Are you sure you want to <br />
          delete this folder?
        </h2>

        <div className={style.buttonGroup}>
          <button onClick={handleDelete} className={style.confirmButton}>
            Confirm
          </button>
          <span>|</span>
          <button onClick={onClose} className={style.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// PropTypes validation
Modal3.propTypes = {
  onClose: PropTypes.func.isRequired, // Function to close the modal
  onDelete: PropTypes.func.isRequired, // Function to handle deletion
};

export default Modal3;
