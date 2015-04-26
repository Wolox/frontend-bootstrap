module.exports = {
  environment: 'development',
  development: function () { return this.environment === 'development'; },
  staging: function () { return this.environment === 'staging'; },
  production: function () { return this.environment === 'production'; }
};
