import axios from "axios";
import { makeObservable, observable, action } from "mobx";
import { BASE_URL } from "./url";

class Book {
  state = {
    stories: [],
    books: [],
    book: {},
    err: {},
    genres: [],
    genreBooks: [],
    bookmarks: [],
    userBook: [],
    userStory: [],
    read: [],
    oldBooks: [],
  };

  constructor() {
    makeObservable(this, {
      state: observable,
      getBooks: action,
      getGenres: action,
      getGenreBooks: action,
      getBookmarkBooks: action,
      createBook: action,
      addChapter: action,
      proofRead: action,
      createBookMark: action,
      getStories: action,
      getUserBook: action,
      getUserStory: action,
      markRead: action,
      getRead: action,
      getOldBooks: action,
      getBookImg: action,
      getStoryImg: action,
    });
  }

  setBook = (book) => {
    this.state.book = book;
  };

  getBooks = async () => {
    axios
      .get(`${BASE_URL}/custombook/allcustombooks`)
      .then((res) => (this.state = { ...this.state, books: res.data.data }))
      .catch((err) => (this.state = { ...this.state, err: err }));
  };

  getOldBooks = async () => {
    axios
      .get(`${BASE_URL}/books/allbooks`)
      .then((res) => (this.state = { ...this.state, oldBooks: res.data.data }))
      .catch((err) => (this.state = { ...this.state, err: err }));
  };

  getStories = async () => {
    axios
      .get(`${BASE_URL}/custombook/allstories`)
      .then((res) => (this.state = { ...this.state, stories: res.data.data }))
      .catch((err) => (this.state = { ...this.state, err: err }));
  };

  getGenres = async () => {
    axios
      .get(`${BASE_URL}/books/allgenres`)
      .then((res) => (this.state = { ...this.state, genres: res.data.data }))
      .catch((err) => (this.state = { ...this.state, err: err }));
  };

  getGenreBooks = async (genre) => {
    axios
      .get(`${BASE_URL}/custombook/filter/${genre}`)
      .then((res) => {
        this.state = { ...this.state, genreBooks: res.data.data };
      })
      .catch(
        (err) => (this.state = { ...this.state, err: err, genreBooks: [] }),
      );
  };

  getBookmarkBooks = async (id) => {
    axios
      .get(`${BASE_URL}/custombook/allbookmark/${id}`)
      .then((res) => {
        console.log(res.data.data);
        this.state = { ...this.state, bookmarks: res.data.data };
      })
      .catch(
        (err) => (this.state = { ...this.state, err: err, genreBooks: [] }),
      );
  };

  createBook = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(`${BASE_URL}/custombook/writenew`, formData, config)
      .catch((err) => (this.state = { ...this.state, err: err }));
  };

  createBookMark = async (user_id, book_id) => {
    axios
      .get(`${BASE_URL}/custombook/bookmark/${user_id}/${book_id}`)
      .then((res) => (this.state.bookmarks = res.data.data.bookmark))
      .catch((err) => (this.state.err = err.response));
  };

  proofRead = async (formData, type) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(`${BASE_URL}/custombook/proofread${type}`, formData, config)
      .then((res) => (this.state = { ...this.state, book: res.data }))
      .catch((err) => (this.state = { ...this.state, err: err }));
  };

  addChapter = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(`${BASE_URL}/custombook/addChapter`, formData, config)
      .then(
        (res) =>
          (this.state.books = this.state.books.map((x) =>
            x.book_id === res.data.data.book_id ? res.data.data : x,
          )),
      )
      .catch((err) => (this.state = { ...this.state, err: err }));
  };

  getUserBook = async (id) => {
    axios
      .get(`${BASE_URL}/custombook/getUserBooks/${id}`)
      .then((res) => (this.state.userBook = res.data.data));
  };

  getUserStory = async (userId) => {
    axios
      .get(`${BASE_URL}/custombook/getUserStories/${userId}`)
      .then((res) => (this.state.userStory = res.data.data));
  };

  markRead = async (book_id, user_id) => {
    axios
      .get(`${BASE_URL}/custombook/read/${user_id}/${book_id}`)
      .then((res) => (this.state.read = res.data.data.read))
      .catch((err) => console.log(err));
  };

  getRead = async (user_id) => {
    axios
      .get(`${BASE_URL}/custombook/allread/${user_id}`)
      .then((res) => (this.state.read = res.data.data))
      .catch((err) => console.log(err));
  };

  getBookImg = async (book_id) => {
    const data = await axios.get(
      `${BASE_URL}/custombook/getBookImage/${book_id}`,
    );
    return data.data;
  };

  getStoryImg = async (story_id) => {
    const data = await axios.get(
      `${BASE_URL}/custombook/getStoryImage/${story_id}`,
    );
    return data.data;
  };
}
export const BookStore = new Book();
