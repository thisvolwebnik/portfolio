import "../styles/index.scss";
import Accordion from "./Components/Accordion";
import BurgerMenu from "./Components/BurgerMenu";
import PricingModal from "./Components/PricingModal";
import Scrolling from "./Components/Scrolling";
import Slider from "./Components/Slider";

new BurgerMenu();
new Scrolling();
new PricingModal();
new Accordion();

document.addEventListener("DOMContentLoaded", () => {
  const sliderRoot = document.querySelector("[data-js-slider]");
  if (sliderRoot) {
    new Slider(sliderRoot);
  }
});
