import axios from "axios";

export const CharactersService = {
  async getAll() {
    const response = await axios.get("https://rickandmortyapi.com/api/character");
    return response.data.results;
  },
};
