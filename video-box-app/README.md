# Video Box Angular Application
This Angular application is designed to provide a user-friendly interface for viewing and interacting with videos hosted on a cloud service. The application has two main screens: the Video List Screen and the Video Details Screen. Below, you'll find instructions on setting up, building, and running the application, as well as an overview of its features.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version `15.2.9`

## Getting Started
To get started with this project, follow these steps:
1. Clone the Video Box Server repository and follow the instructions in its README to set up and run the REST API backend.
2. Set the Video Box App on your local machine.
3. Install the required dependencies using npm:
```sh
npm install
```

## Building the Application
Before you can run the application, you need to build it. Follow these steps to build the application:
1. Open a terminal/command prompt in the root directory of the cloned Angular project.
2. Run `ng build --prod` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running the Application Locally
Now that you've built the application, you can run it locally. Follow these steps:
1. Start the Angular development server:
`ng serve`
This will launch the application locally, and you can access it in your web browser at `http://localhost:4200`

## Screens
### Video List Screen (Screen 1)
- The Video List Screen displays a list of all the videos available from the cloud service.
- You can toggle between displaying the videos as a list or a grid using the provided button.
- Clicking on a video item will navigate you to the Video Details Screen for that video.
URL for this screen: `http://{app}/videos`
- Related Endpoints
To get the list of videos: GET `http://{backend}/api/videos`

### Video Details Screen (Screen 2)
- The Video Details Screen displays a video player with the selected video.
- The video starts in a paused state by default.
- If the video is owned by the logged-in user, the title of the video is displayed in an input field. Modifying the input field will show a Save button. Clicking the Save button updates the video's name on the server using the PATCH `http://{backend}/api/videos/:videoId` API.
- The user can play and pause the video by clicking the play/pause toggle button.
- The screen also displays a list of "Reactions" retrieved from the server via the GET `http://{backend}/api/videos/:videoId/reactions` endpoint. There are two types of Reactions: Stars and Snapshots.
- Clicking the Star button generates a Reaction of type "Star" at the current video timestamp. The Star Reaction is saved to the server using the POST `http://{backend}/api/videos/:videoId/reactions` API and displayed in the Reaction list below the video.
- Clicking the Snapshot button generates a Reaction of type "Snapshot" at the current timestamp. The Snapshot Reaction is saved to the server using the POST `http://{backend}/api/videos/:videoId/reactions` API and displayed in the Reaction list below the video.
- The back button allows the user to return to the Video List screen, and any modifications to the video should be reflected in the Video List.
- Users can click on reactions listed in the reactions list. When a reaction is clicked, the video is paused, and the video's current position is set to match the clicked reaction's timeframe value.
URL for this screen: `http://{app}/videos/{videoId}`

## REST API Details
For handling the necessary REST API requests, a separate backend application is provided. You can find the backend app and detailed installation instructions in the Video Box Server repository.

Please note that for the sake of simplicity, the provided backend REST API app does not have authentication or authorization. The logged-in user is hardcoded into the app, so all API requests will be executed under the context of the default user.

**Happy Coding!😊**

