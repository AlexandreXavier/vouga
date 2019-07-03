import Vue from "vue";
import Router from "vue-router";
import AuthGuard from "./auth-guard";

import Home from "@/components/Home";

import Signup from "@/components/User/Signup";
import Signin from "@/components/User/Signin";
import Profile from "@/components/User/Profile";

import Meetups from "@/components/Meetup/Meetups";
import Meetup from "@/components/Meetup/Meetup";
import CreateMeetup from "@/components/Meetup/CreateMeetup";
import Calendar from "@/components/Meetup/Calendar";

import Fotos from "@/components/Media/Fotos";
import Video from "@/components/Media/Video";

import Tempo from "@/components/Tempo/Tempo";

import Ajuda from "@/components/Ajuda";

import Barcos from "@/components/Barcos/Barcos";
import Resultados from "@/components/Barcos/Resultados";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/meetups",
      name: "Meetups",
      component: Meetups
    },
    {
      path: "/meetups/:id",
      name: "Meetup",
      props: true,
      component: Meetup
    },
    {
      path: "/resultados/:id",
      name: "Resultados",
      props: true,
      component: Resultados
    },
    {
      path: "/meetup/new",
      name: "CreateMeetup",
      component: CreateMeetup,
      beforeEnter: AuthGuard
    },
    {
      path: "/calendar",
      name: "Calendar",
      component: Calendar,
      beforeEnter: AuthGuard
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    },
    {
      path: "/signin",
      name: "Signin",
      component: Signin
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: "/barcos",
      name: "Barcos",
      props: true,
      component: Barcos
    },
    {
      path: "/fotos",
      name: "fotos",
      component: Fotos
    },
    {
      path: "/video",
      name: "video",
      component: Video
    },
    {
      path: "/tempo",
      name: "Tempo",
      component: Tempo,
      beforeEnter: AuthGuard
    },
    {
      path: "/ajuda",
      name: "Ajuda",
      component: Ajuda
    }
  ],
  mode: "history"
});
