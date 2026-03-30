 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './ADD.css';

function AddTask() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    task: '',
    startDate: '',
    endDate: '',
    status: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.task.trim()) return setError('Task name is required.');
    if (!form.startDate)   return setError('Start date is required.');
    if (!form.endDate)     return setError('End date is required.');
    if (!form.status.trim()) return setError('Status is required.');

    try {
      setLoading(true);
      await axios.post('http://localhost:8080/add', form);
      setForm({ task: '', startDate: '', endDate: '', status: '' });
      navigate('/showall');
    } catch (err) {
      console.error('Submit error:', err);
      setError('Failed to add task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-page">
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="card">
        {/* Glow line via CSS ::before */}

        <div className="card-header">
          <div className="badge">New Task</div>
          <h1>Add a Task</h1>
          <p className="subtitle">Fill in the details below to create a new task</p>
        </div>

        <form className="form-container" onSubmit={handleSubmit}>

          <div className="field">
            <label htmlFor="task-name">Task Name</label>
            <input
              id="task-name"
              name="task"
              type="text"
              placeholder="e.g. Design homepage mockup"
              value={form.task}
              onChange={handleChange('task')}
            />
          </div>

          <div className="field">
            <label htmlFor="task-status">Status</label>
            <input
              id="task-status"
              name="status"
              type="text"
              placeholder="e.g. Pending, Active, Done"
              value={form.status}
              onChange={handleChange('status')}
            />
          </div>

          <div className="form-divider" />

          <div className="field">
            <label htmlFor="start-date">Start Date</label>
            <input
              id="start-date"
              name="startDate"
              type="date"
              value={form.startDate}
              onChange={handleChange('startDate')}
            />
          </div>

          <div className="field">
            <label htmlFor="end-date">End Date</label>
            <input
              id="end-date"
              name="endDate"
              type="date"
              value={form.endDate}
              onChange={handleChange('endDate')}
            />
          </div>

          {/* Error message */}
          {error && <p className="error-msg">{error}</p>}

          <div className="btn-row">
            <button
              className="btn-cancel"
              type="button"
              onClick={() => navigate('/showall')}
            >
              Cancel
            </button>
            <button
              className="btn-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Saving…' : 'Save Task →'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddTask;