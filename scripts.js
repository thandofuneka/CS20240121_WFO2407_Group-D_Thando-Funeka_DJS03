import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';
import { createPreviewsFragment, initializeDropdowns } from './render.js';
import { setTheme } from './theme.js';
import { filterBooks } from './filters.js';

let page = 1;
let matches = books;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('[data-list-items]').appendChild(createPreviewsFragment(books.slice(0, BOOKS_PER_PAGE)));
    initializeDropdowns(genres, authors);

    const theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
    setTheme(theme);
    
    document.querySelector('[data-list-button]').innerHTML = `Show more (${books.length - BOOKS_PER_PAGE})`;
});

// Search form submit handler
document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    matches = filterBooks(filters, books);
    page = 1;

    document.querySelector('[data-list-items]').innerHTML = '';
    document.querySelector('[data-list-items]').appendChild(createPreviewsFragment(matches.slice(0, BOOKS_PER_PAGE)));

    document.querySelector('[data-list-button]').disabled = matches.length <= BOOKS_PER_PAGE;
    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${Math.max(matches.length - BOOKS_PER_PAGE, 0)})</span>
    `;
    document.querySelector('[data-search-overlay]').open = false;
});

// Load more books on "Show more" button click
document.querySelector('[data-list-button]').addEventListener('click', () => {
    const fragment = createPreviewsFragment(matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE));
    document.querySelector('[data-list-items]').appendChild(fragment);
    page += 1;

    document.querySelector('[data-list-button]').disabled = matches.length <= page * BOOKS_PER_PAGE;
    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${Math.max(matches.length - page * BOOKS_PER_PAGE, 0)})</span>
    `;
});

// Show book details in overlay on click
document.querySelector('[data-list-items]').addEventListener('click', (event) => {
    const pathArray = Array.from(event.composedPath());
    let active = null;

    for (const node of pathArray) {
        if (active) break;
        if (node?.dataset?.preview) {
            active = books.find(book => book.id === node.dataset.preview);
        }
    }

    if (active) {
        document.querySelector('[data-list-active]').open = true;
        document.querySelector('[data-list-blur]').src = active.image;
        document.querySelector('[data-list-image]').src = active.image;
        document.querySelector('[data-list-title]').innerText = active.title;
        document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
        document.querySelector('[data-list-description]').innerText = active.description;
    }
});

// Theme change handler
document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const theme = new FormData(event.target).get('theme');
    setTheme(theme);
});

document.querySelector('[data-list-close]').addEventListener('click', () => {
    document.querySelector('[data-list-active]').open = false
})

document.querySelector('[data-search-cancel]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = false
})

document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = false
})

document.querySelector('[data-header-search]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = true 
    document.querySelector('[data-search-title]').focus()
})

document.querySelector('[data-header-settings]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = true 
})
