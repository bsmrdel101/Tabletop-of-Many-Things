import React, { FormEvent, useEffect, useState } from "react";
import { getGame, setSelectedMap } from "../../../controllers/dashboardController";
import { addMap, getMap, getMaps } from "../../../controllers/mapsController";
import { toggleMenu } from "../../../scripts/menuManager";
import { emitServerEvent } from "../../../scripts/socket-io";
import { Game, Map } from "../../../scripts/types";
import { roomRef } from "../../../views/GamePage/GamePage";
import FormModal from "../../Modals/FormModal/FormModal";
import '../Menus.scss';
import './MapsMenu.scss';


export let selectedMap: Map;

export default function MapsMenu() {
  const [maps, setMaps] = useState<Map[]>([]);
  const [newMapFormOpen, setNewMapFormOpen] = useState(false);
  const [isBlankMap, setIsBlankMap] = useState(false);
  const [mapName, setMapName] = useState('');
  const [mapImageInput, setMapImageInput] = useState<any>([]);

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
  const handleViewMap = (map: Map) => {
    selectedMap = map;
    emitServerEvent('VIEW_MAP', [map]);
  };

  const handleCreateNewMap = (e: FormEvent) => {
    e.preventDefault();
    addMap({ name: mapName, image: mapImageInput });
  };


  return (
    <>
      {newMapFormOpen &&
        <FormModal>
          <form onSubmit={(e) => handleCreateNewMap(e)}>
            <label>
              Map Name
              <input placeholder="default map" onChange={(e) => setMapName(e.target.value)} />
            </label>

            <label>
              Blank Map
              <input type="checkbox" onChange={() => setIsBlankMap(!isBlankMap)} />
            </label>

            {!isBlankMap &&
              <label>
                Map Image
                <input type="file" onChange={(e) => setMapImageInput(e.target.files[0])} />
              </label>
            }

            <button type="submit">Submit</button>
          </form>
        </FormModal>
      }
      <div className="menu hidden" id="maps-menu">
        <button className="menu__btn menu__btn--close" onClick={() => toggleMenu('maps')}>X</button>
        <div className="menu__body">
          {/* New map button */}
          <div className="menu__body--container">
            <button
              className="new-map-btn"
              onClick={() => setNewMapFormOpen(!newMapFormOpen)}
            >
              New Map
            </button>
          </div>
          {/* Maps list */}
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
    </>
  );
}
