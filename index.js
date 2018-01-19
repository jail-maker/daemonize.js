'use strict';

const {spawn, spawnSync} = require('child_process');
const fs = require('fs');

module.exports = (settings = {}) => {

    let {

        pid = '/tmp/node_daemon.pid',
        cwd = '/',
        stdio = 'ignore',
        env = process.env,

    } = settings;

    try {

        fs.openSync(pid, 'r');
        throw new Error('Process all ready exists.');

    } catch (err) {

        if (err.code !== 'ENOENT') throw err;

    }

    process.argv.shift();
    let argv = process.argv;

    spawn(process.execPath, argv , {
        cwd: cwd,
        stdio: stdio,
        env: env,
        detached: true,
    });

    process.exit();

}
