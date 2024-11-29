import { FormEvent, useEffect, useState } from "react";
import { addMap, getMaps } from "../../scripts/controllers/5e/mapsController";
import { emitServerEvent } from "../../scripts/config/socket-io";
import FormModal from "../Modals/FormModal";
import Menu from "../Menu";
import Folder from "../Folder";
import { useAtom } from "jotai";
import { gameAtom } from "../../scripts/atoms/state";


export default function MapsMenu() {
  const [gameData] = useAtom(gameAtom);
  const { game, room } = gameData;
  const [maps, setMaps] = useState<Board[]>([]);
  const [newMapFormOpen, setNewMapFormOpen] = useState(false);
  const [isBlankMap, setIsBlankMap] = useState(false);
  const [mapName, setMapName] = useState('');
  const [mapImageInput, setMapImageInput] = useState<any>([]);
  const [location, setLocation] = useState('maps');

  const handleLocationClick = (loc: string) => {
    const locationParts = location.split('/');
    const locIndex = locationParts.indexOf(loc);
  
    if (locIndex !== -1) {
      // If the clicked location is part of the current location, navigate back to it
      const newLocation = locationParts.slice(0, locIndex + 1).join('/');
      setLocation(newLocation);
    } else {
      // If the clicked location is not part of the current location, append it
      const newLocation = `${location}/${loc}`;
      setLocation(newLocation);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setMaps(await getMaps(game.id));
    };
    fetchData();
  }, []);

  const handleSelectMap = (map: Board) => {
    emitServerEvent('SELECT_MAP', [map, room]);
  };

  const handleViewMap = (map: Board) => {
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
      <Menu name="maps" location={location} onLocationClick={handleLocationClick}>
        <div className="menu__body--container">
          <button
            className="new-map-btn"
            onClick={() => setNewMapFormOpen(!newMapFormOpen)}
          >
            New Map
          </button>
        </div>

        {/* Folders */}
        {
          Object.keys(
            maps
              .filter(map => {
                const parentFolder = map.filepath.split('/').slice(0, -1).join('/');
                return parentFolder === location;
              })
              .reduce((unique: { [key: string]: any }, map) => {
                const folderName = map.filepath.split('/').pop();
                if (!unique[folderName]) {
                  unique[folderName] = map;
                }
                return unique;
              }, {})
          )
            .map((folderName, i) => {
              return (
                <Folder key={i} name={folderName} onClick={handleLocationClick}></Folder>
              );
            })
        }

        {/* Maps list */}
        {maps.filter(map => map.filepath === location).map((map) => {
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
      </Menu>
    </>
  );
}
