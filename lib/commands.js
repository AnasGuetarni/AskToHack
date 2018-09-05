console.log('-> commands.js loaded'.yellow);

const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);
//const ping = swpan('ping', []);
/*
ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
*/

module.exports = {

  parser_commands: function(command, params){

    switch(command){
      case "exploit":
        const ls = spawn('ls', ['-l', '/root/.msf4/modules/exploits']);
        ls.stdout.on('data', (data) => {});

        ls.stderr.on('data', (data) => {
          //console.log(`stderr: ${data}`);
        });

        ls.on('close', (code) => {});

        break;

      case "exploit":
        break;

      default:
        break;
    }
  },


}
