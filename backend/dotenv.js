const dotenv = require('dotenv')

const environment = process.env.NODE_ENV || 'local'

dotenv.config({ path: `../.env.${environment}` })
