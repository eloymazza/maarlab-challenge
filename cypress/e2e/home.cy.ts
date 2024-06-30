describe('visit home', () => {
    it('should visit home', () => {
        cy.visit('localhost:3000/')
        cy.title().should('include', 'Hotel Finder')
    })

    it('should verify that list can be fetched on scroll and filtered', () => {
        // visit home
        cy.visit('localhost:3000/')
        const hotelList = cy.get('[data-testid=hotels-list]')
        hotelList.children().should('have.length', 4)

        // scroll to bottom
        cy.get('[data-testid=hotels-list]').scrollTo('bottom')

        // check that the loader is displayed
        cy.get('[data-testid=loader]').should('exist')
       
        // wait for the loader to disappear
        cy.get('[data-testid=loader]').should('not.exist')

        // check that the list has more hotels
        cy.get('[data-testid=hotels-list]').children().should('have.length', 8)

        // filter by 2 stars
        cy.get('[data-testid=filter-2-Stars]').click()

        // check that the list has 4 hotels
        cy.get('[data-testid=hotels-list]').children().should('have.length', 5)

        // filter by under 300
        cy.get('[data-testid=filter-Under-300]').click()

        // check that the list has 1 hotel
        cy.get('[data-testid=hotels-list]').children().should('have.length', 2)
    })
    
    it('should verify that map can be filtered', () => {
        // visit home
        cy.visit('localhost:3000/')
        
        // check that the map is displayed
        cy.get('[data-testid=hotels-map]').should('exist')

        // check that the list has more hotels
        cy.get('[data-testid=hotels-list]').children().should('have.length', 4)

        // filter by 2 stars
        cy.get('[data-testid=filter-2-Stars]').click()

        // check that the map has 2 hotels
        cy.get('.mapboxgl-marker').should('have.length', 2)
    })

    it('should verify that map can be filtered by bounds', () => {
       
        cy.visit('localhost:3000/')
        
        // check that the map is displayed
        cy.get('[data-testid=hotels-map]')

        // check that the list has more hotels
        cy.get('[data-testid=hotels-list]').children().should('have.length', 4)

        cy.get('[data-testid=hotels-map]').should('be.visible');

        // wait for the map to load
        cy.wait(2000);
  
        // simulate map scroll
        cy.get('[data-testid=hotels-map]').trigger('wheel', {
            deltaY: -5000, 
            deltaX: 0,
            deltaMode: 0,
            bubbles: true
        });

        cy.wait(500);

        cy.get('[data-testid=hotels-map]').trigger('wheel', {
            deltaY: -500, 
            deltaX: 0,
            deltaMode: 0,
            bubbles: true
        });
  
        cy.wait(1000);
    })
})

