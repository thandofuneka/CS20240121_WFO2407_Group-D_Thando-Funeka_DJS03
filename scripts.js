import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';
import { setTheme } from './theme.js';
import { filterBooks } from './filters.js';
import './book-preview.js';
import './genre-dropdown.js';
import './author-dropdown.js';

let page = 1;
let matches = books;

function renderBooks(bookList, container, clear = true) {
    if (clear) container.innerHTML = '';

    bookList.forEach(({ id, title, author, image }) => {
        const bookPreview = document.createElement('book-preview');
        bookPreview.setAttribute('id', id);
        bookPreview.setAttribute('title', title);
        bookPreview.setAttribute('author', author);
        bookPreview.setAttribute('image', image);
        container.appendChild(bookPreview);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    
    const bookContainer = document.querySelector('[data-list-items]');
    renderBooks(books.slice(0, BOOKS_PER_PAGE), bookContainer);
    
    const theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
    setTheme(theme);
    
    document.querySelector('[data-list-button]').innerHTML = `Show more (${books.length - BOOKS_PER_PAGE})`;
});

// Search form submit handler
document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const genreDropdown = document.querySelector('genre-dropdown');
    const authorDropdown = document.querySelector('author-dropdown');
    const filters = {
        title: document.querySelector('[data-search-title]').value,
        genre: genreDropdown.value,
        author: authorDropdown.value
    };
    matches = filterBooks(filters, books);
    page = 1;

    renderBooks(matches.slice(0, BOOKS_PER_PAGE), document.querySelector('[data-list-items]'));

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
    
    if (event.target.closest('book-preview')) {
        const previewId = event.target.closest('book-preview').getAttribute('id');
        const active = books.find(book => book.id === previewId);  
    

        if (active) {
            document.querySelector('[data-list-active]').open = true;
            document.querySelector('[data-list-blur]').src = active.image;
            document.querySelector('[data-list-image]').src = active.image;
            document.querySelector('[data-list-title]').innerText = active.title;
            document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
            document.querySelector('[data-list-description]').innerText = active.description;
        }
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
