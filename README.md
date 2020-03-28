# Scrypta IoT demo application

Use this application to create an history temperature graph using the blockchain.

This script fetches and saves the informations every 1 minute, so you need 0.144 LYRA each day because we're using low priority transactions with 0.0001 LYRA of fees.

Use simple with:
```node index.js```

Or if you want to create a persistent script using PM2:
```pm2 start index.js```

## Result

To understand the result simple visit this page:

https://proof.scryptachain.org/#/address/LduJ5TtcqSiefeP9e34gxvEfBq4W7N1ewo


It contains all the data from a Raspberry Pi4 running the Scrypta Wallet.