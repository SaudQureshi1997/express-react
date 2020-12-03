import * as router from "@utils/router.js";
import * as auth from "@controllers/auth.js";
import authMiddleware from "@middlewares/auth.js"

router.post("register", auth.register);

router.get('me', auth.me, [authMiddleware]);

export default router.router;
