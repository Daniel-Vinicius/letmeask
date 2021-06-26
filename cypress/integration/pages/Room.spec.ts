/// <reference types="cypress" />

describe("Room Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/rooms/-Md8b3BzdGjCkryhIutl");
  });

  it("Copy room Code", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get(".room-code > span").click();
    cy.get(".Toastify__toast-body").click();
    cy.get("textarea").click();
    cy.get("[data-cy=exit-room]").click();
  });
});
