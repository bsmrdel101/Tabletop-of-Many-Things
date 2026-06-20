import { useQuery } from "@tanstack/react-query";
import { getClasses } from "../services/classesService";


export default function useClasses(gameId: string | null, worldId: string | null, userContent = false) {
  const { data: classes = [], isFetching, refetch } = useQuery<Class_5e[]>({
    queryKey: ['classes'],
    queryFn: async () => await getClasses({ gameId, worldId, userContent })
  });

  const filter = () => {};
  const sort = () => {};

  
  return { classes, filter, sort, isFetching, refetch };
}
