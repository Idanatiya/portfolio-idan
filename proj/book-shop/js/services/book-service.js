var gBooks;
var gSortBy = 'name';
var gPageIdx = 1;
var PAGE_SIZE = 5;


//call the function to initalize an array or load from storage
function init() {
    _createBooks();

}

function getBooksForDisplay() {
    sort()
    var pageStart = (gPageIdx - 1) * PAGE_SIZE;
    // console.log('page start:', pageStart)
    var pageEnd = pageStart + PAGE_SIZE;
    // console.log('Page end:', pageEnd)
    // console.log(`slicing from: ${pageStart} to ${pageEnd}`)
    return gBooks.slice(pageStart, pageEnd) /// I HAVE A BUG IN THE PREV CLICK

}



function managePagination(diff) {
    console.log('dif is:', diff)
    if (gPageIdx <= 1 && diff === -1) {
        gPageIdx = Math.ceil(gBooks.length / PAGE_SIZE);
        console.log('pageidx:', gPageIdx);
    }
    else if (gPageIdx * PAGE_SIZE >= gBooks.length && diff === 1) gPageIdx = 1;
    // if (diff === -1 && gPageIdx < 0) gPageIdx = 0;
    else gPageIdx += diff;
    console.log('curr page:', gPageIdx);
}


function prevPage() {
    if (gPageIdx === 1) {
        gPageIdx = 3;
        return;
    }
    gPageIdx -= 1;
}



//remove book
function removeBook(bookId) {
    var bookIdx = getBookIdxById(bookId);
    //if book not found 
    if (bookIdx === -1) return;

    //remove the book and update the storage.
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}



//add book
function addBook(bookName, bookPrice, bookImg) {
    var bookToAdd = _createBook(bookName, bookPrice, bookImg);
    //add to model and update stroage
    gBooks.unshift(bookToAdd);
    _saveBooksToStorage();
}



function updateBook(bookId, newPrice) {
    var book = getBookById(bookId)
    if (!book) return;
    //update book price and save the new state of gBooks
    book.price = newPrice;
    _saveBooksToStorage();
}


function getBookById(bookId) {
    return gBooks.find(book => book.id === bookId);
}
function getBookIdxById(bookId) {
    return gBooks.findIndex(book => book.id === bookId);
}


function manageRating(bookId, operation) {
    console.log('clicking!')
    var book = getBookById(bookId)
    if (!book) return;
    console.log('here')
    if (operation === 1 && book.rating < 10) {
        book.rating += operation;
    }
    else if (operation === -1 && book.rating > 0) {
        book.rating -= operation;
    }
    _saveBooksToStorage();

}



function setSort(sortBy) {
    gSortBy = sortBy;
}

function sort() {
    gBooks.sort(function (book1, book2) {
        // gSortDir = (gSortDir === -1) ? 1 : -1;
        // console.log('got to sort line 109')
        // console.log(typeof book1.price)
        if (gSortBy === 'name') {
            return book1.name.localeCompare(book2.name)
        }
        console.log('gSortBy:', gSortBy)
        return book1[gSortBy] > book2[gSortBy] ? 1 : -1;
    })
}





//create the book array
function _createBooks() {
    var books = loadFromStorage('books');
    if (!books || !books.length) {
        books = [];
        books.push(_createBook('Batman', 200, 'imgs/book1.png', 0))
        books.push(_createBook('Superman', 100, 'imgs/book2.png', 0))
        books.push(_createBook('Spiderman', 350, 'imgs/book3.png', 0))
    }
    gBooks = books;
    _saveBooksToStorage();
}



//Create a book object
function _createBook(name, price, imgUrl, rating = 0) {
    var book = {
        id: makeId(),
        name,
        price,
        imgUrl,
        rating
    }
    return book;
}



function getCurrPage() {
    return gPageIdx;
}


//save books to storage
function _saveBooksToStorage() {
    saveToStorage('books', gBooks);
}



// ****ANOTHER SOLUTION */
// function sort() {
//     console.log('go to sort')
//     console.log({ gSortBy })
//     if (gSortBy === 'NAME') {
//         console.log('got to here')
//         sortByName()
//         console.log('after sort', gBooks)
//     } else if (gSortBy === 'PRICE') {
//         console.log('got to sort by price')
//         sortByPrice();
//         console.log('after sort by price', gBooks)
//     }
// }

// function sortByName() {
//     gBooks.sort(function (book1, book2) {
//       
//         return book1.name.localeCompare(book2.name);
//     })

// }

// function sortByPrice() {
//     gBooks.sort(function (book1, book2) {
//         return book1.price - book2.price;
//     })
// }















// gCurrPage = 2
// gPageSize = 5

// setCurrPage(diff)

// var pageStart = (gCurrPage - 1) * gPageSize
// var pageEnd = gPageSize + pageStart
// gBook.slice(pageStart, pageEnd)















// function addRating(bookId) {
//     var book = gBooks.find(book => book.id === bookId);
//     console.log('add 1 to book:', book)
//     if (!book || book.rating >= 10) return;
//     //add 1 to rating and update the storage
//     book.rating += 1;
//     _saveBooksToStorage();
// }


// function minusRating(bookId) {
//     var book = gBooks.find(book => book.id === bookId);
//     console.log('add 1 to book:', book)
//     if (!book || book.rating <= 0) return;
//     //add 1 to rating and update the storage
//     book.rating -= 1;
//     _saveBooksToStorage();
// }







            // gCurrPage = 2
            // gPageSize = 5

            // setCurrPage(diff)

            // var pageStart = (gCurrPage - 1) * gPageSize
            // var pageEnd = gPageSize + pageStart
            // gBook.slice(pageStart, pageEnd)


