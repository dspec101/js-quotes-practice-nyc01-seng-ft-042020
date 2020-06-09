document.addEventListener("DOMContentLoaded", () => {

    fetch(`http://localhost:3000/quotes?_embed=likes`)
        .then(response => response.json())
        .then(quotes => { renderQuotes(quotes) })


    function addQuote(quote) {
        const quoteList = document.getElementById("quote-list")
        const newQuote = document.createElement("li")
        newQuote.dataset.quoteId = quote.id

        let likesNum
        if(quote.likes === true) {
            likesNum = quote.likes.length
        }
        else {
            likesNum = 0
        }

        newQuote.innerHTML = `
        <blockquote class="blockquote">
            <p class="mb-0">${quote.quote} </p>
            <footer class="blockquote-footer">${quote.author}</footer>
            <br>
            <button class='btn-success'>Likes: <span>${likesNum}</span></button>
            <button class='btn-danger'>Delete</button>
        </blockquote>
        `
        quoteList.appendChild(newQuote)
    }


    function renderQuotes(quotes) {
        quotes.forEach(quote => {
            addQuote(quote)
        });
    }


    document.addEventListener("submit", function (event) {
        event.preventDefault()
        const form = event.target

        options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                quote: form.quote.value,
                author: form.author.value
            })
        }

        fetch(`http://localhost:3000/quotes?_embed=likes`, options)
            .then(response => response.json())
            .then(quote => addQuote(quote))

    })

    document.addEventListener("click", function (event) {
        if(event.target.className === "btn-danger") {

            const deleteQuote = event.target.parentNode.parentNode
            const quoteNum = deleteQuote.dataset.quoteId

        options = {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            }
        }
        fetch(`http://localhost:3000/quotes/${quoteNum}`, options)
            .then(response => response.json())
            .then(deleteQuote.remove())

        }

    })

    document.addEventListener("click", function (event) {
        if(event.target.className === "btn-success") {
            const likeBtn = event.target
            const likes = likeBtn.querySelector("span")


            const quoteLikes = event.target.parentNode.parentNode
            const quoteId = quoteLikes.dataset.quoteId
            // const likesTextArray = event.target.textContent.split(" ")
            // let parsedLikes = likesTextArray[1]
            // let addLikes = parseInt(parsedLikes)

            // addLikes ++

            // console.log(addLikes)


            options = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({
                    quoteId: parseInt(quoteId)
                })
            }

            fetch("http://localhost:3000/likes", options)
            .then(res => res.json())
            .then(json => {likes.innerHTML = likesParsed})

            let likesParsed = parseInt(likes.innerHTML, 10)

            likesParsed ++
        }
    })


})



// add likes to quote and json
