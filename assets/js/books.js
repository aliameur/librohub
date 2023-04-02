const booksAPI = "https://gutendex.com/books/"

async function renderBooks() {
    const booksListEl = document.querySelector(".books__list")
    const books = await fetch(booksAPI);
    const booksData = await books.json();
    booksListEl.innerHTML = booksData.results.map((book) =>
        `
    <div class="book__wrapper">
        <div class="book">
            <div class="book__overlay"></div>
            <figure class="book__img--wrapper">
                <img src="${book.formats["image/jpeg"]}" alt="" class="book__img">
            </figure>
            <h3 class="book__title">${book.title}</h3>
        </div>
    </div>
    `).join("");

}

setTimeout(() => {
    renderBooks()
})