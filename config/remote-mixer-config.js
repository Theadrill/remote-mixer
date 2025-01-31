// Use this file to override the default configuration
// found in /backend/src/config.ts

// @ts-check
/** @type {Partial<import('../backend/src/services/config').RemoteMixerConfiguration>} */
const userConfig = {
  httpPort: 8000,
  logLevel: 'debug',
  device: 'yamaha-01v96'
}

module.exports = userConfig
