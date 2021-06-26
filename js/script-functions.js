/* 
Show page function to hide all students initially, 
and display only students corresponding to page number.
*/
const showPage = (list, page) => {
    // Hide all students.
    hideAllStudents(studentList);
    /* 
    If the list is empty, clear any existing error message and show new message in place of empty list. 
    Else, remove error message.
    */
    if(list.length === 0) {
        clearErrorMessage();
        displayErrorMessage();  
    } else {
        clearErrorMessage();
    }
    
    // Only display items linked to page number. Eg page 1 displays list items index 0 through to 9.
    for(let i = (page*numPerPage - numPerPage); i <= (page* numPerPage - 1); i++){
        // Change only items that actually exist to be visible to avoid an error.
        if(list[i] !== undefined){
            list[i].style.display = '';
        }  
    }
}

// Function to create pagination links.
const appendPageLinks = (list) => {

    const paginationUl = document.createElement('ul');
    
    // Create appropriate number of pagination links based on list length and desired number to be displayed per page.
    for(let i = 1; i <= Math.ceil(list.length/numPerPage); i++){
        let paginationLi = document.createElement('li');
        let paginationLink = document.createElement('a');
        paginationLink.textContent = i;
        paginationLi.appendChild(paginationLink);
        paginationUl.appendChild(paginationLi);
    }
    paginationDiv.appendChild(paginationUl);
    mainPage.appendChild(paginationDiv);

    // If it exists, give first pagination link active class by default.
    if(document.querySelector('a')){
        document.querySelector('a').className = 'active';
    }

}

// Function to set all list items display property to 'none'
const hideAllStudents = (list) => {
    for(let i = 0; i < list.length; i++){
        list[i].style.display = 'none';
    }
}

// Function to dynamically create and append search bar.
const createSearchBar = () => {
    const searchDiv = document.createElement('div');
    searchDiv.className = 'student-search';

    const input = document.createElement('input');
    input.placeholder = 'Search for students...';

    searchDiv.appendChild(input);
    header.appendChild(searchDiv);
}

// Function to empty out pagination div.
const clearPaginationDiv = () => {
    while(paginationDiv.firstChild){
        paginationDiv.firstChild.remove();
    }
}

// Function to generate a list of filtered items matching the filter text (search bar value).
const generateFilteredList = (list) => {
    let newList = Array.from(list).filter(function(student){
    return student.children[0].textContent.includes(filter);
  });
  return newList;
}

// Function to display error message to use when search results in 0 students to display.
const displayErrorMessage = () => {
    const error = document.createElement('p');
    error.className = 'error-message';
    error.textContent = 'No results found...';
    mainPage.insertBefore(error, ul);
}

// Function to clear any error message already displayed.
const clearErrorMessage = () => {
    if (document.querySelector('.error-message')){
        document.querySelector('.error-message').remove();
    }
}
