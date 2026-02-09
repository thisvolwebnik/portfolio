class PricingModal {
  selectors = {
    root: "[data-js-pricing]",
    pricingButton: "[data-js-pricing-button]",
    modal: "[data-js-modal]",
    crossButton: "[data-js-modal-cross]",
  };

  stateClasses = {
    isActive: "is-active",
    isLock: "is-look",
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.pricingButtonsElement = this.rootElement.querySelectorAll(
      this.selectors.pricingButton,
    );
    this.modalElement = document.querySelector(this.selectors.modal);
    this.crossButton = this.modalElement.querySelector(
      this.selectors.crossButton,
    );
    this.bindEvents();
  }

  onClickCrossButton = () => {
    this.modalElement.classList.remove(this.stateClasses.isActive);
    document.documentElement.classList.remove(this.stateClasses.isLock);
  };

  onButtonClick = () => {
    this.modalElement.classList.add(this.stateClasses.isActive);
    document.documentElement.classList.add(this.stateClasses.isLock);
  };

  bindEvents() {
    this.pricingButtonsElement.forEach((button) =>
      button.addEventListener("click", this.onButtonClick),
    );
    this.crossButton.addEventListener("click", this.onClickCrossButton);
  }
}

export default PricingModal;
