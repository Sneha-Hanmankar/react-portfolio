import React from "react";
import "../src/sass/pages/_home.scss";
import "../src/sass/base/_typography.scss";
import "../src/sass/base/_utilities.scss";
import "../src/sass/components/_table.scss";

const data = [
  {
    sectionA: [
      {
        id: 0,
        name: "Yashasvi",
        age: "24",
        gender: "Female",
        contact: 9191919191,
        nationality: "Indian",
        actions: "editable",
        comments: "CommentACommentC",
        toggleComments: true,
        toggleSection: true,
      },
      {
        id: 1,
        name: "Tom",
        age: "31",
        gender: "Male",
        contact: 81818181818,
        nationality: "American",
        actions: "editable",
        comments: "CommentXCommentY",
        toggleComments: false,
        toggleSection: true,
        //comments:['CommentA', 'CommentB', 'CommentC']
      },
      {
        id: 2,
        name: "Tommy",
        age: "41",
        gender: "Male",
        contact: 71717177171,
        nationality: "Australian",
        actions: "editable",
        comments: "CommentYCommentZ",
        toggleComments: true,
        toggleSection: true,
        //comments:['CommentA', 'CommentB', 'CommentC']
      },
    ],
  },
  {
    sectionB: [
      {
        id: 0,
        subject1: "English",
        subject2: "Maths",
        subject3: "Science",
        subject4: "Geography",
        actions: "editable",
        toggleComments: true,
        comments: "CommentPCommentO",
        toggleSection: true,
        //comments:['CommentA', 'CommentB', 'CommentC']
      },
      {
        id: 1,
        subject1: "Physics",
        subject2: "Chemistry",
        subject3: "Zoology",
        subject4: "Biology",
        actions: "editable",
        toggleComments: true,
        comments: "CommentPCommentQ",
        toggleSection: true,
        //comments:['CommentA', 'CommentB', 'CommentC']
      },
    ],
  },
  {
    sectionC: [
      {
        id: 0,
        addrL1: "New High",
        addrL2: "Near Fountain Sq",
        city: "St.Louis",
        state: "Columbia",
        pincode: "100034",
        region: "West",
        comments: "CommentZCommentZ",
        latitude: "10degNorth",
        longitude: "25degSouth",
        actions: "editable",
        //comments:['CommentA', 'CommentB', 'CommentC'],
        toggleComments: true,
        toggleSection: true,
      },
    ],
  },
];

export const Table1 = () => {
  const [showRow, setShowRow] = React.useState({
    rowId: -1,
    show: false,
    name: "",
  });
  const [newArr, setNewArr] = React.useState([]); // State to hold transformed data

  const toggleSection = (val) => {
    const updatedArr = newArr.map((sect) => {
      if (sect.sectionName === val) {
        const updatedSectionData = sect.sectionData.map((sectItem) => ({
          ...sectItem,
          toggleSection: !sectItem.toggleSection,
        }));
        return {
          ...sect,
          sectionData: updatedSectionData,
        };
      }
      return sect;
    });
    setNewArr(updatedArr);
  };

  const toggleRow = (rowData, sectObj) => {
    const updatedArr = newArr.map((mapItem) => {
      if (sectObj.sectionName === mapItem.sectionName) {
        const newObj = mapItem.sectionData[rowData];
        newObj.toggleComments = !mapItem.sectionData[rowData].toggleComments;
        mapItem.sectionData[rowData] = newObj;
      }
      return mapItem;
    });
    setNewArr(updatedArr);
  };

  const transformData = (data) => {
    const newObj = {};
    newObj.sectionName = Object.keys(data)[0];
    newObj.sectionLength = Object.values(data)[0].length;
    newObj.sectionData = Object.values(data)[0];
    console.log(newObj);
    setNewArr((prevArr) => [...prevArr, newObj]); // Push transformed object into newArr
  };

  React.useEffect(() => {
    // Function to transform data
    const transformData = (section) => {
      const newObj = {
        sectionName: Object.keys(section)[0],
        sectionLength: Object.values(section)[0].length,
        sectionData: Object.values(section)[0],
      };
      return newObj;
    };

    // Transform each section in data array and set newArr
    setNewArr(data.map(transformData));
  }, [data]);

  console.log("check", newArr);

  return (
    <>
      {newArr &&
        newArr.length > 0 &&
        newArr.map((tableObj) => {
          return (
            <>
              <section class="table-sections">
                {tableObj.sectionData[0].toggleSection ? (
                  <>
                    <div class="u-center-text">
                      <h3
                        class="heading-secondary"
                        onClick={(val) => toggleSection(tableObj.sectionName)}
                      >
                        {tableObj.sectionName}
                      </h3>
                    </div>
                    <div className="t-head">
                      {Object?.keys(tableObj?.sectionData[0]).map(
                        (colNames) => {
                          return (
                            <>
                              {colNames === "comments" ? (
                                <div style={{ display: "none" }}></div>
                              ) : colNames === "toggleComments" ? (
                                <div style={{ display: "none" }}></div>
                              ) : colNames === "toggleSection" ? (
                                <div style={{ display: "none" }}></div>
                              ) : colNames === "id" ? (
                                <div className="t-heading"></div>
                              ) : (
                                <div className="t-heading">{colNames}</div>
                              )}
                            </>
                          );
                        }
                      )}
                    </div>
                    <div>
                      {Object.keys(tableObj.sectionData).map(
                        (rowItem, rowIndex) => {
                          return (
                            <>
                              <div
                                className="t-row"
                                key={rowIndex}
                                onClick={(val) => toggleRow(rowItem, tableObj)}
                              >
                                {Object.values(
                                  tableObj.sectionData[rowItem]
                                ).map((rowData, cellIndex) => {
                                  return (
                                    <>
                                      {typeof rowData === "boolean" ? (
                                        <span
                                          style={{ display: "none" }}
                                        ></span>
                                      ) : cellIndex === 7 ? (
                                        <span
                                          style={{ display: "none" }}
                                        ></span>
                                      ) : rowData === "editable" ? (
                                        <td className="t-data">
                                          <span>
                                            <button>Edit</button>
                                          </span>
                                          <span>
                                            <button>Delete</button>
                                          </span>
                                        </td>
                                      ) : (
                                        <td className="t-data" key={cellIndex}>
                                          {rowData}
                                        </td>
                                      )}
                                    </>
                                  );
                                })}
                              </div>

                              <div
                                className="t-row t-row--2"
                                style={{
                                  display: tableObj.sectionData[rowItem]
                                    .toggleComments
                                    ? "block"
                                    : "none",
                                }}
                              >
                                {Object.values(
                                  tableObj.sectionData[
                                    rowItem
                                  ].comments.toString()
                                )}
                              </div>
                            </>
                          );
                        }
                      )}
                    </div>
                  </>
                ) : (
                  <span onClick={(val) => toggleSection(tableObj.sectionName)}>
                    Expand and Collapse Me
                  </span>
                )}
              </section>
            </>
          );
        })}
    </>
  );
};
