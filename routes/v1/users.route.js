const express = require('express');
const usersController = require('../../controllers/users.controller');
const verifyAdmin = require('../../middleware/verifyAdmin');
const verifyJWT = require('../../middleware/verifyJWT');
// const limiter = require("../../middleware/limiter");
// const viewCount = require("../../middleware/veiwCount");

const router = express.Router();

router
	.route('/')
	/**
	 * @api {get} /tools All tools
	 * @apiDescription Get all the tools
	 * @apiPermission admin
	 *
	 * @apiHeader {String} Authorization   User's access token
	 *
	 * @apiParam  {Number{1-}}         [page=1]     List page
	 * @apiParam  {Number{1-100}}      [limit=10]  Users per page
	 *
	 * @apiSuccess {Object[]} all the tools.
	 *
	 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
	 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
	 * TODO: jwtVerification add.
	 */
	.get(verifyJWT, verifyAdmin, usersController.getAllUsers)
	/**
	 * @api {post} /tools save a tool
	 * @apiDescription Get all the tools
	 * @apiPermission admin
	 *
	 * @apiHeader {String} Authorization   User's access token
	 *
	 * @apiParam  {Number{1-}}         [page=1]     List page
	 * @apiParam  {Number{1-100}}      [limit=10]  Users per page
	 *
	 * @apiSuccess {Object[]} all the tools.
	 *
	 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
	 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
	 */
	.post();
// Save or update a user
router.route('/:email').put(usersController.saveAUser);

router
	.route('/admin/:email')
	// verify admin
	.get(verifyJWT, usersController.checkAdmin)
	// make an admin
	.put(verifyJWT, verifyAdmin, usersController.handleAdmin);

module.exports = router;
