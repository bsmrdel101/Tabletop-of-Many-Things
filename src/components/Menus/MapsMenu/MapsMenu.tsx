import React, { useEffect, useState } from "react";
import { getGame, setSelectedMap } from "../../../controllers/dashboardController";
import { getMap, getMaps } from "../../../controllers/mapsController";
import { toggleMenu } from "../../../scripts/menuManager";
import { emitServerEvent } from "../../../scripts/socket-io";
import { Game, Map } from "../../../scripts/types";
import { roomRef } from "../../../views/GamePage/GamePage";
import '../Menus.scss';
import './MapsMenu.scss';


export let selectedMap: Map;

export default function MapsMenu() {
  const [maps, setMaps] = useState<Map[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const game: Game = await getGame(roomRef);
      setMaps(await getMaps(game.id));
      selectedMap = await getMap(game.map_id);
      emitServerEvent('SELECT_MAP', [selectedMap, roomRef]);
    };
    fetchData();
  }, []);

  const handleSelectMap = (map: Map) => {
    selectedMap = map;
    setSelectedMap(map);
    emitServerEvent('SELECT_MAP', [map, roomRef]);
  };


  return (
    <div className="menu hidden" id="maps-menu">
      <button className="menu__btn menu__btn--close" onClick={() => toggleMenu('maps')}>X</button>
      <div className="menu__body">
        {maps.map((map) => {
          return (
            <div className="menu__body--container" key={map.id}>
              <img
                src={map.image}
                alt={map.name}
                draggable={false}
                onClick={() => handleSelectMap(map)}
              />
              <p>{map.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
