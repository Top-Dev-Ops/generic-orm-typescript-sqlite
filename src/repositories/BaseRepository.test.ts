import {BaseRepository} from "./BaseRepository";

import { expect } from "chai";

describe("BaseRepository", () => {
    let base: any;

    it("connected database", () => {
        expect(base).not.equal(null);
    });

    // delete all records before testing insert
    it("deleted all records", async () => {
        const result = await base.delete();
        expect(result).equal(true);
    });

    // insert 1 record to an empty table
    it("inserted into database", async () => {
        // test if insert is successful
        const result = await base.insert({ id: 1, name: 'Benjamin', email: 'benjamin.minato.geek@gmail.com', gender: 'male' });
        expect(result).equal(true);

        // test if correct record is retrieved
        const students = await base.select({ name: 'Benjamin' });
        expect(students.length).equal(1);
        expect(students[0].id).equal(1);
        expect(students[0].email).equal('benjamin.minato.geek@gmail.com');
        expect(students[0].name).equal('Benjamin');
        expect(students[0].gender).equal('male');
    });

    // update 1 record after insert
    it("updated in database", async () => {
        // test if update is successful
        const result = await base.update(
            { id: 1, name: 'Benjamin' },
            { id: 2, name: 'Omnifia', email: 'omnifia@gmail.com', gender: 'female' }
        );
        expect(result).equal(true);

        // test if correct record is retrieved
        const students = await base.select({ id: 2 });
        expect(students.length).equal(1);
        expect(students[0].id).equal(2);
        expect(students[0].email).equal('omnifia@gmail.com');
        expect(students[0].name).equal('Omnifia');
        expect(students[0].gender).equal('female');
    });

    // delete records
    it("deleted in database", async () => {
        // test if delete is successful
        const result = await base.delete({ id: 2 });
        expect(result).equal(true);

        // test if table is empty
        const students = await base.select({ id: 2 });
        expect(students.length).equal(0);
    });

    beforeEach(() => {
        base = new BaseRepository('db.db', 'students');
    });
});
