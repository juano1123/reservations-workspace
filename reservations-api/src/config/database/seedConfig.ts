// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

const options = {
  type: 'postgres',
  port: Number.parseInt(process.env.POSTGRES_PORT),
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: process.env.DBPREFIX == 'prod' ? false : true,
  entities: [__dirname + '/../../entities/*.entity{.ts,.js}'],
  synchronize: false,
  seeds: [__dirname + '/../../database/seeds/*{.ts,.js}'],
};

export default options;
