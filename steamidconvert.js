var BigNumber = require('bignumber.js')

exports.convertTo64 = function (steamid) {
  var x = BigNumber('76561197960265728')
    , err = null
    , sid
    , sidSplit
    , z
    , y

  try {
    if (!steamid) {
      throw new ReferenceError('SteamID argument required')
    } 
    else if (typeof steamid !== 'string') {
      throw new TypeError('SteamID must be a string')
    }
    else {
      sidSplit = steamid.split(':')
      , z = sidSplit[2]
      , y = sidSplit[1]
    }

    if (z && y) {
      sid = x.plus(z*2).plus(y).toPrecision(17)
    }
    else {
      throw new Error('Invalid SteamID')
    }
  }

  catch (e) {
    err = e
  }

  finally {
    if (err) {
      throw err
    }
    else {
      return sid
    }
  }
}

exports.convertToText = function(steamid64) {
  var w
    , x = BigNumber('76561197960265728')
    , y = 0
    , sid
    , out = ['STEAM_0']
    , err = null

  try {
    if (!steamid64) {
      throw new ReferenceError('SteamID64 argument required')
    }
    else if (typeof steamid64 !== 'string') {
      throw new TypeError('SteamID must be a string')
    }

    w = BigNumber(steamid64)
    if (w.mod(2).toPrecision(1) === '1') {
      y = 1
    }
    out.push(y)
    sid = w.minus(y).minus(x).div(2).toPrecision(17)
    sid = parseInt(sid, 10)

    if (sid < 0 || !sid) {
      throw new Error('Invalid SteamID64')
    } 
    else {
      out.push(sid)
    }
  }

  catch (e) {
    err = e.message
  }

  finally {
    if (err) {
      throw err
    }
    else {
      return out.join(':')
    }
  }
}
