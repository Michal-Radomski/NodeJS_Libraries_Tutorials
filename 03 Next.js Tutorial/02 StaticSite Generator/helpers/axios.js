import axios from "axios";

const API_KEY = process.env.ACCESS_TOKEN;

const baseURL = `https://superheroapi.com/api/${API_KEY}/`;

export default axios.create({
  baseURL: baseURL,
});
