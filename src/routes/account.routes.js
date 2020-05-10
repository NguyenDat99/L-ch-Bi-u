import express from 'express';
import AccountController from '../modules/accounts/controllers/account.controller';
import AccountValidate from '../modules/accounts/middleware/account.middleware';

const router = express.Router();

// Create use routers
// POST
router.post('/account/create', AccountValidate.createAccountInput, AccountController.create);//role student
router.post('/account/createBM', AccountValidate.createAccountInputWithRole, AccountController.createWithRole)//role ...
router.post('/account/login', AccountValidate.logInAccountInput, AccountController.login);

// PUT
router.put('/account', AccountValidate.updateAccountInput, AccountValidate.reduceInput, AccountController.updateInfo);
router.put('/account/block-unblock/:id', AccountValidate.blockUnblockAccountInput, AccountController.blockAccount);
// router.put('/account/forgotpassword', AccountValidate.forgotPassword, AccountController.forgotPassword);
router.put('/account/changepassword', AccountValidate.changePasswordInput, AccountController.changePassword);

// GET
router.get('/account/me', AccountValidate.meInput, AccountController.me);
router.get('/account', AccountValidate.getAccountsInput, AccountController.getAccounts);
router.get('/account/:id', AccountValidate.getAccountInfoByManagerInput, AccountController.getAccountInfoByManager);
// DELETE
router.delete('/account/:id', AccountValidate.deleteAccountInput, AccountController.deleteAccount);
export default router;
