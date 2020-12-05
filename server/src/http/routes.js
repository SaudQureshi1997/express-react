import * as router from "@utils/router.js";
import * as auth from "@controllers/authcontroller.js";
import * as todos from '@controllers/todocontroller.js';
import authMiddleware from "@middlewares/auth.js"

router.post("register", auth.register);
router.post("login", auth.login);
router.get('me', auth.me, [authMiddleware]);

router.get('todos', todos.index, [authMiddleware]);
router.post('todos', todos.store, [authMiddleware]);
router.post('todos/complete', todos.complete, [authMiddleware]);
router.post('todos/archive', todos.archive, [authMiddleware]);
router.post('todos/priority', todos.setPriority, [authMiddleware]);
router._delete('todos', todos.remove, [authMiddleware]);

export default router.router;
