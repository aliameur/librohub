const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('search');
let search;
const booksAPI = "https://gutendex.com/books/"

if (searchQuery) {
    getSearch(searchQuery);
}

async function renderBooks(filter) {
    const booksListEl = document.querySelector(".books__list")
    booksListEl.classList += " books__loading";

    const books = await getBooks(filter);
    console.log(books)

    booksListEl.classList.remove("books__loading");

    booksListEl.innerHTML = books.results.map((book) =>
        `
    <div class="book__wrapper">
        <a href="${bookBaseURL}${book.id}">
            <div class="book">
                <div class="book__overlay"></div>
                <figure class="book__img--wrapper">
                    <img src="${book.formats["image/jpeg"]}" alt="" class="book__img">
                </figure>
                <h3 class="book__title">${book.title}</h3>
            </div>
        </a>
    </div>
    `).join("");

}

async function getBooks(filter) {
    let booksModifiedAPI;

    if (filter === 'ID_ASCENDING') {
        booksModifiedAPI = booksAPI + `?sort=ascending`;
    } else if (filter === 'ID_DESCENDING') {
        booksModifiedAPI = booksAPI + `?sort=descending`;
    } else if (filter === 'DOWNLOAD_COUNT' || filter === undefined) {
        booksModifiedAPI = booksAPI + `?sort=popular`;
    }

    if (search) {
        booksModifiedAPI += `&search=${search}`
    }

    console.log(booksModifiedAPI)
    const books = await fetch(booksModifiedAPI);
    return await books.json();
}


function getSearch(searchString) {
    search = searchString.split(" ").join("%20");
    console.log(search)
}

function onSelect(event) {
    let filter = event.target.value;
    document.querySelector(".books__list").innerHTML = `<i class="fas fa-spinner books__loading--spinner"></i>`
    renderBooks(filter);
}

renderBooks();