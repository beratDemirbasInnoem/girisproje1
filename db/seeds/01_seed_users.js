exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'kullanici1', password: 'sifre1' },
        { username: 'kullanici2', password: 'sifre2' },
        // Diğer örnek kullanıcılar
      ]);
    });
};
