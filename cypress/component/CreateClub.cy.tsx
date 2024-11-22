
import React from "react";
import { mount } from "cypress/react18";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import CreateClubPage from "../../client/src/pages/CreateClub";
import { CREATE_GROUP } from "../../client/src/utils/mutations";

const mocks = [
  {
    request: {
      query: CREATE_GROUP,
      variables: {
        groupname: "Test Club",
        description: "This is a test description.",
      },
    },
    result: {
      data: {
        createGroup: {
          _id: "12345",
        },
      },
    },
  },
];

describe("CreateClubPage Component", () => {
  beforeEach(() => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <CreateClubPage />
        </MemoryRouter>
      </MockedProvider>
    );
  });

  it("renders the CreateClubPage component", () => {
    cy.get("h1").should("contain.text", "Create a Club");
    cy.get("#groupname").should("exist");
    cy.get("#description").should("exist");
    cy.get("button[type='submit']").should("exist").and("contain.text", "Create Club");
  });

  it("shows an error when description exceeds 250 characters", () => {
    const longText = "a".repeat(251);
    cy.get("#description").type(longText);
    cy.get(".invalid-feedback").should("contain.text", "Description cannot exceed 250 characters.");
    cy.get("button[type='submit']").should("be.enabled");
  });

  it("allows form submission with valid inputs", () => {
    cy.get("#groupname").type("Test Club");
    cy.get("#description").type("This is a test description.");
    cy.get("button[type='submit']").click();
  });

  it("displays an error message if the mutation fails", () => {
    const errorMocks = [
      {
        request: {
          query: CREATE_GROUP,
          variables: {
            groupname: "Test Club",
            description: "This is a test description.",
          },
        },
        error: new Error("Failed to create club"),
      },
    ];

    mount(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <MemoryRouter>
          <CreateClubPage />
        </MemoryRouter>
      </MockedProvider>
    );

    cy.get("#groupname").type("Test Club");
    cy.get("#description").type("This is a test description.");
    cy.get("button[type='submit']").click();
    cy.get(".text-danger").should("contain.text", "Failed to create club");
  });
});
