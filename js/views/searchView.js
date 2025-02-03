class SearchView {
  #parentElement = document.querySelector(".search-box");

  getQuery() {
    const query = document.querySelector(".search-bar").value;

    this.clearInput();
    return query;
  }

  clearInput() {
    this.#parentElement.querySelector(".search-bar").value = "";
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener("keypress", function (e) {
      if (
        e.key === "Enter" &&
        document.querySelector(".search-bar").value !== ""
      )
        handler();
    });
    this.#parentElement
      .querySelector(".search-btn")
      .addEventListener("click", function (e) {
        e.preventDefault();
        if (document.querySelector(".search-bar").value !== "") handler();
      });
  }
}

export default new SearchView();
