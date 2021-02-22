import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <th>{text}</th>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  if (all > 0) {
    return (
      <table>
        <tbody>
          <Statistic text={"good"} value={good} />
          <Statistic text={"neutral"} value={neutral} />
          <Statistic text={"bad"} value={bad} />
          <Statistic text={"all"} value={good + neutral + bad} />
          <Statistic text={"average"} value={(good - bad) / all} />
          <Statistic text={"positive"} value={(good / all) * 100 + " %"} />
        </tbody>
      </table>
    );
  } else {
    return <p>No feedback given.</p>;
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
  };

  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleClickBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" onClick={handleClickGood} />
      <Button text="neutral" onClick={handleClickNeutral} />
      <Button text="bad" onClick={handleClickBad} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
