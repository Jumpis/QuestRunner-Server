"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _controllers_1 = require("@controllers/");
const jwtAuthenticator_1 = require("../middlewares/jwtAuthenticator");
const router = express_1.Router();
router.get('/myitems', jwtAuthenticator_1.authenticateJWT, _controllers_1.ItemsController.myItems);
router.get('/storeItems', _controllers_1.ItemsController.store);
router.post('/purchase', jwtAuthenticator_1.authenticateJWT, _controllers_1.ItemsController.purchase);
router.post('/active', jwtAuthenticator_1.authenticateJWT, _controllers_1.ItemsController.activate);
router.post('/addItem', _controllers_1.ItemsController.add);
router.patch('/modify', _controllers_1.ItemsController.modify);
module.exports = router;
//# sourceMappingURL=ItemsRouter.js.map