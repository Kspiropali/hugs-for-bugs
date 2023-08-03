<h1 align="center">Welcome to hugs-for-bugs 👋</h1>
<img alt="homepage of webpage" width="800px" height="200px" src="pictures/hug-for-bug-logo.jpeg" />
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0--STABLE-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/npm-%3E%3D9.5.0-blue.svg" />
  <img src="https://img.shields.io/badge/node-%3E%3D18.16.0-blue.svg" />
  <a href="https://github.com/Kspiropali/hugs-for-bugs" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/kefranabg/readme-md-generator/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/kspiropali/hugs-for-bugs" />
  </a>
  <a href="https://github.com/Kspiropali/hugs-for-bugs/actions/workflows/build.yml" target="_blank">
    <img alt="build status" src="https://github.com/Kspiropali/hugs-for-bugs/actions/workflows/build.yml/badge.svg?branch=main" />
  </a>
</p>

> A cycle 1 of [La Fosse Academy's](https://www.lafosseacademy.com/) projects demonstrating the utilization of different framework technologies in order to create a basic but efficient quizzlet

## 🏠 [Homepage](https://github.com/Kspiropali/hugs-for-bugs)

## ✨ [Demo](https://hugs-for-bugs.onrender.com)

## 📷 [Screenshots]()
<img alt="pre login homepage" width="800px" height="500px" src="pictures/pre-login.png" />
<img alt="post login homepage" width="800px" height="500px" src="pictures/post-login.png" />
<img alt="question page" width="800px" height="500px" src="pictures/quizlet.png" />

## Prerequisites

- npm >=9.5.0
- node >=18.16.0/lts-hydrogen
- - [express](https://expressjs.com/)
- - [cors](https://www.npmjs.com/package/cors)
- - [dotenv](https://www.dotenv.org/docs/)
- - [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)

## Dev-Prerequisites
- - [jest](https://jestjs.io/)
- - [supertest](https://www.npmjs.com/package/supertest)

## Install

```bash
npm i
```

# Usage

```bash
npm run start
```

# Run tests

```bash
npm run test
```

# Future Updates
- ## Database 
- - Plug in a real database such as postgreSQL
- - Plug in a caching/memory based database such as redis
- - Harden above databases with ip filtering/selective management
- ## Security related features
- - Login with a username and additionally a password
- - Encrypt all incoming and outgoing connections with SSL/TLS(https)
- - Hashing passwords, server principal roles and etc.
- - Use csrf tokens to crombat Cross origin attacks.
- - Implement per user session, allow users only from a running session at a time
- - Create a docker-compose alternative which will enforce strict routing rules from/to the backend/databases/clients
- - Possibly use nginx as proxy to hide actual backend and/or rewrite header
- - Implement stricter github push/pull rules, add automated bots
- ## CI/CD
- - Possibly use kubernetes for mass deployment to multiple servers
- - Jenkins integration
- - Create a second deployment server for the dev environment
- ## Management
- - Create admin accounts, able to CRUD to the database
- - Allow management panel to view server logs
- - Ability to reboot/replace server
- ## Misc 
- - Usage of websockets so users can communicate in realtime between them
- - Usage of SSE(server sent events) so that leaderboard updates are handled more efficiently
- - Usage of GRPCs for better blob data transfer
- - Usage of css technologies such as tailwindcss, bootstrap and etc to make UI more elegant
- - Usage of different effect js libraries such as particlesjs to make UI more elegant


# Bugs Encountered and solution
- In order to reuse a template variable multiple times for and endpoint, a [copy on clone method](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) is needed instead of the default pass by reference that is in place. So:
    ```javascript
    const studentsTemplate = {name: "test", data: ["data1","data2","data3"]};
    let studentsArr = [];

    for(let i = 0; i < 10; i++){
        studentsTemplate.name = studentsTemplate.name + " " + i;
        studentsArr.push();
    }

    ```
    Would produce an array with 9 copies of the last element that was pushed.

- In order to serve html/css and generally any static files from express js(and other frameworks typically), we can't link them from the html pages directly by using relative pathing. Instead, we also need to serve all the static files that will be used by declaring a static path like so:
    ```javascript
    const path = require("path");
    // root path of project folder, going 1 directory back since 
    // the index.js was in a server/ folder
    const project_dir = path.join(__dirname, "..");
    // or any other static folders from the perspective 
    // of the root project location
    app.use(express.static(project_dir + "/client/res/"));

    // resources can the be accessed normally via the server's url
    // http://localhost:8080/image.png
    ```

# Authors

**👤 Kristian Spiropali, 👤 Balram Singh, 👤 Valentin Abrutin**

* GitHub: [@kspiropali](https://github.com/kspiropali)
* GitHub: [@bobzilla1202](https://github.com/bobzilla1202)
* GitHub: [@valentin-ab](https://github.com/valentin-ab)

# 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Kspiropali/hugs-for-bugs/issues). You can also take a look at the [contributing guide](CONTRIBUTING.md).


# 📝 License

Copyright © 2023 [Kristian Spiropali(Kspiropali), Balram Singh(bobzilla1202), Valentin Abrutin(valentin-ab)](https://github.com/kspiropali).<br />
This project is [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) licensed.