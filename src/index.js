document.addEventListener("DOMContentLoaded", () => {

fetch(`http://localhost:3000/quotes?_embed=likes`)
.then(response => response.json())
.then(quotes => {renderQuotes(quotes)})

function addQuote(quote) {
    const quoteList = document.getElementById("quote-list")
    const newQuote = document.createElement("li")
    
    
    newQuote.innerHTML = 
    `
    <li class='quote-card'>
      <blockquote class="blockquote">
        <p class="mb-0">${quote.quote} </p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>0</span></button>
        <button class='btn-danger'>Delete</button>
      </blockquote>
    </li>
    `
    quoteList.appendChild(newQuote)
}


function renderQuotes(quotes) {
    quotes.forEach(quote => {
    addQuote(quote)
});
}


document.addEventListener("submit", function(event) { 
    event.preventDefault()
    const form = event.target


// fetch(`http://localhost:3000/quotes?_embed=likes`, options)
options = {
   method: "POST", 
   headers: {
   "content-type": "application/json",
   "accept": "application/json"
},
    body: JSON.stringify ({
        quote: form.quote.value,
        author: form.author.value
    })
}
    fetch(`http://localhost:3000/quotes?_embed=likes`, options)
    .then(response => response.json())
    .then(quote => addQuote(quote))

})

})


// find the submit button
// fetch post
// run the renderquotes funciton with the contents of the form
// 