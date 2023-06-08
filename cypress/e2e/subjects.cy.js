describe('Add Subject', () => {
  it('should add a subject successfully', () => {
    cy.visit('http://localhost:3000/subjects'); // Replace 'http://localhost:3000/subjects' with the actual URL of the page where you have the subject form

    cy.get('button').contains('Add Subjects').click();

    // Wait for the modal to open
    cy.get('.modal.modal-open').should('be.visible');

    // Fill in the subject form
    cy.get('input[name="id"]').type('123');
    cy.get('input[name="subjectcode"]').type('ABC123');
    cy.get('input[name="subjectname"]').type('Example Subject');
    cy.get('input[name="instructorname"]').type('John Doe');
    cy.get('input[name="schedule"]').type('Monday, 9:00 AM');

    // Intercept the POST request and mock the response
    cy.intercept('POST', '/subjects/', {
      statusCode: 200,
      body: {
        message: 'Subject created successfully'
      }
    }).as('addSubject');

    // Submit the form
    cy.get('button.registerbutton').click({multiple: true, force: true});

    // Wait for the POST request to complete
    cy.wait('@addSubject');

    // Check if subject was added successfully
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Subject created successfully');
    });

    
  });
  
  

});

describe('Fetch Subjects', () => {
  it('should fetch and display subjects data', () => {
    // Intercept the subjects request
    cy.intercept('GET', '/subjects/').as('fetchSubjects');
    cy.viewport(1280, 720);

    // Visit the page where the subjects are displayed
    cy.visit('http://localhost:3000/subjects');

    // Wait for the subjects request to complete
    cy.wait('@fetchSubjects').then((interception) => {
      // Get the intercepted request
      const { request, response } = interception;

      // Verify the intercepted request
      expect(request.url).to.equal('http://localhost:3000/subjects/');
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
        // Get the subject at the corresponding index
        const subject = data[index];

        // Verify the content of each table row
        cy.wrap($row).find('td:nth-child(1)').should('contain', subject.subjectcode);
        cy.wrap($row).find('td:nth-child(2)').should('contain', subject.subjectname);
        cy.wrap($row).find('td:nth-child(3)').should('contain', subject.instructorname);
        cy.wrap($row).find('td:nth-child(4)').should('contain', subject.schedule);
      });
    });
  });
});

describe('Delete Subject', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/subjects/');
  });

  it('should delete a subject', () => {
    // Stub the fetch requests
    cy.intercept('/subjects/', { fixture: 'subjects.json' }).as('getSubjects');
    cy.intercept('/subjects/*/').as('deleteSubject');

    // Wait for the subjects to be loaded
    cy.wait('@getSubjects');

    // Find the delete icon button and click on it
    cy.get('.my-table2 tbody tr')
      .first()
      .find('.fa-square-minus')
      .click();

    // Confirm the delete action
    cy.on('window:confirm', () => true);

    // Wait for the delete request to complete
    cy.wait('@deleteSubject');

    // Verify that the subject is removed from the table
    cy.get('.my-table2 tbody tr').should('have.length', 1);
  });
});











