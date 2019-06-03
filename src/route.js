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

import Treino from "@/components/Treino/Treino";
import PostView from "@/components/Treino/PostView";
import CameraView from "@/components/Treino/CameraView";

import Fotos from "@/components/Media/Fotos";
import Card from "@/components/Media/Card";

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
      path: "/treino",
      name: "Treino",
      component: Treino
    },
    {
      path: "/post",
      name: "post",
      component: PostView
    },
    {
      path: "/camera",
      name: "camera",
      component: CameraView
    },
    {
      path: "/fotos",
      name: "fotos",
      component: Fotos
    },
    {
      path: "/fotos/:id",
      name: "Card",
      props: true,
      component: Card
    },
    {
      path: "/ajuda",
      name: "Ajuda",
      component: Ajuda
    }
  ],
  mode: "history"
});
