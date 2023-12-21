import express from 'express';
import userController from '../controllers/userController.js';
import uploadFields from '../middlewares/multerMiddleWare.js';
import verifyUser from '../middlewares/jwtMiddleWare.js';

const userRouter = express.Router();

userRouter.post('/user/registration/register', uploadFields, userController.register);
userRouter.post('/user/registration/login', userController.login);
userRouter.get('/user', userController.allUsers);
userRouter.get('/user/:id', verifyUser, userController.personalDetails);
userRouter.put('/user/:id',verifyUser, userController.updateUser);
userRouter.delete('/user/:id',verifyUser, userController.deleteUser);

export default userRouter;