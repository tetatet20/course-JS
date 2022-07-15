import './module.js';
import './scss/index.scss';
console.log('poma');

async function start() {
    return await Promise.resolve('OK');
}

start().then(console.log);
