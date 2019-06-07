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

import Ajuda from "@/components/Ajuda";
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
      path: "/fotos",
      name: "fotos",
      component: Fotos
    },
    {
      path: "/ajuda",
      name: "Ajuda",
      component: Ajuda
    }
  ],
  mode: "history"
});
