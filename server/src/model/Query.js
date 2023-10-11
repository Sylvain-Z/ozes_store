import pool from "../database/config.js";


class Query {

    static async find(query){
        return await pool.query(query);
    }

    static async findByValue(query, value){
        return await pool.query(query, [value]);
    }

    static async findByDatas(query, datas){
        return await pool.query(query, [...Object.values(datas)]);
    }

    static async write(query, datas){
        return await pool.query(query, [...Object.values(datas)]);
    }
}

export default Query;