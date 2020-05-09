

Cypress.Commands.add('SearchForm', (object,keyword,language) =>{
    cy.get(object).find('input[name="field-keywords"]').type(keyword)
    cy.get(object).find('select[name="field-language"]').select(language, { force:true })
    cy.get(object).find('input[name="Adv-Srch-Books-Submit"]').click({ force:true })
})
