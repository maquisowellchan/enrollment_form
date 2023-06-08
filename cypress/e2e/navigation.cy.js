describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/dashboard') 
  })

  it('should navigate to Dashboard', () => {
    cy.get('.sidebar-item:nth-child(1) a').click()

  })

  it('should navigate to Subjects', () => {
    cy.get('.sidebar-item:nth-child(2) a').click()

  })

  it('should navigate to Students', () => {
    cy.get('.sidebar-item:nth-child(3) a').click()

  })

  it('should navigate to Instructor', () => {
    cy.get('.sidebar-item:nth-child(4) a').click()

  })



  it('should navigate to Logout', () => {
    cy.viewport(1200, 800) 
    cy.get('.sidebar-item:last-child a')
      .click()
  
  
  })
  it('should click the Add Student button', () => {
    cy.get('button')
      .contains('Register Student')
      .click()
  
 
  })
})
