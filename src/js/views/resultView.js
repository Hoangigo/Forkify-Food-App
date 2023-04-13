import View from './View';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again!';
  _message;
  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return this._data
      .map(el => {
        return `<li class="preview">
        <a class="preview__link${
          el.id === id ? 'preview__link--active' : ''
        }" href="#${el.id}">
          <figure class="preview__fig">
            <img src="${el.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${el.title}</h4>
            <p class="preview__publisher">${el.publisher}</p>
            
          </div>
        </a>
      </li>`;
      })
      .join('');
  }
}
export default new ResultsView();
