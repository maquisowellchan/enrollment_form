describe('Fetch Students', () => {
  it('should fetch and display students data', () => {
    // Intercept the students request
    cy.intercept('GET', '/students/').as('fetchStudents');
    cy.viewport(1280, 720);

    // Visit the page where the students are displayed
    cy.visit('http://localhost:3000/students');

    // Wait for the students request to complete
    cy.wait('@fetchStudents').then((interception) => {
      // Get the intercepted request
      const { request, response } = interception;

      // Verify the intercepted request
      expect(request.url).to.equal('http://localhost:3000/students/');
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
        // Get the student at the corresponding index
        const student = data[index];

        // Verify the content of each table row
        cy.wrap($row).find('td:nth-child(1)').should('contain', student.lrn);
        cy.wrap($row).find('td:nth-child(2)').should('contain', `${student.firstname} ${student.lastname}`);
        cy.wrap($row).find('td:nth-child(3)').should('contain', student.dateofbirth);
        cy.wrap($row).find('td:nth-child(4)').should('contain', student.gender);
        cy.wrap($row).find('td:nth-child(5)').should('contain', student.yearlevel);
        cy.wrap($row).find('td:nth-child(6)').should('contain', student.emailaddress);
      });
    });
  });
});

describe('Delete Student', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/students/');
  });

  it('should delete a student', () => {
    // Stub the fetch requests
    cy.intercept('/students/', { fixture: 'students.json' }).as('getSubjects');
    cy.intercept('/students/*/').as('deleteStudent');

    // Wait for the subjects to be loaded
    cy.wait('@getSubjects');

    // Find the delete icon button and click on it
    cy.get('.my-table2 tbody tr')
      .first()
      .find('.fa-square-minus') // Update this selector if needed
      .click();

    // Confirm the delete action
    cy.on('window:confirm', () => true);

    // Wait for the delete request to complete
    cy.wait('@deleteStudent');

    // Verify that the student is removed from the table
    cy.get('.my-table2 tbody tr').should('have.length', 1);
  });
});
