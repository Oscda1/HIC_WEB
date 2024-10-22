import {pool} from '../db.js';

export const getUsers = async (req,res)=>{
    const {rows}= await pool.query('SELECT * FROM users')
    res.json(rows)
};

export const getUserById = async(req,res)=>{
    const {id}=req.params
    const {rows} = await pool.query('SELECT * FROM users WHERE id=$1', [id]);

    if (rows.length===0){
        return res.status(404).json({message:'User not found'})
    }
    res.json(rows[0])
};

export const deleteUser = async(req,res)=>{
    const {id}=req.params
    const {rows, rowCount} = await pool.query('DELETE FROM users WHERE id=$1 RETURNING *', [id]);
    if(rowCount===0){
        return res.status(404).json({message:'User not found'})
    }
    return res.sendStatus(204)
}

export const createUser = async(req,res)=>{
    try{
        const data = req.body;
        // Verificar si el usuario ya existe
        const { rows: userRows } = await pool.query('SELECT * FROM users WHERE username = $1', [data.username]);
        if (userRows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Verificar si el email ya existe
        const { rows: emailRows } = await pool.query('SELECT * FROM users WHERE email = $1', [data.email]);
        if (emailRows.length > 0) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [data.username, data.email, data.password]);
        return res.sendStatus(200)
    }catch (e){
        
    }
    
}

export const updateUser = async(req,res)=>{
    const {id}=req.params;
    const data = req.body;

    const result = await pool.query('UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *', [data.username, data.email, id])
    res.json(result.rows[0])
}

export const verificarUsuario = async(req,res)=>{
    const data = req.body;
    const {rows} = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [data.username, data.password])
    if(rows.length===0){
        return res.status(404).json({message:'User not found'})
    }
    res.sendStatus(204)
}