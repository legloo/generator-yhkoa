import { normalize } from 'path'


// Evironment
export const env = process.env.NODE_ENV

// Root path of server
export const root = normalize(__dirname + '/../..')

// Server port
export const port = process.env.PORT || 9000;

// Server IP
export const ip = process.env.IP || '0.0.0.0'

// Server Domain
export const domain = process.env.DOMAIN || `localhost:${port}`

// Secret for session, you will want to change this and make it an environment variable
export const secrets = {
  session: 'server-secret'
}
