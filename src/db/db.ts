import sqlite3, { Database } from "sqlite3";

class DB {
    db: Database | undefined;

  constructor(dbName: string) {
      this.db = new sqlite3.Database('./' + dbName);
  }

  async postQuery(query: string): Promise<any> {
      if (this.db === undefined) throw "No database connected.";

      let that: DB = this;

      return new Promise(function (resolve, reject) {
          // @ts-ignore
          that.db.run(query, (err) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(true);
              }
          });
      });
  }

  async getQuery(query: string): Promise<any> {
      if (this.db === undefined) throw "No database connected.";

      let that: DB = this;

      return new Promise(function (resolve, reject) {
          // @ts-ignore
          that.db.all(query, [], (err, rows) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(rows);
              }
          });
      });
  }
}

export default DB;
