import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        // ทุกครั้งเปลี่ยน route → scroll top 0
        return { top: 0 };
    },
    routes: [
        // {
        //     path: "/login",
        //     name: "login",
        //     component: () => import("../views/login.vue"),
        // },
        // {
        //     path: "/loading",
        //     name: "loading",
        //     component: () => import("../views/loading.vue"),
        // },
        {
            path: "/",
            name: "home",
            component: () => import("../views/home.vue"),
        },


    ],
});
// router.beforeEach((to, from, next) => {
//     if (to.name === "login") return next();

//     const storedHash = localStorage.getItem("assetsRequestHash");
//     if (!storedHash) return next("/login");

//     // ถ้า login แล้ว → แวะไปหน้า loading ก่อน
//     if (to.name !== "loading" && from.name === "login") {
//         return next("/loading");
//     }

//     next();
// });


export default router;