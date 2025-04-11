import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Suggestion } from "../types";

const ENDPOINT = "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete";

export const useSuggestions = () => {
  return useQuery<Suggestion[]>({
    queryKey: ["suggestions"],
    queryFn: async () => {
      const { data } = await axios.get(ENDPOINT);
      return data;
    },
  });
};
