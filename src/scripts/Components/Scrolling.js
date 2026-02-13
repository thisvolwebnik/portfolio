class Scrolling {
  selectors = {
    buttonScrolling: "[data-js-scroll]",
    sectionScrolling: "[data-js-about]",
  };

  constructor() {
    this.buttonScrollingElement = document.querySelector(this.selectors.buttonScrolling);
    this.sectionScrollingElement = document.querySelector(this.selectors.sectionScrolling);
    this.bindEvents();
  }

  onClickButtonScrolling = () => {
    this.sectionScrollingElement.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  bindEvents() {
    this.buttonScrollingElement.addEventListener("click", this.onClickButtonScrolling);
  }
}

export default Scrolling;
