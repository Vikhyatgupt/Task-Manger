 import { useNavigate } from "react-router-dom";
import './home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="container">
        {/* Glow line rendered via CSS ::before */}

        <div className="badge">Task Manager</div>

        <h1 className="home-title">Organise Your Work</h1>

        <p className="tagline">
          Track tasks, set deadlines, and stay on top of everything —
          all in one clean dashboard.
        </p>

        <div className="ADD">
          <button className="btn add-btn" onClick={() => navigate("/add")}>
            + Add Task
          </button>
          <button className="btn show-btn" onClick={() => navigate("/showall")}>
            View All Tasks
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;