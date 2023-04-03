// 1. Parse the book ID from the URL
const bookAPI = "https://gutendex.com/books/"
const bookId = window.location.pathname.split('/').pop();


async function fetchBookInfo(bookId) {
    let book = await fetch(bookAPI + bookId);
    let bookData = await book.json();
    const wrapper = document.querySelector('.book__big-wrapper')
    wrapper.innerHTML =
    `
        <figure class="book__big-img--wrapper">
            <img src="${bookData.formats['image/jpeg']}" alt="" class="book__img">
        </figure>
        <div class="book__description">
            <h2 class="book__heading">${bookData.title}</h2>
            ${authorsHTML(bookData.authors)}
            <h3 class="book__options--title">Downloads</h3>
            <ul class="book__options">
                ${downloadsHTML(bookData.formats)}
            </ul>
        </div>
    `

}

function authorsHTML(authorsData) {
    console.log(authorsData)
    return authorsData.map(author =>
        `
        <h3 class="book__author">${author.name} (${author.birth_year} - ${author.death_year})</h3>
        `
    ).join('');
}

function downloadsHTML(downloadsData) {
    console.log(downloadsData);
    delete downloadsData['image/jpeg'];

    return Object.entries(downloadsData)
        .filter(([key, value]) => value !== null && value !== undefined)
        .map(([key, value]) => `
            <li class="book__option"><a target="_blank" class="book__option" href="${value}">${key}</a></li>
        `)
        .join('');
}


// 3. Call the function with the book ID and process the fetched information

fetchBookInfo(bookId)