class BookPreview extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
            <style>
                .preview {
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                .preview:hover {
                    background-color: #f0f0f0;
                }
                .preview__image {
                    width: 60px;
                    height: 90px;
                    margin-right: 10px;
                    object-fit: cover;
                }
                .preview__info {
                    display: flex;
                    flex-direction: column;
                }
                .preview__title {
                    font-size: 1rem;
                    font-weight: bold;
                }
                .preview__author {
                    font-size: 0.9rem;
                    color: #555;
                }
            </style>
            <button class="preview">
                <img class="preview__image" />
                <div class="preview__info">
                    <h3 class="preview__title"></h3>
                    <div class="preview__author"></div>
                </div>
            </button>
        `;
    }

    static get observedAttributes() {
        return ['id', 'title', 'author', 'image'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const shadow = this.shadowRoot;
        if (name === 'image') shadow.querySelector('.preview__image').src = newValue;
        if (name === 'title') shadow.querySelector('.preview__title').textContent = newValue;
        if (name === 'author') shadow.querySelector('.preview__author').textContent = newValue;
    }
}

customElements.define('book-preview', BookPreview);
