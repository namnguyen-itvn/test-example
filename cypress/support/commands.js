

Cypress.Commands.add('SearchForm', (keyword,language) =>{
    cy.get('#asMain input[name="field-keywords"]').type(keyword)
    cy.get('#asMain select[name="field-language"]').select(language, { force:true })
    cy.get('#asMain input[name="Adv-Srch-Books-Submit"]').click({ force:true })
})

Cypress.Commands.add('LoginForm', (scenarios,email,password) =>{
    switch (scenarios) {
        case '0':
            cy.get('form[name="signIn"] input[type="email"]').type(email)
            cy.get('form[name="signIn"] input[type="submit"]').click( {force : true})
          break;
        case '1':
            cy.get('form[name="signIn"] input[type="email"]').type(email)
            cy.get('form[name="signIn"] input[type="submit"]').click( {force : true})
            cy.get('form[name="signIn"] input[type="password"]').type(password)
            cy.get('form[name="signIn"] input[type="submit"]').click( {force : true})
          break;
    }
})

