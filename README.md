<div align="center">
  <div>
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="react" />
    <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=47A248" alt="mongodb" />
    <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="express.js" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white" alt="react hook form" />
    <img src="https://img.shields.io/badge/-Zod-black?style=for-the-badge&logoColor=white&logo=zod&color=3E67B1" alt="zod" />
    <img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white" alt="redux" />
    <img src="https://img.shields.io/badge/cloudinary-%3448C5.svg?style=for-the-badge&logo=cloudinary&logoColor=white&color=3448C5" alt="cloudinary" />
    <img src="https://img.shields.io/badge/-Typescript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
  </div>

  <h3 align="center">Place Finder</h3>

   <div align="center">
     A web platform for discovering and booking accommodations near popular tourist destinations. 
    </div>
</div>

> [!NOTE]
>
> On free account on Render, it takes down the instance in every 15 minutes of inactivity so you may face very high initial load time or api delays as mentioned [here](https://community.render.com/t/website-takes-ages-to-load/11242).

## <a name="table">📋 Table of Contents</a>

1. 👋 [Introduction](#introduction)
2. 💻 [Tech Stack](#tech-stack)
3. 🐛 [Known Issues](#known-issues)
4. 🏁 [Quick Start](#quick-start)

## <a name="introduction">👋 Introduction</a>

A web platform that offers a convenient solution for travelers seeking accommodations near popular tourist destinations. Users can easily discover and book suitable lodging options based on their preferences.

## <a name="tech-stack">💻 Tech Stack</a>

- [React](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Cloudinary](https://cloudinary.com/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [TailwindCSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Redux](https://redux.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Render](https://render.com/)

## <a name="Known Issues">🐛 Known Issues</a>
- Functionality to delete trip.
- Add pagination to listings.

## <a name="quick-start">🏁 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/TayyabAsghar/Place-Finder.git
cd place-finder
```

**Installation**

Install the project dependencies using single npm command in root folder:

```bash
npm run deps
```
or individually to move to `client` and `server` folder and run:

```bash
npm i
```

``After that refer to README.md to each folder to setup environment variables and run project locally.``

**Deployment**

- Create an account on [Render](https://render.com/). 
- Create a new project.
- Overwrite the `install` , `build` and `start` commands if necessary.
- Deploy the web. 
- Update the environment variables `REACT_APP_API_URL` , `CLIENT_BASE_URL` and `homepage` in `client/package.json`.
- Redeploy the web with new environment variables.
