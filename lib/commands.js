"use strict";

console.log('-> commands.js loaded'.yellow);

var ping = require('ping');
var os = require('os');
var netstat = require('netstat');

var ifaces = os.networkInterfaces();


module.exports = {

  ping_function: function(args, callback){
    let args_tab = new Array();
    let i = 1;

    args.forEach(function(host){
      ping.sys.probe(host, function(isAlive){
        args_tab.push(isAlive);
        if (args_tab.length == args.length) callback(args_tab);
      });
      i++;
    });
  },

  ifconfig_function: function(callback){
    let interfaces = new Array();
    Object.keys(ifaces).forEach(function (ifname) {
      var alias = 0;
      ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
          return;
        }

        if (alias >= 1) {
          interfaces.push({ name: ifname, alias: alias, address: iface.address });
        } else {
          interfaces.push({ name: ifname, address: iface.address });
        }
        ++alias;
      });
    });
    callback(interfaces);
  },

  netstat_function: function(callback){
    console.log('in netstat function');
    netstat.on( 'stdout', function( data ){
      process.stdout.write(
        JSON.stringify( netstat.parse( data ), null, 2 ) + '\n'
      );
      callback(data);
    });

    netstat.on( 'stderr', function( err ) {
      process.stderr.write( err );
      callback(err);
    });

  }

}
