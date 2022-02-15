# Getting Started with Valuter-UI


This is a UI for Valuter testnet evaluator tool. 

# Install & development
The best way to install it is to do it through a bundle called [testnet-evaluator](https://github.com/archway-network/testnet-evaluator/). 

# Configuration
There is a `conf.js` configuration file in the `public` directory.
This file is loaded dynamically on page load and consists of the configs for the UI. 

```js
var Configs = {
    API_URL: "http://localhost:8080/"
};
```

Currently it only has the `API_URL` which has to point to the server running [valuter](https://github.com/archway-network/valuter).

PS: this file must be mapped to the html root of the webserver running the UI. *e.g.* `/usr/share/nginx/html/conf.js`