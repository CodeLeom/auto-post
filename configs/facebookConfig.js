const axios = require("axios");

const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
const page_id = process.env.FACEBOOK_PAGE_ID;

const handlePostContentToFacebook = (contentToPost) => {
  axios
    .post(
      `https://graph.facebook.com/v19.0/${page_id}/feed?access_token=${accessToken}`,
      {
        message: contentToPost,
      }
    )
    .then((response) => {
      console.log("Posted successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error occurred while posting:", error.response.data);
    });
};

module.exports = { handlePostContentToFacebook };
