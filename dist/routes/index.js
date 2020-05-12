"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _controllers_1 = require("@controllers/");
const jwtAuthenticator_1 = require("../middlewares/jwtAuthenticator");
const router = express_1.Router();
router.use('/user', require('./UserRouter'));
router.use('/avatar', require('./AvatarRouter'));
router.use('/quest', require('./QuestRouter'));
router.use('/rank', require('./RankRouter'));
router.use('/items', require('./ItemsRouter'));
router.get('/quests', jwtAuthenticator_1.authenticateJWT, _controllers_1.QuestController.get);
router.get('/userinfo', jwtAuthenticator_1.authenticateJWT, _controllers_1.UserController.getInfo);
router.post('/userlogin', _controllers_1.UserController.signin);
router.get('/myRank', jwtAuthenticator_1.authenticateJWT, _controllers_1.RankController.myRank);
exports.default = router;
