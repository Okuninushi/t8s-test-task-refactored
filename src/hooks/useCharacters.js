import { useQuery } from "react-query";
import { CharactersService } from "../services/characters.service";

export const useCharacters = () => {
  return useQuery("characters", CharactersService.getAll);
};
