console.log('Admin Service');

var gSortBy = 'NAME';



function getUsersForDisplay() {
  var users = loadFromStorage('usersDB');
  if (!users) return // create users
  sort(users)
  console.log('USERS AFTER SORT', users);
  return users
}

function sort(users) {
  if (gSortBy == 'NAME') {
    // sort by name
    sortByName(users)
  } else if (gSortBy == 'LAST_LOGIN') {
    // sort by lastLoginTime
  }
}

function sortByName(users) {
  users.sort(function (user1, user2) {
    return (user1.name > user2.name) ? 1 : -1;
  })
}

function setSort(sortBy) {
  gSortBy = sortBy;
}