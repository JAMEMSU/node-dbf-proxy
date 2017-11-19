// Generated by CoffeeScript 2.0.2
(function() {
  // required nodejs modules
  var DBFProxy, exec, path;

  exec = require('child_process').exec;

  path = require('path');

  // DBFProxy class definition
  DBFProxy = class DBFProxy {
    constructor(_path = void 0) {
      this._path = _path;
      if (!this._path) {
        throw 'base path is required';
      }
      this._binary = path.join(__dirname, '..', 'bin', 'dbf.exe');
    }

    query(query, cb, bufferSize = 5000) {
      var command;
      query = '"' + query + '"';
      command = [this._binary, '--path', this.getPath(), '--query', query];
      return exec(command.join(' '), {
        maxBuffer: 1024 * bufferSize
      }, function(err, stdout, stderr) {
        var e;
        if (stderr.length === 0 && err) {
          return cb(err, null);
        }
        if (err) {
          return cb(stderr, null);
        }
        try {
          return cb(null, JSON.parse(stdout));
        } catch (error) {
          e = error;
          return cb(e, stdout);
        }
      });
    }

    // define getters and setters
    getPath() {
      return this._path;
    }

    setPath(_path) {
      this._path = _path;
    }

  };

  module.exports = DBFProxy;

}).call(this);
