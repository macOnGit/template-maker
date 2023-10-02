import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import SharedTemplateForm from './templateForm';

const handleConfig = {
  url: '/api/templates/',
  method: 'POST',
  goodMessage: 'Template Created!',
  goodBackground: 'success',
  badMessage: 'A Template could not be created at this time',
  badBackground: 'warning',
};

function TemplateForm({ setToastData, forEditing }) {
  const { id } = useParams();
  if (forEditing) {
    handleConfig.url = `/api/templates/${id}/`;
    handleConfig.method = 'PUT';
    handleConfig.goodMessage = 'Template Edited!';
    handleConfig.badMessage = 'The template could not be edited at this time';
  }

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const csrftoken = Cookies.get('csrftoken');
    const deleteTemplate = event.nativeEvent.submitter?.name === 'delete';
    if (deleteTemplate) {
      handleConfig.goodMessage = 'Template deleted';
      handleConfig.method = 'DELETE';
    }
    const formEls = event.target.elements;
    const result = await fetch(handleConfig.url, {
      credentials: 'same-origin',
      method: handleConfig.method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({
        template_name: formEls['template-name'].value,
        template_text: formEls['template-text'].value,
        template_author: formEls['template-author'].value || 'Anonymous',
      }),
    });
    if (result.ok) {
      setToastData({
        show: true,
        message: handleConfig.goodMessage,
        background: handleConfig.goodBackground,
      });
    } else {
      setToastData({
        show: true,
        message: handleConfig.badMessage,
        background: handleConfig.badBackground,
      });
    }
    navigate('/');
  };

  return (
    <SharedTemplateForm
      handleSubmit={handleSubmit}
      setToastData={setToastData}
      id={id}
      forEditing={forEditing}
    />
  );
}
TemplateForm.propTypes = {
  setToastData: PropTypes.func,
  forEditing: PropTypes.bool,
};

export default TemplateForm;
