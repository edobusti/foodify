class BookmarksView {
  #parentElement = document.querySelector(".bookmarks-view");
  #data;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  renderMessage() {
    const markup = `<div class="bookmarks-view-empty">
      <img class="error-message-icon" src="/img/error-message-icon.svg" alt=""> No bookmarks yet :)
      </div>`;
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  #generateMarkup() {
    return this.#data.map(this.#generateMarkupPreview).join("");
  }

  #generateMarkupPreview(result) {
    return `
    <a href="#${result.id}" class="meal-item">
          <div class="meal-item-logo">
            <img src="${result.image}" alt="" />
          </div>

          <div class="meal-item-info">
            <div class="meal-item-header">${result.title}</div>
          </div>
        </a>
    `;
  }

  addHandlerHover(handler) {
    const btn = document.querySelector(".bookmarks");
    const view = this.#parentElement;

    [btn, view].forEach((el) => {
      el.addEventListener("mouseover", function () {
        handler(view);
        view.classList.add("active");
      });

      el.addEventListener("mouseleave", function () {
        view.classList.remove("active");
      });
    });
  }

  addHandlerLoad(handler) {
    window.addEventListener("load", handler);
  }
}

export default new BookmarksView();
