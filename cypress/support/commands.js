import SearchPage from "./PageObjects/SearchPage";
import AddPage from "./PageObjects/AddPage";

let addPage = new AddPage();
let searchPage = new SearchPage();
{
    Cypress.Commands.add('NavigateToAddPage', (rokuapp) => {
        cy.visit('https://computer-database.herokuapp.com/computers/new');
    })

    Cypress.Commands.add('AddNewComputer', (computerName, introducedDate, discontinuedDate, company) => {
        addPage.getTxtComputerName().type(computerName);
        addPage.getTxtIntroducedDate().type(introducedDate);
        addPage.getTxtDiscontinuedDate().type(discontinuedDate);
        addPage.getDdlCompany().select(company);
        addPage.getBtnCreateComputer().click();
    })

    Cypress.Commands.add('SearchComputer', (computerName, introducedDate, discontinuedDate, company) => {
        searchPage.getSearchBox().type(computerName);
        searchPage.getFilterByName().click();
    })

    Cypress.Commands.add('CleanUpTestData', (computerName, introducedDate, discontinuedDate, company) => {
        cy.visit(Cypress.env('rokuUrl'));
        searchPage.getSearchBox().type(computerName);
        searchPage.getFilterByName().click();
        searchPage.getTableRecord().find('td:first-child').click();
        addPage.getBtnDelete().click();
    })
}