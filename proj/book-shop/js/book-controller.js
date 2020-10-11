console.log('BOOK SHOP')

function onInit() {
    init()
    renderBooks();
}




//render books
function renderBooks() {
    var elBooksTable = document.querySelector('.books-table');
    var books = getBooksForDisplay(); //this function  will give the correct model of gBooks evreytime
    console.log('books to render:', books);
    var strHTML = books.map(function (book) {
        return `<tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price}$</td>
        <td><img src="${book.imgUrl}"  class="preview" /></td>
        <td><button class="btn btn-read" onClick="onReadBook('${book.id}')">Read</button></td>
        <td><button  class="btn btn-update" onClick="onUpdateBook('${book.id}')">Update</button></td>
        <td><button class="btn btn-delete" onClick="onRemoveBook('${book.id}')">Delete</button></td>
        </tr>`
    }).join('');
    elBooksTable.innerHTML = strHTML;
}



function onReadBook(bookId) {
    var elModal = document.querySelector('.book-details');
    toggleElement(elModal, 'hide')
    // elModal.hidden = false;
    var elPlusBtn = document.querySelector('.plus-btn');
    var elMinusBtn = document.querySelector('.minus-btn');

    //give to the rate btns a dataset attribute to each time to know which book i clicked to read
    elPlusBtn.dataset.bookId = bookId;
    elMinusBtn.dataset.bookId = bookId;

    var book = getBookById(bookId);
    console.log('Book:', book);

    elModal.querySelector('img').src = book.imgUrl;
    elModal.querySelector('.title').innerText = book.name;
    elModal.querySelector('.price').innerText = book.price + '$';
    elModal.querySelector('.book-id').innerText = `Id:${book.id}`
    elModal.querySelector('.rating').innerText = book.rating;
}


function onCloseModal() {
    var elModal = document.querySelector('.book-details');
    toggleElement(elModal, 'hide')

    // elModal.hidden = true;
}


//controller to remove books
function onRemoveBook(bookId) {
    var isToDelete = confirm('Are u sure?');
    if (!isToDelete) return;
    removeBook(bookId);
    renderBooks();
}



//add a book
function onAddBook() {
    console.log('added')
    var elBookName = document.querySelector('.book-title');
    var elBookPrice = document.querySelector('.book-price');
    var elBookImg = document.querySelector('.book-img');

    if (!elBookName.value || !elBookPrice.value || !elBookImg.value) return;
    if (!isNumber(elBookPrice.value)) return;
    console.log('go to 77')
    // if (isNaN(+elBookPrice)) return;
    var bookName = elBookName.value;
    var bookPrice = +elBookPrice.value;
    var bookImg = elBookImg.value;
    // var bookName = prompt('Name?');
    // var bookPrice = +prompt('Price?');
    addBook(bookName, bookPrice, bookImg);
    renderBooks();

    elBookName.value = '';
    elBookPrice.value = '';
    elBookImg.value = '';
}


function onOpenAddModal() {
    var elAddBookModal = document.querySelector('.add-book-modal');
    console.log(elAddBookModal)
    toggleElement(elAddBookModal, 'hide')

}



//update controller
function onUpdateBook(bookId) {
    // var newPrice = +elUpadatePrice.value;
    // if (!elUpadatePrice.value || !isNumber(elUpadatePrice.value)) return;
    var newPrice = +prompt('New Price?');
    if (!isNumber(newPrice) || !newPrice) return;
    updateBook(bookId, newPrice);
    renderBooks();
}


function onManageRating(elBtn, operation) {
    var bookId = elBtn.dataset.bookId;
    // if (operation === 1) bookId = document.querySelector('.plus-btn').dataset.bookId;
    // else bookId = document.querySelector('.minus-btn').dataset.bookId;
    // var bookId = document.querySelector('.plus-btn').dataset.bookId;
    var elCurrRating = document.querySelector('.rating');
    manageRating(bookId, operation);
    var book = getBookById(bookId);
    elCurrRating.innerText = book.rating;
}


function onSetSort(sortBy) {
    // console.log('sort by:', sortBy);
    setSort(sortBy);
    renderBooks();
}


function onManagePagination(diff) {
    var elCurrPage = document.querySelector('.curr-page');
    managePagination(diff)
    renderBooks();
    var currPage = getCurrPage();
    elCurrPage.innerText = currPage;
}

function onPrevPage(diff) {
    var elCurrPage = document.querySelector('.curr-page');
    prevPage(diff)
    renderBooks()
    var currPage = getCurrPage();
    elCurrPage.innerText = currPage;
}


























// function onAddRating() {
//     //get the id from the dataset that update each time i open the modal;
//     console.log('Add rate foor book:', bookId);
//     addRating(bookId);
//     elCurrRating.innerText = book.rating;
// }

// function onMinusRating() {
//     var elCurrRating = document.querySelector('.rating');
//     var bookId = document.querySelector('.plus-btn').dataset.bookId;
//     minusRating(bookId);
//     var book = getBookById(bookId);
//     elCurrRating.innerText = book.rating;
// }

