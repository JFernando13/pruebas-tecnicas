import { readFileSync } from 'node:fs'

export function config(path = '.env') {
  const env = readFileSync(path, 'utf-8').split('\n')

  env.forEach(variable => {
    const [key, ...values] = variable.split('=')
    process.env[key] = values.join('').startsWith('"') ? values.join('').slice(1, -1) : values.join('=')
  })
}

const dotenv = {
  config
}

export default dotenv
