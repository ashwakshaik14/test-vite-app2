import { useEffect, useState } from 'react';
import style from '../style/FormPage.module.css';
import {useParams ,useNavigate } from "react-router-dom";
import bubble1 from '../assets/bubble1.png';
import bubble2 from '../assets/bubble2.png';
import inputext from '../assets/inputext.png';
import inputnum from '../assets/inputnum.png';
import inputa from '../assets/inputa.png';
import inputphone from '../assets/inputphone.png';
import inputdate from '../assets/inputdate.png';
import inputstar from '../assets/inputstar.png';
import inputbtn from '../assets/inputbtn.png';
import flag from '../assets/flag.png';
import WhiteRes from './WhiteRes';
import { GoTrash } from "react-icons/go";




const FormPage = () => {

  const navigate = useNavigate(); // Initialize useNavigate

  const { id } = useParams(); // Get the formId from the URL
  const [currentFormId, setCurrentFormId] = useState(null);

  useEffect(() => {
    if (id) {
      setCurrentFormId(id); // Set the formId in the component state
    }
  }, [id]);


  const [formData, setFormData] = useState({}); // State to store form inputs
  const [components, setComponents] = useState([]); // State to store added components
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === style.darkTheme : true; // Default to dark
  });

  const handleInputChange = (id, value) => {
  setFormData((prevData) => ({ ...prevData, [id]: value }));
};

useEffect(() => {
  const theme = isDarkMode ? style.darkTheme : style.lightTheme;
  document.body.className = theme;
  localStorage.setItem("theme", theme);
}, [isDarkMode]);

// Toggle theme handler
const toggleTheme = () => {
  setIsDarkMode((prevMode) => !prevMode);
};
  const addComponent = (type) => {
    const newComponent = { id: Date.now(), type };
    setComponents([...components, newComponent]);
  };

  const deleteComponent = (index) => {
    setComponents(components.filter((_, i) => i !== index));
  };
  

  const handleSave = async (event) => {
    event?.preventDefault();
  
    const hasInputButton = components.some(comp => comp.type === "inputButton");

    if (!hasInputButton) {
      alert("Form must include at least one 'Input Button' to be saved.");
      return; // Stop the save process if no inputButton is found
    }

    const formId = currentFormId.toString(); // Ensure formId is a string
    const componentsToSave = components.map((comp, index) => ({
      name: comp.type === "image"||comp.type==="text" ? "bubble"+`${index + 1}` : "input"+`${index + 1}`,
      label: `${comp.type}`,
      value: formData[comp.id] || "default_value", // Fallback value for empty fields
    }));
  
    const payload = {
      formId,
      components: componentsToSave,
    };
  
    console.log("Payload being sent:", payload);
  
    try {
      const response = await fetch("https://test-vite-app1.onrender.com/api/flow/save-flow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("Form saved successfully!");
        console.log("Saved Data:", result);
      } else {
        console.error("Error saving form:", result);
        alert(result.message || "Failed to save form.");
      }
    } catch (error) {
      console.error("Error during save:", error);
      alert("An error occurred while saving the form.");
    }
  };
  console.log(WhiteRes);
  
  const handleShare = () => {
    const formId = currentFormId.toString(); // Ensure formId is a string
    const formLink = `${window.location.origin}/WhiteRes/${formId}`;  // Include formId in the link
    
    // Copy the link to the clipboard
    navigator.clipboard.writeText(formLink)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Error copying the link: ", err);
      });
  };
    
  
  

  const renderComponent = (type,index) => {

    const id = components[index]?.id; // Unique ID for each component

    switch (type) {
      // Bubble components as inputs for you to edit
      case "text":
        return (
          <div key={index} className={style.componentWrapper}>
            <span
              className={style.bin}
              onClick={(e) => {
                e.stopPropagation();
                deleteComponent(index);
              }}
            >
              <GoTrash />
            </span>
            <label className={style.componentLabel} required>Text Bubble {index + 1}</label>
              <input
                type="text"
                placeholder="Enter text here"
                className={style.bubbleInput}
                value={formData[id] || ""}
                onChange={(e) => handleInputChange(id, e.target.value)}
              />
          </div>

        );
  
      case "image":
        return (
          <div key={index} className={style.componentWrapper}>
            <span
              className={style.bin}
              onClick={(e) => {
                e.stopPropagation();
                deleteComponent(index);
              }}
            >
              <GoTrash />
            </span>
            <label className={style.componentLabel} required>Image Bubble {index + 1}</label>

              <input
                type="text"
                placeholder="Enter the image link here"
                className={style.bubbleInput}
                value={formData[id] || ""}
                onChange={(e) => handleInputChange(id, e.target.value)}
              />
          </div>
        );
      
        // Standard UI components for the end user
      case "inputText":
        return (
          <div key={index} className={style.componentWrapper}>
            <span
              className={style.bin}
              onClick={(e) => {
                e.stopPropagation();
                deleteComponent(index);
              }}
            >
              <GoTrash />
            </span>
            <label className={style.componentLabel} required>Input Text {index + 1}</label>
            <h5>Hint : User will input a text on his form</h5>
            {/* <input
              type="text"
              placeholder="Enter text here"
              className={style.componentLabel}
            /> */}
          </div>
        );

        case "inputNumber":
        return (
          <div key={index} className={style.componentWrapper}>
            <span
              className={style.bin}
              onClick={(e) => {
                e.stopPropagation();
                deleteComponent(index);
              }}
            >
              <GoTrash />
            </span>
            <label className={style.componentLabel} >Input Number {index + 1}</label>
            <h5>Hint : User will input a number on his form</h5>
            {/* <input
              type="text"
              placeholder="Enter text here"
              className={}
            /> */}
          </div>
        );

        case "inputEmail":
        return (
          <div key={index} className={style.componentWrapper}>
            <span
              className={style.bin}
              onClick={(e) => {
                e.stopPropagation();
                deleteComponent(index);
              }}
            >
              <GoTrash />
            </span>
            <label className={style.componentLabel} required> Input Email {index + 1}</label>
            <h5>Hint : User will input a email on his form</h5>
            {/* <input
              type="text"
              placeholder="Enter text here"
              className={style.bubbleInput}
            /> */}
          </div>
        );

        case "inputPhone":
        return (
          <div key={index} className={style.componentWrapper}>
            <span
              className={style.bin}
              onClick={(e) => {
                e.stopPropagation();
                deleteComponent(index);
              }}
            >
              <GoTrash />
            </span>
            <label className={style.componentLabel} required>  Input Phone {index + 1}</label>
            <h5>Hint : User will input a phone on his form</h5>
            {/* <input
              type="text"
              placeholder="Enter text here"
              className={style.bubbleInput}
            /> */}
          </div>
        );

        case "inputDate":
        return (
          <div key={index} className={style.componentWrapper}>
            <span
              className={style.bin}
              onClick={(e) => {
                e.stopPropagation();
                deleteComponent(index);
              }}
            >
              <GoTrash />
            </span>
            <label className={style.componentLabel} required>Input Date {index + 1}</label>
            <h5>Hint : User will select a date</h5>
            {/* <input
              type="text"
              placeholder="Enter text here"
              className={style.bubbleInput}
            /> */}
          </div>
        );

        case "inputRating":
        return (
          <div key={index} className={style.componentWrapper}>
            <span
              className={style.bin}
              onClick={(e) => {
                e.stopPropagation();
                deleteComponent(index);
              }}
            >
              <GoTrash />
            </span>
            <label className={style.componentLabel} required>Input Rating {index + 1}</label>
            <h5>Hint : User will input a text on his form</h5>

          </div>
        );

        case "inputButton":
        return (
          <div key={index} className={style.componentWrapper}>
            <span
              className={style.bin}
              onClick={(e) => {
                e.stopPropagation();
                deleteComponent(index);
              }}
            >
              <GoTrash />
            </span>
            <label className={style.componentLabel}>Input Button {index + 1}</label>
            
            <input
              type="text"
              placeholder="enter button name"
              className={style.bubbleInput}
              value={formData[id] || ""}
              onChange={(e) => handleInputChange(id, e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  };


  return (

    <div>
      <nav>
        <div className={style.nav}>
          <div className={style.navLeft}>
            <input type="text" placeholder="Enter folder name" />
          </div>
          <div className={style.navMiddle}>
            <button className={style.Active}>Flow</button>
            <button onClick={() => navigate(`/result/${id}`)}>Response</button>
          </div>
          <div className={style.navRight}>
          <p>light</p>
      <div className={style.toggleSwitch} onClick={toggleTheme}>
        <div className={`${style.switch} ${isDarkMode ? style.switchOn : style.switchOff}`}></div>
      </div>
      <p>dark</p>
            <button style={{ backgroundColor: "#1A5FFF", color: "white", cursor:"pointer"}} onClick={handleShare}>Share</button>
            <button style={{ backgroundColor: "#4ADE80CC", color: "white", cursor:"pointer" }} onClick={handleSave}>Save</button>
            <button style={{ backgroundColor: "transparent", color: "red", fontSize: "17px", padding: "6px 10px",cursor:"pointer"}}onClick={() => window.location.reload()}>X</button>
          </div>
        </div>
        <div className={style.navLine}></div>
      </nav>

      <div className={style.mainContainer}>
        <div className={style.mainSide}>
          <label>Bubbles</label>
          <div className={style.Bbubbles}>
            <button onClick={() => addComponent("text")}><img src={bubble1} alt="bubble1" />Text</button>
            <button onClick={() => addComponent("image")}><img src={bubble2} alt="bubble2" />Image</button>
          </div>
          <br />
          <label>Inputs</label>
          <div className={style.Iinputs}>
            <button onClick={() => addComponent("inputText")}><img src={inputext} alt="inputext" />Text</button>
            <button onClick={() => addComponent("inputNumber")}><img src={inputnum} alt="inputnum" />Number</button>
            <button onClick={() => addComponent("inputEmail")}><img src={inputa} alt="inputa" />Email</button>
            <button onClick={() => addComponent("inputPhone")}><img src={inputphone} alt="inputphone" />Phone</button>
            <button onClick={() => addComponent("inputDate")}><img src={inputdate} alt="inputdate" />Date</button>
            <button onClick={() => addComponent("inputRating")}><img src={inputstar} alt="inputstar" />Rating</button>
            <button onClick={() => addComponent("inputButton")}><img src={inputbtn} alt="inputbtn" />Button</button>
          </div>
        </div>

        <div className={style.mainMiddle}>
          <div className={style.head}><img src={flag} alt="flag" />Start</div>

          {/* {components.map((comp) => (
            <div key={comp.id} className={style.dynamicComponent}>
              {renderComponent(comp.type)}
            </div>
          ))} */}
          <div className={style.middleSection}>
            {components.map((component, index) => (
              <div key={component.id} className={style.dynamicComponent}>
                {renderComponent(component.type, index)}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default FormPage;
