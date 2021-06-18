#!/usr/bin/env node

const https = require('https');


https.get('https://json.ipv4.wtfismyip.com', response => {
    let ipv4 = '';
    response.on('data', chunk => {
        ipv4 += chunk;
    })

    response.on('end', () => {
        https.get('https://json.ipv6.wtfismyip.com', ipv6response => {
            let ipv6 = "";
            ipv6response.on('data', ipv6chunk => {
                ipv6 += ipv6chunk;
            })

            ipv6response.on('end', () => {
                let ipv6object = JSON.parse(ipv6);
                let ipv4object = JSON.parse(ipv4);
                console.log(`Your fucking IPv4-Address is: ${ipv4object['YourFuckingIPAddress']}`);
                console.log(`Your fucking IPv6-Address is: ${ipv6object['YourFuckingIPAddress']}`)
                console.log(`Your fucking ISP is: ${ipv6object['YourFuckingISP']}`)
                console.log(`Your ${!ipv6object["YourFuckingTorExit"] ? "aren't fucking using TOR" : 'fucking TOR exit is: ' + ipv6object["YourFuckingTorExit"]}`);
                console.log(`Your fucking Countrycode is: ${ipv6object['YourFuckingCountryCode']}`);
            })
        })
    })

})