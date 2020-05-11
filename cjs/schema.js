
var Joi = require('joi')

var optionsSchema = Joi.object().keys({
  outputDir: Joi.string().default('/docs'),
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
})

var pageSchema = Joi.object().keys({
  page: Joi.string(),
  lists: Joi.array(),  // for dynamic routing
  filters: Joi.array(),
  mapper: Joi.string(),
  spec: Joi.object()
})

const listSelectorObjSchema = Joi.object().keys({
  lists: Joi.array(),  // for dynamic routing
  filters: Joi.array(),
  mapper: Joi.func(),
  states: Joi.object().keys({
    empty: Joi.object().keys({
      component: Joi.string().required(),
      mapper: Joi.string()
    })
  })
})

const objSchema = Joi.object()

const selectorSchema = Joi.alternatives(
  [ objSchema, listSelectorObjSchema, Joi.string(), Joi.array()]
)


exports.validate = (spec) => {


  const options = Joi.attempt(spec.options || {}, optionsSchema, 'Invalid options')
  delete spec.options;
 
 try {
  for(var route in spec) {
    var page = spec[route]
    Joi.attempt(page, pageSchema, 'Invalid page spec for route')
    for(var selector in page.spec) {
      Joi.attempt(page.spec[selector], selectorSchema, 'Invalid route spec')
    }
  }
  }catch(err) {
    console.log(err)
    return err
  }
 
  return {
    options, 
    spec
  }
}
