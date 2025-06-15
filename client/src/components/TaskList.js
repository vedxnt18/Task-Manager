import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, updateTask, deleteTask, toggleTaskStatus } from '../actions/taskActions';
import TaskForm from './TaskForm';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateTask({ ...editTask }));
    setEditTask(null);
  };

  const handleChange = (e) => {
    setEditTask({ ...editTask, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleToggleStatus = (id) => {
    dispatch(toggleTaskStatus(id));
  };

  return (
    <div>
      <h2>Tasks</h2>
      <TaskForm />
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task._id} className="list-group-item">
              {editTask && editTask._id === task._id ? (
                <form onSubmit={handleUpdate}>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={editTask.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <textarea
                      name="description"
                      className="form-control"
                      value={editTask.description}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-success btn-sm me-2">Save</button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditTask(null)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div className="d-flex justify-content-between align-items-center">
                  <div className={task.status === 'Completed' ? 'task-completed' : ''}>
                    <h5>{task.title}</h5>
                    <p>{task.description}</p>
                    <small>Status: {task.status}</small>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleToggleStatus(task._id)}
                    >
                      Toggle Status
                    </button>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;