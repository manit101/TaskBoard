import { useState } from 'react';
import { inviteUserToProject } from '../../services/projectService';
import { AlertCircle } from 'lucide-react';
import Modal from '../common/Modal';
import '../tasks/Tasks.css';

function InviteMemberModal({ projectId, onClose, onMemberInvited }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await inviteUserToProject(projectId, email);
      onMemberInvited();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to invite user');
    } finally {
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
        {isSubmitting ? 'Sending Invite...' : 'Send Invite'}
      </button>
    </div>
  );
  
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Invite Team Member"
      size="small"
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
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter team member's email"
            required
            autoFocus
            className="focus:ring-[#547792] focus:border-[#547792]"
          />
        </div>
      </form>
    </Modal>
  );
}

export default InviteMemberModal;
