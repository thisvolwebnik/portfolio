export default class Slider {
  constructor(root) {
    this.root = root;
    this.line = root.querySelector("[data-js-slider-line]");
    this.items = Array.from(root.querySelectorAll("[data-js-slider-item]"));
    this.leftArea = root.querySelector("[data-js-slider-area-left]");
    this.rightArea = root.querySelector("[data-js-slider-area-right]");

    if (!this.line || !this.items.length) return;

    this.currentX = 0;
    this.minX = 0;
    this.maxX = 0;
    this.speed = 5; // скорость автоскролла
    this.rafId = null;
    this.hoverDirection = null; // "left" | "right" | null

    this.isPointerFine = () => window.matchMedia("(pointer: fine)").matches;

    this.init();
  }

  init() {
    this.updateBounds();
    this.centerTrack();
    this.initHoverAreas();
    this.initTouch();

    window.addEventListener("resize", () => {
      this.updateBounds();
      this.centerTrack();
    });
  }

  updateBounds() {
    const rootWidth = this.root.clientWidth;
    const contentWidth = this.line.scrollWidth;

    // минимальное и максимальное положение трека:
    // 0 — контент прижат к левому краю
    // rootWidth - contentWidth — контент прижат к правому краю
    this.maxX = 0;
    this.minX = Math.min(rootWidth - contentWidth, 0);
  }

  centerTrack() {
    const rootWidth = this.root.clientWidth;
    const contentWidth = this.line.scrollWidth;

    let centeredX = (rootWidth - contentWidth) / 2;
    // не даём выйти за пределы крайних положений
    centeredX = Math.max(this.minX, Math.min(this.maxX, centeredX));

    this.setTranslate(centeredX);
  }

  setTranslate(x) {
    const clamped = Math.max(this.minX, Math.min(this.maxX, x));
    this.currentX = clamped;
    this.line.style.transform = `translateX(${clamped}px)`;
  }

  startHoverScroll(direction) {
    if (!this.isPointerFine()) return; // только для десктопа

    this.hoverDirection = direction; // "left" или "right"
    if (this.rafId) return;

    const step = () => {
      if (!this.hoverDirection) {
        this.rafId = null;
        return;
      }

      let delta = this.speed;
      // при наведении на правую область сдвигаем контент влево (к следующему контенту)
      if (this.hoverDirection === "right") {
        delta = -this.speed;
      }

      const prevX = this.currentX;
      this.setTranslate(this.currentX + delta);

      // если упёрлись в край — останавливаемся
      if (this.currentX === this.minX || this.currentX === this.maxX) {
        this.stopHoverScroll();
        return;
      }

      // если сдвига не произошло (на всякий случай) — тоже стоп
      if (this.currentX === prevX) {
        this.stopHoverScroll();
        return;
      }

      this.rafId = requestAnimationFrame(step);
    };

    this.rafId = requestAnimationFrame(step);
  }

  stopHoverScroll() {
    this.hoverDirection = null;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  initHoverAreas() {
    if (!this.leftArea || !this.rightArea) return;

    // области уже занимают ~30% ширины в CSS и
    // покрывают левую и правую части. Центральная зона не имеет обработчиков.
    this.leftArea.addEventListener("mouseenter", () => this.startHoverScroll("left"));
    this.leftArea.addEventListener("mouseleave", () => this.stopHoverScroll());

    this.rightArea.addEventListener("mouseenter", () => this.startHoverScroll("right"));
    this.rightArea.addEventListener("mouseleave", () => this.stopHoverScroll());
  }

  initTouch() {
    // свайп только для тач-устройств / когда нет мыши
    const supportsTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!supportsTouch) return;

    let startX = 0;
    let startTranslate = 0;
    let isDragging = false;

    const onTouchStart = event => {
      if (this.isPointerFine()) return; // если есть мышь — считаем это десктопом
      const touch = event.touches[0];
      startX = touch.clientX;
      startTranslate = this.currentX;
      isDragging = true;
    };

    const onTouchMove = event => {
      if (!isDragging) return;
      const touch = event.touches[0];
      const deltaX = touch.clientX - startX;
      this.setTranslate(startTranslate + deltaX);
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    this.root.addEventListener("touchstart", onTouchStart, { passive: true });
    this.root.addEventListener("touchmove", onTouchMove, { passive: true });
    this.root.addEventListener("touchend", onTouchEnd);
    this.root.addEventListener("touchcancel", onTouchEnd);
  }
}
