import React, { useEffect, useState, createContext } from "react";
import "./App.css";
import Modal from "./components/modalFilm/Modal";
import Movie from "./components/Movie";
import { ChakraProvider } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import styled from "@emotion/styled";
import CompilationOne from "./components/compilation/one/CompilationOne";

const FEATURED_API =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a78b30724e2d3355e6502402a04bf0e8";
const SEARCH_API =
    "https://api.themoviedb.org/3/search/movie?&api_key=a78b30724e2d3355e6502402a04bf0e8&query=";
// const FILM_ID = "https://api.themoviedb.org/3/movie/550988?api_key=a78b30724e2d3355e6502402a04bf0e8"

export const Store = createContext({});

function App() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalActive, setModalActive] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [title, setTitle] = useState("Популярное");

    useEffect(() => {
        getMovies(FEATURED_API);
    }, []);

    const getMovies = (API) => {
        fetch(API)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setMovies(
                    data.results.map((item) => {
                        return {
                            ...item,
                            like: false,
                        };
                    })
                );
            });
    };

    const getModalContent = (id) => {
        setModalContent([]);
        fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=a78b30724e2d3355e6502402a04bf0e8`
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setModalContent(data);
            });
    };

    const getLikedMovies = () => {
        setMovies([]);
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            console.log(key);
            fetch(
                `https://api.themoviedb.org/3/movie/${key}?api_key=a78b30724e2d3355e6502402a04bf0e8`
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log("like", data);
                    setMovies((prevstate) => {
                        const array = JSON.parse(JSON.stringify(prevstate));
                        array.push(data);
                        console.log(array);
                        return array;
                    });
                });
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (searchTerm) {
            getMovies(SEARCH_API + searchTerm);
            setSearchTerm("");
            setTitle("Результаты поиска");
        }
    };

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const onToggleLiked = (id) => {
        setMovies((prevstate) => {
            const current = prevstate.find((elem) => elem.id === id);
            const old = current;
            const newItem = { ...old, like: !old.like };
            if (newItem.like === true) {
                localStorage.setItem(newItem.id, newItem);
            } else if (newItem.like === false) {
                localStorage.removeItem(newItem.id);
            }
            const array = JSON.parse(JSON.stringify(prevstate));
            array.splice(
                array.findIndex((elem) => elem.id === id),
                1,
                { ...newItem }
            );
            return array;
        });
    };

    // const liked = movies.filter(item => item.like === true).length

    return (
        <ChakraProvider>
            <div className="app">
                <div>
                    <header>
                        <div>
                            <button
                                className="btn-header"
                                onClick={() => {
                                    getMovies(FEATURED_API);
                                    setTitle("Популярное");
                                }}
                            >
                                Популярное
                            </button>
                            <button
                                className="btn-header"
                                onClick={() => {
                                    getLikedMovies();
                                    setTitle("Понравившиеся");
                                }}
                            >
                                Понравившиеся
                            </button>
                        </div>
                        <form onSubmit={handleOnSubmit}>
                            <input
                                className="search"
                                type="text"
                                placeholder="Поиск..."
                                value={searchTerm}
                                onChange={handleOnChange}
                            />
                        </form>
                    </header>
                    <Title>{title}:</Title>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 50,
                            },
                        }}
                        className="mySwiper"
                    >
                        {movies.length > 0 &&
                            movies.map((movie) => (
                                <SwiperSlide>
                                    <Movie
                                        key={movie.id}
                                        {...movie}
                                        setActive={setModalActive}
                                        setContent={getModalContent}
                                        onToggleLiked={onToggleLiked}
                                    />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                    <CompilationOne
                        setActive={setModalActive}
                        setContent={getModalContent}
                        onToggleLiked={onToggleLiked}
                    />
                </div>
                <Modal
                    active={modalActive}
                    setActive={setModalActive}
                    {...modalContent}
                    onToggleLiked={onToggleLiked}
                />
            </div>
        </ChakraProvider>
    );
}

export default App;

const Title = styled.span`
    color: white;
    font-weight: 700;
    font-size: 30px;
    margin-left: 20px;
    margin-top: 50px;
`;
