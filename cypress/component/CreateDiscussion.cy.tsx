
// reworked createDiscussion page layout, uncomment when tests updated.


// import { mount } from "cypress/react18";
// import { MockedProvider } from "@apollo/client/testing";
// import { MemoryRouter, Route, Routes } from "react-router-dom";
// import CreateDiscussionPage from "../../client/src/pages/CreateDiscussionPage";
// import { GET_CLUB, GET_ME } from "../../client/src/utils/queries";
// import { CREATE_DISCUSSION } from "../../client/src/utils/mutations";

// const userMock = {
//   request: { query: GET_ME },
//   result: {
//     data: {
//       me: {
//         books: [
//           {
//             _id: "1",
//             title: "Test Book",
//             authors: ["Author One"],
//             image: "test_image.jpg",
//             bookId: "book1",
//           },
//         ],
//       },
//     },
//   },
// };

// const clubMock = {
//   request: { query: GET_CLUB, variables: { clubId: "club1" } },
//   result: {
//     data: {
//       getClub: {
//         discussions: [{ bookId: "book2" }],
//       },
//     },
//   },
// };

// const createDiscussionMock = {
//   request: {
//     query: CREATE_DISCUSSION,
//     variables: {
//       title: "Test Book",
//       authors: ["Author One"],
//       image: "test_image.jpg",
//       bookId: "book1",
//       groupId: "club1",
//     },
//   },
//   result: {
//     data: {
//       createDiscussion: {
//         _id: "discussion1",
//       },
//     },
//   },
// };

// describe("CreateDiscussionPage Component", () => {
//   beforeEach(() => {
//     mount(
//       <MockedProvider
//         mocks={[userMock, clubMock, createDiscussionMock]}
//         addTypename={false}
//       >
//         <MemoryRouter initialEntries={["/club/club1"]}>
//           <Routes>
//             <Route path="/club/:id" element={<CreateDiscussionPage />} />
//           </Routes>
//         </MemoryRouter>
//       </MockedProvider>
//     );
//   });

//   it("renders the CreateDiscussionPage component", () => {
//     cy.contains("Pick a book from your collection to discuss").should("exist");
//     cy.contains("Test Book by Author One").should("exist");
//     cy.get("img[alt='Cover for Test Book']").should("exist");
//     cy.contains("Discuss this book").should("exist");
//   });

//   it("creates a discussion when 'Discuss this book' button is clicked", () => {
//     cy.contains("Discuss this book").click();
    
//   });

//   it("shows loading state when fetching data", () => {
//     const loadingMocks = [
//       {
//         request: { query: GET_ME },
//         result: { data: {} },
//         delay: 1000,
//       },
//       {
//         request: { query: GET_CLUB, variables: { clubId: "club1" } },
//         result: { data: {} },
//         delay: 1000, 
//       },
//     ];
  
//     mount(
//       <MockedProvider mocks={loadingMocks} addTypename={false}>
//         <MemoryRouter initialEntries={["/club/club1"]}>
//           <Routes>
//             <Route path="/club/:id" element={<CreateDiscussionPage />} />
//           </Routes>
//         </MemoryRouter>
//       </MockedProvider>
//     );
  
//     // The "Loading..." text should appear while the queries are in flight
//     cy.contains("Loading...").should("exist");
//   });
// });  
