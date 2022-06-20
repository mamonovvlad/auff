import tippy, { animateFill } from "tippy.js";

tippy("[data-tippy-content]", {
  arrow: false,
  animateFill: true,
  plugins: [animateFill],
});
