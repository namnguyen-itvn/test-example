
import SearchPage from '../support/PageObjects/SearchPage';

describe("Search Computer Page Smoke test", () => {
    let rokuappData;
    let searchPage = new SearchPage();
    before(() => {
        //setup -> setup test fixture
        cy.fixture('rokuapp').then((rokuapp) => {
            return rokuappData = rokuapp;
        })
    })

    it('Verify the UI of Search computer page on default in first launching', () => {

        cy.visit(Cypress.env('rokuUrl'));
        cy.url().should('eq', 'https://computer-database.herokuapp.com/computers');
        searchPage.getTitlePage().should('be.visible');
        searchPage.getSearchBox().should('be.visible')
            .and('have.attr', 'placeholder', 'Filter by computer name...');
        searchPage.getFilterByName().should('be.visible');
        searchPage.getAddButton().should('be.visible');
        searchPage.getPagination().should('be.visible');
        //searchPage.getTableRecord().find('thead > tr:first-child > th:first-child')
        searchPage.getTableRecord().should('be.visible');
    })

    it('Verify Filter by computer name function should work correct', () => {

        cy.visit(Cypress.env('rokuUrl'));
        searchPage.getSearchBox().type(rokuappData.ComputerName);
        searchPage.getFilterByName().click();

    })
    after(function () {
        //Teardown to clean up data

    })
})
