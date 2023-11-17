describe('organization admin functions spec', () => {
  // Login as organization admin
  beforeEach(() => {
    cy.visit('http://localhost:5173/login', { timeout: 10000 });
    cy.get('#email').type('test@test.com');
    cy.get('#password').type('test');
    cy.get('button[type=submit]').click();
    cy.wait(1000);
    cy.url().should('include', '/d');
  });

  const dummyOrgName = "Test Organization " + String(Math.random() + 1).substring(0, 7); // random org name

  it("allows creating an organization", () => {
    cy.get('[style="display: flex; align-items: center;"] > .chakra-button').click(); // create organization button
    cy.wait(1000);
    cy.get('[data-testid="addOrgModalName"]').type(dummyOrgName);
    cy.get('[data-testid="addOrgModalWebsite"]').type('www.example.com');
    cy.get('[data-testid="addOrgModalPhone"]').type('678-123-4567');
    
    cy.intercept('POST', 'http://localhost:3000/organizations').as('createOrganization');
    cy.get('[data-testid="addOrgModalSubmit"]').click(); // submit button

    // Need to check if the org is created, if not, stop the test early
    cy.wait('@createOrganization').then((interception) => {
      if (interception?.response?.statusCode !== 200) {
        cy.log('Could not create organization, stopping test early');
        return;
      }
    });

    cy.get("body").should('contain', dummyOrgName);
    cy.wait(1000);
  });

  it("can show organization details", () => {
    // Need to click on the View More button in the table
    // The parent row will contain attr. data-testid={organizationName}
    // The button will occur in the second Chakra Td element
    cy.get(`[data-testid="${dummyOrgName}"] > :nth-child(2) > .chakra-button`).click();
    cy.wait(1000);
  });

  it("can edit organization details", () => {
    cy.get(`[data-testid="${dummyOrgName}"] > :nth-child(2) > .chakra-button`).click();
    cy.get('.css-pvhcnd').click(); // Manage button
    // The form fields occur in the Chakra modal overlay
    // Name field
    cy.get('[data-testid="editOrgModalName"').clear();
    cy.get('[data-testid="editOrgModalName"').type(dummyOrgName);
    
    // Website field
    cy.get('[data-testid="editOrgModalWebsite"').clear();
    cy.get('[data-testid="editOrgModalWebsite"').type('www.exampleUpdated.com');
    
    // Phone field
    cy.get('[data-testid="editOrgModalPhone"').clear();
    cy.get('[data-testid="editOrgModalPhone"').type('404-123-4567');

    // Submit button
    cy.get('.css-rn9twz').click();

    cy.wait(1000);
    cy.get("body").should('contain', dummyOrgName);
  });

  it("can quick-add an event to the organization-wide team", () => {
    cy.get(`[data-testid="${dummyOrgName}"] > :nth-child(2) > .chakra-button`).click(); // View More button
    cy.get('.css-wjqf77 > .chakra-button').click(); // Org. page Add Event button

    // Fill out the Add Event form within the modal
    cy.get('[data-testid="addEventModalName"]').type("Test Event");
    cy.get('[data-testid="addEventModalDescription"]').type("Test Description");
    cy.get('[data-testid="addEventModalAddressStreet"]').type("123 Test St.");
    cy.get('[data-testid="addEventModalAddressCity"]').type("Atlanta");
    cy.get('[data-testid="addEventModalAddressState"]').type("GA");
    cy.get('[data-testid="addEventModalAddressZip"]').type("30332");
    cy.get('[data-testid="addEventModalStartDateTime"]').type("2021-04-01T12:00");
    cy.get('[data-testid="addEventModalEndDateTime"]').type("2021-04-01T13:00");
    cy.get('[data-testid="addEventModalSubmit"]').click();

    // We should expect to see a new event in the table with the name "Test Event"
    cy.get("body").should('contain', "Test Event");
    cy.wait(1000);
  });
});
