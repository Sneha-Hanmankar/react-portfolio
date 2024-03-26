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
        expand: true,
        name: "Yashasvi",
        age: "24",
        gender: "Female",
        religion: "Hindu",
        nationality: "Indian",
        actions: "editable",
        //comments:['CommentA', 'CommentB', 'CommentC']
      },
      {
        id: 1,
        expand: true,
        name: "Tom",
        age: "31",
        gender: "Male",
        religion: "Christian",
        nationality: "USA",
        actions: "editable",
        //comments:['CommentA', 'CommentB', 'CommentC']
      },
    ],
  },
  {
    sectionB: [
      {
        id: 0,
        expand: false,
        subject1: "English",
        subject2: "Maths",
        subject3: "Science",
        subject4: "Geography",
        actions: "editable",
        //comments:['CommentA', 'CommentB', 'CommentC']
      },
      {
        id: 1,
        expand: true,
        subject1: "Physics",
        subject2: "Chemistry",
        subject3: "Zoology",
        subject4: "Biology",
        actions: "editable",
        //comments:['CommentA', 'CommentB', 'CommentC']
      },
    ],
  },
  {
    sectionC: [
      {
        id: 0,
        expand: false,
        addrL1: "New High",
        addrL2: "Near Fountain Sq",
        city: "St.Louis",
        state: "Columbia",
        pincode: "100034",
        actions: "editable",
        //comments:['CommentA', 'CommentB', 'CommentC']
      },
    ],
  },
];

export const Table = () => {
  const [showRow, setShowRow] = React.useState({ rowId: -1, show: false });
  const toggleData = (val) => {
    setShowRow((prevState) => ({
      ...prevState,
      rowId: val,
      show: !prevState.show,
    }));
  };
  console.log("showRow", showRow);

  return (
    <>
      <div className="row">
        {data &&
          data?.length > 0 &&
          data.map((mainSection) => {
            return (
              <>
                <div className="table-container u-center-text u-margin-bottom-small">
                  <div>
                    <h3 className="heading-tertiary">
                      {Object.keys(mainSection)}
                    </h3>
                  </div>
                  <div className="t-head">
                    {Object.values(mainSection) &&
                      Object.keys(
                        [Object.values(Object.values(mainSection)[0])][0][0]
                      ).map((colName) => {
                        return (
                          <>
                            {colName === "expand" ? (
                              <div className="t-heading"></div>
                            ) : colName === "id" ? (
                              <div style={{ display: "none" }}></div>
                            ) : (
                              <div className="t-heading">{colName}</div>
                            )}
                          </>
                        );
                      })}
                  </div>
                  {[Object.values(Object.values(mainSection)[0])][0].map(
                    (obj) => {
                      return (
                        <>
                          <div
                            className="t-row"
                            onClick={(val) => {
                              console.log("heree", obj);
                              toggleData(obj.id);
                            }}
                          >
                            {Object.values(obj).map((value) => {
                              return (
                                <>
                                  {typeof value === "number" ? (
                                    <span className="t-data">Expand</span>
                                  ) : value === "editable" ? (
                                    <td className="t-data">
                                      <span>
                                        <button>Edit</button>
                                      </span>
                                      <span>
                                        <button>Delete</button>
                                      </span>
                                    </td>
                                  ) : (
                                    <td className="t-data">{value}</td>
                                  )}
                                </>
                              );
                            })}
                          </div>
                          <div
                            className="t-row t-row--2"
                            style={{
                              display:
                                showRow.show && showRow.rowId === obj.id
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <div>{JSON.stringify(obj)}</div>
                          </div>
                        </>
                      );
                    }
                  )}
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};
