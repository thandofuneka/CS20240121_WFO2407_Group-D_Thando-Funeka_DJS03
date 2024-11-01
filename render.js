
import { authors, genres } from './data.js';

// Render books
export function renderBooks(bookList, container) {
    const fragment = document.createDocumentFragment();
    for (const { id, title, author, image } of bookList) {
        const element = document.createElement('button');
        element.classList.add('preview');
        element.setAttribute('data-preview', id);
        element.innerHTML = `
            <img class="preview__image" src="${image}" />
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;
        fragment.appendChild(element);
    }
    container.innerHTML = '';
    container.appendChild(fragment);
}

// Render genres dropdown
export function renderGenresDropdown(dropdown) {
    dropdown.innerHTML = `<option value="any">All Genres</option>`;
    for (const [id, name] of Object.entries(genres)) {
        const option = document.createElement('option');
        option.value = id;
        option.innerText = name;
        dropdown.appendChild(option);
    }
}

// Render authors dropdown
export function renderAuthorsDropdown(dropdown) {
    dropdown.innerHTML = `<option value="any">All Authors</option>`;
    for (const [id, name] of Object.entries(authors)) {
        const option = document.createElement('option');
        option.value = id;
        option.innerText = name;
        dropdown.appendChild(option);
    }
}






























