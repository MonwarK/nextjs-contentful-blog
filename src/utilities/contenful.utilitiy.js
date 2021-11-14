const contentful = require("contentful");

export const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "ndc59qe8lcd5",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "IZ6Ejv4crgX0-u6p67LWQw1I9hlyGjQldeWh863zQHE"
});