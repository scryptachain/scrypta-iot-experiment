const ScryptaCore = require('@scrypta/core')
require('dotenv').config()
const { exec } = require("child_process");

const privkey = process.env.PRIVKEY
const scrypta = new ScryptaCore
const si = require('systeminformation')

if (privkey !== undefined) {

    function storeTemperature() {
        exec("/opt/vc/bin/vcgencmd measure_temp", async (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            let response = stdout.trim().replace('temp=', '').replace("'", '')
            let importedkey = await scrypta.importPrivateKey(privkey, privkey)
            let address = importedkey.pub
            let balance = await scrypta.get('/balance/' + address)
            if (balance.balance > 0.001) {

                let sysinfo = await si.system()
                delete sysinfo.uuid
                delete sysinfo.sku
                sysinfo.temp = response
                sysinfo.timestamp = new Date()

                let dataToWrite = JSON.stringify(sysinfo)
                let write = await scrypta.post('/write',
                    {
                        dapp_address: address,
                        private_key: privkey,
                        data: dataToWrite,
                        collection: 'RaspTemperature',
                        fees: 0.0001
                    })
                console.log('DATA WRITED')

            } else {
                console.log('INSUFFICIENT FUNDS')
            }
        });
    }
    
    storeTemperature()
    setInterval(function () {
        storeTemperature()
    }, 60000)

} else {

    console.log('NO PRIVATE KEY FOUND, PLEASE WRITE IT INTO .env FILE')

}

