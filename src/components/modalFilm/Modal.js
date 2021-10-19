import React, { useContext } from 'react';
import './Modal.css'
import MenuM from './messengersMenu'
import { Store } from '../../App'
import { IconButton } from "@chakra-ui/react"
import { FaHeart } from 'react-icons/fa'

const IMAGE_API = "https://image.tmdb.org/t/p/w1280";
// const IMAGE_ERROR = "https://media.istockphoto.com/photos/error-404-key-picture-id495376590?s=612x612"

const setVoteClass = (vote) => {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 6) {
        return 'orange'
    } else {
        return 'red';
    }
}

const Modal = ({ id, title, runtime, budget, revenue, backdrop_path, overview, vote_average, release_date, active, setActive, onToggleLiked }) => {
    const state = useContext(Store)

    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className='modal__content' style={{ backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3) ), url(' + (IMAGE_API + backdrop_path) + ')', backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={e => e.stopPropagation()}>
                <div className='modal__body'>
                    <div className='modal__overview'>
                        <div className='movie-title'>
                            <h2>
                                {title}
                            </h2>
                            <div>
                                <h3>Дата выхода:</h3>
                                {release_date}
                            </div>
                        </div>
                        <div>
                            <h3>Описание:</h3>
                            <div className='modal__text'>
                                {overview ? overview : 'Пусто'}
                            </div>
                        </div>
                        <div className='modal__vote'>
                            <h3>Оценка:</h3>
                            <span className={`tag ${setVoteClass(vote_average)}`}>{vote_average}</span>
                        </div>
                    </div>
                </div>
                <div className='modal__footer'>
                    <IconButton
                        size="lg"
                        color={!(localStorage.getItem(id) === null) ? 'red' : 'white'}
                        borderRadius='30px'
                        backgroundColor='rgb(225, 225, 225)'
                        icon={<FaHeart />}
                        onClick={() => onToggleLiked(id)}
                    />
                    <div className='runtime'>
                        <h3>Длительность:</h3>
                        <h4>{runtime} минут</h4>
                    </div>
                    <div>
                        <h3>Бюджет:</h3>
                        <h4>{budget}$</h4>
                    </div>
                    <div>
                        <h3>Сборы:</h3>
                        <h4>{revenue}$</h4>
                    </div>
                    <MenuM />
                </div>
            </div>
        </div >
    )
}

export default Modal;