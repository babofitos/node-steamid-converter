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
