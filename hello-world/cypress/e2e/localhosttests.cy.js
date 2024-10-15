describe('Local HTML Page Tests', () => {
    const url = 'http://127.0.0.1:5500/index.html';
  
    // Load the page before each test
    beforeEach(() => {
      cy.visit(url);
    });
  
    // Test 1: Verify the page loads
    it('should load the page', () => {
      // No need for cy.visit() here because of beforeEach
    });
  
    // Test 2: Verify there is an h1 tag with the text "Html Page!" as the first h1 tag
    it('should have the first h1 tag with the text "Html Page!"', () => {
      cy.get('h1').first().should('have.text', 'Html Page!');
    });
  
    // Test 3: Verify that there are 3 divs with a class of "box"
    it('should have 3 divs with a class of "box"', () => {
      cy.get('div.box').should('have.length', 3);
    });
  
    // Test 4: Verify that each of these boxes has an id
    it('should ensure each box has an id', () => {
      cy.get('div.box').each((box) => {
        cy.wrap(box).should('have.attr', 'id');
      });
    });
  
// Test 5: Verify that the first box has a different background color from the other two boxes
it('should verify that the first box has a different background color from the other two boxes', () => {
    // Get the first box and store its background color
    cy.get('div.box').first().then(($firstBox) => {
      const firstBoxBgColor = $firstBox.css('background-color');
  
      // Get the second and third boxes
      cy.get('div.box').eq(1).then(($secondBox) => {
        const secondBoxBgColor = $secondBox.css('background-color');
        // Ensure the first box's color is different from the second box
        expect(firstBoxBgColor).to.not.equal(secondBoxBgColor);
      });
  
      cy.get('div.box').eq(2).then(($thirdBox) => {
        const thirdBoxBgColor = $thirdBox.css('background-color');
        // Ensure the first box's color is different from the third box
        expect(firstBoxBgColor).to.not.equal(thirdBoxBgColor);
      });
    });
  });
  
  
  });
  