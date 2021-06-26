/// <reference types="cypress" />

describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Input Validation", () => {
    cy.get("#join-to-room").click();
    cy.contains("Digite o código da sala!");

    cy.get("#room-code").type("Room not existent");
    cy.get("#join-to-room").click();
    cy.contains("Sala não encontrada!");

    cy.get("#room-code").clear().type("-Md4L4YP7kGbXiaL-5wQ");
    cy.get("#join-to-room").click();
    cy.contains("A sala já foi encerrada pelo administrador!");
  });

  it("Toogle Theme", () => {
    cy.get(".react-toggle-thumb").click();
    cy.get(".dark-mode");

    cy.get(".react-toggle-thumb").click();
    cy.get("body").should("not.have.class", "dark-mode");
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("Join Room", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#room-code").clear();
    cy.get("#room-code").type("-Md8b3BzdGjCkryhIutl");
    cy.get("#join-to-room").click();
    cy.contains("Cypress Room");
  });
});
