# Squadr - FA Technical Test

## Brief
Candidates are to create a prototype Squad Selection tool, which can be for any sport, it doesn’t have to be football. The app is for a Coach, who must be able to perform the following tasks as a minimum.
 
- [x] Select a squad from a pool of players
- [x] Add and remove players from the squad
- [x] Choose a formation
- [x] Save and retrieve the view at a later time

The prototype must be:

- [x] Developed with a React and Redux front end
- [x] Connected to GCP using any app engine standard language e.g. Node JS or Java

## Solution

```/```

This repository has a Node.js® app at its root which runs a lightweight Express framework that takes care of serving the REST API and the React application.

`/client`

The client is a React app built using the `create-react-app` bootstrapper, with the `redux-typescript` template. It uses Material UI for its UI framework. See `client/package.json` for the various libraries used to support the apps features. State management is handled via Redux Toolkit for sensible and opinionated structure and Thunk paradigms.

`/prisma`

In the `prisma` folder is a schema, migration and seed tool for connecting to, initialising and seeding the database using the Prisma ORM. The schema has connector options for local development using SQLite or local/remote development using Cloud SQL.

The solution in this repository answers the brief, but also adds some extra touches:

- DB-agnostic schema via Prism (swap out backend with 2 lines)
- DB migration
- DB seeding
- API connected to Cloud SQL in production
- Formation Visualiser
- Mobile/Tablet/Desktop support
- Drag and drop interface in formation rows
- Live updates to server

This solution is limited due to time constraints, and does not do the following usual practices:

- Test Coverage
- Continuous Deployment
- Authentication
- User specific squads
- TDD/BDD/User Stories
- High Fidelity Design
- `git-secrets` credentials management
- Security review
- Automatic environment during deployment
- Legacy browser support
- Accessibility
- i18n/translations

## Running locally

Install the dependencies of the server app:

```yarn install```

Install the dependencies of the client app:

```cd client && yarn install && cd ..``

Initialise the database (SQLite is used locally):

```yarn db-init```

Enter a name for the DB migration when prompted (e.g. `init`)

Seed the database:

```yarn db-seed```

Once the database has been initialised and seeded, you can start the server and client at the same time using:

```yarn dev```

This should open up a browser window for you, however if it does not you can manually navigate to `http://localhost:3000` to view the running app.

See `package.json` for other available scripts.

