/**
 * Creates a selector for a dataTest property.
 *
 * @param dataTest - The value of the 'data-test' property.
 * @returns The selector for the given dataTest.
 *
 * @internal
 */
export function getDataTestSelector(dataTest) {
  return `[data-test=${dataTest}]`;
}

export const moviesMockData = [
  {
    Title: "The Avengers",
    Year: "2012",
    imdbID: "tt0848228",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
  },
  {
    Title: "Avengers: Infinity War",
    Year: "2018",
    imdbID: "tt4154756",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg",
  },
];

export const moviesDbMockData = [
  {
    id: "tt0848228",
    title: "The Avengers",
    facetGenres: ["Action", "Adventure", "Sci-Fi"],
    type: "movie",
    averageRating: "8.0",
    votes: "1,263,208",
    startYear: 2015,
    endYear: 2019,
  },
  {
    id: "tt4154756",
    title: "Avengers: Infinity War",
    facetGenres: ["Action", "Adventure", "Sci-Fi"],
    type: "movie",
    averageRating: "8.4",
    votes: "839,788",
    startYear: 2015,
    endYear: 2019,
  },
];
