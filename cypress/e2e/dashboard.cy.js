it('should post data when adding a student', () => {
  cy.viewport(1280, 720);
  cy.visit('http://localhost:3000/dashboard'); 


  cy.get('button').contains('Register Student').click();


  cy.get('.modal.modal-open').should('be.visible');


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


  cy.get('input[name="subjects"]').click({ force: true, multiple: true });


  cy.get('.modal.modal-open').should('be.visible');


  cy.get('.modal.modal-open').find('input[name="subjects"]').check({ force: true }); 



  cy.get('form').submit();


  cy.intercept('POST', '/students/', {
    statusCode: 200,
    body: { message: 'Student added successfully' },
  }).as('postStudent');


  it('should post data when adding a student', () => {
 
  
    
    cy.wait('@postStudent', { timeout: 10000 }).then((xhr) => {

      expect(xhr.response.statusCode).to.equal(200);
      expect(xhr.response.body.message).to.equal('Student added successfully');
  
   
      console.log('Response:', xhr.response.body);
    });
  

  });
  


});

it('should fetch and display gender count data', () => {

  cy.intercept('GET', 'http://localhost:3000/gender-count/').as('genderCount');
  cy.viewport(1280, 720);


  cy.visit('http://localhost:3000/dashboard');


  cy.wait('@genderCount').then((interception) => {

    const { request, response } = interception;


    expect(request.url).to.equal('http://localhost:3000/gender-count/');
    expect(request.method).to.equal('GET');
    expect(response.statusCode).to.equal(200);


    const data = response.body;

    
    expect(data).to.exist;
    expect(data).to.have.length.gt(0);


    const genders = data.map((item) => item.gender);


    genders.forEach((gender) => {
      const count = data.find((item) => item.gender === gender).count;

      
      expect(count).to.be.a('number');
      expect(count).to.be.greaterThan(0);
    });
  });
});

it('should fetch and display year level count data', () => {

  cy.intercept('GET', 'http://localhost:3000/yearlevel-count/').as('yearLevelCount');
  cy.viewport(1280, 720);


  cy.visit('http://localhost:3000/dashboard');


  cy.wait('@yearLevelCount').then((interception) => {

    const { request, response } = interception;


    expect(request.url).to.equal('http://localhost:3000/yearlevel-count/');
    expect(request.method).to.equal('GET');
    expect(response.statusCode).to.equal(200);

    const data = response.body;

   
    expect(data).to.exist;
    expect(data).to.have.length.gt(0);


    const yearLevels = data.map((item) => item.yearlevel);

   
    yearLevels.forEach((yearLevel) => {
      const count = data.find((item) => item.yearlevel === yearLevel).count;


      expect(count).to.be.a('number');
      expect(count).to.be.greaterThan(0);
    });
  });
});

it('should fetch and display student count data', () => {

  cy.intercept('GET', 'http://localhost:3000/students/count/').as('studentCount');
  cy.viewport(1280, 720);


  cy.visit('http://localhost:3000/dashboard');

 
  cy.wait('@studentCount').then((interception) => {

    const { request, response } = interception;

  
    expect(request.url).to.equal('http://localhost:3000/students/count/');
    expect(request.method).to.equal('GET');
    expect(response.statusCode).to.equal(200);


    const data = response.body;

   
    expect(data.count).to.be.a('number');
    expect(data.count).to.be.greaterThan(0);
  });
});

it('should fetch and display instructor count data', () => {
 
  cy.intercept('GET', 'http://localhost:3000/instructor/count/').as('instructorCount');
  cy.viewport(1280, 720);

 
  cy.visit('http://localhost:3000/dashboard');

 
  cy.wait('@instructorCount').then((interception) => {

    const { request, response } = interception;

   
    expect(request.url).to.equal('http://localhost:3000/instructor/count/');
    expect(request.method).to.equal('GET');
    expect(response.statusCode).to.equal(200);


    const data = response.body;

   
    expect(data.count).to.be.a('number');
    expect(data.count).to.be.greaterThan(0);
  });
});

it('should fetch and display subject count data', () => {
  
  cy.intercept('GET', 'http://localhost:3000/subjects/count/').as('subjectCount');
  cy.viewport(1280, 720);

  
  cy.visit('http://localhost:3000/dashboard');


  cy.wait('@subjectCount').then((interception) => {
  
    const { request, response } = interception;

   
    expect(request.url).to.equal('http://localhost:3000/subjects/count/');
    expect(request.method).to.equal('GET');
    expect(response.statusCode).to.equal(200);

 
    const data = response.body;

    
    expect(data.count).to.be.a('number');
    expect(data.count).to.be.greaterThan(0);
  });
});

