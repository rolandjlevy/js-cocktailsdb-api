import { Config } from './index.js';

export class CardModal extends Config {
  constructor(config, currentModal, toggleSpinner) {
    super(config);
    this.currentModal = currentModal;
    this.toggleSpinner = toggleSpinner;
  }
  renderModal(id) {
    this.toggleSpinner();
    fetch(`${this.baseUrl}/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const {
          strDrink,
          strCategory,
          strDrinkThumb,
          strInstructions,
          strGlass,
          strVideo,
          dateModified
        } = data.drinks[0];
        this.elem('.modal-title').textContent = strDrink;
        const date = new Date(dateModified).toLocaleDateString('en-GB');
        const delimiter = '<br>\t\t&bull;&nbsp;';
        const ingredients = Object.entries(data.drinks[0])
          .reduce((acc, [key, value]) => {
            if (key.includes('strIngredient1') && value) acc.push(value);
            return acc;
          }, [])
          .join(delimiter);
        const videoLink = strVideo
          ? `<p><strong>Video</strong>: <a href="${strVideo}">Watch on YouTube</a></p>`
          : '';
        this.elem('.modal-body').innerHTML = `
        <div>
          <p><img src="${strDrinkThumb}" class="modal-image" /></p>
          <p><strong>Category</strong>: ${strCategory}</p>
          <p><strong>Glass type</strong>: ${strGlass || 'N/A'}</p>
          <p><strong>Instructions</strong>: ${strInstructions || 'N/A'}</p>
          <p><strong>Ingredients</strong>: ${delimiter}${ingredients}</p>
          <p><strong>Date modified</strong>: ${date || 'N/A'}</p>
          ${videoLink}
        </div>
      `;
        this.currentModal.show();
        this.toggleSpinner();
      })
      .catch((err) => {
        const errorMessage = `<p>Unable to load details, error: ${err}</p>`;
        this.elem('.modal-body').innerHTML = errorMessage;
        this.toggleSpinner();
      });
  }
}
