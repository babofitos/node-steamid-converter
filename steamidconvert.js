var BigNumber = require('bignumber.js')

exports.convertTo64 = function (steamid, callback) {
  var x = BigNumber('76561197960265728')
    , err = null
    , sid
    , sidSplit = steamid.split(':')
    , z = sidSplit[2]
    , y = sidSplit[1]
  try {
    if (z && y) sid = x.plus(z*2).plus(y).toPrecision(17)
    else throw "Invalid STEAM_ID"
  }
  catch (e) {
    err = e
  }
  finally {
    if (typeof callback === 'function') {
      callback(err, sid)
    }
  }
}

exports.convertToText = function(steamid64, callback) {
  var w
    , x = BigNumber('76561197960265728')
    , y = 0
    , sid
    , out = ['STEAM_0']
    , err = null
  if (typeof steamid64 !== 'string') {
    throw new Error('steamid must be string')
  }
  try {
    w = BigNumber(steamid64)
    if (w.mod(2).toPrecision(1) === '1') y = 1
    out.push(y)
    sid = w.minus(y).minus(x).div(2).toPrecision(17)
    sid = sid.substring(0, sid.indexOf('.'))
    if (sid) {
      out.push(sid)
    } else {
      throw new Error('Invalid SteamID64')
    }
  }
  catch (e) {
    err = e.message
  }
  finally {
    if (typeof callback === 'function') {
      callback(err, out.join(':'))
    }
  }
}