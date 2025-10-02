import { useQuery } from "@tanstack/react-query";
import { getAllClasses } from "../services/classesService";


export default function useClasses5e(gameId: number) {
  const { data: classes = [], isFetching, refetch } = useQuery<Class_5e[]>({
    queryKey: ['classes'],
    queryFn: async () => await getAllClasses(gameId)
  });

  const filter = () => {};
  const sort = () => {};

  return { classes, filter, sort, isFetching, refetch };
}
