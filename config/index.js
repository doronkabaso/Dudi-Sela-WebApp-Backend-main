import prod from './prod'
import dev from './dev'

const configOptions = {
  prodConfig: prod,
  devConfig: dev
}
let config

if (process.env.NODE_ENV === 'production') config = configOptions.prodConfig
else config = configOptions.devConfig


module.exports = config