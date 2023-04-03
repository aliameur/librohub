const searchFormEl = document.querySelector('#search-form');
searchFormEl.addEventListener('submit', onSearch);

async function onSearch(event) {
    event.preventDefault();
    const searchInput = document.querySelector('#search-input');
    const searchQuery = searchInput.value.trim();
    console.log(searchQuery)

    if (searchQuery) {
        window.location.href = `books?search=${encodeURIComponent(searchQuery)}`;
    }
}