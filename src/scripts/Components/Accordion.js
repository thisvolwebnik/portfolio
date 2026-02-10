class Accordion {
  selectors = {
    root: "[data-js-accordion]",
    accordionItem: "[data-js-accordion-item]",
    accordionButton: "[data-js-accordion-button]",
    accordionContent: "[data-js-accordion-content]",
  };

  stateClasses = {
    isActive: "is-active",
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.accordionItemsElement = this.rootElement.querySelectorAll(
      this.selectors.accordionItem,
    );
    this.accordionButtonsElement = this.rootElement.querySelectorAll(
      this.selectors.accordionButton,
    );
    this.bindEvents();
  }

  closeActiveAccordionItem() {
    this.accordionItemsElement.forEach((accordionItem) => {
      if (accordionItem.classList.contains(this.stateClasses.isActive)) {
        accordionItem.classList.remove(this.stateClasses.isActive);
      }
    });
  }

  onClickAccordionButton = (e) => {
    const rootEventElement = e.target.parentNode;
    const isActiveEventRootElement = rootEventElement.classList.contains(
      this.stateClasses.isActive,
    );

    if (isActiveEventRootElement) {
      rootEventElement.classList.remove(this.stateClasses.isActive);
    }

    if (!isActiveEventRootElement) {
      this.closeActiveAccordionItem();
      rootEventElement.classList.add(this.stateClasses.isActive);
    }
  };

  bindEvents() {
    this.accordionButtonsElement.forEach((accordionButton) => {
      accordionButton.addEventListener("click", (e) =>
        this.onClickAccordionButton(e),
      );
    });
  }
}

export default Accordion;
