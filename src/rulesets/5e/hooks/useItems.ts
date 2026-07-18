import { useQuery } from "@tanstack/react-query";
import { searchItems } from "../services/itemsService";


export default function useItems(gameId: string | null, worldId: string | null, userContent = false) {
  const { data: items = [], isFetching, refetch } = useQuery<Item_5e[]>({
    queryKey: ['items'],
    queryFn: async () => await searchItems({ gameId, worldId, userContent })
  });

  const filter = () => {};

  const sort = () => {};
  
  return { items, filter, sort, isFetching, refetch };
}
