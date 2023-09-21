import { useState } from "react";

const StaticticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.good == 0 && props.bad == 0 && props.neutral == 0) {
    return <div>No feedback given</div>;
  } else {
    return (
      <div>
        <table>
          <tbody>
            <StaticticsLine text="good" value={props.good} />
            <StaticticsLine text="neutral" value={props.neutral} />
            <StaticticsLine text="bad" value={props.bad} />
            <StaticticsLine text="all" value={props.all} />
            <StaticticsLine text="average" value={props.average} />
            <StaticticsLine text="positive" value={props.positives} />
          </tbody>
        </table>
      </div>
    );
  }
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countAverage = (good, bad, all) => {
    if (good == 0 && bad == 0) {
      return 0;
    } else {
      return (good * 1 + bad * -1) / all;
    }
  };

  const countPositives = (good, all) => {
    if (good == 0) {
      return 0;
    } else {
      return good * (100 / all);
    }
  };

  const countAll = (good, bad, neutral) => {
    return good + bad + neutral;
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

      <h1>Statistics</h1>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        all={countAll(good, neutral, bad)}
        average={countAverage(good, bad, countAll(good, neutral, bad))}
        positives={countPositives(good, countAll(good, neutral, bad))}
      />
    </div>
  );
};

export default App;
