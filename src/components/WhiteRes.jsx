// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import style from "../style/WhiteRes.module.css";
// import send from "../assets/send.png";

// const WhiteRes = () => {
//   const { formId } = useParams();
//   const [formData, setFormData] = useState(null); // Form data from API
//   const [error, setError] = useState(null); // Handle errors
//   const [currentStep, setCurrentStep] = useState(0); // Track the current step
//   const [answers, setAnswers] = useState([]); // Store user answers
//   const [temporaryValues, setTemporaryValues] = useState([]); // Temporary input values

//   useEffect(() => {
//     if (!formId) {
//       console.error("No formId found in URL!");
//       setError("Invalid Form ID");
//       return;
//     }

//     fetch(`http://localhost:4444/api/flow/get-form/${formId}`)
//       .then((response) => {
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//         return response.json();
//       })
//       .then((data) => {
//         if (!data || !data.data) throw new Error("Invalid response structure");
//         setFormData(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching form data:", error);
//         setError("Failed to fetch form data. Please try again.");
//       });
//   }, [formId]);

//   useEffect(() => {
//     if (formData && formData.data[currentStep]) {
//       const currentItem = formData.data[currentStep];
//       if (currentItem.label === "text" || currentItem.label === "image") {
//         const timeout = setTimeout(() => {
//           setCurrentStep((prev) => prev + 1);
//         }, 2000); // Automatically proceed after 2 seconds for bubble components
//         return () => clearTimeout(timeout); // Clear timeout on cleanup
//       }
//     }
//   }, [currentStep, formData]);

//   const getType = (label) => {
//     switch (label) {
//       case "inputText":
//         return "text";
//       case "inputEmail":
//         return "email";
//       case "inputNumber":
//         return "number";
//       case "inputPhone":
//         return "tel";
//       case "inputDate":
//         return "date";
//       case "inputRating":
//         return "range";
//       default:
//         return "text";
//     }
//   };

//   const handleTemporaryChange = (index, value) => {
//     const updatedValues = [...temporaryValues];
//     updatedValues[index] = value;
//     setTemporaryValues(updatedValues);
//   };

//   const handleInputSubmit = (index) => {
//     const updatedAnswers = [...answers];
//     updatedAnswers[index] = temporaryValues[index];
//     setAnswers(updatedAnswers);

//     setCurrentStep((prev) => prev + 1); // Move to the next step
//   };

//   if (error) return <div className={style.error}>{error}</div>;
//   if (!formData || !formData.data) return <div className={style.loading}>Loading...</div>;

//   return (
//     <div className={style.whitebg}>
//       {/* Render all items up to the current step */}
//       {formData.data.slice(0, currentStep + 1).map((item, index) => (
//         <div
//           key={index}
//           className={item.label === "image" || item.label === "text" ? style.bubble : style.user}
//         >
//           {item.label === "image" || item.label === "text" ? (
//             <div>
//               <div className={style.bubbleContent}>{item.value}</div>
//             </div>
//           ) : item.label === "inputButton" ? (
//              /* Handle inputButton */
//             <button
//               style={{ color: "black"}}
//               className={style.userInput}
//               onClick={() => {
//                 // Define the button action (e.g., show alert or other behavior)
//                 alert(`Button clicked: ${item.value || `Button ${index + 1}`}`);
//               }}
//             >
//               {item.value || `Button ${index + 1}`}
//             </button>
//           ) : (
//             <div className={style.ansBox}>
//               <input
//                 style={{ color: "black" }}
//                 className={style.userInput}
//                 type={getType(item.label)}
//                 placeholder={`Enter ${getType(item.label)}`}
//                 value={temporaryValues[index] || ""}
//                 onChange={(e) => handleTemporaryChange(index, e.target.value)}
//               />
//               <button
//                 className={style.userInput}
//                 onClick={() => handleInputSubmit(index)}
//               >
//                 <img src={send} alt="send" />
//               </button>
//             </div>
//           )}
//         </div>
//       ))}

//       {/* Debugging: Display all answers */}
//       <div>
//         <h3>Your Answers:</h3>
//         {answers.map((answer, index) => (
//           <div key={index}>
//             {formData.data[index]?.label}: {answer}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WhiteRes;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "../style/WhiteRes.module.css";
import send from "../assets/send.png";
import sidepic from "../assets/logo.png";

const WhiteRes = () => {
  const { formId } = useParams();
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [temporaryValues, setTemporaryValues] = useState([]);
  const [buttonStyles, setButtonStyles] = useState({}); // State to store button styles
  const [rating, setRating] = useState(null); // State for storing the selected rating value
  const [visitCount, setVisitCount] = useState(0); // State to store visit count

  useEffect(() => {
    // Function to track visit count in the database
    const trackVisit = async () => {
      try {
        const response = await fetch(
          `http://localhost:4444/api/track/view/${formId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message); // Log success message from the server
        setVisitCount((prev) => prev + 1); // Increment local visit count
      } catch (error) {
        console.error("Error tracking visit count:", error);
      }
    };

    if (formId) {
      trackVisit();
    }
  }, [formId]); // Dependency array ensures it runs when formId changes

  useEffect(() => {
    if (!formId) {
      console.error("No formId found in URL!");
      setError("Invalid Form ID");
      return;
    }

    fetch(`http://localhost:4444/api/flow/get-form/${formId}`)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (!data || !data.data) throw new Error("Invalid response structure");
        setFormData(data);
      })
      .catch((error) => {
        console.error("Error fetching form data:", error);
        setError("Failed to fetch form data. Please try again.");
      });
  }, [formId]);

  useEffect(() => {
    if (formData && formData.data[currentStep]) {
      const currentItem = formData.data[currentStep];
      if (currentItem.label === "text" || currentItem.label === "image") {
        const timeout = setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
        }, 2000); // Automatically proceed after 2 seconds for bubble components
        return () => clearTimeout(timeout); // Clear timeout on cleanup
      }
    }
  }, [currentStep, formData]);

  const getType = (label) => {
    switch (label) {
      case "inputText":
        return "text";
      case "inputEmail":
        return "email";
      case "inputNumber":
        return "number";
      case "inputPhone":
        return "tel";
      case "inputDate":
        return "date";
      case "inputRating":
        return "rate"; // Don't use range here, use custom rating method
      default:
        return "rate";
    }
  };

  const handleRatingChange = (value) => {
    setRating(value); // Set the selected rating value
  };

  const handleTemporaryChange = (index, value) => {
    const updatedValues = [...temporaryValues];
    updatedValues[index] = value;
    setTemporaryValues(updatedValues);
  };

  const generateFieldName = (count, label) => {
    count++;

    return getType(label);
  };

  // const handleInputSubmit = (index) => {
  //   const currentItem = formData.data[index];
  //   const fieldName = generateFieldName(index, currentItem?.label, formData); // Generate unique field name
  //   const fieldValue = rating || temporaryValues[index] || ""; // Use rating or temporary input value
  //   console.log("ashieee pagal");
  //   //console.log(fieldName, fieldValue);
  //   // API call to track the field submission
  //   fetch(`http://localhost:4444/api/track/field-submit/${formId}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ fieldName, fieldValue }),

  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data.message); // Log success message
  //     })
  //     .catch((error) => {
  //       console.error("Error tracking field submission:", error);
  //     });

  //   // Save the value locally in answers
  //   const updatedAnswers = [...answers];
  //   updatedAnswers[index] = fieldValue;
  //   setAnswers(updatedAnswers);

  //   // Reset the rating and proceed to the next step
  //   setRating(null);
  //   setCurrentStep((prev) => prev + 1);
  // };

  // Frontend

  const generateNewUserId = () => {
    const newUserId = `user_${Date.now()}`;
    console.log("Generated userId:", newUserId);
    localStorage.setItem("userId", newUserId);
    console.log(
      "Stored userId in localStorage:",
      localStorage.getItem("userId")
    );
  };

  // const handleInputSubmit = (index) => {
  //   const userId = localStorage.getItem("userId") || generateNewUserId();
  //   const currentItem = formData.data[index];
  //   const fieldName = generateFieldName(index, currentItem?.label, formData);
  //   const fieldValue = rating || temporaryValues[index] || "";
  const handleInputSubmit = (index) => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      generateNewUserId();
      userId = localStorage.getItem("userId");
      console.log("Generated new userId:", userId); // Debug u r saying ki ji ji jij ijsamjhu u
    }

    const fieldName = generateFieldName(
      index,
      formData.data[index]?.label,
      formData
    );
    const fieldValue = rating || temporaryValues[index] || "";

    if (!userId || !fieldName || !fieldValue) {
      console.error("Missing required fields:", {
        userId,
        fieldName,
        fieldValue,
      });
      return;
    }
    console.log(userId, fieldName, fieldValue);
    fetch(`http://localhost:4444/api/track/field-submit/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, fieldName, fieldValue }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error tracking field submission:", error);
      });

    setRating(null);
    setCurrentStep((prev) => prev + 1);
  };

  const handleButtonClick = (index, item) => {
    // Perform the button action
    const newButtonStyles = {
      ...buttonStyles,
      [index]: { color: "white", backgroundColor: "#FF8E21" },
    };
    setButtonStyles(newButtonStyles);
    alert(`Button clicked: ${item.value || `Button ${index + 1}`}`);

    // Save the button click to answers
    const updatedAnswers = [...answers];
    updatedAnswers[index] = `Button clicked: ${
      item.value || `Button ${index + 1}`
    }`;
    setAnswers(updatedAnswers);

    // Trigger the backend API call to increment the full form submission count
    fetch(`http://localhost:4444/api/track/full-form-submit/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message); // Log success message
      })
      .catch((error) => {
        console.error("Error tracking full form submission:", error);
      });

    // Automatically move to the next step after the button is clicked
    setCurrentStep((prev) => prev + 1);
  };

  if (error) return <div className={style.error}>{error}</div>;
  if (!formData || !formData.data)
    return <div className={style.loading}>Loading...</div>;

  return (
    <div className={style.whitebg}>
      {formData.data.slice(0, currentStep + 1).map((item, index) => {
        if (!item) {
          console.error("Item is undefined at index:", index);
          return null; // Skip rendering for this item if it's invalid
        }

        return (
          <div
            key={index}
            className={
              item.label === "image" || item.label === "text"
                ? style.bubble
                : style.user
            }
          >
            {item.label === "image" || item.label === "text" ? (
              <div className={style.sidehero}>
                <div className={style.bubbleWithImage}>
                  <img
                    src={sidepic}
                    alt="Profile"
                    className={style.profileImage}
                  />
                </div>
                <div className={style.bubbleContent}>
                  {item.label === "image" ? (
                    <img
                      src={item.value} // Render the main image using item.value
                      alt="Main Content"
                      className={style.mainImage} // Add a class for styling the main image
                    />
                  ) : (
                    item.value // Render the text for non-image items
                  )}
                </div>
              </div>
            ) : item.label === "inputButton" ? (
              <button
                style={buttonStyles[index] || {}}
                className={style.userInput}
                onClick={() => handleButtonClick(index, item)} // Handle button click
              >
                {item.value || `Button ${index + 1}`}
              </button>
            ) : item.label === "inputRating" ? (
              <div className={style.ratingContainer}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    className={style.ratingButton}
                    onClick={() => handleRatingChange(value)}
                    style={{
                      backgroundColor: rating >= value ? "#FF8E21" : "#ccc", // Highlight the selected rating
                    }}
                  >
                    {value}
                  </button>
                ))}
                <button className={style.subBtn} onClick={handleInputSubmit}>
                  <img src={send} alt="send" />
                </button>
              </div>
            ) : (
              <div className={style.ansBox}>
                <input
                  style={{ color: "black" }}
                  className={style.userInput}
                  type={getType(item.label)}
                  placeholder={`Enter ${getType(item.label)}`}
                  value={temporaryValues[index] || ""}
                  onChange={(e) => handleTemporaryChange(index, e.target.value)}
                />
                <button
                  className={style.userInput}
                  onClick={() => handleInputSubmit(index)}
                >
                  <img src={send} alt="send" />
                </button>
              </div>
            )}
          </div>
        );
      })}
      <div>
        <h3>Your Answers:</h3>
        {answers.map((answer, index) => {
          const currentItem = formData.data[index];
          // Only show the answer if it's not of type 'text' or 'image'
          if (currentItem?.label !== "text" && currentItem?.label !== "image") {
            return (
              <div key={index}>
                {currentItem?.label}: {answer}
              </div>
            );
          }
          return null; // Do not display anything for text or image labels
        })}
        {/* Display the visit count once outside of the map */}
        <p>Number of visits: {visitCount}</p>
      </div>
    </div>
  );
};

export default WhiteRes;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import style from "../style/WhiteRes.module.css";
// import send from "../assets/send.png";
// import sidepic from '../assets/logo.png';

// const WhiteRes = () => {
//   const { formId } = useParams();
//   const [formData, setFormData] = useState(null);
//   const [error, setError] = useState(null);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [temporaryValues, setTemporaryValues] = useState([]);
//   const [buttonStyles, setButtonStyles] = useState({}); // State to store button styles
//   const [rating, setRating] = useState(null); // State for storing the selected rating value
//   const [visitCount, setVisitCount] = useState(0); // State to store visit count

//   useEffect(() => {
//     // Increment visit count when the component mounts
//     setVisitCount(prevCount => prevCount + 1);
//   }, []);

//   useEffect(() => {
//     if (!formId) {
//       console.error("No formId found in URL!");
//       setError("Invalid Form ID");
//       return;
//     }

//     fetch(`http://localhost:4444/api/flow/get-form/${formId}`)
//       .then((response) => {
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//         return response.json();
//       })
//       .then((data) => {
//         if (!data || !data.data) throw new Error("Invalid response structure");
//         setFormData(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching form data:", error);
//         setError("Failed to fetch form data. Please try again.");
//       });
//   }, [formId]);

//   useEffect(() => {
//     if (formData && formData.data[currentStep]) {
//       const currentItem = formData.data[currentStep];
//       if (currentItem.label === "text" || currentItem.label === "image") {
//         const timeout = setTimeout(() => {
//           setCurrentStep((prev) => prev + 1);
//         }, 2000); // Automatically proceed after 2 seconds for bubble components
//         return () => clearTimeout(timeout); // Clear timeout on cleanup
//       }
//     }
//   }, [currentStep, formData]);

//   const getType = (label) => {
//     switch (label) {
//       case "inputText":
//         return "text";
//       case "inputEmail":
//         return "email";
//       case "inputNumber":
//         return "number";
//       case "inputPhone":
//         return "tel";
//       case "inputDate":
//         return "date";
//       case "inputRating":
//         return "text"; // Don't use range here, use custom rating method
//       default:
//         return "text";
//     }
//   };

//   const handleRatingChange = (value) => {
//     setRating(value); // Set the selected rating value
//   };

//   const handleTemporaryChange = (index, value) => {
//     const updatedValues = [...temporaryValues];
//     updatedValues[index] = value;
//     setTemporaryValues(updatedValues);
//   };

//   const handleInputSubmit = (index) => {
//     const updatedAnswers = [...answers];
//     if (rating !== null) {
//       updatedAnswers[index] = rating; // Save the rating if selected
//     } else {
//       updatedAnswers[index] = temporaryValues[index]; // Save the input value
//     }
//     setAnswers(updatedAnswers);
//     setCurrentStep((prev) => prev + 1); // Move to the next step
//   };

//   const handleButtonClick = (index, item) => {
//     // Perform the button action (e.g., showing an alert)
//     const newButtonStyles = { ...buttonStyles, [index]: { color: "white", backgroundColor: "#FF8E21" } };
//     setButtonStyles(newButtonStyles);
//     alert(`Button clicked: ${item.value || `Button ${index + 1}`}`);

//     // Save the button click to answers
//     const updatedAnswers = [...answers];
//     updatedAnswers[index] = `Button clicked: ${item.value || `Button ${index + 1}`}`;
//     setAnswers(updatedAnswers);

//     // Automatically move to the next step after the button is clicked
//     setCurrentStep((prev) => prev + 1);
//   };

//   if (error) return <div className={style.error}>{error}</div>;
//   if (!formData || !formData.data) return <div className={style.loading}>Loading...</div>;

//   return (
//     <div className={style.whitebg}>
//       {formData.data.slice(0, currentStep + 1).map((item, index) => (
//         <div
//           key={index}
//           className={item.label === "image" || item.label === "text" ? style.bubble : style.user}
//         >
//           {item.label === "image" || item.label === "text" ? (

//             <div className={style.sidehero}>
//               <div className={style.bubbleWithImage}>
//                 <img src={sidepic} alt="Profile" className={style.profileImage} />
//               </div>
//               <div className={style.bubbleContent}>{item.value}</div>
//             </div>

//           ) : item.label === "inputButton" ? (
//             <button
//               style={buttonStyles[index] || {}}
//               className={style.userInput}
//               onClick={() => handleButtonClick(index, item)} // Handle button click
//             >
//               {item.value || `Button ${index + 1}`}
//             </button>
//           ) : item.label === "inputRating" ? (
//               <div className={style.ratingContainer}>
//                 {[1, 2, 3, 4, 5].map((value) => (
//                   <button
//                     key={value}
//                     className={style.ratingButton}
//                     onClick={() => handleRatingChange(value)}
//                     style={{
//                       backgroundColor: rating >= value ? "#FF8E21" : "#ccc", // Highlight the selected rating
//                     }}
//                   >
//                     {value}
//                   </button>
//                 ))}
//               <button
//                 className={style.subBtn}
//                 onClick={handleInputSubmit}
//               >
//                 <img src={send} alt="send"  />
//                 </button>
//             </div>
//           ) : (
//             <div className={style.ansBox}>
//               <input
//                 style={{ color: "black" }}
//                 className={style.userInput}
//                 type={getType(item.label)}
//                 placeholder={`Enter ${getType(item.label)}`}
//                 value={temporaryValues[index] || ""}
//                 onChange={(e) => handleTemporaryChange(index, e.target.value)}
//               />
//               <button
//                 className={style.userInput}
//                 onClick={() => handleInputSubmit(index)}
//               >
//                 <img src={send} alt="send" />
//               </button>
//             </div>
//           )}
//         </div>
//       ))}

//       <div>
//         <h3>Your Answers:</h3>
//         {answers.map((answer, index) => {
//           const currentItem = formData.data[index];
//           // Only show the answer if it's not of type 'text' or 'image'
//           if (currentItem?.label !== "text" && currentItem?.label !== "image") {
//             return (
//               <div key={index}>
//                 {currentItem?.label}: {answer}
//               </div>
//             );
//           }
//           return null; // Do not display anything for text or image labels
//         })}
//         {/* Display the visit count once outside of the map */}
//         <p>Number of visits: {visitCount}</p>
//       </div>

//     </div>
//   );
// };

// export default WhiteRes;
