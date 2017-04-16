'use strict'

var Joi = require('joi')

var specSchema = Joi.object().keys({
  options: Joi.object().keys({
    outputDir: Joi.string().default('/docs').allow(''),
    domain: Joi.string(),
    debug: Joi.boolean().default(false),
    container: Joi.string().default('#container'),
    files: Joi.array().default([]),
    layout: Joi.string().default('/pages/layout.html'),
    appCacheFiles: Joi.array().default([]),
    scanSpecForFiles: Joi.func().default(function (spec) { return spec }),
    validate: Joi.object().keys({
        w3c: Joi.string().valid(['error', 'warn', 'ignore']).default('warn')
    }),
    build: Joi.object().default().keys({
        css: Joi.valid(['scss-global', false]).default(false) // css pre-processor support.
    })
  }),
  defaultSpec: Joi.object()
}).unknown(true)

exports.validate = (spec) => {
  return Joi.attempt(spec, specSchema, 'Invalid spec options')
}
