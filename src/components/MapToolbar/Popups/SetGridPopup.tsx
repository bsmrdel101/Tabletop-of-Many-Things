import { updateMap } from "../../../scripts/controllers/5e/mapsController";
import Button from "../../Library/Button";
import Input from "../../Library/Input";
import { useAtom } from "jotai";
import { gameAtom } from "../../../scripts/atoms/state";
import { changeBgOffsetX, changeBgOffsetY, resetBgOffset } from "../../../scripts/canvas/bgCanvas";

interface Props {
  title: string
}


export default function SetGridPopup({ title }: Props) {
  const [gameData, setGameData] = useAtom(gameAtom);
  const { map, room } = gameData;

  const handleChangeGridOpacity = (e: any) => {
    setGameData({
      ...gameData,
      map: {
        ...map,
        gridOpacity: parseInt(e.target.value),
      }
    });
  };

  const handleChangeGridColor = (e: any) => {
    setGameData({
      ...gameData,
      map: {
        ...map,
        gridColor: e.target.value,
      }
    });
  };

  const handleChangeGridCellSize = (e: any) => {
    setGameData({
      ...gameData,
      map: {
        ...map,
        cellSize: parseInt(e.target.value),
      }
    });
  };

  const handleChangeOffsetX = (value: number) => {
    const val = map.offsetX - 1 === value ? -1 : 1;
    changeBgOffsetX(val);
    setGameData({
      ...gameData,
      map: {
        ...map,
        offsetX: value,
      }
    });
  };

  const handleChangeOffsetY = (value: number) => {
    const val = map.offsetY - 1 === value ? -1 : 1;
    changeBgOffsetY(val);
    setGameData({
      ...gameData,
      map: {
        ...map,
        offsetY: value,
      }
    });
  };

  const handleResetOffset = () => {
    resetBgOffset(map.offsetX, map.offsetY);
    setGameData({
      ...gameData,
      map: {
        ...map,
        offsetX: 0,
        offsetY: 0,
      }
    });
  };

  const handleApplyChanges = async (e: any) => {
    e.preventDefault();
    await updateMap(map);
  };


  return (
    <form onSubmit={(e) => handleApplyChanges(e)} className="set-grid-popup">
      <h3>{ title }</h3>
      <label>
        Map Image Position
        <div className="set-grid-popup__grid-btn-container">
          <Button className="set-grid-popup__grid-btn set-grid-popup__grid-btn--up-lg" type="button" onClick={() => handleChangeOffsetY(map.offsetY - 1)}>
            <img src="/images/icons/set-grid-arrow-up.svg" alt="Large arrow up" draggable={false} loading="lazy" />
          </Button>
          <Button className="set-grid-popup__grid-btn set-grid-popup__grid-btn--up" type="button" onClick={() => handleChangeOffsetY(map.offsetY + 1)}>
            <img src="/images/icons/set-grid-arrow-up.svg" alt="Arrow up" draggable={false} loading="lazy" />
          </Button>
          <Button className="set-grid-popup__grid-btn set-grid-popup__grid-btn--down-lg" type="button" onClick={() => handleChangeOffsetY(map.offsetY + 1)}>
            <img src="/images/icons/set-grid-arrow-up.svg" alt="Large arrow down" draggable={false} loading="lazy" />
          </Button>
          <Button className="set-grid-popup__grid-btn set-grid-popup__grid-btn--down" type="button" onClick={() => handleChangeOffsetY(map.offsetY + 1)}>
            <img src="/images/icons/set-grid-arrow-up.svg" alt="Arrow down" draggable={false} loading="lazy" />
          </Button>
          <Button className="set-grid-popup__grid-btn set-grid-popup__grid-btn--left-lg" type="button" onClick={() => handleChangeOffsetX(map.offsetX - 1)}>
            <img src="/images/icons/set-grid-arrow-right.svg" alt="Large arrow left" draggable={false} loading="lazy" />
          </Button>
          <Button className="set-grid-popup__grid-btn set-grid-popup__grid-btn--left" type="button" onClick={() => handleChangeOffsetY(map.offsetY + 1)}>
            <img src="/images/icons/set-grid-arrow-right.svg" alt="Arrow left" draggable={false} loading="lazy" />
          </Button>
          <Button className="set-grid-popup__grid-btn set-grid-popup__grid-btn--right-lg" type="button" onClick={() => handleChangeOffsetX(map.offsetX + 1)}>
            <img src="/images/icons/set-grid-arrow-right.svg" alt="Large arrow right" draggable={false} loading="lazy" />
          </Button>
          <Button className="set-grid-popup__grid-btn set-grid-popup__grid-btn--right" type="button" onClick={() => handleChangeOffsetY(map.offsetY + 1)}>
            <img src="/images/icons/set-grid-arrow-right.svg" alt="Arrow right" draggable={false} loading="lazy" />
          </Button>
        </div>

        <Button className="set-grid-popup__grid-reset-btn" type="button" onClick={() => handleResetOffset()}>Reset</Button>
      </label>

      <Input
        label="Grid Scale"
        variants={['x-small', 'label-stack']}
        type="number"
        value={map.cellSize}
        onChange={(e) => handleChangeGridCellSize(e)}
      />
      <Input
        type="range"
        variants={['range']}
        min={15}
        max={80}
        step={5}
        value={map.cellSize}
        onChange={(e) => handleChangeGridCellSize(e)}
      />
      
      <Input
        label="Color"
        type="color"
        value={map.gridColor}
        onChange={(e: any) => handleChangeGridColor(e)}
      />

      <Input
        label="Opacity"
        type="range"
        variants={['range', 'label-stack']}
        min={0}
        max={100}
        value={map.gridOpacity}
        onChange={(e: any) => handleChangeGridOpacity(e)}
      />

      <Button variants={['center']} type="submit">Apply</Button>
    </form>
  );
}
