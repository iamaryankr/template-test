const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton= document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//showing a new quote 
function newQuote(){
    loading();
    //picking a random quote from our API
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author is anonymous
    if(!quote.author) authorText.textContent = 'Unknown';
    else authorText.textContent = quote.author;
    
    if(quote.text.length > 120) quoteText.classList.add('long-quote');
    else quoteText.classList.remove('long-quote');

    quoteText.textContent = quote.text;
    complete();
}


// get quotes from an API
async function getQuotes(){
    loading();
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    }
    catch(error){
    }
}

//tweet the quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}` ;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);


//on load
getQuotes();