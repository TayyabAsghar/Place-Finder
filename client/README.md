# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Set Up Environment Variables

Create a new file named `.env.local` in the root of your project and add the following content:

```env
GENERATE_SOURCEMAP=false                    # Disable source map
REACT_APP_API_URL=http://localhost:5001     # URL of your api server.
REACT_APP_CLOUDINARY_CLOUD_NAME=cloudinary  # Cloudinary Cloud name.
```


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run build-max`

If you run into memory issue during normal `npm run build` command run this command. 