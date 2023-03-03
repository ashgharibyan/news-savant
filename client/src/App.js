import React, { useState, useEffect } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import wordsToNumbers from 'words-to-numbers';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

// import process from 'process'


const alanKey = process.env.REACT_APP_ALAN_KEY;


const App = () => {
    const [newsArticles, setNewsArticles] = useState([])
    const [activeArticle, setActiveArticle] = useState(-1)

    useEffect(() => {
        const alanBtnInstance = alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if (command === 'newArticles') {
                    console.log('Inside if')
                    console.log(articles);
                    setNewsArticles(articles)
                    setActiveArticle(-1)
                } else if (command === 'highlight') {
                    setActiveArticle((prevActiveArtivle) => prevActiveArtivle + 1);
                } else if (command === 'open') {
                    console.log(number, "=========")
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number
                    console.log(parsedNumber, "=========")

                    const article = articles[parsedNumber - 1]

                    if (parsedNumber > 20 || parsedNumber <= 0) {
                        console.log("inside >20-------------")
                        alanBtnInstance.playText('please try that again')
                    } else if (article) {
                        console.log("inside article-------------")
                        window.open(article.url, '_blank')
                        alanBtnInstance.playText('Opening')
                    } else {
                        alanBtnInstance.playText('please try that again')
                    }
                }
            }
        })
    }, [])

    return (

        <div>
            <Header></Header>
            <Main></Main>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    )
}

export default App;