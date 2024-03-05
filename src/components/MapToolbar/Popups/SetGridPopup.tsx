import { setMap } from "../../../scripts/controllers/mapsController";
import { emitServerEvent } from "../../../scripts/config/socket-io";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchGrid, setGrid } from "../../../redux/reducers/gridSlice";
import { fetchGameData } from "../../../redux/reducers/gameSlice";
import Button from "../../Library/Button";
import Input from "../../Library/Input";

interface Props {
  title: string
}


export default function SetGridPopup({ title }: Props) {
  const dispatch = useAppDispatch();
  const { room, map } = useAppSelector(fetchGameData).game;
  const gridState = useAppSelector(fetchGrid);

  const handleChangeGridCellSize = (e: any) => {
    dispatch(
      setGrid({
        cellSize: parseInt(e.target.value),
        gridColor: gridState.gridColor,
        gridOpacity: gridState.gridOpacity,
        offsetX: gridState.offsetX,
        offsetY: gridState.offsetY,
      })
    );
  };

  // Handle offsetX to the bgImage
  const handleChangeOffsetX = (value: number) => {
    dispatch(
      setGrid({
        cellSize: gridState.cellSize,
        gridColor: gridState.gridColor,
        gridOpacity: gridState.gridOpacity,
        offsetX: value,
        offsetY: gridState.offsetY,
      })
    );
  };

  // Handle offsetY to the bgImage
  const handleChangeOffsetY = (value: number) => {
    dispatch(
      setGrid({
        cellSize: gridState.cellSize,
        gridColor: gridState.gridColor,
        gridOpacity: gridState.gridOpacity,
        offsetX: gridState.offsetX,
        offsetY: value,
      })
    );
  };

  const handleResetOffset = () => {
    dispatch(
      setGrid({
        cellSize: gridState.cellSize,
        gridColor: gridState.gridColor,
        gridOpacity: gridState.gridOpacity,
        offsetX: 0,
        offsetY: 0,
      })
    );
  };

  const handleApplyChanges = async (e: any) => {
    e.preventDefault();
    setMap({ 
      id: map.id,
      game_id: map.game_id,
      name: map.name,
      filepath: map.filepath,
      image: map.image,
      cellSize: gridState.cellSize,
      gridColor: gridState.gridColor,
      gridOpacity: gridState.gridOpacity,
      offsetX: gridState.offsetX,
      offsetY: gridState.offsetY,
      boardState: map.boardState
    });
    emitServerEvent('SET_GRID', [room]);
  };


  return (
    <form onSubmit={(e) => handleApplyChanges(e)} className="set-grid-popup">
      <h3>{ title }</h3>
      <label>
        Map Image Position
        <div>
          <Button type="button" onClick={() => handleChangeOffsetY(gridState.offsetY - 1)}>Up</Button>
          <Button type="button" onClick={() => handleChangeOffsetY(gridState.offsetY + 1)}>Down</Button>
          <Button type="button" onClick={() => handleChangeOffsetX(gridState.offsetX - 1)}>Left</Button>
          <Button type="button" onClick={() => handleChangeOffsetX(gridState.offsetX + 1)}>Right</Button>
          <Button type="button" onClick={() => handleResetOffset()}>Reset</Button>
        </div>
      </label>

      <Input
        label="Grid Scale"
        variant={['x-small', 'label-stack']}
        type="number"
        value={gridState.cellSize}
        onChange={(e) => handleChangeGridCellSize(e)}
      />
      <Input
        type="range"
        variant={['range']}
        min={15}
        max={80}
        step={5}
        value={gridState.cellSize}
        onChange={(e) => handleChangeGridCellSize(e)}
      />
      
      <Input
        label="Color"
        type="color"
        value={gridState.gridColor}
        onChange={(e: any) => {
          dispatch(
            setGrid({
              cellSize: gridState.cellSize,
              gridColor: e.target.value,
              gridOpacity: gridState.gridOpacity,
              offsetX: gridState.offsetX,
              offsetY: gridState.offsetY,
            })
          );
        }}
      />

      <Input
        label="Opacity"
        type="range"
        variant={['range', 'label-stack']}
        min={0}
        max={100}
        value={gridState.gridOpacity}
        onChange={(e: any) => {
          dispatch(
            setGrid({
              cellSize: gridState.cellSize,
              gridColor: gridState.gridColor,
              gridOpacity: parseInt(e.target.value),
              offsetX: gridState.offsetX,
              offsetY: gridState.offsetY,
            })
          );
        }}
      />

      <Button variant={['center']} type="submit">Apply</Button>
    </form>
  );
}
