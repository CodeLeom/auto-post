import { RestliClient } from "linkedin-api-client";
const restliClient = new RestliClient();

// still trying to figure out how to get a linkedin user urn:li:person:ID
const handlePostContentToLinkedIn = async () => {
  try {
    const response = await restliClient.get({
      resourcePath: "/me",
      accessToken: process.env.LINKEDIN_ACCESS_TOKEN,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

console.log(handlePostContentToLinkedIn());

// this are the information required to send a post request to linkedIn
// resourcePath: "/ugcPosts",
// entity: {
// author: `urn:li:person:a17193241`,
// lifecycleState: "PUBLISHED",
// specificContent: {
// "com.linkedin.ugc.ShareContent": {
// shareCommentary: {
// text: "Hello world from api",
// },
// shareMediaCategory: "NONE",
// },
// },
// visibility: {
// "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
// },
// },

export { handlePostContentToLinkedIn };
