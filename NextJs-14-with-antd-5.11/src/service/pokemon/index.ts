import axios from "axios";
import { IResponsePokemon } from "./mode";

export const getPokemonData = async (
  query: string
): Promise<IResponsePokemon> => {
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
  const res = (await axios.get(apiUrl + query)).data;
  return res;
};
