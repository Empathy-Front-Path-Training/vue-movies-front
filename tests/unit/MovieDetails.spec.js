import { createLocalVue, mount } from "@vue/test-utils";
import {
  getDataTestSelector,
  moviesDbMockData,
  moviesMockData
} from "./test.utils";
import MoviesDetails from "@/components/MovieDetails/MoviesDetails";

describe("Tests fot the MovieDetails component", () => {
  const localVue = createLocalVue();

  const movie1PosterMock = moviesMockData[1].Poster;
  const movie1Mock = moviesDbMockData[0];

  function mountMovieDetails() {
    let wrapper = mount(MoviesDetails, {
      localVue,
      propsData: {
        movie: movie1Mock,
        moviePoster: movie1PosterMock
      }
    });
    return {
      wrapper,
      movieTitle: wrapper.find(getDataTestSelector("details-title")),
      movieRating: wrapper.find(getDataTestSelector("details-rating")),
      movieYear: wrapper.find(getDataTestSelector("details-year")),
      movieType: wrapper.find(getDataTestSelector("details-type"))
    };
  }
  const { movieTitle, movieRating, movieYear, movieType } = mountMovieDetails();
  beforeEach(async () => {});
  it("The movie shown should be 'movie1Mock' from the database", async () => {
    expect(movieTitle.text()).toEqual(movie1Mock.title);
    expect(movieRating.text()).toEqual("Rating: " + movie1Mock.averageRating);
    expect(movieYear.text()).toEqual(
      "Year of release: " + movie1Mock.startYear
    );
    expect(movieType.text()).toEqual("Type: " + movie1Mock.type);
  });
});
