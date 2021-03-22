import { createLocalVue, mount } from "@vue/test-utils";
import {
  getDataTestSelector,
  moviesDbMockData,
  moviesMockData
} from "./test.utils";
import MoviesDetails from "@/components/MovieDetails/MoviesDetails";
import Vue from "vue";

describe("Tests fot the MovieDetails component", () => {
  const localVue = createLocalVue();
  const movie1InfoMock = {
    id: moviesMockData[0].imdbID,
    image: moviesMockData[0].Poster
  };
  const movie2nfoMock = {
    id: moviesMockData[1].imdbID,
    image: moviesMockData[1].Poster
  };
  const movie1Mock = moviesDbMockData[0];
  const movie2Mock = moviesDbMockData[0];

  const mockSuccessResponse = moviesDbMockData[0];
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockSuccessResponse)
    })
  );
  function mountMovieDetails() {
    let wrapper = mount(MoviesDetails, {
      localVue,
      propsData: {
        movieInfo: movie1InfoMock
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
  const {
    wrapper,
    movieTitle,
    movieRating,
    movieYear,
    movieType
  } = mountMovieDetails();
  beforeEach(async () => {});
  it("The movie shown should be 'movie1Mock' from the database", async () => {
    await Vue.nextTick();
    expect(movieTitle.text()).toEqual(movie1Mock.title);
    expect(movieRating.text()).toEqual(movie1Mock.averageRating);
    expect(movieYear.text()).toEqual(movie1Mock.startYear);
    expect(movieType.text()).toEqual(movie1Mock.type);
  });
  it("Should update with the info of 'movie2Mock' when it is passed to the props", async () => {
    await wrapper.setProps(movie2nfoMock);
    await Vue.nextTick();
    //expect(wrapper.props().movieInfo).toEqual(movie2nfoMock);
    // expect(global.fetch).toHaveBeenCalledTimes(2);

    expect(wrapper.props().movieInfo).toEqual(movie2nfoMock);
    expect(movieTitle.text()).toEqual(movie2Mock.title);
    expect(movieRating.text()).toEqual(movie2Mock.averageRating);
    expect(movieYear.text()).toEqual(movie2Mock.startYear);
    expect(movieType.text()).toEqual(movie2Mock.type);
  });
});
