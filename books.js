const booksAPI = "https://gutendex.com/books/"

async function renderBooks() {
    const booksListEl = document.querySelector(".books__list")
    const books = await fetch(booksAPI);
    const booksData = await books.json();
    booksListEl.innerHTML = booksData.results.map((book) =>
        `
    <div class="book__wrapper">
        <figure class="book__img--wrapper">
        <div class="book__overlay"></div>
            <img src="${book.formats["image/jpeg"]}" alt="" class="book__img">
        </figure>
        <h3 class="book__title">${book.title}</h3>
    </div>
    `).join("");

}

setTimeout(() => {
    renderBooks()
})