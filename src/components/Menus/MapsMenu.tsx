import { FormEvent, useEffect, useState } from "react";
import { getGame, setSelectedMap } from "../../scripts/controllers/dashboardController";
import { addMap, getMap, getMaps } from "../../scripts/controllers/mapsController";
import { toggleMenu } from "../../scripts/menuManager";
import { emitServerEvent } from "../../scripts/config/socket-io";
import { Game, Map } from "../../scripts/types";
import FormModal from "../Modals/FormModal";
import { useAppSelector } from "../../redux/hooks";
import { fetchGameData, setMap } from "../../redux/reducers/gameSlice";


export default function MapsMenu() {
  const { room, game, map } = useAppSelector(fetchGameData).game;
  const [maps, setMaps] = useState<Map[]>([]);
  const [newMapFormOpen, setNewMapFormOpen] = useState(false);
  const [isBlankMap, setIsBlankMap] = useState(false);
  const [mapName, setMapName] = useState('');
  const [mapImageInput, setMapImageInput] = useState<any>([]);


  useEffect(() => {
    const fetchData = async () => {
      setMaps(await getMaps(game.id));
    };
    fetchData();
  }, []);

  // Share map to everyone
  const handleSelectMap = (map: Map) => {
    emitServerEvent('SELECT_MAP', [map, room]);
  };

  // Change map only for dm
  const handleViewMap = (map: Map) => {
    emitServerEvent('VIEW_MAP', [map]);
  };

  const handleCreateNewMap = async (e: FormEvent) => {
    e.preventDefault();
    await addMap(
      {
        name: mapName,
        image: isBlankMap ? 'https://images.squarespace-cdn.com/content/v1/5511fc7ce4b0a3782aa9418b/1429139759127-KFHWAFFFVXJWZNWTITKK/learning-the-grid-method.jpg' : mapImageInput,
        isBlank: isBlankMap
      },
      game.id
    );
    closeFormModal();
  };

  const closeFormModal = () => setNewMapFormOpen(false);


  return (
    <>
      {newMapFormOpen &&
        <FormModal title="New Map" close={closeFormModal}>
          <form onSubmit={(e) => handleCreateNewMap(e)}>
            <label>
              Map Name
              <input placeholder="default map" onChange={(e) => setMapName(e.target.value)} required />
            </label>

            <label>
              Blank Map
              <input type="checkbox" onChange={() => setIsBlankMap(!isBlankMap)} />
            </label>

            {!isBlankMap &&
              <label>
                Map Image
                <input type="file" onChange={(e) => setMapImageInput(e.target.files[0])} required />
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