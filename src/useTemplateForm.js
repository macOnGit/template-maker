import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import './useTemplateForm.css';
import log from 'loglevel';
import remote from 'loglevel-plugin-remote';

remote.apply(log, { url: '/api/logger', format: remote.json });

const spanWrap = (text, key, fieldNumber) => {
  const isField = typeof fieldNumber !== 'undefined';
  return (
    <span
      key={key}
      title={isField ? `field ${fieldNumber + 1}` : ''}
      className={isField ? 'yellow-text' : ''}
    >
      {text}
    </span>
  );
};

const Template = ({ setToastData }) => {
  let spanKey = 0;
  let fieldNumber = 0;
  const { id } = useParams();
  const allSpans = useRef(null);
  const [templateName, setTemplateName] = useState('');
  const [sentence, setSentence] = useState('');
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e, i) => {
    setFields([...fields.slice(0, i), e.target.value, ...fields.slice(i + 1)]);
  };

  const handleFocus = (e, i) => {
    if (e.target.value === '__') {
      setFields([...fields.slice(0, i), '', ...fields.slice(i + 1)]);
    }
  };

  const handleBlur = (e, i) => {
    if (e.target.value === '') {
      setFields([...fields.slice(0, i), '__', ...fields.slice(i + 1)]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const compiledText = allSpans.current.textContent;
    navigate('/compiled', { state: compiledText });
  };

  const parseText = (_sentence, _spans) => {
    if (_sentence.length) {
      const underscoreIndex = _sentence.indexOf('__');
      spanKey += 1;

      if (underscoreIndex === 0) {
        _spans.push(spanWrap(fields[fieldNumber], spanKey, fieldNumber));
        fieldNumber += 1;
        parseText(_sentence.slice(2), _spans);
      } else if (underscoreIndex > 0) {
        const text = _sentence.slice(0, underscoreIndex);
        _spans.push(spanWrap(text, spanKey));
        parseText(_sentence.slice(underscoreIndex), _spans);
      } else {
        _spans.push(spanWrap(_sentence, spanKey));
        parseText('', _spans);
      }
    }
    return _spans;
  };

  useEffect(() => {
    fetch(`/api/templates/${id}`)
      .then((res) => {
        if (res.status === 404) {
          throw new Error(`No such template: ${id}`);
        }
        return res.json();
      })
      .then((json) => {
        setTemplateName(json.template_name);
        setSentence(json.template_text);
        setFields(json.template_text.match(/__/g));
      })
      .catch((error) => {
        setToastData({
          show: true,
          message: 'No such template',
          background: 'danger',
        });
        log.warn(error);
        navigate('/');
      });
  }, [id, setToastData, navigate]);

  return (
    <>
      <h3>{templateName}</h3>
      <pre ref={allSpans}>{parseText(sentence, [])}</pre>
      <br />
      <Form onSubmit={handleSubmit}>
        {Array.isArray(fields)
          ? fields.map((v, i) => (
              <InputGroup className="mb-3" key={i}>
                <InputGroup.Text className="text-muted">
                  field {i + 1}
                </InputGroup.Text>
                <Form.Control
                  value={v}
                  onFocus={(e) => handleFocus(e, i)}
                  onBlur={(e) => handleBlur(e, i)}
                  onChange={(e) => handleChange(e, i)}
                />
              </InputGroup>
            ))
          : null}

        <Button data-cy="submit" variant="primary" type="submit">
          Compile
        </Button>
      </Form>
    </>
  );
};

Template.propTypes = {
  setToastData: PropTypes.func,
};

export default Template;
