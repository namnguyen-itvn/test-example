class AddPage {
    getTxtComputerName() {
        return cy.get('#name');
    }
    getTxtIntroducedDate() {
        return cy.get('#introduced');
    }
    getTxtDiscontinuedDate() {
        return cy.get('#discontinued');
    }
    getDdlCompany() {
        return cy.get('#company');
    }
    getBtnCreateComputer() {
        return cy.get('input[type="submit"]');
    }
    getBtnCancel() {
        return cy.get('a[href="/computers"]');
    }
    getBtnDelete() {
        return cy.get('input[type="submit"]')
    }
    getPageTitle() {
        return cy.get('#main > h1')
    }
}

export default AddPage