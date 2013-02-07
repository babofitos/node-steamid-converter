# SteamID Converter

A module for node that converts a 64bit SteamID to a text STEAM_x:y:z format

```js
npm install steamidconvert
```

```js
var steam = require('steamidconvert')

steam.convertTo64('STEAM_0:1:82174', function(err, res) {
  if (err) console.log(err)
  else console.log(res) //76561197960430077
})

```