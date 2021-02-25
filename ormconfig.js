module.exports = {
  type: 'postgres',
  host: 'postgres',
  port: '5432',
  username: 'postgres',
  password: 'pass123',
  database: 'chat',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  synchronize: true,
}