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

  // Share map to everyone
  const handleSelectMap = async (map: Map) => {
    selectedMap = map;
    await setSelectedMap(map);
    emitServerEvent('SELECT_MAP', [map, roomRef]);
  };

  // Change map only for dm
  const handleViewMap = async (map: Map) => {
    selectedMap = map;
    await setSelectedMap(map);
    emitServerEvent('VIEW_MAP', [map]);
  };


  return (
    <div className="menu hidden" id="maps-menu">
      <button className="menu__btn menu__btn--close" onClick={() => toggleMenu('maps')}>X</button>
      <div className="menu__body">
        {maps.map((map) => {
          return (
            <div className="menu__body--container" key={map.id}>
              <button
                className="map-share-btn"
                onClick={() => handleSelectMap(map)}
              >
                <img src="/images/share-map.svg" alt="share map" />
              </button>
              <img
                src={map.image}
                alt={map.name}
                draggable={false}
                onClick={() => handleViewMap(map)}
              />
              <p>{map.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
