describe('Cypress Kitchen Sink page', () => {
  it('should have the correct heading and title', () => {
    // Visit the Cypress Kitchen Sink page
    cy.visit('https://example.cypress.io');
  
    // Check that the heading contains the correct text
    cy.get('h1').should('have.text', 'Kitchen Sink');
  
    // Check that the page title contains "Kitchen Sink"
    cy.title().should('include', 'Kitchen Sink');
  });
  

  it('should have a clickable "Querying" link in the home list', () => {
    // Visit the Cypress Kitchen Sink page
    cy.visit('https://example.cypress.io');

    // Target the "Querying" link inside the ul with class 'home-list'
    cy.get('ul.home-list')
      .contains('a', 'Querying')
      .should('be.visible')
      .click();

    // Check that clicking the link navigates to the correct URL
    cy.url().should('include', '/commands/querying');

    // Check that the new page has the correct heading
    cy.get('h1').should('have.text', 'Querying');
  });

  it('should find the second item in the list, check it is a link, and navigate correctly', () => {
    // Visit the Cypress Kitchen Sink page
    cy.visit('https://example.cypress.io');

    // Target the element with the selector and check that it is a link
    cy.get('.home-list > :nth-child(2) > :nth-child(1)')
      .should('have.prop', 'tagName', 'A') // Verify it's a link (anchor tag)
      .and('have.text', 'Traversal'); // Check that the text is 'Traversal'

    // Click the link
    cy.get('.home-list > :nth-child(2) > :nth-child(1)').click();

    // Verify that the URL changes to include '/commands/traversal'
    cy.url().should('include', '/commands/traversal');

    // Check that the new page contains an h1 with the text 'Traversal'
    cy.get('h1').should('have.text', 'Traversal');

    // Now verify that the element with the given selector is a link to the top of the page
    cy.get(':nth-child(53) > .well > .nav > .active > a')
      .should('have.prop', 'tagName', 'A') // Check it's a link (anchor tag)
      .and('have.attr', 'href') // Check the href attribute
      .and('eq', '#'); // Ensure that the href points to '#', which typically means going to the top of the page

    // Scroll down a bit to ensure we're not at the top of the page
    cy.scrollTo('bottom');

    // Click the "Home" link to go back to the top of the page
    cy.get(':nth-child(53) > .well > .nav > .active > a').click();

    // Check that after clicking, the URL remains the same (no page reload or navigation)
    cy.url().should('include', '/commands/traversal');

    // Optionally, check that the scroll position is back at the top
    cy.window().its('scrollY').should('eq', 0); // Verifies that the scroll position is at the top
  });
});