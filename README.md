# SteamID Converter

A module for node that converts a 64bit SteamID to a text STEAM_x:y:z format and vice versa

```js
npm install steamidconvert
```

```js
var steam = require('steamidconvert')
```

Convert SteamID into SteamID64

```js
steam.convertTo64('STEAM_0:1:82174') //76561197960430077
```

Convert SteamID64 into SteamID

```js
steam.convertToText('76561197960430077') //STEAM_0:1:82174 
```