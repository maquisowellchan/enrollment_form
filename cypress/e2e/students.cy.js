describe('Fetch Students', () => {
  it('should fetch and display students data', () => {

    cy.intercept('GET', '/students/').as('fetchStudents');
    cy.viewport(1280, 720);


    cy.visit('http://localhost:3000/students');


    cy.wait('@fetchStudents').then((interception) => {
 
      const { request, response } = interception;

  
      expect(request.url).to.equal('http://localhost:3000/students/');
      expect(request.method).to.equal('GET');
      expect(response.statusCode).to.equal(200);

      const data = response.body;

 
      expect(data).to.exist;

    
      expect(data).to.be.an('array');
      expect(data).to.have.length.gt(0);

      
      cy.get('.my-table2 tbody tr').should('have.length', data.length).each(($row, index) => {
      
        const student = data[index];


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

    cy.intercept('/students/', { fixture: 'students.json' }).as('getSubjects');
    cy.intercept('/students/*/').as('deleteStudent');


    cy.wait('@getSubjects');

  
    cy.get('.my-table2 tbody tr')
      .first()
      .find('.fa-square-minus') 
      .click();


    cy.on('window:confirm', () => true);


    cy.wait('@deleteStudent');


    cy.get('.my-table2 tbody tr').should('have.length', 1);
  });
});
