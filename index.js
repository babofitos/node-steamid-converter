var BigNumber = require('bignumber.js')
  , http = require('http')

module.exports = function(key) {
  return new SteamConvert(key || null)
}

function SteamConvert(key) {
  this.key = key
}

SteamConvert.SteamID64Identifier = BigNumber('76561197960265728')
SteamConvert.resolveVanity = 'http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key='

SteamConvert.prototype.convertVanity = function(base, cb) {
  if (typeof cb !== 'function') throw new Error('Callback required')
    
  var options = SteamConvert.resolveVanity +
                this.key +
                '&vanityurl=' +
                encodeURIComponent(base)

  http.get(options, function(res) {
    var output = ''

    res.setEncoding('utf-8')
    res.on('data', function(chunk) {
      output += chunk
    })
    res.on('end', function() {
      var response

      try {
        response = JSON.parse(output).response
      }
      catch (e) {
        return cb(new Error('Invalid key'))
      }
      if ( !response || response.success !== 1) return cb(new Error('Unsuccessful call to api'))
      else return cb(null, response.steamid)
    })
  })
}

SteamConvert.prototype.convertTo64 = function(steamid) {
  var v = SteamConvert.SteamID64Identifier
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
      sid = v.plus(z*2).plus(y).toPrecision(17)
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

SteamConvert.prototype.convertToText = function(steamid64) {
  var w
    , v = SteamConvert.SteamID64Identifier
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
    sid = w.minus(y).minus(v).div(2).toPrecision(17)
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

SteamConvert.prototype.convertToNewFormat = function(steamid) {
  if (!steamid) {
      throw new ReferenceError('SteamID argument required')
  }

  if (typeof steamid !== 'string') {
    throw new TypeError('SteamID must be a string')
  }

  var oldSID = steamid.split(':')

  if (oldSID.length !== 3) {
    throw new Error('Invalid SteamID')
  }
  
  var newID = parseInt(oldSID[2], 10) * 2 + parseInt(oldSID[1], 10)
    , result = "[U:1:" + newID.toString() + "]"

  return result
}