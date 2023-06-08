describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should display an error message for invalid credentials", () => {
    cy.get('[data-cy="username-input"]').type("invalidusername");
    cy.get('[data-cy="password-input"]').type("invalidpassword");
    cy.get("button").click();

    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("Invalid username and password");
    });
  });

  it("should navigate to the dashboard for valid credentials", () => {
    cy.get('[data-cy="username-input"]').type("admin");
    cy.get('[data-cy="password-input"]').type("admin");
    cy.get("button").click();

    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("You successfully logged in");
    });

    cy.url().should("include", "/dashboard");
  });
});
