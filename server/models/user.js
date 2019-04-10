const conn = require('./mysql_connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 8;
const JWT_SECRET = process.env.JWT_SECRET || 'some long string..';

const model = {

    async getAll(){
        return await conn.query("SELECT * FROM 2019SPring_Persons");
    },
    
    async get(id){
        const data = await conn.query("SELECT * FROM 2019Spring_Persons WHERE Id=?", id);
        if(!data){
            throw Error("User not found");
        }
        return data[0];
    },

    async add(input){
        if(!input.password){
            cb(Error('A Password is Required'));
            return;
        }
        if(input.password.length < 8){
            throw Error('A longer Password is Required');
        }
        const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS)
        const data = await conn.query(
            "INSERT INTO 2019Sring_Persons (firstName, lastName, birthday, password, created_at) VALUES (?)",
            [[input.firstName, input.lastName, input.birthday, hashedPassword, new Date()]]
        );
        return await model.get(data.insertId);
    },

    async login(email, password){
        const data = await conn.query(`SELECT * FROM 2019Spring_Persons P Join 2019Spring_ContactMethods CM on CM.Person_Id = P.id
        WHERE CM.value=?`, email);
        if(data.length ==0) {
            throw Error('User Not Found');
        }
        const x = await bcrypt.compare(password, data[0].password);
        if(x) {
            return data[0];
        }else {
            throw Error('Wrong Password')
        }
    },
    async changePassword(email, oldPassword, newPassword) {
        const data = await conn.query(`SELECT * FROM 2019Spring_Persons P Join 2019Spring_ContactMethods CM on CM.Person_Id = P.id
        WHERE CM.value=?`, email);
        if (data.length == 0) {
            throw Error('User Not Found')
        }
        if (data[0].password == " " || await bcrypt.compare(oldPassword, data[0].password)) {
            const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
            await conn.query(`UPDATE 2019Spinrg_Persons P SET ? WHERE P.id=?`, [ {Password: hashedPassword}, data[0].id]);
            return {status: "success", msg: "Password Successfully Changed" };
        }else {
            throw Error('Wrong Password');
        }
    }
};

module.exports = model;
