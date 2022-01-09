import DB from '../db/db';

export class BaseRepository<T> {
    public readonly db: DB;
    public tableName: string;

    constructor(dbName: string, tableName: string) {
        this.db = new DB(dbName);
        this.tableName = tableName;
    }

    async insert(record: T): Promise<boolean> {
        const keys = Object.keys(record).map((key) => key).join(',');
        const values = Object.keys(record).map((key) => {
            // @ts-ignore
            if (typeof record[key] === 'number') {
                // @ts-ignore
                return record[key];
            }
            // @ts-ignore
            return "\'" + record[key] + "\'";
        }).join(',');
        const query = "INSERT INTO " + this.tableName + "(" + keys + ") values(" + values + ")";
        return this.db.postQuery(query);
    }

    async select(record?: T): Promise<T[]> {
        let query;
        if (!record) {
            query = "SELECT * FROM " + this.tableName;
        } else {
            query = "SELECT * FROM " + this.tableName + " where " + Object.keys(record).map((key: string) => {
                // @ts-ignore
                if (typeof record[key] === 'number') {
                    // @ts-ignore
                    return key + " = " + record[key];
                }
                // @ts-ignore
                return key + " = " + "\'" + record[key] + "\'";
            }).join(' AND ');
        }
        return this.db.getQuery(query);
    }

    async update(cond: T, record: T): Promise<boolean> {
        const fields = Object.keys(record).map((key) => {
            // @ts-ignore
            if (typeof record[key] === "number") {
                // @ts-ignore
                return key + " = " + record[key];
            }
            // @ts-ignore
            return key + " = \'" + record[key] + "\'";
        }).join(' , ');

        const condition = Object.keys(cond).map((key: string) => {
            // @ts-ignore
            if (typeof cond[key] === "number") {
                // @ts-ignore
                return key + " = " + cond[key];
            }
            // @ts-ignore
            return key + " = \'" + cond[key] + "\'";
        }).join(' AND ');

        const query = "UPDATE " + this.tableName + " SET " + fields + " where " + condition;
        return this.db.postQuery(query);
    }

    async delete(cond?: T): Promise<boolean> {
        let condition
        if (!cond) {
            condition = "1";
        } else {
            condition = Object.keys(cond).map((key: string) => {
                // @ts-ignore
                if (typeof cond[key] === "number") {
                    // @ts-ignore
                    return key + " = " + cond[key];
                }
                // @ts-ignore
                return key + " = \'" + cond[key] + "\'";
            }).join(' AND ');

        }

        const query = "DELETE FROM " + this.tableName + " WHERE " + condition;
        return this.db.postQuery(query);
    }
}
