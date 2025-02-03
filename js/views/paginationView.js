class PaginationView {
  #parentElement = document.querySelector(".change-page");
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

  #generateMarkup() {
    const numPages = Math.ceil(
      this.#data.results.length / this.#data.resultsPerPage
    );

    const curPage = this.#data.page;

    if (curPage === 1 && numPages > 1) {
      return `
        <div data-goto="${curPage + 1}" class="btn-page page-right">
          <span>Page</span> ${curPage + 1}
          <img src="/img/arrow-right.svg" alt="" />
        </div>`;
    }

    if (curPage < numPages) {
      return `
        <div data-goto="${curPage + 1}" class="btn-page page-right">
        <span>Page</span> ${curPage + 1}
          <img src="/img/arrow-right.svg" alt="" />
        </div>
        <div data-goto="${curPage - 1}" class="btn-page page-left">
          <img src="/img/arrow-left.svg" alt="" />
          <span>Page</span> ${curPage - 1}
        </div>
        `;
    }

    if (curPage === numPages && numPages > 1) {
      return `
        <div data-goto="${curPage - 1}" class="btn-page page-left">
          <img src="/img/arrow-left.svg" alt="" />
          <span>Page</span> ${curPage - 1}
        </div>`;
    }

    return "";
  }

  addHandlerClick(handler) {
    this.#parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-page");

      const gotoPage = +btn.dataset.goto;

      handler(gotoPage);
    });
  }
}

export default new PaginationView();
