import { useEffect, useState } from "react";
import "./App.css";
import JobCard from "./components/jobCard/jobCard";

function App() {
  const PAGE_SIZE = 6;
  const [jobIds, setJobIds] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(0);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  async function fetchJobIds(currentPage) {
    let jobs = jobIds;
    if (!jobs) {
      const res = await fetch(
        "https://hacker-news.firebaseio.com/v0/jobstories.json"
      );
      jobs = await res.json();
      setJobIds(jobs);
    }

    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    return jobs?.slice(start, end);
  }

  async function fetchJobs(currentPage) {
    const jobIdsForPage = await fetchJobIds(currentPage);
    setFetching(true);

    const jobsForPage = await Promise.all(
      jobIdsForPage.map(async (id) => {
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        return await res.json();
      })
    );
    setJobs([...jobs, ...jobsForPage]);
    setFetching(false);
  }

  return (
    <>
      <h1>Job Board</h1>
      <div className="job_list">
        {jobs.map((job) => {
          return <JobCard key={job.id} job={job} />;
        })}
        {jobs.length / PAGE_SIZE > page && (
          <button onClick={() => setPage((prev) => prev + 1)}>
            {fetching ? "Loading..." : "Show more"}
          </button>
        )}
      </div>
    </>
  );
}

export default App;
