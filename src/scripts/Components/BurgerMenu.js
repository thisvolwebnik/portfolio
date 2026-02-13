class BurgerMenu {
  selectors = {
    root: "[data-js-header]",
    overlay: "[data-js-header-overlay]",
    burgerButton: "[data-js-header-burger-button]",
    linkMenu: "[data-js-header-link]",
  };

  stateClasses = {
    isActive: "is-active",
    isLook: "is-look",
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.overlayElement = this.rootElement.querySelector(this.selectors.overlay);
    this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerButton);
    this.linksMenuElement = this.rootElement.querySelectorAll(this.selectors.linkMenu);
    this.bindEvents();
  }

  toggleClassesAllElements() {
    this.burgerButtonElement.classList.toggle(this.stateClasses.isActive);
    this.overlayElement.classList.toggle(this.stateClasses.isActive);
    document.documentElement.classList.toggle(this.stateClasses.isLook);
  }

  onClickBurgerButton = () => {
    this.toggleClassesAllElements();
  };

  onClickLinkElement = () => {
    this.toggleClassesAllElements();
  };

  bindEvents() {
    this.burgerButtonElement.addEventListener("click", this.onClickBurgerButton);

    this.linksMenuElement.forEach(linkElement =>
      linkElement.addEventListener("click", this.onClickLinkElement)
    );
  }
}

export default BurgerMenu;
