"use strict"

// ------------------ SELECT FROM HTML ------------------

function $(selector) {
    return document.querySelector(selector);
}


// ------------------ CREATE ELEMENT ------------------

const createElement = (tagName, className, content) => {
    
    let newElement = document.createElement(tagName);
    
    
    if (className) {
        newElement.setAttribute('class', className);
        
    }
    
    if (content) {
        newElement.innerHTML = content;
        
    }
    
    
    return newElement;
}