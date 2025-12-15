# Anonymous Gift Ideas

A simple web application for leaving anonymous gift ideas, stored in a Google Sheet.

## Setup

1. Clone or download this repository.

2. Install dependencies:
   ```
   npm install
   ```

3. Set up Google Sheets API:
   - Create a Google Cloud Project.
   - Enable the Google Sheets API.
   - Create a Service Account and download the JSON key file.
   - Share the Google Sheet with the service account email (editor access).
   - Set the environment variable `GOOGLE_CREDENTIALS_JSON` to the content of the JSON key file.

## Local Development

To run locally:
```
npm start
```
Visit http://localhost:3000

## Deployment to Render

1. Create a new Web Service on Render.
2. Connect your GitHub repository.
3. Set the build command to `npm install`.
4. Set the start command to `npm start`.
5. Add environment variable: `GOOGLE_CREDENTIALS_JSON` with the JSON content of your service account key.
6. Deploy.

The app will be accessible at the Render-provided URL.