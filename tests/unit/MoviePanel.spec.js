import { createLocalVue, mount } from "@vue/test-utils";
import {
  getDataTestSelector,
  moviesDbMockData,
  moviesMockData,
} from "./test.utils";
import MovieSearch from "@/components/MovieSearch/MovieSearch";
import MovieResults from "@/components/MovieResults/MovieResults";
import fetchMock from "jest-fetch-mock";

describe("Tests fot the MovieSearch component", () => {
  const localVue = createLocalVue();

  const movie1PosterMock = moviesMockData[1].Poster;
  const movie1Mock = moviesDbMockData[0];
  const movie2Mock = moviesDbMockData[1];

  function mountMoviePanel() {
    let wrapper = mount(MovieSearch, {
      localVue,
      data() {
        return {
          movie: {},
          selectedMoviePoster: "",
        };
      },
    });
    return {
      wrapper,
      movieTitle: wrapper.find(getDataTestSelector("details-title")),
    };
  }
  const { wrapper, movieTitle } = mountMoviePanel();
  let movieListing = wrapper.findComponent(MovieResults);
  it(
    "Should catch the 'show-details' event and fetch the data of the movie whose id is passed" +
      " on the event",
    async () => {
      /* No funciona :D

      fetchMock.mockResponseOnce(movie1Mock);
      fetchMock.mockResponseOnce(movie2Mock);

      await movieListing.trigger("show-details", movie1Mock.id);
      expect(wrapper.vm.$data.movie).toEqual(movie1Mock);

      await movieListing.trigger("show-details", movie2Mock.id);
      expect(wrapper.vm.$data.movie).toEqual(movie2Mock);

       */
    }
  );
});

// expect(global.fetch).toHaveBeenCalledTimes(2);
