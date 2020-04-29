# firebase-functions
A TypeScript file holding the Firebase functions created for a cloud computing project.

## Information

As part of a 4th-year course on Cloud Computing, we were tasked with creating a backend web service. Using Firebase, I created
a serverless RESTful API using Firebase and Firebase Cloud Functions. The `index.ts` file holds the functions that were created
for use by the service. 

This repository is meant to showcase sample code and is not meant to be run/compiled/deployed.

The URL to make requests to the service is `https://ta-assistant-e7e21.firebaseapp.com/api/v1/`

You can use an API request builder such as Postwoman (https://postwoman.io/) to try some requests for the service. For example,
making a GET request with the url `https://ta-assistant-e7e21.firebaseapp.com/api/v1/teachingAssistant` will return a list of
all teaching assistants loaded in the database.

You can make a POST request to url `https://ta-assistant-e7e21.firebaseapp.com/api/v1/announcements` and add parameters name, 
description, and teachingAssistantID to create a new announcement on the announcements table.

You are free to explore the `index.ts` file to find and test other requests available to the database.
