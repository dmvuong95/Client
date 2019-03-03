var nodemon = require('gulp-nodemon')
var env = require('gulp-env')

function defaultTask (cb) {
  env({
    vars: {
      NODE_ENV: 'development',
      env_config: 'dev'
    }
  })
  var stream = nodemon({script: 'build/build-dev.js', watch: false})
  stream
    .on('restart', function () {
      console.log('restarted!')
    })
    .on('crash', function () {
      process.exit(1)
    })
  cb()
}

function buildTask (cb) {
  env({
    vars: {
      NODE_ENV: 'production',
      env_config: 'prod'
    }
  })
  var stream = nodemon({script: 'build/build.js', watch: false})
  stream
    .on('restart', function () {
      console.log('restarted!')
    })
    .on('crash', function () {
      process.exit(1)
    })
  cb()
}

exports.default = defaultTask
exports.build = buildTask
