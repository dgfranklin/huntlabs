# HuntLabs

A successor to SSA Mobile for the modern era.

HuntLabs is a suite of tools for students of [Shady Shady Academy](https://www.shadysideacademy.org/).
Its original and primary feature is the generation of course calendars for Senior School students, faculty, and parents.
These calendars handle the complexities of school's eight-day cycle and layered permutations caused by special events.

HuntLabs is intended to replace most of [SSA Mobile](http://www.bustedtheory.com/code/ssamobile/), which has fallen out of date. @dgfranklin, one of the members of the SSA Mobile team, will be spearheading the project with help from current students.
For its initial scope, HuntLabs will be exclusively a web app, but down the road the platform native apps could be revisited.


## Stack Overview
HuntLabs uses [Angular](https://angular.io/) for its frontend, and makes use of [Angular Material](https://material.angular.io/) for its implementation of Material Design.
On the backend, HuntLabs is driven by [Node.js](https://nodejs.org/) and uses the [Express](http://expressjs.com) framework.
[MongoDB](https://www.mongodb.com/) is used as its database. (Yes, this is a "MEAN" stack)

Both the frontend and backend are written in [TypeScript](https://www.typescriptlang.org), a typed superset of JavaScript.
[gulp.js](http://gulpjs.com) is used for build automation. Instead of running our own CalDav server, the actual calendars will be stored on Google Calendar using [its API](  https://developers.google.com/google-apps/calendar/).

## Status
Currently this is not much more than a rough skeleton, but it should be a decent structure to build on.

Major areas that need to be worked on:
- Conversion of courses to events (In Progress)
- Authentication
- Storing user's courses in a database for subsequent changes
- Interfacing with Google Calendar API to create and update schedules

Refinements to the UI would be most welcome and may be a good starting area for students interested in contributing.

## Development Installation and Tips

**NOTE**: These instructions are not for end users. When the product is ready, using it will be as simple as going to a website and filling in a list of courses.

These instructions are a first draft and may be missing steps or otherwise inaccurate. Please file a bug if you run into problems as we solidify everything.

### Dependencies
You will need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Please consult platform specific guides for help on doing this.

You should then install [angular-cli](https://github.com/angular/angular-cli) globally with npm:
```bash
npm install -g angular-cli@latest
```

Likewise, install [gulp.js](http://gulpjs.com) globally with npm:
```bash
npm install -g gulp@latest
```

### Basic initialization
- Clone the project somewhere convenient.
- Navigate into the root directory of the project
- Run `npm install`
- Navigate into the client directory
- Run `npm install` again.

### Building
- In the root directory of the project run `gulp`
to kick off a default build of both the client and server code.

By default, this will build continuously. Frontend changes should reload immediately.  The backend will not do so by default, though there are ways to do this. The Gulpfile in the project's root directory provides several other configurations, including just building the client or just building the server.

### Running
- From the project root directory, run `node build/index.js` to start the server.
If everything up to this point has been successful, the server will say it is listening. You should be able to navigate to http://localhost:4200/ in a web browser to view the front end.

### Tips
- @dgfranklin recommends [Visual Studio Code](https://code.visualstudio.com/) for editing and debugging. It is free and its Typescript support is very good. [WebStorm](https://www.jetbrains.com/webstorm/) is another strong contender and [should be free for students](https://www.jetbrains.com/student/).
  - TODO(@dgfranklin): Add some sample configuration files for Visual Studio Code.
- While the project does not yet have a formal style guide associated with it, please try to follow conventions and patterns that are in the existing code. dgfranklin@ will likely be pretty picky. Running code through a linter should get you most of the way there however.
