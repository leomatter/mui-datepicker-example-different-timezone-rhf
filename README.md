# Example for material-ui datepickers / timepickers

using date-fns-tz

## How to use

this is based on create-react-app-with-typescript (https://github.com/mui/material-ui):

Install it and run:

```sh
npm install
npm start
```

or:

<!-- #default-branch-switch -->

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mui-datepicker-example-different-timezone-rhf-ylz7y1)

<!-- #default-branch-switch -->

## The idea behind the example

In most cases you will be fine with saving utc times and displaying local times.

but in some circumstances (like a physical shop opening time) you want to show the time in a specific tz, no matter where the browser is.

this example is how i managed to put that specific tz in a mui time picker.

feedback and suggestions welcome.
