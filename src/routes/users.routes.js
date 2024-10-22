import {Router} from 'express'
import {pool} from '../db.js'
import {createUser, deleteUser, getUsers, updateUser, getUserById, verificarUsuario} from '../controllers/users.controllers.js'

const router = Router();

router.get('/users',getUsers);

router.get('/users/:id',getUserById);

router.post('/users',createUser)

router.delete('/users/:id',deleteUser)

router.put('/users/:id',updateUser);

router.post('/login', verificarUsuario);

export default router;