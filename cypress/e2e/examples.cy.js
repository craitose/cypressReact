describe('Various examples', () => {

    beforeEach(() => {
        cy.visit('/examples')
    })


    it('muliti-page testing', () =>{
        cy.getDataTest('nav-why-cypress').click();
        cy.location("pathname").should("equal","/")

        cy.getDataTest('nav-overview').click();
        cy.location("pathname").should("equal","/overview")

        cy.getDataTest('nav-fundamentals').click();
        cy.location("pathname").should("equal","/fundamentals")

        cy.getDataTest('nav-forms').click();
        cy.location("pathname").should("equal","/forms")

        cy.getDataTest('nav-examples').click();
        cy.location("pathname").should("equal","/examples")

        cy.getDataTest('nav-component').click();
        cy.location("pathname").should("equal","/component")

        cy.getDataTest('nav-best-practices').click();
        cy.location("pathname").should("equal","/best-practices")
    })

    it('intercepts', () =>{
        cy.intercept("POST",'http://localhost:3000/examples', {
            fixture : 'example.json'
        })
        cy.getDataTest('post-button').click()
    })

    it.only('Grudges', () => {
        cy.contains('Add Some Grudges')
        cy.getDataTest('grudge-list').within(() =>{
            cy.get('li').should('have.length', 0)
        })

        cy.getDataTest('clear-button').should('not.exist')

        cy.getDataTest('grudge-input').within(() =>{
            cy.get('input').type('some grudge')
        })
        cy.getDataTest('add-grudge-button').click()

        cy.getDataTest('grudge-list').within(() =>{
            cy.get('li').should('have.length', 1)
        })

        cy.getDataTest('grudge-input').within(() =>{
            cy.get('input').type('interupting')
        })
        cy.getDataTest('add-grudge-button').click()

        cy.getDataTest('grudge-list').within(() =>{
            cy.get('li').should('have.length', 2)
            cy.get('li').its(0).should('contain.text', 'some')
        })

        cy.getDataTest('grudge-list').within(() =>{
            
            cy.get('li').its(0).within(() =>{
                cy.get('button').click()
            })
            cy.get('li').should('have.length', 1)
        })

        cy.getDataTest('clear-button').click()
        cy.getDataTest('grudge-list').within(() =>{
            cy.get('li').should('have.length', 0)
        })

    })


})