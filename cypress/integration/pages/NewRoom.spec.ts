/// <reference types="cypress" />

describe("NewRoom Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/rooms/new");
  });

  it("You must be logged in to create a room", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("form > input").click();
    cy.get(".button").click();
    cy.contains("É necessário estar logado para criar uma sala!");
    /* ==== End Cypress Studio ==== */
  });

  it("By clicking on the logo redirect to Home", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#logo").click();
    cy.get("#join-to-room");
    /* ==== End Cypress Studio ==== */
  });
});
