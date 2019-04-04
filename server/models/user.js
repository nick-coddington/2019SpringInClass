const conn = require('./mysql_connection');

const model = {
    getAll(cb){
        conn.query("SELECT * FROM 2019Spring_Persons", (err, data) => {
            cb(err, data);
        });    
    },
    async get(id){
        const data = await conn.query("SELECT * FROM 2019Spring_Persons WHERE Id=?", id);
        if(!data){
            throw Error("User not found");
        }
        return data[0];
    },
    add(input, cb){
        if(!input.Password){
            cb(Error('A Password is Required'));
            return;
        }
        if(input.Password.length < 8){
            cb(Error('A longer Password is Required'));
            return;
        }

        conn.query("INSERT INTO 2019Spring_Persons (firstName,lastName,birthday,Password,created_at) VALUES(?)", 
                [[input.firstName, input.lastName, input.birthday, input.Password, new Date()]],
                (err, data) => {
                    if(err){
                        cb(err);
                        return;
                    }
                    model.get(data.insertId, (err,data) => {
                        cb(err, data);
                    })    
                }
        );
    }
};

module.exports = model;
