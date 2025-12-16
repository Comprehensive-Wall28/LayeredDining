describe('Table Reservation Flow', () => {
    it('should register, login, and complete a table reservation', () => {
        // --- PART 1: REGISTER & LOGIN ---
        const uniqueId = Date.now();
        const newUser = {
            name: `Reservation User ${uniqueId}`,
            email: `res_user_${uniqueId}@example.com`,
            password: 'SecurePassword123!'
        };

        // 1. Visit Register Page
        cy.visit('http://localhost:3000/register');

        // 2. Fill Registration Form
        cy.get('input[name="name"]').type(newUser.name);
        cy.get('input[name="email"]').type(newUser.email);
        cy.get('input[name="password"]').type(newUser.password);

        // Submit Registration
        cy.get('button[type="submit"]').click();

        // 3. Verify Redirect to Login
        cy.url().should('include', '/login');

        // 4. Fill Login Form
        cy.get('input[name="email"]').should('be.visible').type(newUser.email);
        cy.get('input[name="password"]').type(newUser.password);

        // Submit Login
        cy.get('button[type="submit"]').click();

        // 5. Verify Successful Login
        cy.url().should('not.include', '/login');

        // --- PART 2: TABLE RESERVATION ---

        // 1. Click Home
        cy.contains('button', 'Home').click();
        cy.url().should('eq', 'http://localhost:3000/');

        // 2. Click Reserve a Table
        cy.contains('Reserve a Table').click();
        cy.url().should('include', '/reservation');

        // 3. Fill Reservation Form (Find Availability)
        // Date: use tomorrow's date to ensure availability in future
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dateStr = tomorrow.toISOString().split('T')[0];

        cy.get('input[type="date"]').type(dateStr);
        cy.get('input[type="time"]').first().type('19:00'); // Start Time
        cy.get('input[type="time"]').last().type('21:00');  // End Time

        // 4. Click Find Tables
        cy.contains('button', 'Find Tables').click();

        // 5. Select a Table (Book Now)
        // Wait for results
        cy.contains('Available Tables').should('be.visible');
        cy.contains('button', 'Book Now').first().click();

        // 6. Verify booking success (Success message)
        cy.contains('Table reserved successfully').should('be.visible');
    });
});
