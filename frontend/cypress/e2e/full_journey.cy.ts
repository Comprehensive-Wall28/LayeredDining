describe('Full User Journey', () => {
    it('should register, login, and complete an online order', () => {
        // --- PART 1: REGISTER & LOGIN ---
        const uniqueId = Date.now();
        const newUser = {
            name: `Test User ${uniqueId}`,
            email: `user_${uniqueId}@example.com`,
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

        // 4. Fill Login Form with NEW credentials
        cy.get('input[name="email"]').should('be.visible').type(newUser.email);
        cy.get('input[name="password"]').type(newUser.password);

        // Submit Login
        cy.get('button[type="submit"]').click();

        // 5. Verify Successful Login
        cy.url().should('not.include', '/login');

        // --- PART 2: ONLINE ORDER ---

        // 1. Click Home
        // Wait for any potential dashboard redirection/loading
        cy.contains('button', 'Home').click();
        cy.url().should('eq', 'http://localhost:3000/');

        // 2. Click Order Online
        cy.contains('Order Online').click();
        cy.url().should('include', '/menu');

        // 3. Add item "Add to Cart"
        // Wait for menu items to load and scroll into view
        cy.contains('Add to Cart').should('exist').scrollIntoView().should('be.visible');
        cy.contains('Add to Cart').click();

        // Verify item added (Snackbar appears)
        cy.contains('Added').should('be.visible');

        // Open Cart (Click Shopping Cart Icon)
        cy.get('svg[data-testid="ShoppingCartIcon"]').closest('button').click();

        // 4. Checkout
        // Wait for Drawer to open and Checkout button to be visible
        cy.contains('button', 'Checkout').should('be.visible').click();
        cy.url().should('include', '/checkout');

        // 5. Next (Review Order step)
        cy.contains('button', 'Next').click();

        // 6. Pay & Order (Payment Details step)
        // Wait for the next step to appear
        cy.contains('button', 'Pay & Order').should('be.visible').click();

        // Verify order completion (Redirects to order details)
        cy.url().should('include', '/orders/');
    });
});
