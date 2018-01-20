// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'Sample test': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = 'http://localhost:8080'

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .getAttribute('.s-disabled', 'disabled', function(result) {
        this.assert.equal(result.value, 'true');
      })
      .pause(5000)
      .end()
  }
}
