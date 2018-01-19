# daemonize.js
Simple library for create unix daemons

```javascript
const Daemonize = require('daemonize');

let settings = {
    pid: "/var/run/programm.pid",
    cwd: "/",
};

let daemonize = new Daemonize(settings);

if (process.argv.indexOf('-d')) daemonize.start();
if (process.argv.indexOf('--daemonize')) daemonize.start();
```
