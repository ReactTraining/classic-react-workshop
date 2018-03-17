import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";

import logoURL from "./logo.png";

function Index() {
  const subjects = (window.__DATA__ || {}).subjects || [];

  return (
    <div className="index">
      <header className="index-header">
        <a href="https://reacttraining.com">
          <img src={logoURL} alt="React Training" />
        </a>
      </header>
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
                {subject.lecture ? (
                  <a
                    href={subject.lecture}
                    title={`${subject.name} lecture`}
                  >
                    {subject.name}
                  </a>
                ) : (
                  subject.name
                )}
              </td>
              <td className="index-exercise">
                {subject.exercise && (
                  <a
                    href={subject.exercise}
                    title={`${subject.name} exercise`}
                  >
                    exercise
                  </a>
                )}
              </td>
              <td className="index-solution">
                {subject.solution && (
                  <a
                    href={subject.solution}
                    title={`${subject.name} solution`}
                  >
                    solution
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className="index-footer">
        &copy; 2015-{new Date().getFullYear()}{" "}
        <a href="https://reacttraining.com" title="React Training">
          React Training LLC
        </a>, all rights reserved
      </footer>
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById("app"));
