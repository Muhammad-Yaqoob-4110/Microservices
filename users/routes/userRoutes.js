const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validateToken = require("../utils/auth/auth_middleware");
const requireRoles = require("../utils/auth/roles_middleware");

// create a user
router.post("/users", userController.createUser);

// Login User
router.post("/users/login", userController.login);

//super user
router.get(
  "/users/superuser",
  validateToken,
  requireRoles(["super admin"]),
  userController.superUser
);

//admin user
router.get(
  "/users/adminuser",
  validateToken,
  requireRoles(["admin"]),
  userController.adminUser
);

//admin user & Super admin user
router.get(
  "/users/adminsuperadmin",
  validateToken,
  requireRoles(["admin", "super admin"]),
  userController.admin_superadmin
);

//public user
router.get(
  "/users/publicuser",
  validateToken,
  requireRoles(["public user"]),
  userController.publicUser
);

module.exports = router;
