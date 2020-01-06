export const environment = {
  production: false,
  environment: 'development',
  PORT: 7000,
  DATABASE_URL: 'postgres://moses:password@localhost:5432/edudoor',
  DATABASE_DIALECT: 'postgres',
  OPENOLAT_API_URL: 'http://localhost:5000/openolat/restapi',
  OPENOLAT_USERNAME: 'administrator',
  OPENOLAT_PASSWORD: 'openolat',
  TOKEN_EXPIRY: '360h',
  USE_LATENCY: false,
  JWT_SECRET_KEY:
    'TO91kKfg9BySaZrs19JIFSsoUrvOptTPIhTRn3qsDKdRDiLgZ8kqKdZLsOWQQSHIrSpSI2edGrUFeiiRS6U9rpt5TBtx4vpaGzovqqyqEr1DaMtFM5PZafR4QMbOxthCzZwCMZqmk8E361tf7cB8DP',
  BCRYPT_PASSWORD_SALT: 10,
  DATA_ENCRYPTION_KEY:
    '2C7t98YtREHB4odKfz55hbwQy4hDPcZ6cAnAsPPdt6tQSisMG5umNYcLOT1mSuFh0EmK0fwBzaMaF5UMieOZCahqNmCKCbdsGBm7TRcaE0OeBQJlNegXhtuQ7UJd8ch05m3PnHbqd66hm9y2DJ1zpA',
  EMAIL_SENDER: 'no-reply@dev.edudoor.com',
  SENDGRID_API_KEY: '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',
  // #ORGANIZATION_ID: "rmLHSfxI8VJGO3MC7j0h_6YdQ9",
  ORGANIZATION_ID: 'RfaVrFFUewtWNz7GEOPWDr6',
  OPENVIDU_USERNAME: 'openviduapp',
  OPENVIDU_PASSWORD: 'password',
  OPENVIDU_URL: 'https://localhost:4443',
};