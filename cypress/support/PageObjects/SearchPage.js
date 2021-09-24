class SearchPage {
    getSearchBox() {
        return cy.get('#searchbox');
    }
    getFilterByName() {
        return cy.get('#searchsubmit');
    }
    getTitlePage() {
        return cy.get('h1[class="fill"]');
    }
    getAddButton() {
        return cy.get('#add');
    }
    getPagination() {
        return cy.get('#pagination ul');
    }
    getTableRecord() {
        return cy.get('table[class="computers zebra-striped"]');
    }
    getAlertMessage() {
        return cy.get('div[class*="alert-message"]');
    }
}

export default SearchPage
