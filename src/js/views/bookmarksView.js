import View from './View';
import previewView from './previewView';
class BookMarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe to bookmark it';
  _message;
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}
export default new BookMarksView();
