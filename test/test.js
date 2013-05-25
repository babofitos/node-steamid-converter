var steam = require('../index.js')()
  , assert = require('assert')
  , api = require('./config.json').api

describe('steamidconvert', function() {
  describe('.convertTo64(sid)', function() {
    it('should convert steamid to steamid64', function() {
      var res = steam.convertTo64('STEAM_0:1:82174')
      assert(res === '76561197960430077')
    })
  })
  describe('.convertToText(sid64)', function() {
    it('should convert steamid64 to steamid', function() {
      var res = steam.convertToText('76561197960430077')
      assert(res === 'STEAM_0:1:82174')
    })
  })
  describe('.convertVanity', function() {
    before(function() {
      steam = require('../index.js')(api)
    })
    it('should convert vanity URL to steamid64', function(done) {
      steam.convertVanity('panvertigo', function(err, res) {
        assert(res === '76561198000670105')
        done()
      })
    })
  })
})