# daemonize.js
Simple library for create unix daemons

```
const daemonize = require('daemonize');

if (process.argv.indexOf('-d')) {

    process.argv = process.argv.filter(value => {

        let flags = ['-d', '--daemonize'];
        if (flags.indexOf(value) !== -1) return false;

    });

    daemonize();

}

```
