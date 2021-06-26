/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//I chose to put all functions in a seperate script to maintain readabiliy

// Declare global variables
const numPerPage = 10;
const mainPage = document.querySelector('.page');
const header = document.querySelector('.page-header');
const ul = document.querySelector('.student-list');
const studentList = ul.children;
let filter = '';
const paginationDiv = document.createElement('div');
paginationDiv.className = 'pagination';

// Show first ten students by default and create pagination links, as well as add search bar.
showPage(studentList, 1); 
appendPageLinks(studentList);
createSearchBar();

// Input event listener on search bar for live filtering of students.
document.querySelector('input').addEventListener('input', (e) => {
    // Empty pagination div so newly created pagination links are not stacked on top of each other.
    clearPaginationDiv();
    // Update filter value to be used when generating a filtered list.
    filter = e.target.value;
    //Store the results of the generateFilteredList function in a variable.
    let filteredList = generateFilteredList(studentList);
    // Re-display students, passing the newly created filtered list as argument.
    showPage(filteredList, 1); 
    appendPageLinks(filteredList);
});

// Click event listener on pagination div.
document.querySelector('.pagination').addEventListener('click', (e) => {
    let activeLink = document.querySelector('.active');
    // Check if target was an anchor tag.
    if(e.target.tagName === 'A'){
        if(activeLink){
            activeLink.classList.remove('active');
        }
        e.target.className = 'active';
        // Show corresponding group of filtered students based on textContent of the clicked anchor tag.
        showPage(generateFilteredList(studentList), e.target.textContent);
    }
});