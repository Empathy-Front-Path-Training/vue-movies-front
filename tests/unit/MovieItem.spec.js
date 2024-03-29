import { createLocalVue, mount } from "@vue/test-utils";
import MovieItem from "@/components/MovieResults/components/MovieItem";
import { moviesMockData } from "./test.utils";

describe("Tests for the MovieItem component", () => {
  const localVue = createLocalVue();

  function mountMovieItem() {
    return mount(MovieItem, {
      localVue,
      propsData: {
        movie: moviesMockData[0],
      },
    });
  }
  const wrapper = mountMovieItem();
  it("Has received [moviesMockData[0]] as the movie property", () => {
    expect(wrapper.props().movie).toBe(moviesMockData[0]);
  });
  it("Should have the title of the movie passed through the props", () => {
    expect(wrapper.text()).toMatch(moviesMockData[0].Title);
  });
  it("Should emit the 'select-movie' event with the 'id' of its movie prop when clicked", async () => {
    await wrapper.trigger("click");
    expect(wrapper.emitted("select-movie")).toBeTruthy();
    expect(wrapper.emitted("select-movie")[0][0]).toEqual(
      wrapper.props().movie.imdbID
    );
  });
});
