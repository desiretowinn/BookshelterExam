"use strict"


let books = [];

// ------------------  MAIN FETCH SEARCH ------------------



function fetchRender() {
    fetch('https://www.googleapis.com/books/v1/volumes?q=a&maxResults=40')
    .then((res) => res.json())
    .then((data) => {
        books = data.items
        renderUi(books)
        $('.result-number').textContent = `Showing ${data.totalItems} Result(s)`
    })
}

fetchRender()


// ------------------  RENDER FUNCTION ------------------

function renderUi(arr) {
    let wrapper = $('.wrapper').innerHTML = ""
    
    arr.forEach((item) =>{
        let card = createElement(
            "div",
            "card",
            `
            <div class="img-box">
            <img src="${item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://picsum.photos/200/300'}" alt="" class="card-img">
            </div>
            <h3 class="card-title" title="${item.volumeInfo.title}">${item.volumeInfo.title.slice(0, 20)}...</h3>
            <p class="card-author" title="${item.volumeInfo.authors}">${item.volumeInfo.authors}</p>
            <p class="card-date">${item.volumeInfo.publishedDate}</p>
            <div class="card-box">
            <button class="bookmark-btn">bookmark</button>
            <button class="more-btn">More Info</button>
            </div>
            <button class="read-btn">
            <a href="${item.volumeInfo.previewLink}" target="blank" class="card-link">Read</a>
            </button>
            `
            )
            $('.wrapper').append(card)
        });
    }
    
    
    // ------------------ GLOBAL SEARCH ------------------
    
    function globalSearch() {
        
        let inputSearch = $('.input-search')
        
        inputSearch.addEventListener('keyup', function (evt) {
            let title = evt.target.value
            
            if (title.length >= 1) {
                fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
                .then((res) => res.json())
                .then((data) => {
                    books = data.items
                    renderUi(books)
                    $('.result-number').textContent = `Showing ${data.totalItems} Result(s)`
                })
            }else {
                fetchRender()
            }
        })
    }
    
    globalSearch()
    
    
    
    // ------------------ SORT BY NEWEST ------------------
    
    
    let elSelect = $('.select')
    
    elSelect.addEventListener('change', function(evt) {
        
        let selectValue = elSelect.value
        
        if (selectValue == 'newest') {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=flowers&orderBy=newest&key=AIzaSyAS1lDtWPLLnFUr3oEvdEqDL0OJyEGzmAM`)
            .then((res) => res.json())
            .then((data) => {
                books = data.items
                renderUi(books)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            fetchRender()
        }
        
    })
    
    
    
    // ------------------ LOGOUT ------------------
    
    
    const token = localStorage.getItem('token');
    
    const logoutBtn = $('#logout');
    if (!token) {
        window.location.href = './login.html';
    }
    
    if (token) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            
            logoutBtn.textContent = 'login';
            window.location.href = './login.html';
        });
    }
    
    
    
    
    // ------------------ DARK MODE ------------------
    

    function myFunction() {
        var element = document.body;
        element.classList.toggle("body-dark");
        $('.wrapper').classList.toggle("wrapper-dark")
    }

    myFunction()