describe('auth spec', () => {
  it('loads register URL successfully', () => {
    cy.visit('http://localhost:5173/', {
      timeout: 10000,
    });
  });
  
  it("clicks the register button and sees the registration page", () => {
    cy.visit('http://localhost:5173/', {
      timeout: 10000,
    });
    cy.get('.css-7zuwif').click(); // register button
    cy.url().should('include', '/register');
    cy.wait(1000);
  });

  const dummyEmail = 'testUser' + (Date.now()) + '@ksu.edu';

  it("inputs registration information, with invalid password", () => {
    cy.visit('http://localhost:5173/register', {
      timeout: 10000,
    });
    cy.get('#firstName').type('Test');
    cy.get('#lastName').type('User');
    cy.get('#email').type(dummyEmail); // random email
    cy.get('#password').type('password');
    cy.get('#confirm-password').type('password');
    cy.get(".css-ldil8j > .chakra-text").should("contain", "Password needs the following:");
    cy.get(".css-tu0njr > :nth-child(1)").should("contain", "One capital letter is required");
    cy.wait(1000);
  });

  it("inputs registration information, with valid password", () => {
    cy.visit('http://localhost:5173/register', {
      timeout: 10000,
    });
    
    // Input registration information
    cy.get('#firstName').type('Test');
    cy.get('#lastName').type('User');
    cy.get('#email').type(dummyEmail); // random email
    cy.get('#password').type('Password1!');
    cy.get('#confirm-password').type('Password1!');
    
    // Intercept the form submission network request
    // cy.intercept('POST', 'http://localhost:3000/auth/register').as('register');
    
    cy.wait(2000);
    cy.get('.css-1j5rwhq > .chakra-button').click(); // register button
    
    // // Wait for the form submission network request to complete
    // cy.wait('@register');
    
    // URL should contain /d
    cy.url().should('include', '/d');
    cy.wait(1000);
  });

  it('user can login and logout', () => {
    cy.visit('http://localhost:5173/login', { timeout: 10000 });
    cy.get('#email').type(dummyEmail);
    cy.get('#password').type('Password1!');

    cy.intercept('POST', '/auth/login').as('login');
    cy.get('button[type=submit]').click();

    cy.wait('@login').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    cy.wait(1000);
    cy.url().should('include', '/d');

    cy.wait(5000); // Wait for toast to disappear

    cy.get('[data-testid="user-menu"]').click(); // menu button
    cy.wait(1000);
    cy.get('[data-testid="signoutBtn"]').click(); // logout button
    // We should see a Login button somewhere in the page
    cy.get("body").should('contain', 'Login');
    cy.wait(1000);
  });
});
