class MealView {
  #parentElement = document.querySelector(".meal-view");
  #data;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
    const img = document.querySelector(".meal-view-image");
    img.style.backgroundImage = `url(${data.image})`;
  }

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <img src="/img/loading-icon.svg" alt="" />
      </div>`;
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(err) {
    this.#clear();
    const markup = `<div class="error-message">
    <img class="error-message-icon" src="/img/error-message-icon.svg" alt=""> ${err}
    </div>`;
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage() {
    this.#clear();
    const markup =
      '<img class="default-message-view" src="/img/default-message__view.svg" alt="">';
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  #generateMarkup() {
    return `
      <div class="meal-view-image">
          <div class="meal-view-title">${this.#data.title}</div>
          <div class="bookmark-meal">
          <svg class="bookmark-meal-icon ${
            this.#data.bookmarked ? "active" : ""
          }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z" stroke="#fff" stroke-width="2" stroke-linejoin="round"/>
          </svg>
          </div>
        </div>
          <div class="meal-view-ingredients">
            <div class="ingredients-title">
              <img src="/img/ingredients-title-icon.svg" alt="" />
              INGREDIENTS
            </div>

            <ul class="ingredients-list">
              ${this.#data.ingredients
                .map((ing) => {
                  return `<li class="ingredient-item">
                <img src="/img/checkmark-icon.svg" alt="" /> ${ing}
              </li>`;
                })
                .join("")}
            </ul>
          </div>
          <div class="meal-view-description">
            <div class="intructions-title">
              <img src="/img/intructions-icon.svg" alt="" /> INSTRUCTIONS
            </div>
            <div class="instruction-item">
              ${this.#data.instructions}
            </div>
            <a href="${
              this.#data.tutorial
            }" target="_blank" class="tutorial-btn">
              <img src="/img/player-video.svg" alt="" /> WATCH THE TUTORIAL
            </a>
          </div>`;
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) => {
      window.addEventListener(ev, handler);
    });
  }

  addHandlerAddBookmark(handler) {
    this.#parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".bookmark-meal-icon");
      if (!btn) return;
      handler();
    });
  }
}

export default new MealView();
