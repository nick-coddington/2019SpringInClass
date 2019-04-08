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
        if(!input.Password){
            cb(Error('A Password is Required'));
            return;
        }
        if(input.Password.length < 8){
            throw Error('A longer Password is Required');
        }
        const hashedPassword = await bcrypt.hash(input.Password, SALT_ROUNDS)
        const data = await conn.query(
            "INSERT INTO 2019Sring_Persons (firstName, lastName, birthday, password, created_at) VALUES (?)",
            [[input.firstName, input.lastName, input.birthday, hashedPassword, new Date()]]
        );
        return await model.get(data.insertId);
    },

    login(email, password, cb){
        conn.query(`SELECT * FROM 2019Spring_Persons P Join 2019Spring_ContactMethods CM on CM.Person_Id = P.id
        WHERE CM.value=?`, email, (err,data) => {
            if(err) return cb(err);
            if (data.length==0){
                return cb('User not found')
            }else{
                bcrypt.compare(password,data[0].password).then(x => {
                    if(x){
                        return cb(null,data[0]);
                    }else{
                        return cb('Wrong Password');
                    }
                });
            }
        });
    },
    changePassword(email, oldPassword, newPassword, cb){
        conn.query(`SELECT * FROM 2019Spring_Persons P Join 2019Spring_ContactMethods CM on CM.Person_Id = P.id
        WHERE CM.value=?`, email, (err,data) => {
            if(err) return cb(err);
            if(data.length == 0){
                return cb('User not found')
            }else{
                function changeIt(){
                    bcrypt.hash(newPassword, SALT_ROUNDS).then( x => {
                        conn.query(`UPDATE 2019Spring_Persons P set ? WHERE P.id=?`, [{password: x},data[0].id], (err,data) => {
                            if(err) return cb(err);
                            return cb(null,"Password Successfully Changed");
                        })
                    })
                }
            if(data[0].password=""){
                return changeIt();
            }else{
                bcrypt.compare(oldPassword, data[0].password).then( x=> {
                        if(x){
                            return changeIt();
                        }else{
                            return cb('Wrong Password')
                        }
                    });
                }    
            }
        });
    }
};

module.exports = model;
