import View from './View';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //page 1, and there are other pages (right)
    if (currentPage === 1 && numPages > 1) {
      return this.generateMarkupButton('next', 'right');
    }
    //last page left
    if (currentPage === numPages && numPages > 1)
      return this.generateMarkupButton('prev', 'left');

    //other page left - right
    if (currentPage < numPages)
      return (
        this.generateMarkupButton('prev', 'left') +
        this.generateMarkupButton('next', 'right')
      );

    //page 1, and there are NO other pages
    return '';
  }
  generateMarkupButton(mov, pos) {
    const NumPageBtn =
      mov === 'prev' ? this._data.page - 1 : this._data.page + 1;

    return `
      <button data-goto="${NumPageBtn}" class="btn--inline pagination__btn--${mov}">
      <span>Page ${NumPageBtn}</span>
        <svg class="search__icon">
         <use href="${icons}#icon-arrow-${pos}"></use>
        </svg>
      </button>
    `;
  }
}

export default new PaginationView();
