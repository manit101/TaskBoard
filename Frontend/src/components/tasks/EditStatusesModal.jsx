import { useState } from 'react';
import { updateProjectStatuses } from '../../services/taskService';
import { AlertCircle, ArrowUp, ArrowDown, X } from 'lucide-react';
import Modal from '../common/Modal';
import './Tasks.css';

function EditStatusesModal({ project, onClose, onStatusesUpdated }) {
  const [statuses, setStatuses] = useState([...project.statuses]);
  const [newStatus, setNewStatus] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleAddStatus = () => {
    if (!newStatus.trim()) return;
    
    if (statuses.includes(newStatus.trim())) {
      setError('This status already exists');
      return;
    }
    
    setStatuses([...statuses, newStatus.trim()]);
    setNewStatus('');
    setError('');
  };
  
  const handleRemoveStatus = (indexToRemove) => {
    if (statuses.length <= 1) {
      setError('Project must have at least one status');
      return;
    }
    
    setStatuses(statuses.filter((_, index) => index !== indexToRemove));
  };
  
  const handleMoveUp = (index) => {
    if (index === 0) return;
    
    const newStatuses = [...statuses];
    [newStatuses[index - 1], newStatuses[index]] = [newStatuses[index], newStatuses[index - 1]];
    setStatuses(newStatuses);
  };
  
  const handleMoveDown = (index) => {
    if (index === statuses.length - 1) return;
    
    const newStatuses = [...statuses];
    [newStatuses[index], newStatuses[index + 1]] = [newStatuses[index + 1], newStatuses[index]];
    setStatuses(newStatuses);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (statuses.length === 0) {
      setError('Project must have at least one status');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await updateProjectStatuses(project._id, statuses);
      onStatusesUpdated();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update statuses');
      setIsSubmitting(false);
    }
  };

  const modalFooter = (
    <div className="form-footer">
      <button 
        type="button" 
        className="modal-secondary-btn" 
        onClick={onClose}
        disabled={isSubmitting}
      >
        Cancel
      </button>
      <button 
        type="button"
        onClick={handleSubmit}
        className={`modal-primary-btn ${isSubmitting ? 'loading-btn' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Edit Project Statuses"
      size="medium"
      footer={modalFooter}
    >
      <form className="modal-form">
        {error && (
          <div className="error-message">
            <AlertCircle size={18} />
            {error}
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="newStatus">Add New Status</label>
          <div className="flex gap-3">
            <input
              type="text"
              id="newStatus"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              placeholder="Enter status name"
              className="flex-1"
            />
            <button 
              type="button"
              onClick={handleAddStatus}
              className="modal-primary-btn !py-2"
            >
              Add
            </button>
          </div>
        </div>
        
        <div className="form-section modal-section">
          <h3 className="section-title">Current Statuses</h3>
          <div className="status-list">
            {statuses.map((status, index) => (
              <div key={index} className="status-item">
                <span className="status-name">{status}</span>
                <div className="status-actions">
                  <button 
                    type="button"
                    className="icon-btn"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button 
                    type="button"
                    className="icon-btn"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === statuses.length - 1}
                  >
                    <ArrowDown size={16} />
                  </button>
                  <button 
                    type="button"
                    className="icon-btn remove"
                    onClick={() => handleRemoveStatus(index)}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="info-message">
          <p className="text-sm text-[#64748b] mt-4">
            <strong>Note:</strong> Tasks in removed statuses will be moved to the first status.
          </p>
        </div>
      </form>
    </Modal>
  );
}

export default EditStatusesModal;
