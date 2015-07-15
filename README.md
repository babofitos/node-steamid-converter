# SteamID Converter

A module for node that converts a 64bit SteamID to a text STEAM_x:y:z format and vice versa

```js
npm install steamidconvert
```

```js
var steam = require('steamidconvert')()
```

Convert SteamID into SteamID64

```js
steam.convertTo64('STEAM_0:0:6114800') //76561197972495328
```

Convert SteamID64 into SteamID

```js
steam.convertToText('76561197972495328') //STEAM_0:0:6114800
```

Convert Vanity into SteamID64

This is for converting custom URLs to SteamID64
```js
//e.g. http://steamcommunity.com/id/panvertigo/
var steam = require('steamidconvert')(/*your steam api key*/)
steam.convertVanity('panvertigo', function(err, res) {
  if (err) console.log(err)
  else console.log(res) //76561198000670105
})
```

Convert old SteamID to new SteamID format
```js
steam.convertToNewFormat('STEAM_0:0:6114800') //[U:1:12229600]
```
