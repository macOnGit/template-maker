import Card from 'react-bootstrap/Card';

const Welcome = () => (
  <>
    <Card bg="info" className="text-center">
      <Card.Title style={{ padding: '2rem' }} as="h1">
        Welcome to the Template Maker!
      </Card.Title>
    </Card>

    <Card className="my-2" border="info">
      <Card.Header>Navigation</Card.Header>
      <Card.Body>
        <ul className="instructions">
          <li>Click Use to generate text from an existing template.</li>
          <li>Click Compose to create a new template.</li>
          <li>Click Edit to modify or delete an existing template.</li>
        </ul>
      </Card.Body>
    </Card>
    <Card className="my-2" border="info">
      <Card.Header>Composing Templates</Card.Header>
      <Card.Body>
        <p>
          Enter a name for your template and author (optional) then type in any
          text as you normaly would into the Template Text area. Where you want
          there to be a field simply type in two underscore characters. You can
          have a many fields as you want. Click Submit when you're finished.
        </p>
        <p>Example: The __ cat and the __ dog.</p>
      </Card.Body>
    </Card>
    <Card className="my-2" border="info">
      <Card.Header>Using Templates</Card.Header>
      <Card.Body>
        <p>
          Select a template from the list of templates then simply fill in each
          field or not. A live preview is shown above the fields. Click Compile
          to generate the text with the fields.
        </p>
      </Card.Body>
    </Card>
    <Card className="my-2" border="info">
      <Card.Header>Editing Templates</Card.Header>
      <Card.Body>
        <p>
          Select a template from the list of templates, make any needed edits,
          then click Submit to save your edits or Delete to permanently remove
          the template.
        </p>
      </Card.Body>
    </Card>
  </>
);

export default Welcome;
