class ResultsView {
  #parentElement = document.querySelector(".results-view");
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

  renderSpinner() {
    const pagination = document.querySelector(".change-page");
    pagination.innerHTML = "";
    const markup = `
      <div class="spinner">
        <img src="/img/loading-icon.svg" alt="" />
      </div>`;
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError() {
    this.#clear();
    const markup = `<div class="error-message">
    <img class="error-message-icon" src="/img/error-message-icon.svg" alt=""> This meal is not available, please try again.
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
}

export default new ResultsView();
