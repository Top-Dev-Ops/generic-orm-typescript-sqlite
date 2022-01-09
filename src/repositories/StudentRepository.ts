import { BaseRepository } from "./BaseRepository";
import { StudentInfo } from "../interfaces/student";

export class StudentRepository extends BaseRepository<StudentInfo> {
    
    async countStudents(): Promise<boolean> {
        const query = "SELECT count(*) FROM " + this.tableName;
        return this.db.getQuery(query);
    }
}
