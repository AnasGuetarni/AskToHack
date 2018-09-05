console.log('-> commands.js loaded'.yellow);

const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

module.exports = {
/*
  parser_commands: function(command, params){

    switch(command){
      case "exploit":
        const ls = spawn('ls', ['-l', '/root/.msf4/modules/exploits']);
        ls.stdout.on('data', (data) => {});

        ls.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });

        ls.on('close', (code) => {});

        break;

      case "exploit":
        break;

      default:
        break;
    }
  },
*/
  parser_arguments: function(command, args){
    console.log('in arguments: ' + command + ' / ' + args);
    let args_tab = new Array();
    for (i in args){
      if (args[i] === ' '){
        args_tab.push(args.slice(0, i));
        console.log('args tab: ' + args_tab);
        parser_arguments(command, args.slice(i+1, args.length));
      }
    }
    return args_tab;
  }


}
