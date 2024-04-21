# Auto Post Content Using Google AI

This Node.js application utilizes the Toad Scheduler and Google Generative AI to automatically generate and post content to your social media accounts at specified intervals.

### Prerequisites

Before using this application, ensure you have the following:

- Node.js installed on your system.
- A Google API key for accessing the Generative AI.
- Twitter API credentials configured in twitterConfig.js.

### Installation

Clone this repository to your local machine.
Navigate to the project directory.
Install dependencies by running npm install.

### Configuration

Set up your Google API key by providing it as an environment variable GOOGLE_API_KEY.
Configure Twitter API credentials in twitterConfig.js.

### Usage

Run the application using node index.js.
The application will automatically generate content using Google Generative AI and post it to your configured social media account at the specified interval.

## Code Explanation

### Dependencies:

- toad-scheduler: Handles scheduling tasks.
- @google/generative-ai: Provides access to Google's Generative AI.

### Initialization:

- genAI: Creates an instance of Google Generative AI using the provided API key.
- scheduler: Creates an instance of the Toad Scheduler.

### Content Generation:

Retrieves a Generative AI model (gemini-pro) from Google.
Generates content based on a prompt.

### Scheduling:

job: Defines a simple interval job to run the task every 5 hours.
Starting the Scheduler:
Adds the job to the scheduler to initiate the scheduling process.

### Customization

Modify the prompt in the task to generate content based on specific topics.
Adjust the job interval to suit your requirements by modifying the interval object passed to SimpleIntervalJob.
Stopping the Application
When stopping your application, you can call scheduler.stop() to halt the scheduling process.

## Note

Ensure your server is always running for the scheduled tasks to execute as expected.
