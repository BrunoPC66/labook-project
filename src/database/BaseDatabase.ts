import { knex } from "knex"
// import dotenv from 'dotenv'
import path from "path";
import { config } from "dotenv";

const paths = [
  path.resolve(__dirname, "../../dotenv.env"),
  path.resolve(__dirname, "../../dotenv.env.example"),
];

paths.find((validEnvPath) => !config({ path: validEnvPath }).error);

// dotenv.config() ESTÁ DANDO PROBLEMA NA LEITURA DO 'dotenv'

export abstract class BaseDatabase {
  protected static connection = knex({
    client: "sqlite3",
    connection: {
      filename: process.env.DB_FILE_PATH as string,
    },
    useNullAsDefault: true,
    pool: {
      min: 0,
      max: 1,
      afterCreate: (conn: any, cb: any) => {
        conn.run("PRAGMA foreign_keys = ON", cb);
      },
    },
  });
}
