import Home from "../pages/Home.vue";
import Country from "../pages/Country.vue";
import Error from "../components/Error.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:code",
    name: "Country",
    component: Country,
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: Error },
];

export default routes;
