import axios from "axios";
import { makeObservable, observable, action } from "mobx";
import { BASE_URL } from "./url";

class Book {
  state = {
    books: [],
    book: {},
    err: {},
    genres: [],
    genreBooks: [],
    bookmarks: [],
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
      createBook: action,
    });
  }

  getBooks = async () => {
    axios
      .get(`${BASE_URL}/books/allbooks`)
      .then((res) => (this.state = { ...this.state, books: res.data.data }))
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
      .get(`${BASE_URL}/books/filter/${genre}`)
      .then(
        (res) => (this.state = { ...this.state, genreBooks: res.data.data }),
      )
      .catch(
        (err) => (this.state = { ...this.state, err: err, genreBooks: [] }),
      );
  };

  getBookmarkBooks = async (id) => {
    axios
      .get(`${BASE_URL}/books/allbookmarked/${id}`)
      .then((res) => (this.state = { ...this.state, bookmarks: res.data.data }))
      .catch(
        (err) => (this.state = { ...this.state, err: err, genreBooks: [] }),
      );
  };

  createBook = async (formData) => {
    const updatedData = { ...formData, genre: [formData.genre] };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(`${BASE_URL}/custombook/writenew`, updatedData, config)
      .then(
        (res) =>
          (this.state = {
            ...this.state,
            books: [...this.state.books, res.data.data],
          }),
      )
      .catch((err) => (this.state = { ...this.state, err: err }));
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
      .then((res) => (this.state = { ...this.state, book: res.data }))
      .catch((err) => (this.state = { ...this.state, err: err }));
  };
}
export const BookStore = new Book();
