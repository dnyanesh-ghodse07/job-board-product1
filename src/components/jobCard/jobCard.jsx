/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import "./style.css";
const JobCard = ({ job }) => {
  const { title, type, url, by, time, score } = job;

  return (
    <div className="card">
      <div className="header">
        <h2>
          <a href={url}>{title}</a>
        </h2>
        <span className="type">{type}</span>
      </div>
      <div className="desc">
        <div>By : {by}</div>
        <p>Date : {new Date(time).toLocaleDateString()}</p>
        <div>Score : {score}</div>
      </div>
    </div>
  );
};

export default JobCard;
