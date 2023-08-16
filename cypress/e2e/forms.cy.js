describe('Form Tests', () =>{

    beforeEach(()=>{
        cy.visit('/forms')
    })

    it('Test subscribe form', () => {
        cy.contains(/testing forms/i)
        cy.getDataTest('subscribe-form').find('input').as('subscribe-input')
        cy.get('@subscribe-input').type('craig@codecraig.com!')
        cy.contains(/Successfully subbed: craig@codecraig.com!/i).should('not.exist')
        cy.getDataTest('subscribe-button').click()
        cy.contains(/Successfully subbed: craig@codecraig.com!/i).should('exist')
        cy.wait(3000)
        cy.contains(/Successfully subbed: craig@codecraig.com!/i).should('not.exist')

        cy.get('@subscribe-input').type('craig@codecraig.io')
        cy.contains(/invalid email: craig@codecraig.io/i).should('not.exist')
        cy.getDataTest('subscribe-button').click()
        cy.contains(/invalid email: craig@codecraig.io/i).should('exist')
        cy.wait(3000)
        cy.contains(/invalid email: craig@codecraig.io/i).should('not.exist')

        cy.getDataTest('subscribe-button').click()
        cy.contains(/fail/i).should('exist')
    })
})