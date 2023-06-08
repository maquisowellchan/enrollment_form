describe('Add Instructor', () => {
  it('should add an instructor successfully', () => {
    cy.visit('http://localhost:3000/instructor'); 


    cy.contains('Add Instructor').click();


    cy.get('.modal.modal-open').should('be.visible');


    cy.get('.modal.modal-open input[name="instructorid"]').type('123');
    cy.get('.modal.modal-open input[name="name"]').type('John Doe');
    cy.get('.modal.modal-open select[name="major"]').select('Introduction to Computing');
    cy.get('.modal.modal-open input[name="contactnumber"]').type('1234567890');


    cy.intercept('POST', '/instructors/', {
      statusCode: 200,
      body: {
        message: 'Instructor created successfully'
      }
    }).as('addInstructor');


    cy.get('.modal.modal-open').contains('Add').click();


    cy.wait('@addInstructor');

 
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Instructor created successfully');
    });
  });
});


describe('Fetch Instructors', () => {
  it('should fetch and display instructor data', () => {

    cy.intercept('GET', '/instructors/').as('fetchInstructors');
    cy.viewport(1280, 720);


    cy.visit('http://localhost:3000/instructor');


    cy.wait('@fetchInstructors').then((interception) => {

      const { request, response } = interception;


      expect(request.url).to.equal('http://localhost:3000/instructors/');
      expect(request.method).to.equal('GET');
      expect(response.statusCode).to.equal(200);


      const data = response.body;


      expect(data).to.exist;


      expect(data).to.be.an('array');
      expect(data).to.have.length.gt(0);


      cy.get('.my-table2 tbody tr').should('have.length', data.length).each(($row, index) => {
   
        const instructor = data[index];


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

    cy.intercept('/instructors/', { fixture: 'instructors.json' }).as('getInstructors');
    cy.intercept('DELETE', '/instructor/*/', { statusCode: 200 }).as('deleteInstructor');
    cy.viewport(1280, 720);


    cy.wait('@getInstructors');

 
    cy.get('.my-table2 tbody tr')
      .first()
      .find('.fa-square-minus')
      .click();

    cy.on('window:confirm', () => true);


    cy.wait('@deleteInstructor');


    cy.get('.my-table2 tbody tr').should('have.length', 0);
  });
});


