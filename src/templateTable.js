import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';

function TemplateTable({ loadTemplateEndpoint }) {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('/api/templates/')
      .then((res) => res.json())
      .then(setTemplates);
  }, []);

  const loadTemplate = (id) => {
    navigate(
      `/templates/${id}${
        loadTemplateEndpoint ? `/${loadTemplateEndpoint}` : ''
      }`
    );
  };

  return (
    <Table data-cy="template-table" striped bordered hover>
      <thead>
        <tr>
          <th>Template ID</th>
          <th>Template Name</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        {templates.map(
          ({
            id,
            template_name: templateName,
            template_author: templateAuthor,
          }) => (
            <tr key={id} onClick={() => loadTemplate(id)}>
              <td>{id}</td>
              <td>{templateName}</td>
              <td>{templateAuthor}</td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
}
TemplateTable.propTypes = {
  loadTemplateEndpoint: PropTypes.string,
};

export default TemplateTable;
