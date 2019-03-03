'use strict'
require('./check-versions')()

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
if (process.env.env_config === 'dev') webpackConfig = require('./webpack.custom.conf')

var buildNumber = 0
const spinner = ora('building for ' + process.env.env_config + ' environment...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  const compiler = webpack(webpackConfig)
  if (process.env.env_config === 'prod') {
    compiler.run((err, stats) => {
      spinner.stop()
      if (err) throw err
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n'
      )

      if (stats.hasErrors()) {
        console.log(chalk.red(' Build failed with errors.\n'))
        process.exit(1)
      }

      buildNumber++
      console.log(chalk.cyan(' Build complete', process.env.env_config, buildNumber, '.\n'))
    })
  } else {
    compiler.watch(
      {
        // Example watchOptions
        aggregateTimeout: 300,
        poll: true
      },
      (err, stats) => {
        spinner.stop()
        if (err) throw err
        process.stdout.write(
          stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
          }) + '\n\n'
        )
        if (stats.hasErrors()) {
          console.log(chalk.red(' Build failed with errors.\n'))
          process.exit(1)
        }
        buildNumber++
        console.log(chalk.cyan(' Build complete', process.env.env_config, buildNumber, '.\n'))
      }
    )
  }
})
