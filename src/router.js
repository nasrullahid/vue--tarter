import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash', // history, hash
  router: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login'),
    },
    {
      path: '/dashboard',
      name: 'login',
      component: () => import('@/views/dashboard'),
    },
  ]
})

// Before each route evaluates...
router.beforeEach((to, from, next) => {
  const auth = store.getters['auth/isAuthenticated']
  const roleAkses = store.getters['auth/roleAkses']
  const publicPage = ["/login"];
  let found = false;

  if (auth && roleAkses.length > 0) {

    const akses = roleAkses.map((a) => {
      return a.role_name;
    });

    for (let i = 0; i < akses.length; i++) {
      if (to.meta.role.includes(akses[i])) {
        found = true;
        break;
      }
    }

    if (publicPage.includes(to.path)) {
      next("/");
      return;
    }

    if (!found) {
      next("/");
      return;
    }

    next();
    return;
  }

  if (!auth && !publicPage.includes(to.path)) {
    next("/login");
    return;
  }

  next();
  return;
})

export default router