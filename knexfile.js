// knexfile.js
module.exports = {
    development: {
      client: 'postgresql',
      connection: {
        database: 'kullanicilar',
        user: 'admin',
        password: 'admin',
      },
      migrations: {
        directory: './db/migrations',
      },
      seeds: {
        directory: './db/seeds',
      },
    },
  };
  