import Layout from "@/components/Layout";
import { getGameById } from "@/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";


export default function VTT() {
  const { pubId } = useParams();

  const { data: game, isFetching } = useQuery<Game | null>({
    queryKey: ['game'],
    queryFn: () => getGameById(pubId!),
    enabled: !!pubId
  });

  
  if (!isFetching && !game) return <Layout><p>Failed to load game</p></Layout>;

  return (
    <Layout>
      { isFetching && <p>Loading...</p> }

      <div className="vtt">
        
      </div>
    </Layout>
  );
}
