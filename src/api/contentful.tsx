import { contentfulAccessToken, contentfulSpace } from "../utils/env";

const contentful = require("contentful/dist/contentful.browser.min.js");
export const client = contentful.createClient({
  space: contentfulSpace,
  accessToken: contentfulAccessToken,
});
