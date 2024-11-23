
import { mount } from "cypress/react18";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import ProfilePage from "../../client/src/pages/ProfilePage";
import { GET_ME } from "../../client/src/utils/queries";

const userMock = {
  request: { query: GET_ME, fetchPolicy: "cache-and-network" },
  result: {
    data: {
      me: {
        username: "TestUser",
        books: [
          {
            _id: "book1",
            title: "Test Book 1",
            image: "test_book1.jpg",
          },
          {
            _id: "book2",
            title: "Test Book 2",
            image: "test_book2.jpg",
          },
        ],
        groups: [
          {
            _id: "group1",
            groupname: "Test Club 1",
            description: "Description for Test Club 1",
          },
          {
            _id: "group2",
            groupname: "Test Club 2",
            description: "Description for Test Club 2",
          },
        ],
      },
    },
  },
};

describe("ProfilePage Component", () => {
  it("renders the ProfilePage component with user data", () => {
    mount(
      <MockedProvider mocks={[userMock]} addTypename={false}>
        <MemoryRouter>
          <ProfilePage />
        </MemoryRouter>
      </MockedProvider>
    );

    // Ensure the welcome message is displayed
    cy.contains("Welcome, TestUser").should("exist");

    // Verify book display
    cy.contains("My Books").should("exist");
    cy.get("img[alt='Cover for Test Book 1']").should("exist");
    cy.get("img[alt='Cover for Test Book 2']").should("exist");

    // Verify club display
    cy.contains("My Clubs").should("exist");
    cy.contains("Test Club 1").should("exist");
    cy.contains("Test Club 2").should("exist");
  });

  it("shows a loading message while fetching data", () => {
    const loadingMock = {
      request: { query: GET_ME, fetchPolicy: "cache-and-network" },
      result: {},
      delay: 1000, 
    };

    mount(
      <MockedProvider mocks={[loadingMock]} addTypename={false}>
        <MemoryRouter>
          <ProfilePage />
        </MemoryRouter>
      </MockedProvider>
    );

    cy.contains("Loading profile...").should("exist");
  });

  it("displays an error message when the query fails", () => {
    const errorMock = {
      request: { query: GET_ME, fetchPolicy: "cache-and-network" },
      error: new Error("Failed to fetch data"),
    };

    mount(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <MemoryRouter>
          <ProfilePage />
        </MemoryRouter>
      </MockedProvider>
    );

    cy.contains("Error loading profile: Failed to fetch data").should("exist");
  });


  it("navigates to appropriate links for books and clubs", () => {
    mount(
      <MockedProvider mocks={[userMock]} addTypename={false}>
        <MemoryRouter>
          <ProfilePage />
        </MemoryRouter>
      </MockedProvider>
    );

    cy.get("a[href='/book/book1']").should("exist");
    cy.get("a[href='/book/book2']").should("exist");

    cy.get("a[href='/club/group1']").should("exist");
    cy.get("a[href='/club/group2']").should("exist");
  });
});
