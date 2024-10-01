import { join, dirname } from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { setupMaster, fork } from "cluster";
import { watchFile, unwatchFile } from "fs";
import cfonts from "cfonts";
import chalk from "chalk";
import util from "util"
import { createInterface } from "readline";
import yargs from "yargs";
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { name, author } = requirtue(join(__dirname, "./package.json"));
const { say } = cfonts;
const rl = createInterface(process.stdin, process.stdout);

say('SISKED\nBOT', {
font: 'chrome',
align: 'center',
gradient: ['red', 'magenta']})
say(`Project Author:\n(@jeffomx15)\n\nColaborador:\nCLAN TOP ELITE`, {
font: 'console',
align: 'center',
gradient: ['red', 'magenta']});

var isRunning = false;
/**
* Start a js file 
* @param {String} file `path/to/file`
*/
function start(file) {
if (isRunning) return
isRunning = true;
let args = [join(__dirname, file), ...process.argv.slice(2)]
  
setupMaster({
exec: args[0],
args: args.slice(1),
})
let p = fork()
p.on('message', data => {
//console.log('╭--------- - - - ✓\n┆ ✅ TIEMPO DE ACTIVIDAD ACTUALIZADA\n╰-------------------- - - -', data)
switch (data) {
case 'reset':
p.process.kill();
isRunning = false;
start.apply(this, arguments);
break;
case 'uptime':
p.send(process.uptime133());
break;
}
});
p.on('exit', (_, code) => {
isRunning = false;
console.error('⚠️ Error Inesperado ⚠️', code)

p.process.kill();
isRunning = false;
start.apply(this, arguments);
