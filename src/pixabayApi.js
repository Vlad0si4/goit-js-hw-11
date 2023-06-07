import axios from "axios"

export class PixabayAPI {
  static BASE_URL = "https://pixabay.com/api/";
  static API_KEY = "37048834-594b42b2db4c8472c20f59a64"

constructor() {
  this.page = null;
  this.query = null;
}

  fetchPhoto() {
    const searchParams = new URLSearchParams({
      key: PixabayAPI.API_KEY,
      q: this.query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: "true",
      page: this.page,
      per_page: 40
    });
    return axios.get(`${PixabayAPI.BASE_URL}?${searchParams}`);
    }
}

