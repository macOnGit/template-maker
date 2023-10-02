import PropTypes from 'prop-types';
import Toast from 'react-bootstrap/Toast';

function AutoHideToast({ setToastData, toastData }) {
  return (
    <Toast
      bg={toastData.background}
      show={toastData.show}
      onClose={() => setToastData({ show: false })}
      delay={3000}
      autohide
    >
      <Toast.Header>
        <strong className="me-auto">Message</strong>
      </Toast.Header>
      <Toast.Body data-cy="message">{toastData.message}</Toast.Body>
    </Toast>
  );
}
AutoHideToast.propTypes = {
  setToastData: PropTypes.func,
  toastData: PropTypes.object,
};

export default AutoHideToast;
