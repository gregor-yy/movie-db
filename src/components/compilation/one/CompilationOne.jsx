import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Movie from "../../Movie";

const LIST_API =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a78b30724e2d3355e6502402a04bf0e8&";

const genres = [
    {
        id: 28,
        name: "Action",
    },
    {
        id: 12,
        name: "Adventure",
    },
    {
        id: 16,
        name: "Animation",
    },
    {
        id: 35,
        name: "Comedy",
    },
    {
        id: 80,
        name: "Crime",
    },
    {
        id: 99,
        name: "Documentary",
    },
    {
        id: 18,
        name: "Drama",
    },
    {
        id: 10751,
        name: "Family",
    },
    {
        id: 14,
        name: "Fantasy",
    },
    {
        id: 36,
        name: "History",
    },
    {
        id: 27,
        name: "Horror",
    },
    {
        id: 10402,
        name: "Music",
    },
    {
        id: 9648,
        name: "Mystery",
    },
    {
        id: 10749,
        name: "Romance",
    },
    {
        id: 878,
        name: "Science Fiction",
    },
    {
        id: 10770,
        name: "TV Movie",
    },
    {
        id: 53,
        name: "Thriller",
    },
    {
        id: 10752,
        name: "War",
    },
    {
        id: 37,
        name: "Western",
    },
];

const CompilationOne = ({ setActive, setContent, onToggleLiked }) => {
    const [movies, setMovies] = useState([]);
    const [selectorGenre, setSelectorGenre] = useState(28);
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
    useEffect(() => {
        getMovies(LIST_API + "with_genres=" + selectorGenre);
    }, [selectorGenre]);
    return (
        <CompilationBody>
            <Tags>
                {genres.map((genre) => (
                    <Tag
                        onClick={() => setSelectorGenre(genre.id)}
                        mySelector={genre.id}
                        selector={selectorGenre}
                    >
                        {genre.name}
                    </Tag>
                ))}
            </Tags>
            <Movies>
                {movies.length > 0 &&
                    movies.map((movie) => (
                        <Movie
                            key={movie.id}
                            {...movie}
                            setActive={setActive}
                            setContent={setContent}
                            onToggleLiked={onToggleLiked}
                        />
                    ))}
            </Movies>
        </CompilationBody>
    );
};

export default CompilationOne;

const CompilationBody = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
`;

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Tag = styled.div`
    background-color: ${(props) =>
        props.selector === props.mySelector ? "orange" : "transparent"};
    transition: 300ms;
    color: ${(props) =>
        props.selector === props.mySelector ? "black" : "orange"};
    padding: 10px 20px;
    border: ${(props) =>
        props.selector === props.mySelector
            ? "2px solid white"
            : "2px solid orange"};
    border-radius: 30px;
    margin-bottom: 10px;
    font-weight: 700;
    &:not(:last-child) {
        margin-right: 15px;
    }
    &:hover {
        box-shadow: inset 0 0 0 30px orange;
        color: black;
    }
`;

const Movies = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
`;
