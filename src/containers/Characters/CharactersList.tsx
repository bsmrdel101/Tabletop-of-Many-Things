import { getCharactersByUser } from "@/services/5e/charactersService";
import { useEffect, useState } from "react";

export default function CharactersList() {
  const [characters, setCharacters] = useState<Character_5e[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCharactersByUser();
      setCharacters(res);
    };
    fetchData();
  }, []);


  return (
    <div className="characters-list">
      
    </div>
  );
}
