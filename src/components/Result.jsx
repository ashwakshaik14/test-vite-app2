// // Result.js (React component)
// import { useEffect, useState } from "react";
// import Switch from "react-switch";
// import style from "../style/Result.module.css";
// import { useParams, useNavigate } from "react-router-dom";

// function Result() {
//   const navigate = useNavigate(); // Initialize useNavigate
//   const { id } = useParams(); // Get the formId from the URL
//   const [currentFormId, setCurrentFormId] = useState(null);
//   const [formData, setFormData] = useState(null); // State to store form data
//   const [checked, setChecked] = useState(false); // Theme toggle state

//   // Fetch form data when the component mounts or when the formId changes
//   useEffect(() => {
//     if (id) {
//       setCurrentFormId(id);
//       fetchFormData(id); // Fetch data for the current formId
//     }
//   }, [id]);

//   const fetchFormData = async (formId) => {
//     try {
//       const response = await fetch(`http://localhost:4444/api/fetch/${formId}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       const data = await response.json(); // Parse the JSON response
//       setFormData(data); // Set the fetched data
//     } catch (error) {
//       console.error("Error fetching form data:", error);
//       setFormData(null); // Handle errors by setting null
//     }
//   };

//   const handleShare = () => {
//     const formLink = `${window.location.origin}/WhiteRes/${currentFormId}`; // Include formId in the link
//     navigator.clipboard
//       .writeText(formLink)
//       .then(() => alert("Link copied to clipboard!"))
//       .catch((err) => console.error("Error copying the link:", err));
//   };

//   const handleChange = (nextChecked) => {
//     setChecked(nextChecked);
//     const theme = nextChecked ? "dark-theme" : "light-theme";
//     document.body.className = theme; // Apply the theme to the <body>
//     localStorage.setItem("theme", theme); // Save theme preference
//   };

//   return (
//     <div>
//       <nav>
//         <div className={style.nav}>
//           <div className={style.navLeft}>
//             <input type="text" placeholder="Enter folder name" />
//           </div>
//           <div className={style.navMiddle}>
//             <button onClick={() => navigate(`/form/${id}`)}>Flow</button>
//             <button className={style.Active}>Response</button>
//           </div>
//           <div className={style.navRight}>
//             <span>Light</span>
//             <Switch
//               onChange={handleChange}
//               checked={checked}
//               offColor="#cccccc"
//               onColor="#0000ff"
//               checkedIcon={false}
//               uncheckedIcon={false}
//               handleDiameter={10}
//               height={20}
//               width={48}
//             />
//             <span>Dark</span>
//             <button
//               style={{
//                 backgroundColor: "#1A5FFF",
//                 color: "white",
//                 cursor: "pointer",
//               }}
//               onClick={handleShare}
//             >
//               Share
//             </button>
//             <button
//               style={{
//                 backgroundColor: "#4ADE80CC",
//                 color: "white",
//                 cursor: "pointer",
//               }}
//             >
//               Save
//             </button>
//             <button
//               style={{
//                 backgroundColor: "transparent",
//                 color: "red",
//                 fontSize: "17px",
//                 padding: "6px 10px",
//                 cursor: "pointer",
//               }}
//               onClick={() => window.location.reload()}
//             >
//               X
//             </button>
//           </div>
//         </div>
//       </nav>
//       <div className={style.content}>
//         {formData ? (
//           <div>
//             {/* General Form Statistics */}
//             <div className={style.topper}>
//               <p>
//                 <strong>Views</strong> {formData.visitCount || "N/A"}
//               </p>

//               <p>
//                 <strong>starts</strong> {formData?.users?.length || 0}
//               </p>
//             </div>

//             <p>
//               <strong>Full Form Submissions:</strong>{" "}
//               {formData.fullFormSubmissions || "N/A"}
//             </p>
//             {/* User Submissions Table */}
//             {/* <h3>User Submissions</h3> */}
//             <table>
//               <thead>
//                 <tr>
//                   <th></th> {/* Index column header */}
//                   <th>Submitted At</th>
//                   {(() => {
//                     const fieldCounts = {};
//                     return (
//                       formData?.users?.[0]?.fieldSubmissions?.map(
//                         (field, index) => {
//                           const baseFieldName = field.fieldName || `Field`;
//                           fieldCounts[baseFieldName] =
//                             (fieldCounts[baseFieldName] || 0) + 1;
//                           const displayFieldName = `${baseFieldName} ${fieldCounts[baseFieldName]}`;
//                           return <th key={index}>{displayFieldName}</th>;
//                         }
//                       ) || <th>No Fields</th>
//                     );
//                   })()}
//                 </tr>
//               </thead>
//               <tbody>
//                 {formData?.users?.length > 0 ? (
//                   formData.users.map((user, userIndex) => (
//                     <tr key={userIndex}>
//                       {/* Index */}
//                       <td>{userIndex + 1}</td>
//                       {/* Submitted Date */}
//                       <td>
//                         {user.lastSubmissionAt
//                           ? new Date(user.lastSubmissionAt).toLocaleString(
//                               "en-US",
//                               {
//                                 month: "short",
//                                 day: "numeric",
//                                 hour: "numeric",
//                                 minute: "numeric",
//                                 hour12: true,
//                               }
//                             )
//                           : "N/A"}
//                       </td>
//                       {/* Field Submissions */}
//                       {(() => {
//                         const fieldCounts = {};
//                         return user.fieldSubmissions.map(
//                           (field, fieldIndex) => {
//                             const baseFieldName = field.fieldName || `Field`;
//                             fieldCounts[baseFieldName] =
//                               (fieldCounts[baseFieldName] || 0) + 1;
//                             const displayValue = field.fieldValue || "N/A";
//                             return <td key={fieldIndex}>{displayValue}</td>;
//                           }
//                         );
//                       })()}
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan={
//                         formData?.users?.[0]?.fieldSubmissions?.length + 2 || 2
//                       }
//                     >
//                       No Users Found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>

//           </div>

//         ) : (
//           <div className={style.noResponse}>
//             <p>No response available</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Result;

import { useEffect, useState } from "react";
import style from "../style/Result.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2"; // Import Doughnut chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function Result() {
  const navigate = useNavigate(); // Initialize useNavigate
  const { id } = useParams(); // Get the formId from the URL
  const [currentFormId, setCurrentFormId] = useState(null);
  const [formData, setFormData] = useState(null); // State to store form data
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === style.darkTheme : true; // Default to dark
  });

  // Fetch form data when the component mounts or when the formId changes
  useEffect(() => {
    if (id) {
      setCurrentFormId(id);
      fetchFormData(id); // Fetch data for the current formId
    }
  }, [id]);

  const fetchFormData = async (formId) => {
    try {
      const response = await fetch(`https://test-vite-app1.onrender.com/api/fetch/${formId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json(); // Parse the JSON response
      setFormData(data); // Set the fetched data
    } catch (error) {
      console.error("Error fetching form data:", error);
      setFormData(null); // Handle errors by setting null
    }
  };

  const handleShare = () => {
    const formLink = `${window.location.origin}/WhiteRes/${currentFormId}`; // Include formId in the link
    navigator.clipboard
      .writeText(formLink)
      .then(() => alert("Link copied to clipboard!"))
      .catch((err) => console.error("Error copying the link:", err));
  };

  // Prepare Doughnut chart data
  const doughnutData = {
    labels: ["completed", "Starts"],
    datasets: [
      {
        data: [
          formData?.fullFormSubmissions || 0,
          formData?.users?.length || 0,
        ],

        backgroundColor: ["#3B82F6", "#909090"],
        hoverBackgroundColor: ["#36A2EB", "#909079"],
      },
    ],
  };
  // Doughnut chart options
  const doughnutOptions = {
    responsive: true,
    cutout: "70%", // Adjust this value to change the width of the doughnut
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  const completionRate = formData
    ? ((formData.fullFormSubmissions / formData.users.length) * 100).toFixed(2)
    : 0;

    useEffect(() => {
      const theme = isDarkMode ? style.darkTheme : style.lightTheme;
      document.body.className = theme;
      localStorage.setItem("theme", theme);
    }, [isDarkMode]);
  
    // Toggle theme handler
    const toggleTheme = () => {
      setIsDarkMode((prevMode) => !prevMode);
    };

  return (
    <div>
      <nav>
        <div className={style.nav}>
          <div className={style.navLeft}>
            <input type="text" placeholder="Enter folder name" />
          </div>
          <div className={style.navMiddle}>
            <button onClick={() => navigate(`/form/${id}`)}>Flow</button>
            <button className={style.Active}>Response</button>
          </div>
          <div className={style.navRight}>
          <p>light</p>
      <div className={style.toggleSwitch} onClick={toggleTheme}>
        <div className={`${style.switch} ${isDarkMode ? style.switchOn : style.switchOff}`}></div>
      </div>
      <p>dark</p>
            <button
              style={{
                backgroundColor: "#1A5FFF",
                color: "white",
                cursor: "pointer",
              }}
              onClick={handleShare}
            >
              Share
            </button>
            <button
              style={{
                backgroundColor: "#4ADE80CC",
                color: "white",
                cursor: "pointer",
              }}
            >
              Save
            </button>
            <button
              style={{
                backgroundColor: "transparent",
                color: "red",
                fontSize: "17px",
                padding: "6px 10px",
                cursor: "pointer",
              }}
              onClick={() => window.location.reload()}
            >
              X
            </button>
          </div>
        </div>
        <div className={style.navLine}></div>
      </nav>
      <div className={style.content}>
        {formData ? (
          <div>
            {/* General Form Statistics */}
            <div className={style.topper}>
              <p>
                <strong>Views</strong> {formData.visitCount || "N/A"}
              </p>

              <p>
                <strong>Starts</strong> {formData?.users?.length || 0}
              </p>
            </div>
            <br />
            <br />

            {/* <p>
              <strong>Full Form Submissions:</strong>{" "}
              {formData.fullFormSubmissions || "N/A"}
            </p> */}

            {/* User Submissions Table */}
            <table className={style.userTable}>
              <thead>
                <tr>
                  <th></th> {/* Index column header */}
                  <th>Submitted At</th>
                  {(() => {
                    const fieldCounts = {};
                    return (
                      formData?.users?.[0]?.fieldSubmissions?.map(
                        (field, index) => {
                          const baseFieldName = field.fieldName || `Field`;
                          fieldCounts[baseFieldName] =
                            (fieldCounts[baseFieldName] || 0) + 1;
                          const displayFieldName = `${baseFieldName} ${fieldCounts[baseFieldName]}`;
                          return <th key={index}>{displayFieldName}</th>;
                        }
                      ) || <th>No Fields</th>
                    );
                  })()}
                </tr>
              </thead>
              <tbody>
                {formData?.users?.length > 0 ? (
                  formData.users.map((user, userIndex) => (
                    <tr key={userIndex}>
                      {/* Index */}
                      <td>{userIndex + 1}</td>
                      {/* Submitted Date */}
                      <td>
                        {user.lastSubmissionAt
                          ? new Date(user.lastSubmissionAt).toLocaleString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              }
                            )
                          : "N/A"}
                      </td>
                      {/* Field Submissions */}
                      {(() => {
                        const fieldCounts = {};
                        return user.fieldSubmissions.map(
                          (field, fieldIndex) => {
                            const baseFieldName = field.fieldName || `Field`;
                            fieldCounts[baseFieldName] =
                              (fieldCounts[baseFieldName] || 0) + 1;
                            const displayValue = field.fieldValue || "N/A";
                            return <td key={fieldIndex}>{displayValue}</td>;
                          }
                        );
                      })()}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={
                        formData?.users?.[0]?.fieldSubmissions?.length + 2 || 2
                      }
                    >
                      No Users Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <br />
            <br />

            {/* Doughnut Chart */}
            <div className={style.zero}>
              <div className={style.doughnutChart}>
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
              <div className={style.topper}>
                <p>
                  <strong>Completion Rate:</strong> {completionRate}%
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className={style.noResponse}>
            <p>No response available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
