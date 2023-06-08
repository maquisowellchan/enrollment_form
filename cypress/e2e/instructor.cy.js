describe('Add Instructor', () => {
  it('should add an instructor successfully', () => {
    cy.visit('http://localhost:3000/instructor'); // Replace the URL with the actual URL of the page

    // Click the "Add Instructor" button
    cy.contains('Add Instructor').click();

    // Wait for the modal to open
    cy.get('.modal.modal-open').should('be.visible');

    // Fill in the instructor form
    cy.get('.modal.modal-open input[name="instructorid"]').type('123');
    cy.get('.modal.modal-open input[name="name"]').type('John Doe');
    cy.get('.modal.modal-open select[name="major"]').select('Introduction to Computing');
    cy.get('.modal.modal-open input[name="contactnumber"]').type('1234567890');

    // Intercept the POST request and mock the response
    cy.intercept('POST', '/instructors/', {
      statusCode: 200,
      body: {
        message: 'Instructor created successfully'
      }
    }).as('addInstructor');

    // Submit the form
    cy.get('.modal.modal-open').contains('Add').click();

    // Wait for the POST request to complete
    cy.wait('@addInstructor');

    // Check if instructor was added successfully
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Instructor created successfully');
    });
  });
});


describe('Fetch Instructors', () => {
  it('should fetch and display instructor data', () => {
    // Intercept the instructors request
    cy.intercept('GET', '/instructors/').as('fetchInstructors');
    cy.viewport(1280, 720);

    // Visit the page where the instructors are displayed
    cy.visit('http://localhost:3000/instructor');

    // Wait for the instructors request to complete
    cy.wait('@fetchInstructors').then((interception) => {
      // Get the intercepted request
      const { request, response } = interception;

      // Verify the intercepted request
      expect(request.url).to.equal('http://localhost:3000/instructors/');
      expect(request.method).to.equal('GET');
      expect(response.statusCode).to.equal(200);

      // Get the response body
      const data = response.body;

      // Verify that the data exists
      expect(data).to.exist;

      // Verify that the data is an array and has a length greater than 0
      expect(data).to.be.an('array');
      expect(data).to.have.length.gt(0);

      // Get the table rows
      cy.get('.my-table2 tbody tr').should('have.length', data.length).each(($row, index) => {
        // Get the instructor at the corresponding index
        const instructor = data[index];

        // Verify the content of each table row
        cy.wrap($row).find('td:nth-child(1)').should('contain', instructor.instructorid);
        cy.wrap($row).find('td:nth-child(2)').should('contain', instructor.name);
        cy.wrap($row).find('td:nth-child(3)').should('contain', instructor.major);
        cy.wrap($row).find('td:nth-child(4)').should('contain', instructor.contactnumber);
      });
    });
  });
});

describe('Delete Instructor', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/instructor');
  });

  it('should delete an instructor', () => {
    // Stub the fetch requests
    cy.intercept('/instructors/', { fixture: 'instructors.json' }).as('getInstructors');
    cy.intercept('DELETE', '/instructor/*/', { statusCode: 200 }).as('deleteInstructor');
    cy.viewport(1280, 720);

    // Wait for the instructors to be loaded
    cy.wait('@getInstructors');

    // Find the delete icon button and click on it
    cy.get('.my-table2 tbody tr')
      .first()
      .find('.fa-square-minus')
      .click();

    cy.on('window:confirm', () => true);

    // Wait for the delete request to complete
    cy.wait('@deleteInstructor');

    // Assert the number of table rows
    cy.get('.my-table2 tbody tr').should('have.length', 0);
  });
});


