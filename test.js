var { validate  } = require('./cjs/schema.js')



const spec = {
    "/": {
        page: "homepage",
        spec: {
            "h1": {
                
            }
            
        }
    },
    options: {
    }
}

validate(spec)

