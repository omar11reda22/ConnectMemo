const permissionModel = require("../models/permissions.model");

module.exports.createTodoPermissionMiddleware = async (req, res, next) => {
  const todoCreatePermission = await permissionModel.findOne({
    resource: "memories",
    action: "create",
    effect: "allow",
  });

  if (!todoCreatePermission) {
    return res.status(403).json({
      message: "You don't have permission to create a memory",
    });
  }

  const claims = req.user;

  const isAuthorizedToCreateTodo =
    todoCreatePermission.condition.role.IN.includes(claims.userType);

  if (!isAuthorizedToCreateTodo) {
    return res.status(403).json({
      message: "You don't have permission to create a memory",
    });
  }

  next();
};
