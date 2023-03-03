import React, {useState, useEffect, createRef} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dummyImage from '../../imgs/dummy-image-square.jpg'
import { CardActionArea } from '@mui/material';
import styles from './NewsCard.module.css'
import classNames from 'classnames';

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, i , activeArticle}) => {

    const [elRefs, setElRefs] = useState([])
    const scrollToRef  = (ref) => window.scroll(0, ref.current.offsetTop - 50);
    useEffect(() => {
        setElRefs((refs)=> Array(20).fill().map((i,j) => refs[j] || createRef()))
    }, [])

    useEffect(() => {
        if(i === activeArticle && elRefs[activeArticle]){
            scrollToRef(elRefs[activeArticle]);
        }
    },[i, activeArticle, elRefs])

    return (
        <Card ref = {elRefs[i]} className={classNames(styles.card, activeArticle === i? styles.activeCard: null) }>
            <CardActionArea href={url} target="_blank">
                <CardMedia
                    className={styles.image}
                    image={urlToImage || dummyImage}
                    title={title}
                />
                <div className={styles.topHeader}>
                    <Typography variant="body2" color="text.secondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant="body2" color="text.secondary" component="h2">{source.name}</Typography>
                </div>
                <Typography className={styles.title} gutterBottom variant="h5">{title}</Typography>

                <CardContent>
                    <Typography variant="body2" color="text.secondary" component='p'>{description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={styles.cardActions}>
                <Button size="small" onClick={() => {
                    window.open(url, '_blank', 'noreferrer')
                }}>Learn More</Button>
                <Typography variant='h5' color='text.secondary'>{i+1}</Typography>
            </CardActions>
        </Card>
    )
}

export default NewsCard