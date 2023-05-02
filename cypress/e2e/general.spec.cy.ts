import { HelperMethods } from 'cypress/helpers/general.helpers';

describe('Test all pages', () => {
  HelperMethods.getMainViews(3).forEach((mainView) => {
    it(`should visit ${mainView.url} page`, () => {
      cy.visit(mainView.url);
      cy.get(`router-outlet + ${mainView.component}`).should('exist');
    });
  });
});

describe('Test navigation bar', () => {
  HelperMethods.getNavigationBarItems().forEach((item) => {
    it(`should display ${item.url} navigation bar item and navigate on click`, () => {
      cy.visit('');
      cy.get(item.selector).should('exist');
      cy.get(item.selector).parent().should(item.disabled ? 'have.class' : 'not.have.class', 'disabled');

      if (!item.disabled) {
        cy.get(item.selector).click();
        cy.url().should(item.disabled ? 'not.include' : 'include', item.url);
      }
    });
  });
});
