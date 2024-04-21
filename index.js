// access environmental variables
require("dotenv").config();

// imports
const {
  ToadScheduler,
  SimpleIntervalJob,
  AsyncTask,
} = require("toad-scheduler");

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { handlePostContentToTwitter } = require("./configs/twitterConfig");
const { handlePostContentToFacebook } = require("./configs/facebookConfig");

// create an instance of google AI with your Google Api Key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// create an instance of Toad scheduler
const scheduler = new ToadScheduler();

// create an async task
const task = new AsyncTask("auto post task", async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const todaysDate = new Date();

  // modify the prompt to suit your own usage
  const prompt = `
    Today's date is ${todaysDate.getDate()} come up with something historical that happened example: 
    On the ${todaysDate.getDate()} ${todaysDate.toLocaleString("en-US", {
    month: "long",
  })}$,
    so so so and so happened... write it like a short twitter post add emoji and #tags to it`;

  // generate the content from google AI
  model
    .generateContent(prompt)
    .then((result) => {
      const contentToPost = result.response.text().replace("**", "");

      console.log(contentToPost);
      // post the content to your social accounts
      // ** more to be added **
      Promise.allSettled([
        handlePostContentToTwitter(contentToPost),
        handlePostContentToFacebook(contentToPost),
      ]);
      // ****more social media account will be added soon****
    })
    .catch((error) => {
      console.log(error);
    });
});

// Adjust the job interval to suit your usage.
// presently this is going to run at every 5 hours provided the server is always running
const job = new SimpleIntervalJob({ hours: 5 }, task);

// start up the job
scheduler.addSimpleIntervalJob(job);

// when stopping your app
// scheduler.stop();
