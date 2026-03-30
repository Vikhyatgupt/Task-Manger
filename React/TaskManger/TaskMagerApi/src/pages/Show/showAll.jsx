 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./show.css";

function ShowAll() {
  const navigate = useNavigate();
  const [Tasks, setTasks] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/getall");
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch error: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSearch = async (searchId) => {
    if (!searchId) return alert("Please enter an ID to search.");
    try {
      navigate(`/delete/${searchId}`);
    } catch (err) {
      alert(err);
    }
  };

  const getStatusClass = (status) => {
    if (!status) return "status-default";
    const s = status.toLowerCase();
    if (s === "ok" || s === "done" || s === "completed") return "status-done";
    if (s === "pending" || s === "check") return "status-pending";
    if (s === "go" || s === "active") return "status-active";
    return "status-default";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="page-container">
      {/* Background orbs */}
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
      <div className="bg-orb orb-3" />

      {/* Header */}
      <header className="page-header">
        <div className="header-badge">TASK MANAGER</div>
        <h1 className="title">Your Task Board</h1>
        <p className="subtitle">
          {loading ? "Loading..." : `${Tasks.length} task${Tasks.length !== 1 ? "s" : ""} total`}
        </p>
      </header>

      {/* Search & Actions */}
      <div className="toolbar">
        <div className={`search-wrapper ${searchFocused ? "focused" : ""}`}>
          <span className="search-icon">⌕</span>
          <input
            id="task-search"
            name="task-search"
            type="text"
            placeholder="Search by ID…"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(id)}
          />
        </div>
        <button className="btn btn-search" onClick={() => handleSearch(id)}>
          Search
        </button>
        <button className="btn btn-add" onClick={() => navigate("/add")}>
          + Add Task
        </button>
      </div>

      {/* Cards */}
      {loading ? (
        <div className="loading-grid">
          {[...Array(8)].map((_, i) => (
            <div className="task-card skeleton" key={i} />
          ))}
        </div>
      ) : Tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <p>No tasks found. Add your first task!</p>
          <button className="btn btn-add" onClick={() => navigate("/add")}>
            + Add Task
          </button>
        </div>
      ) : (
        <div className="card-container">
          {Tasks.map((T, index) => (
            <div
              className="task-card"
              key={T.id}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="card-top">
                <span className="card-id">#{T.id}</span>
                <span className={`status-badge ${getStatusClass(T.status)}`}>
                  {T.status || "Unknown"}
                </span>
              </div>

              <h3 className="card-title">{T.task || "Untitled Task"}</h3>

              <div className="card-dates">
                <div className="date-row">
                  <span className="date-label">Start</span>
                  <span className="date-value">{formatDate(T.startDate)}</span>
                </div>
                <div className="date-divider" />
                <div className="date-row">
                  <span className="date-label">End</span>
                  <span className="date-value">{formatDate(T.endDate)}</span>
                </div>
              </div>

              <button
                className="select-btn"
                onClick={() => navigate(`/delete/${T.id}`)}
              >
                View Details →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowAll;