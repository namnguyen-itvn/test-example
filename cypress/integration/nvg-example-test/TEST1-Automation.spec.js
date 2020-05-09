//Precondition:
//Create Owner account on Amazon website

//Test required:

//1.Verify functionality of login with invalid account

//2.Verify user can login with valid account

//3.Verify result list is paginated if there are more than 16 items
//  a.Perform a search with:
//      Department: Books
//      Keyword: apple
//      Book languages: English
//  b.The result displayed exactly 16 items on each page

//4. Verify result list can be sorted on demand:
//  a.Perform a search with:
//      Department: Books
//      Keyword: apple
//      Book languages: English
//      => Change sort option to Price: Low to High
//  b. The Result is sorted by Price from Low to High


import { Amazon } from'../../support/Utils'
import { Data } from'../../support/Utils'

describe("TEST 1 -2. Automation test exercisers on Amazon website", () => {
    beforeEach(function () {
        cy.visit(Amazon.AmazonURL)
    });

    it('TEST1.Verify functionality of login with invalid account', () =>{ 
        cy.get(Amazon.AccountNav).click()
        cy.get(Amazon.LoginForm).find('input[type="email"]').type(Data.InvalidEmail)
        cy.get(Amazon.LoginForm).find('input[type="submit"]').click( {force : true})
        cy.get(Amazon.AlertContainer).find('h4').should('have.prop','innerText','There was a problem')
        cy.get(Amazon.AlertContainer).find('span').should('have.prop','innerText','We cannot find an account with that email address')
    })

    it('TEST2.Verify functionality of login with valid account', () => {
        cy.get(Amazon.AccountNav).click()
        cy.get(Amazon.LoginForm).find('input[type="email"]').type(Data.ValidEmail)
        cy.get(Amazon.LoginForm).find('input[type="submit"]').click( {force : true})
        cy.get(Amazon.LoginForm).find('input[type="password"]').type(Data.ValidPassword)
        cy.get(Amazon.LoginForm).find('input[type="submit"]').click( {force : true})
        cy.get(Amazon.ClaimOTPForm).find('h1').should('have.prop','innerText','Authentication required')
        cy.get(Amazon.ClaimOTPForm).find('div[class="a-row"]').should('have.prop','innerText','We will text you a One Time Password (OTP) to authenticate your request.')
        //cy.get(Amazon.AccountNav).find("span[class='nav-line-1'").should("have.text", "Hello, Nam") Missing authentication Phone OTP

    })
    
})
describe("TEST 3 - 4. Automation test exercisers on Amazon website", () => {
    beforeEach(function () {
        
        cy.visit('https://www.amazon.com/Advanced-Search-Books/b/?ie=UTF8&node=241582011&ref_=sv_b_1') //Navigate to Advance search Books page
        //cy.get('.glow-toaster-footer input[data-action-type="DISMISS"]').click({force:true})
        if (Cypress.$('.glow-toaster-footer input[data-action-type="DISMISS"]').length > 0) {
            cy.get('.glow-toaster-footer input[data-action-type="DISMISS"]').click
          }
          cy.SearchForm(Amazon.AdvSearchForm,'apple','English')
    });

    it('TEST3.Verify result list is paginated if there are more than 16 items', () => {
        cy.get(Amazon.ResultList).should('have.length', 16)
    })

    it('TEST4.Verify result list can be sorted on demand', () => {
        cy.get(Amazon.SortDropdown).select('Price: Low to High', { force:true })
    })
})