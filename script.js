import { Config, Card, Cards, CardModal, Menu } from "./src/index.js";

const elem = (selector) => document.querySelector(selector);
const elemAll = (selector) => document.querySelectorAll(selector);
const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1';
const currentModal = new bootstrap.Modal(elem('#currentModal'));

const toggleSpinner = () => {
  ['d-none', 'd-flex'].map(cls => elem('.spinner').classList.toggle(cls));
}

const menus = [];

const initMenus = () => {
  const categoriesConfig = {
    name: 'categories',
    menuType: 'c',
    defaultLabel: 'Select a category',
    key: 'strCategory',
    menuElement: '#categories-menu',
    baseUrl,
    elem
  };
  const categoriesMenu = new Menu(categoriesConfig);
  menus.push(categoriesMenu);
  const ingredientsConfig = {
    name: 'ingredients',
    menuType: 'i',
    defaultLabel: 'Select an ingredient',
    key: 'strIngredient1',
    menuElement: '#ingredients-menu',
    baseUrl,
    elem
  }
  const ingredientsMenu = new Menu(ingredientsConfig);
  menus.push(ingredientsMenu);
  menus.forEach(menu => {
    menu.renderMenu();
    elem(menu.menuElement).addEventListener('change', (e) => {
      const url = e.target.value;
      cards.getCards(url, menu.menuElement);
    });
  });
}

const config = new Config({ elem, elemAll, baseUrl, menus, currentModal, toggleSpinner });
const cards = new Cards(config);

window.addEventListener('DOMContentLoaded', (event) => {
  initMenus();
  cards.getRandomCocktail();
  elem('#random-button').addEventListener('click', (e) => cards.getRandomCocktail());
  elem('.currentYear').textContent = new Date().getFullYear();
});