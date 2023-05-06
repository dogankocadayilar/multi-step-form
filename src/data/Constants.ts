import arcadeIcon from "../assets/images/icon-arcade.svg";
import advancedIcon from "../assets/images/icon-advanced.svg";
import proIcon from "../assets/images/icon-pro.svg";

export const PLANS = [
  {
    title: "arcade",
    icon: arcadeIcon,
    billing: 9,
  },
  {
    title: "advanced",
    icon: advancedIcon,
    billing: 12,
  },
  {
    title: "pro",
    icon: proIcon,
    billing: 15,
  },
];

export const ADDONS = [
  {
    title: "online service",
    desc: "Access to multiplayer games",
    billing: 1,
  },
  {
    title: "larger storage",
    desc: "Extra 1TB of cloud storage",
    billing: 2,
  },
  {
    title: "customizable profile",
    desc: "Custom theme on your profile",
    billing: 2,
  },
];
