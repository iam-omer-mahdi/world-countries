import Home from "../pages/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/country/:code",
    name: "Country",
    component: () => import("../pages/Country.vue"),
  },
  {
    path: "/country/",
    name: "CountryRedirect",
    component: () => import("../pages/Home.vue"),
  },
];

export default routes;
