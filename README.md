# Website optimizationLevel

THis is a project of Udacity nanodegree program.

## Optimization Process
1. Minified `.css`, `.js`, `.html` and images.
2. Moved Google Analytics scripts to the end of the body.
3. Replaced remotely hosted thumbnails with locally hosted versions.
4. Applied media to css links and async attributes to js links.
5. Removed google fonts.
6. Refactor `views/js/main.js`.
  - Save DOM objects to variables to reduce DOM query.
  - Change `left` to `translate` to avoid layout and paint operations.
  - Reduce sliding pizza number.


## Quickstart

- Install [npm](https://www.npmjs.com/), [gulp](https://www.gulp.com/).

- Clone the repository, enter the project, and install dependencies.

```
  git clone https://github.com/mengdage/frontend-nanodegree-mobile-portfolio.git
  cd frontend-nanodegree-mobile-portfolio
  npm install
```

- If dist/ folder does not exist, build it first. Or go to the next step.

```
  gulp build:dist
```

- Run the gulp task 'serve:ngrok' to start server and [ngrok](https://ngrok.com/) so that you can make the local server accessible remotely.

```
  gulp serve:ngrok
```
