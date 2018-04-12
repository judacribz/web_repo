const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const os = require('os');

const mongoConfig = "./config/mongod.conf";
const startMongo = "mongod";
const startMongoWin = "start " + startMongo;
const osType = os.type();

// setup os name
var osName = 'Linux';
switch (osType) {
    case 'Mac':
        osName = 'Macintosh';
    case 'Linux':
        logEnvStart(osName, startMongo);
        break;
    case 'Windows_NT':
        osName = 'Windows';
        logEnvStart(osName, startMongoWin);
        break;
    default:
        throw new Error("Unsupported OS found: " + osType);
        break;
}

// runs mongod server for each env
function logEnvStart(osEnv, cmd) {
    console.log(osEnv + ' environment detected.');

    switch (osEnv) {
        case 'Windows':
            exec(cmd + ' -f ' + mongoConfig, err);
            break;

        default:
            var pipe = spawn(cmd, ['-f', mongoConfig]);

            pipe.stdout.on('data', function (data) {
                console.log(data.toString('utf8'));
            });
            pipe.stderr.on('data', (data) => {
                console.log(data.toString('utf8'));
            });
            pipe.on('close', (code) => {
                console.log('Process exited with code: ' + code);

            });
            break;
    }
}

// output for mongod error in windows
function err(error, stdout, stderr) {
    console.log(stdout);
}