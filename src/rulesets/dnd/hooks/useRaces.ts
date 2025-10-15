import { useQuery } from "@tanstack/react-query";
import { getAllRaces } from "../services/racesService";


export default function useRaces(gameId: number) {
  const { data: races = [], isFetching, refetch } = useQuery<Race_Dnd[]>({
    queryKey: ['races'],
    queryFn: async () => await getAllRaces(gameId)
  });

  const filter = () => {};
  const sort = () => {};

  return { races, filter, sort, isFetching, refetch };
}
