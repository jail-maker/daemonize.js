'use strict';

const {spawn, spawnSync} = require('child_process');
const fs = require('fs');

class Daemonize {

    constructor(settings = {}) {

        let {

            pid = '/tmp/node_daemon.pid',
            cwd = process.env.PWD,
            stdio = 'ignore',
            env = process.env,

        } = settings;

        this._pid = pid;
        this._cwd = cwd;
        this._stdio = stdio;
        this._env = env;

        this._checkPid();

        if (this.isDaemonized()) {

            this._createPid();

            process.on('SIGINT', this._destroyPid);
            process.on('SIGTERM', this._destroyPid);

        }

    }

    isDaemonized() {

        if (process.env._DAEMONIZED) return true;
        else return false;

    }

    _checkPid() {

        try {

            fs.openSync(this._pid, 'r');
            throw new Error('Process all ready exists.');

        } catch (err) {

            if (err.code !== 'ENOENT') throw err;

        }

    }

    _createPid() {

        fs.writeFileSync(this._pid, process.pid);

    }

    _destroyPid() {

        fs.unlinkSync(this._pid);

    }

    start() {

        if (this.isDaemonized()) return;

        process.argv.shift();
        let argv = process.argv;
        this._env._DAEMONIZED = "true"

        spawn(process.execPath, argv , {
            cwd: this._cwd,
            stdio: this._stdio,
            env: this._env,
            detached: true,
        });

        process.exit();

    }

}

module.exports = Daemonize;
