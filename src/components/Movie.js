import React from 'react';
import { IconButton } from '@chakra-ui/button';
import { FaHeart } from 'react-icons/fa'

const IMAGE_API = "https://image.tmdb.org/t/p/w1280";
const IMAGE_ERROR = "https://media.istockphoto.com/photos/error-404-key-picture-id495376590?s=612x612"

const setVoteClass = (vote) => {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 6) {
        return 'orange'
    } else {
        return 'red';
    }
}

const Movie = ({ id, title, poster_path, overview, vote_average, release_date, like, setActive, setContent, onToggleLiked }) => (
    <div className='movie' onClick={() => { setContent(id); }}>
        <img
            src={poster_path ? (IMAGE_API + poster_path) : IMAGE_ERROR}
            alt={title}
            onClick={() => { setActive(true) }} />
        <IconButton
            size="sm"
            color={!(localStorage.getItem(id) === null) ? 'red' : 'white'}
            marginTop="-890px"
            marginLeft="265px"
            // marginRight="10px"
            borderRadius='30px'
            backgroundColor='rgb(225, 225, 225)'
            icon={<FaHeart />}
            onClick={() => onToggleLiked(id)} />
        <div className='movie-info' onClick={() => { setActive(true) }}>
            <h3>{title}</h3>
            <span className={`tag ${setVoteClass(vote_average)}`}>{vote_average}</span>
        </div>

        <div className='movie-over' onClick={() => { setActive(true) }}>
            <h2>Описание:</h2>
            <p>{overview}</p>
        </div>
    </div >
)

export default Movie;