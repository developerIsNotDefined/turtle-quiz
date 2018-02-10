# TURTLE QUIZ

Turtle quiz application built with MEAN stack provides information about turtles and fancy quiz to check gained knowledge.

## Getting Started

Application requires next actions to be done before using it:

1. Clone or download repository.
2. Open terminal in `turtle-quiz/server` folder.
3. Run `npm i` via terminal.
4. Run `npm server`.
5. Open another terminal in `turtle-quiz/public` folder.
6. Run `npm i` via terminal.
7. Run `npm start`.

Congratulations! Turtle quiz application is up and running...

***

## Features:

### Client side:

- Built with **JavaScript** framework **AngularJS**(version 1.6).
- Implements component based architecture:
  - [x] stateful/stateless components.
  - [x] one-way dataflow.
  - [x] lifecycle hooks.
  - [x] custom directives.
  - [x] ui-router(1.x).
- Implements *`form inputs data validation`*, *`loader`* and *`notification system`* for better UX.
- Implements *`JWT based athorization`* functionality.
- Uses semantic **HTML5**.
- **CSS3(BEM)** used for responsive web design implementation.
- Uses CSS pre-processor **SASS**.
- Uses Task runner **Gulp** for compiling SASS to CSS and its minification afterwards.
- Uses module bundler **Webpack** for module system benefits, also for transpiling ES6 to ES5.
- **ES2015** syntax.

***

### Server side:

- Built with **Node.js** framework **Express.js**.
- Provides *`endpoints`* for fetching turtles and quiz data.
- Implements *`JWT based athorization`* functionality. Includes *`hashing passwords`*.
- For storing users and turtles data used **noSQL database MongoDB**.
- **ODM mongoose** used for manipulating database purposes.
- Includes *`middleware`* that protects specific endpoints from interacting with unathorized users.
- Implements *`data validation`*.
- **ES2015** syntax + **async await** functionality.
