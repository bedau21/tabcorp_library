module.exports = {
  mongoURI:
    'mongodb://bedau21:DarTT2211QO_@ds117816.mlab.com:17816/tabcorp_library',
  serectOrKey: 'bedau21',
  jwtExpiration: process.env.JWT_EXPIRATION || '10000',
  jwtEncryption: process.env.JWT_ENCRYPTION || 'mern',
};