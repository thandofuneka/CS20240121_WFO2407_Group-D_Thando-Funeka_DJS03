import { authors } from './data.js';

class AuthorDropdown extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
            <select>
                <option value="any">All Authors</option>
                ${Object.entries(authors).map(([id, name]) => `<option value="${id}">${name}</option>`).join('')}
            </select>
        `;
    }

    get value() {
        return this.shadowRoot.querySelector('select').value;
    }

    connectedCallback() {
        this.shadowRoot.querySelector('select').addEventListener('change', () => {
            this.dispatchEvent(new Event('change'));
        });
    }
}

customElements.define('author-dropdown', AuthorDropdown);
