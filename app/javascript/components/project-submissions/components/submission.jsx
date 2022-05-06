import React, {
  useState, useMemo, useContext, forwardRef,
} from 'react';
import { object, func, bool } from 'prop-types';

import Modal from './modal';
import EditForm from './edit-form';
import ProjectSubmissionContext from '../ProjectSubmissionContext';
import SubmissionTitle from './submission-title';
import Like from './like';

const noop = () => { };

const submissionItemClassnames = `
  relative py-4
  border-solid border-t-1 border-gray-300
  flex flex-col md:flex-row justify-between items-center
`;
const submissionIconClassnames = `
  absolute md:relative 
  top-1.5 md:top-0 right-0
`;

const Submission = forwardRef(({
  submission, handleUpdate, onFlag, handleDelete, isDashboardView, handleLikeToggle,
}, ref) => {
  const { userId } = useContext(ProjectSubmissionContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const isCurrentUsersSubmission = useMemo(() => (
    userId === submission.user_id
  ), [userId, submission.user_id]);

  const toggleShowEditModal = () => setShowEditModal((prevShowEditModal) => !prevShowEditModal);
  const livePreview = submission.live_preview_url.length > 0;

  return (
<<<<<<< HEAD
    <div className="submissions__item" ref={ref} data-test-id="submission-item">
      <div className="submissions__left-container">
=======
    <div className={submissionItemClassnames} ref={ref} data-test-id="submission-item">
      <div className="flex items-center mb-4 md:mb-0">
>>>>>>> 7d4aec5c (Move submission styles inside React component)
        <Like submission={submission} handleLikeToggle={handleLikeToggle} />
        <p className="submissions__submission-title">
          <SubmissionTitle
            submission={submission}
            isCurrentUsersSubmission={isCurrentUsersSubmission}
            isDashboardView={isDashboardView}
          />
        </p>
      </div>

      <div className="submissions__actions">
        <a
          href={submission.repo_url}
          target="_blank"
          rel="noreferrer"
          className="submissions__button"
          data-test-id="view-code-btn"
        >
          View Code
        </a>
        {livePreview
          && (
          <a
            href={submission.live_preview_url}
            target="_blank"
            rel="noreferrer"
            className="submissions__button"
            data-test-id="live-preview-btn"
          >
            Live Preview
          </a>
          )}

        {isCurrentUsersSubmission
          ? (
            <div
<<<<<<< HEAD
              className="submissions__button--edit"
=======
              className={`${submissionIconClassname} text-gray-500 hover:text-black`}
>>>>>>> 7d4aec5c (Move submission styles inside React component)
              onMouseDown={toggleShowEditModal}
              role="button"
              tabIndex={0}
              aria-label="edit-button"
              data-test-id="edit-submission-btn"
            />
          )
          : (
            <button
<<<<<<< HEAD
              className="link-button submissions__flag hint--top"
=======
              className={`${submissionIconClassnames} text-gray-300 hint--top`}
>>>>>>> 7d4aec5c (Move submission styles inside React component)
              aria-label="Report submission"
              type="button"
              data-test-id="flag-btn"
              onClick={(e) => { e.preventDefault(); onFlag(submission); }}
            >
              <i className="fas fa-flag" />
            </button>
          )}
      </div>

      <Modal show={showEditModal} handleClose={toggleShowEditModal}>
        <EditForm
          submission={submission}
          onSubmit={handleUpdate}
          onDelete={handleDelete}
          onClose={toggleShowEditModal}
        />
      </Modal>
    </div>
  );
});

Submission.defaultProps = {
  onFlag: noop,
  isDashboardView: false,
};

Submission.propTypes = {
  submission: object.isRequired,
  handleUpdate: func.isRequired,
  onFlag: func,
  handleDelete: func.isRequired,
  handleLikeToggle: func.isRequired,
  isDashboardView: bool,
};

export default Submission;
