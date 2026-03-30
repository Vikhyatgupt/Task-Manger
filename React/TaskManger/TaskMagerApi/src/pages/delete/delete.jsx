import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './delete.css';

function Delete() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8080/getid/${id}`);
      setTask(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Task not found or server error.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete(`http://localhost:8080/delete/${id}`);
      navigate('/showall');
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete task. Please try again.');
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  const getStatusClass = (status) => {
    if (!status) return 'status-default';
    const s = status.toLowerCase();
    if (['ok', 'done', 'completed'].includes(s)) return 'status-done';
    if (['active', 'go'].includes(s))            return 'status-active';
    if (['pending', 'check'].includes(s))        return 'status-pending';
    return 'status-default';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
      });
    } catch { return dateStr; }
  };

  return (
    <div className="delete-page">
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* Header */}
      <header className="delete-header">
        <button className="back-btn" onClick={() => navigate('/showall')}>
          ← Back to Tasks
        </button>
        <div className="badge">Task Detail</div>
        <h1 className="delete-title">Task Overview</h1>
        <p className="delete-subtitle">Review and manage this task</p>
      </header>

      {/* Loading */}
      {loading && (
        <div className="detail-card skeleton-card">
          <div className="sk sk-title" />
          <div className="sk sk-line" />
          <div className="sk sk-line sk-short" />
          <div className="sk sk-line" />
          <div className="sk sk-line sk-short" />
          <div className="sk sk-btn" />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <p>{error}</p>
          <button className="btn-back" onClick={() => navigate('/showall')}>
            ← Go Back
          </button>
        </div>
      )}

      {/* Task Card */}
      {!loading && task && !error && (
        <div className="detail-card">

          {/* Card top */}
          <div className="card-top">
            <span className="card-id">#{task.id}</span>
            <span className={`status-badge ${getStatusClass(task.status)}`}>
              {task.status || 'Unknown'}
            </span>
          </div>

          {/* Task name */}
          <h2 className="task-name">{task.task || 'Untitled Task'}</h2>

          {/* Date row */}
          <div className="date-strip">
            <div className="date-block">
              <span className="date-label">Start Date</span>
              <span className="date-value">{formatDate(task.startDate)}</span>
            </div>
            <div className="date-arrow">→</div>
            <div className="date-block">
              <span className="date-label">End Date</span>
              <span className="date-value">{formatDate(task.endDate)}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="card-divider" />

          {/* Action buttons */}
          <div className="action-row">
            <button
              className="btn-outline"
              onClick={() => navigate('/showall')}
            >
              ← Back
            </button>
            <button
              className="btn-danger"
              onClick={() => setConfirmOpen(true)}
            >
              🗑 Delete Task
            </button>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {confirmOpen && (
        <div className="modal-overlay" onClick={() => setConfirmOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">🗑</div>
            <h3>Delete this task?</h3>
            <p>This action cannot be undone. Task <strong>#{task?.id}</strong> will be permanently removed.</p>
            <div className="modal-actions">
              <button
                className="btn-outline"
                onClick={() => setConfirmOpen(false)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="btn-danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting…' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Delete;