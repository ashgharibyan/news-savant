// // Use this sample to create your own voice commands
// intent('hello world', p => {
//     p.play('(hello|hi there)');
// });

intent('What does this app do?', 'What can I do here?',
      reply('This is a news project'));

// intent('Start a command', (p) => {
//     p.play({ command: 'testCommand' });
// })

const API_KEY = 'YOUR KEY HERE';
let savedArticles = [];


// News by Source
intent('Give me the news from $(SOURCE* (.*))', (p) => {
    
    const src = p.SOURCE.toLowerCase().split(" ").join('-')

    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&sources=${src}`
    api.axios.get(NEWS_API_URL)
        .then((res) => {
            console.log(res.data);
            let {articles} = res.data;
            savedArticles = articles
            console.log(articles)
            p.play({command:'newArticles', articles})
            p.play(`Here are the (latest|recent) news from ${p.SOURCE}.`);

            p.play('Would you like me to read the headlines?');
            p.then(confirmation);
        
        })
        .catch((err) => {
        console.log(err);
        p.play('Sorry, please try searching for something else.')
    })
})


// News by Term
intent("What\'s up with $(TERM* (.*))", (p) => {

    let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}&q=${p.TERM}`
    console.log(NEWS_API_URL)
    api.axios.get(NEWS_API_URL)
        .then((res) => {
            console.log(res.data);
            let {articles} = res.data;
            savedArticles = articles
            console.log(articles)
            p.play({command:'newArticles', articles})
            p.play(`Here are the (latest|recent) articles on ${p.TERM}.`);

            p.play('Would you like me to read the headlines?');
            p.then(confirmation);

        
        })
        .catch((err) => {
        console.log(err);
        p.play('Sorry, please try searching for something else.')
    })
})

// News by Categories

const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}`;

intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT}|)`,
  `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}|) $(N news|headlines)`, (p) => {
    
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=${p.C}&apiKey=${API_KEY}`;
    
    console.log(NEWS_API_URL)
    api.axios.get(NEWS_API_URL)
        .then((res) => {
            console.log(res.data);
            let {articles} = res.data;
            savedArticles = articles
            console.log(articles)
            p.play({command:'newArticles', articles})
            if(p.C.value){
                p.play(`Here are the (latest|recent) articles on ${p.C}.`);
            } else {
                p.play(`Here is the (latest|recent) news.`);
            }
        
        p.play('Would you like me to read the headlines?');
        p.then(confirmation);

        })
        .catch((err) => {
        console.log(err);

        p.play('Sorry, please try searching for a different category.')
        
    })
})



// Reading the articles
const confirmation = context(() => {
    intent('yes', async (p) => {
        for(let i=0; i< savedArticles.length; i++){
            p.play({command:'highlight', article: savedArticles[i]});
            p.play(`${savedArticles[i].title}`);
        }
    })
    intent('no', (p) => {
        p.play('Sure, sounds good to me.')
    })
})

//Opening the article
intent('Open (the|) (article|news|) (number|) $(numOfArticle* (.*))', (p) => {
    
    if(p.numOfArticle.value){
        p.play({command:'open', number: p.numOfArticle.value, articles: savedArticles})
    }
    
})


//Go back button
intent('(Go|) back', (p) => {
    p.play('Sure, going back');
    p.play({command: 'newArticles', articles:[]});
})
