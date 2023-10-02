import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Route, Routes, useLocation } from 'react-router-dom';
import TemplateForm from './composeTemplateForm';
import Welcome from './welcome';
import SiteNav from './nav';
import AutoHideToast from './autoHideToast';
import TemplateTable from './templateTable';
import Template from './useTemplateForm';
import NotFound from './notFound';

function App() {
  const [toastData, setToastData] = useState({
    show: false,
  });
  const location = useLocation();
  return (
    <>
      <SiteNav />
      <ToastContainer style={{ zIndex: 100 }} position="top-end">
        <AutoHideToast setToastData={setToastData} toastData={toastData} />
      </ToastContainer>
      <Container>
        <Row>
          <Col>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route
                path="/compose"
                element={<TemplateForm setToastData={setToastData} />}
              />
              <Route path="/templates">
                <Route index element={<TemplateTable />} />
                <Route
                  path="/templates/:id"
                  element={<Template setToastData={setToastData} />}
                />
                <Route
                  path="/templates/:id/edit"
                  element={
                    <TemplateForm setToastData={setToastData} forEditing />
                  }
                />
              </Route>
              <Route path="/compiled" element={<pre>{location.state}</pre>} />
              <Route
                path="/edit"
                element={<TemplateTable loadTemplateEndpoint="edit" />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
