const searchBook = () => {
    const searchText = document.getElementById('input-search');
    const book = searchText.value;
    const url = `https://openlibrary.org/search.json?q=${book}`;
    searchText.value = '';
    fetch(url)
        .then(res => res.json())
        .then(data => foundBookNum(data.numFound))
    if (book === '') {
        const error = document.getElementById('error');
        error.textContent = '';
        error.innerText = "Please enter your desired book name!"
        const books = document.getElementById('displayBooks');
        books.innerHTML = '';
    }

    else {
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchedBooks(data.docs))
    }

}
const foundBookNum = (number) => {
    const totalBooks = document.getElementById('totalBooks');
    // console.log(totalBooks)
    totalBooks.innerText = '';
    if (number > 0) {
        const error = document.getElementById('error');
        error.textContent = '';
        totalBooks.textContent = `There are total ${number} books in the list!`;
    }
    else {
        totalBooks.textContent = `Sorry! We have no books to show you dear!`;
    }
}
const displaySearchedBooks = (books) => {
    const searchedBooks = document.getElementById('displayBooks')
    searchedBooks.textContent = '';
    if (books.length !== 0) {
        books.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `<div class="col">
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : 10909258}-M.jpg" class="card-img-top image" alt="...">
            <div class="card-body">
                <h5 class="card-title">Book name: <span class = "book-text fw-lighter">${book.title}</span></h5>
                <p class="card-text fw-bold">Writer: <span class = "book-text fw-lighter"> ${book.author_name ? book.author_name.slice(0, 5) : 'Not found'}</span></p>
                <p class="card-text fw-bold">Publisher:<span class = "book-text fw-lighter"> ${book.publisher ? book.publisher.slice(0, 5) : 'Not found'}</span></p>
                <p class="card-text fw-bold">First publishing year:<span class = "book-text fw-lighter"> ${book.first_publish_year ? book.first_publish_year : 'Not found'}</span></p>
            </div>
        </div>
    </div> `;
            searchedBooks.appendChild(div);

        });
    }
    else {
        totalBooks.textContent = '';
        const error = document.getElementById('error');
        error.textContent = '';
        error.innerText = 'Please give us a valid book name to help you finding book!'
    }
}