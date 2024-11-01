import { books, authors, genres } from './data.js';

export function filterBooks(filters) {
    return books.filter((book) => {
        const matchesTitle = !filters.title || book.title.toLowerCase().includes(filters.title.toLowerCase());
        const matchesAuthor = filters.author === 'any' || book.author === authors[filters.author];
        const matchesGenre = filters.genre === 'any' || book.genres.includes(genres[filters.genre]);
        return matchesTitle && matchesAuthor && matchesGenre;
    });
}
