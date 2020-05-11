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

describe("TEST 1 -2", () => {
    beforeEach(function () {
        cy.visit(Amazon.AmazonHome)
    });

    it('TEST1.Verify functionality of login with invalid account', () => { 
        cy.get(Amazon.AccountNav).click()
        cy.LoginForm('0',Data.InvalidEmail)
        cy.get(Amazon.AlertContainer).find('h4').should('have.prop','innerText','There was a problem')
        cy.get(Amazon.AlertContainer).find('span').should('have.prop','innerText','We cannot find an account with that email address')
    })

    it('TEST2.Verify functionality of login with valid account', () => {
        cy.get(Amazon.AccountNav).click()
        cy.LoginForm('1',Data.ValidEmail,Data.ValidPassword)
        cy.get(Amazon.ClaimOTPForm).find('h1').should('have.prop','innerText','Authentication required')
        cy.get(Amazon.ClaimOTPForm).find('div[class="a-row"]').should('have.prop','innerText','We will text you a One Time Password (OTP) to authenticate your request.')
    })
})

describe("TEST 3 - 4", () => {
    beforeEach(function () {
        
        cy.visit(Amazon.AmazonSearchBook)
        cy.get('input[data-action-type="DISMISS"]').click({force:true})
        cy.SearchForm('apple','English')
    });

    it('TEST3.Verify result list is paginated if there are more than 16 items', () => {
        cy.get(Amazon.ResultList).should('have.length', 16)
    })

    it('TEST4.Verify result list can be sorted on demand', () => {
        cy.get(Amazon.SortDropdown).select('Price: Low to High', { force:true })
        cy.get('span[data-action="a-dropdown-button"]').should('have.text','Sort by:Price: Low to High')
    })
})