const bookResult = document.getElementById('book-result');
const warning = document.getElementById('not-found');
const searchBook = () => {
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    if (inputText === '') {
        bookResult.textContent = '';
        warning.innerText = 'Provide a valid Name';
    }
    else {
        inputText.value = '';
        const url = `http://openlibrary.org/search.json?q=${inputText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayBook(data.docs))
        // clear Data
        inputField.value = '';
    }
}
const displayBook = (books) => {

    bookResult.textContent = '';
    if (books.length === 0) {
        warning.innerText = 'No result found';
    }
    else {
        warning.innerText = `Total Result: ${books.length}`;
        books.forEach(book => {
            const booksQuentity = book.length;
            console.log(booksQuentity);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card">
        <img class="img-fluid m-3" src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text"> Author: ${book.author_name}.</p>
          <p class="card-text"> Publisher: ${book.publisher ? book.publisher[0] : 'N/A'}.</p>
          <p class="card-text">Publish Year: ${book.publish_year}.</p>
        </div>
      </div>`;
            const resultFound = div.length;
            console.log(resultFound);
            bookResult.appendChild(div);

        });
    }
}
