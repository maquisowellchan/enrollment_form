it('should post data when adding a student', () => {
  cy.viewport(1280, 720);
  cy.visit('http://localhost:3000/dashboard'); // Replace with the URL of your page

  // Click the "Add Student" button
  cy.get('button').contains('Register Student').click();

  // Wait for the modal to open
  cy.get('.modal.modal-open').should('be.visible');

  // Fill out the form fields
  cy.get('input[name="firstname"]').type('John');
  cy.get('input[name="middlename"]').type('Doe');
  cy.get('input[name="lastname"]').type('Smith');
  cy.get('input[name="suffix"]').type('Jr');
  cy.get('input[name="dateofbirth"]').type('2000-01-01');
  cy.get('select[name="gender"]').select('Male');
  cy.get('input[name="address"]').type('123 Main St');
  cy.get('input[name="contactnumber"]').type('1234567890');
  cy.get('input[name="emailaddress"]').type('john.doe@example.com');
  cy.get('input[name="lrn"]').type('1234567890');
  cy.get('select[name="yearlevel"]').select('1stYear');

  // Click the subjects input field using force: true
  cy.get('input[name="subjects"]').click({ force: true, multiple: true });

  // Wait for the subject selection modal to open
  cy.get('.modal.modal-open').should('be.visible');

  // Select subjects
  cy.get('.modal.modal-open').find('input[name="subjects"]').check({ force: true }); // Replace with appropriate selector // Replace with appropriate selector


  // Submit the form
  cy.get('form').submit();

  // Intercept the POST request and provide a response
  cy.intercept('POST', '/students/', {
    statusCode: 200,
    body: { message: 'Student added successfully' },
  }).as('postStudent');

  // Wait for the POST request to complete
  it('should post data when adding a student', () => {
    // ... previous code ...
  
    // Wait for the POST request to complete with an increased timeout duration
    cy.wait('@postStudent', { timeout: 10000 }).then((xhr) => {
      // Assert that the request was successful
      expect(xhr.response.statusCode).to.equal(200);
      expect(xhr.response.body.message).to.equal('Student added successfully');
  
      // Do something after successful POST
      // e.g., navigate to a success page or perform additional assertions
      // ...
  
      // Log the response data
      console.log('Response:', xhr.response.body);
    });
  
    // ... remaining code ...
  });
  

  // You can also assert that the form was submitted correctly
  // e.g., check if the form fields are cleared after submission
  // ...
});

it('should fetch and display gender count data', () => {
  // Intercept the gender count request
  cy.intercept('GET', 'http://localhost:3000/gender-count/').as('genderCount');
  cy.viewport(1280, 720);

  // Visit the page where the gender count data is fetched
  cy.visit('http://localhost:3000/dashboard');

  // Wait for the gender count request to complete
  cy.wait('@genderCount').then((interception) => {
    // Get the intercepted request
    const { request, response } = interception;

    // Verify the intercepted request
    expect(request.url).to.equal('http://localhost:3000/gender-count/');
    expect(request.method).to.equal('GET');
    expect(response.statusCode).to.equal(200);

    // Get the response body
    const data = response.body;

    // Verify that the data array exists and has a length greater than 0
    expect(data).to.exist;
    expect(data).to.have.length.gt(0);

    // Get the unique genders from the data array
    const genders = data.map((item) => item.gender);

    // Verify the count for each gender
    genders.forEach((gender) => {
      const count = data.find((item) => item.gender === gender).count;

      // Assert that the count is a positive number
      expect(count).to.be.a('number');
      expect(count).to.be.greaterThan(0);
    });
  });
});

it('should fetch and display year level count data', () => {
  // Intercept the year level count request
  cy.intercept('GET', 'http://localhost:3000/yearlevel-count/').as('yearLevelCount');
  cy.viewport(1280, 720);

  // Visit the page where the year level count data is fetched
  cy.visit('http://localhost:3000/dashboard');

  // Wait for the year level count request to complete
  cy.wait('@yearLevelCount').then((interception) => {
    // Get the intercepted request
    const { request, response } = interception;

    // Verify the intercepted request
    expect(request.url).to.equal('http://localhost:3000/yearlevel-count/');
    expect(request.method).to.equal('GET');
    expect(response.statusCode).to.equal(200);

    // Get the response body
    const data = response.body;

    // Verify that the data array exists and has a length greater than 0
    expect(data).to.exist;
    expect(data).to.have.length.gt(0);

    // Get the unique year levels from the data array
    const yearLevels = data.map((item) => item.yearlevel);

    // Verify the count for each year level
    yearLevels.forEach((yearLevel) => {
      const count = data.find((item) => item.yearlevel === yearLevel).count;

      // Assert that the count is a positive number
      expect(count).to.be.a('number');
      expect(count).to.be.greaterThan(0);
    });
  });
});

it('should fetch and display student count data', () => {
  // Intercept the student count request
  cy.intercept('GET', 'http://localhost:3000/students/count/').as('studentCount');
  cy.viewport(1280, 720);

  // Visit the page where the student count data is fetched
  cy.visit('http://localhost:3000/dashboard');

  // Wait for the student count request to complete
  cy.wait('@studentCount').then((interception) => {
    // Get the intercepted request
    const { request, response } = interception;

    // Verify the intercepted request
    expect(request.url).to.equal('http://localhost:3000/students/count/');
    expect(request.method).to.equal('GET');
    expect(response.statusCode).to.equal(200);

    // Get the response body
    const data = response.body;

    // Verify that the count exists and is a positive number
    expect(data.count).to.be.a('number');
    expect(data.count).to.be.greaterThan(0);
  });
});

it('should fetch and display instructor count data', () => {
  // Intercept the instructor count request
  cy.intercept('GET', 'http://localhost:3000/instructor/count/').as('instructorCount');
  cy.viewport(1280, 720);

  // Visit the page where the instructor count data is fetched
  cy.visit('http://localhost:3000/dashboard');

  // Wait for the instructor count request to complete
  cy.wait('@instructorCount').then((interception) => {
    // Get the intercepted request
    const { request, response } = interception;

    // Verify the intercepted request
    expect(request.url).to.equal('http://localhost:3000/instructor/count/');
    expect(request.method).to.equal('GET');
    expect(response.statusCode).to.equal(200);

    // Get the response body
    const data = response.body;

    // Verify that the count exists and is a positive number
    expect(data.count).to.be.a('number');
    expect(data.count).to.be.greaterThan(0);
  });
});

it('should fetch and display subject count data', () => {
  // Intercept the subject count request
  cy.intercept('GET', 'http://localhost:3000/subjects/count/').as('subjectCount');
  cy.viewport(1280, 720);

  // Visit the page where the subject count data is fetched
  cy.visit('http://localhost:3000/dashboard');

  // Wait for the subject count request to complete
  cy.wait('@subjectCount').then((interception) => {
    // Get the intercepted request
    const { request, response } = interception;

    // Verify the intercepted request
    expect(request.url).to.equal('http://localhost:3000/subjects/count/');
    expect(request.method).to.equal('GET');
    expect(response.statusCode).to.equal(200);

    // Get the response body
    const data = response.body;

    // Verify that the count exists and is a positive number
    expect(data.count).to.be.a('number');
    expect(data.count).to.be.greaterThan(0);
  });
});

