function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}


function toggleElement(el, className) {
    el.classList.toggle(className);
}


function isNumber(value) {
    console.log('val', value)
    return Number.isInteger(+value)
}

// function manageRating(bookId, operation) {
//     console.log('clicking!')
//     var book = gBooks.find(book => book.id === bookId);
//     if (!book) return;
//     console.log('operation:', operation)
//     // if (!(book.rating > 0 && book.rating < 10)) return;
//     if (!(operation === 1 && book.rating < 10 || operation === -1 && book.rating > 0)) return;
//     console.log('here')
//     book.rating += operation;
//     _saveBooksToStorage();
// }