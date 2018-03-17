import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";

import logoURL from "./logo.png";

function Index() {
  const subjects = (window.__DATA__ || {}).subjects || [];

  return (
    <div className="index">
      <div className="index-logo">
        <a href="https://reacttraining.com">
          <img src={logoURL} />
        </a>
      </div>
      <table
        className="index-subjectsTable"
        cellSpacing={0}
        cellPadding={0}
      >
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index}>
              <td className="index-subjectNumber">{subject.number}</td>
              <td className="index-lecture">
                {subject.lectureHref ? (
                  <a
                    href={subject.lectureHref}
                    title={`${subject.name} lecture`}
                  >
                    {subject.name}
                  </a>
                ) : (
                  subject.name
                )}
              </td>
              <td className="index-exercise">
                {subject.exerciseHref ? (
                  <a
                    href={subject.exerciseHref}
                    title={`${subject.name} exercise`}
                  >
                    exercise
                  </a>
                ) : (
                  ""
                )}
              </td>
              <td className="index-solution">
                {subject.solutionHref ? (
                  <a
                    href={subject.solutionHref}
                    title={`${subject.name} solution`}
                  >
                    solution
                  </a>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById("app"));
