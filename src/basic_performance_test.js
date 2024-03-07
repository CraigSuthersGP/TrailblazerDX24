import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['disable-notifications', 'start-maximized']
        }
    }
});

await browser.url('https://login.salesforce.com')
await browser.$('#username').setValue('grandstandperformance@resilient-impala-jzsy11.com')
let password = process.env.PASSWORD;
await browser.$('#password').setValue(password);

await browser.$('#Login').click();

console.log('Login successful');

/*
 * integration - assert truth
 */

/*
 * performance - get resources - memory time network
 */


var stdin = process.stdin;
stdin.resume();
stdin.setEncoding( 'utf8' );
stdin.on( 'data', async function( key ) { await browser.deleteSession(); process.exit();});



