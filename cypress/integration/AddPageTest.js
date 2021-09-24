import AddPage from "../support/PageObjects/AddPage";
import SearchPage from "../support/PageObjects/SearchPage";

describe("Add computer End to End test", () => {
    let rokuappData;
    let addPage = new AddPage();
    let searchPage = new SearchPage();

    before(() => {
        //setup -> setup test fixture
        cy.fixture('rokuapp').then((rokuapp) => {
            return rokuappData = rokuapp;
        })
    })

    it('Should navigate to Add Computer Page', () => {

        cy.visit(Cypress.env('rokuUrl'));
        cy.NavigateToAddPage();
    })

    it('New computer should added', () => {
        rokuappData.NewComputer.forEach((element) => {
            cy.AddNewComputer(element[0], element[1], element[2], element[3]);
        })
        cy.waitFor(1000)
        searchPage.getAlertMessage().should('be.visible')
    })

    it('Computer added should be on the search result', () => {
        rokuappData.NewComputer.forEach((element) => {
            cy.SearchComputer(element[0]);
        })
        cy.waitFor(1000)

        searchPage.getTableRecord().find('td:first-child').contains(rokuappData.ComputerName)
    })

    after(function () {
        //Teardown to clean up data
        //Clear all data test
        cy.CleanUpTestData(rokuappData.ComputerName);
    })
})