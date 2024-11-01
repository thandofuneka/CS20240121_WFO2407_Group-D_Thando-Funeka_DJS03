import { renderBooks, renderGenresDropdown, renderAuthorsDropdown } from './render.js';
import { filterBooks } from './filters.js';
import { setTheme } from './theme.js';
import { books, BOOKS_PER_PAGE } from './data.js';

function init() {
    renderBooks(books.slice(0, BOOKS_PER_PAGE), document.querySelector('[data-list-items]'));
    renderGenresDropdown(document.querySelector('[data-search-genres]'));
    renderAuthorsDropdown(document.querySelector('[data-search-authors]'));

    const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
    setTheme(theme);

    document.querySelector('[data-list-button]').textContent = `Show more (${books.length - BOOKS_PER_PAGE})`;
}

document.addEventListener('DOMContentLoaded', init);

// Event listeners for search form
document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const filteredBooks = filterBooks(filters);
    renderBooks(filteredBooks, document.querySelector('[data-list-items]'));
});

// Event listener for theme form submission
document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const theme = new FormData(event.target).get('theme');
    setTheme(theme);
});

// Other event listeners
document.querySelector('[data-header-search]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = true;
    document.querySelector('[data-search-title]').focus();
});

document.querySelector('[data-header-settings]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = true;
});

document.querySelector('[data-search-cancel]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = false;
});

document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = false;
});
