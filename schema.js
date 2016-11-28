'use strict'

var Joi = require('joi')

var optionsSchema = Joi.object().keys({
  outputDir: Joi.string().default('/docs').allow(''),
  container: Joi.string().default('#container'),
  files: Joi.array().default([]),
  layout: Joi.string().default('/pages/layout.html'),
  appCacheFiles: Joi.array().default([]),
  scanSpecForFiles: Joi.func().default(function (spec) { return spec })
})

var specSchema = Joi.object().keys({
  options: optionsSchema
}).unknown(true)

exports.validate = (spec) => {
  return Joi.attempt(spec, specSchema, 'Invalid spec options')
}
