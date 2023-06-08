describe('Add Subject', () => {
  it('should add a subject successfully', () => {
    cy.visit('http://localhost:3000/subjects'); 

    cy.get('button').contains('Add Subjects').click();


    cy.get('.modal.modal-open').should('be.visible');

   
    cy.get('input[name="id"]').type('123');
    cy.get('input[name="subjectcode"]').type('ABC123');
    cy.get('input[name="subjectname"]').type('Example Subject');
    cy.get('input[name="instructorname"]').type('John Doe');
    cy.get('input[name="schedule"]').type('Monday, 9:00 AM');

    
    cy.intercept('POST', '/subjects/', {
      statusCode: 200,
      body: {
        message: 'Subject created successfully'
      }
    }).as('addSubject');

 
    cy.get('button.registerbutton').click({multiple: true, force: true});


    cy.wait('@addSubject');


    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Subject created successfully');
    });

    
  });
  
  

});

describe('Fetch Subjects', () => {
  it('should fetch and display subjects data', () => {

    cy.intercept('GET', '/subjects/').as('fetchSubjects');
    cy.viewport(1280, 720);


    cy.visit('http://localhost:3000/subjects');


    cy.wait('@fetchSubjects').then((interception) => {

      const { request, response } = interception;


      expect(request.url).to.equal('http://localhost:3000/subjects/');
      expect(request.method).to.equal('GET');
      expect(response.statusCode).to.equal(200);


      const data = response.body;


      expect(data).to.exist;


      expect(data).to.be.an('array');
      expect(data).to.have.length.gt(0);


      cy.get('.my-table2 tbody tr').should('have.length', data.length).each(($row, index) => {

        const subject = data[index];


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

    cy.intercept('/subjects/', { fixture: 'subjects.json' }).as('getSubjects');
    cy.intercept('/subjects/*/').as('deleteSubject');


    cy.wait('@getSubjects');


    cy.get('.my-table2 tbody tr')
      .first()
      .find('.fa-square-minus')
      .click();


    cy.on('window:confirm', () => true);


    cy.wait('@deleteSubject');


    cy.get('.my-table2 tbody tr').should('have.length', 1);
  });
});











