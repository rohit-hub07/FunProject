import { getUser } from "../utils/auth.middleware.js";

async function checkLoginUser(req, res, next) {
  const uuid = req.cookie?.uuid;

  if (!uuid) {
    return res.redirect("/.user/login", {
      error: "Invalid email or password",
    });
  }
  const user = getUser(uuid);
  if (!user) {
    return res.redirect("/.user/login", {
      error: "Invalid email or password",
    });
  }

  req.user = user;
  next();
}

export default checkLoginUser;
