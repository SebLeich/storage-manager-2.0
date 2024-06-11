describe('Test visualizer', () => {

    it('should display suggestion menu if no solution is set', () => {
        cy.visit('');

        cy.get('app-no-solution-dialog').as('noSolutionDialog');
        cy.get('@noSolutionDialog').should('exist');

        cy.get('.suggestion.exemplary-solution').as('setExemplarySolution');
        cy.get('@setExemplarySolution').should('exist');
        cy.get('@setExemplarySolution').click();
        cy.get('@noSolutionDialog').should('not.exist');
    })

    it(`should visit visualizer and render page if solution is set`, () => {
        cy.visit('');
        cy.get('app-no-solution-dialog').as('noSolutionDialog');
        cy.get('.suggestion.exemplary-solution').as('setExemplarySolution');
        cy.get('@setExemplarySolution').click();

        cy.get(`router-outlet + app-visualizer`).should('exist');
        cy.get(`app-scene-visualization`).should('exist');
    });

});