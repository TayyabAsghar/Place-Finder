# Getting Started with Express

## Set Up Environment Variables

Create a new file named `.env` in the root of your project and add the following content:

```env
ENV=DEV                                 # Environment Check or you can use different env files
PORT=5001                               # Port for API server
DATABASE_NAME=DataBase                  # Mongoose Data Base Name
JWT_ACCESS_TOKEN_EXPIRY=1m              # Access Token Expiry
JWT_REFRESH_TOKEN_EXPIRY=100d           # Refresh Token Expiry
CLOUDINARY_CLOUD_NAME=CloudName         # Cloudinary Name
CLOUDINARY_API_KEY=CloudAPIKey          # Cloudinary Key
CLOUDINARY_API_SECRET=CloudAPISecret    # Cloudinary Secret
CLIENT_BASE_URL=http://localhost:3000   # Frontend Url for Whitelisting CORS
JWT_ACCESS_TOKEN_SECRET=AccessSecret    # Access Token Secret for jwt verification
JWT_REFRESH_TOKEN_SECRET=RefreshSecret  # Refresh Token Secret for jwt verification
MONGO_URL=MongooseConnectionString      # Mongoose Connection string
```


## Available Scripts

In the project directory, you can run:

### `npm dev`

Runs the app in the locally.