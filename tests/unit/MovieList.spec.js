import { createLocalVue, mount } from "@vue/test-utils";
import MovieResults from "@/components/MovieResults/MovieResults";
import MovieItem from "@/components/MovieResults/components/MovieItem";
import { moviesMockData } from "./test.utils";

describe("Tests for the MovieListing component", () => {
  const localVue = createLocalVue();
  function mountMovieListing() {
    return mount(MovieResults, {
      localVue,
      data() {
        return {
          movies: moviesMockData,
        };
      },
    });
  }
  const wrapper = mountMovieListing();
  it("Should have 2 MovieItem elements when passing a mock list with 2 movies", () => {
    let movieItems = wrapper.findAllComponents(MovieItem);
    expect(movieItems).toHaveLength(2);
  });
  it(
    "Should catch the 'select-movie' event and then emit the 'show-details' event, with the" +
      " same movieId object",
    () => {
      let movieItems = wrapper.findAllComponents(MovieItem);
      movieItems.wrappers[0].trigger("click");
      expect(wrapper.emitted("show-details")[0][0]).toEqual(
        wrapper.vm.$data.movies[0].imdbID
      );
    }
  );
});
