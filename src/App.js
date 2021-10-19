import React, { useEffect, useState, createContext } from 'react'
import './App.css';
import Modal from './components/modalFilm/Modal';
import Movie from './components/Movie'
import { ChakraProvider } from "@chakra-ui/react"


const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a78b30724e2d3355e6502402a04bf0e8"
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=a78b30724e2d3355e6502402a04bf0e8&query="
// const FILM_ID = "https://api.themoviedb.org/3/movie/550988?api_key=a78b30724e2d3355e6502402a04bf0e8"

export const Store = createContext({})

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalActive, setModalActive] = useState(false)
  const [modalContent, setModalContent] = useState('')

  useEffect(() => {
    getMovies(FEATURED_API)
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setMovies(data.results.map(item => {
          return {
            ...item,
            like: false
          }
        }))
      })
  }

  const getModalContent = (id) => {
    setModalContent([])
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=a78b30724e2d3355e6502402a04bf0e8`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setModalContent(data)
      })
  }

  const getLikedMovies = () => {
    setMovies([])
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      console.log(key);
      fetch(`https://api.themoviedb.org/3/movie/${key}?api_key=a78b30724e2d3355e6502402a04bf0e8`)
        .then((res) => res.json())
        .then((data) => {
          console.log('like', data)
          setMovies(prevstate => {
            const array = JSON.parse(JSON.stringify(prevstate))
            array.push(data)
            console.log(array)
            return array
          })
        })
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm)
      setSearchTerm('')
    }
  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const onToggleLiked = (id) => {
    setMovies(prevstate => {
      const current = prevstate.find(elem => elem.id === id)
      const old = current
      const newItem = { ...old, like: !old.like }
      if (newItem.like === true) {
        localStorage.setItem(newItem.id, newItem)
      } else if (newItem.like === false) {
        localStorage.removeItem(newItem.id)
      }
      const array = JSON.parse(JSON.stringify(prevstate))
      array.splice(array.findIndex(elem => elem.id === id), 1, { ...newItem })
      return array
    })

  }

  // const liked = movies.filter(item => item.like === true).length

  return (
    <ChakraProvider >
      <div className='app'>
        <div>
          <header>
            <div>
              <button className='btn-header' onClick={() => getMovies(FEATURED_API)}>Популярное</button>
              <button className='btn-header' onClick={() => getLikedMovies()}>Понравившиеся</button>
            </div>
            <form onSubmit={handleOnSubmit}>
              <input className='search' type="text" placeholder="Поиск..." value={searchTerm} onChange={handleOnChange} />
            </form>
          </header>
          <div className="movie-container">
            {movies.length > 0 && movies.map((movie) => (
              <Movie key={movie.id} {...movie} setActive={setModalActive} setContent={getModalContent} onToggleLiked={onToggleLiked} />
            ))}
          </div>
        </div>
        <Modal active={modalActive} setActive={setModalActive} {...modalContent} onToggleLiked={onToggleLiked} />
      </div>
    </ChakraProvider>
  )
}

export default App;
