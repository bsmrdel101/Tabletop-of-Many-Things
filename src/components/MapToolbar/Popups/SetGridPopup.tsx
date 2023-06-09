import { setMap } from "../../../scripts/controllers/mapsController";
import { emitServerEvent } from "../../../scripts/config/socket-io";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchGrid, setGrid } from "../../../redux/reducers/gridSlice";
import { fetchGameData } from "../../../redux/reducers/gameSlice";


interface Props {
  title: string
}

export default function SetGridPopup({ title }: Props) {
  const dispatch = useAppDispatch();
  const { room, map } = useAppSelector(fetchGameData).game;
  const gridState = useAppSelector(fetchGrid);

  // Handle visual change for grid cell size
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

  // Apply grid size to the map
  const handleApplyChanges = async (e: any) => {
    e.preventDefault();
    setMap({ 
      id: map.id,
      game_id: map.game_id,
      name: map.name,
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
      <h3>{title}</h3>
      <label>
        Map Image Position
        <div>
          <button type="button" onClick={() => handleChangeOffsetY(gridState.offsetY - 1)}>Up</button>
          <button type="button" onClick={() => handleChangeOffsetY(gridState.offsetY + 1)}>Down</button>
          <button type="button" onClick={() => handleChangeOffsetX(gridState.offsetX - 1)}>Left</button>
          <button type="button" onClick={() => handleChangeOffsetX(gridState.offsetX + 1)}>Right</button>
          <button type="button" onClick={() => handleResetOffset()}>Reset</button>
        </div>
      </label>

      <label>
        Grid Scale
        <input
          className="input--sm"
          type="number"
          value={gridState.cellSize}
          onChange={(e) => handleChangeGridCellSize(e)}
        />
        <input
          type="range"
          min={15}
          max={80}
          step={5}
          value={gridState.cellSize}
          onChange={(e) => handleChangeGridCellSize(e)}
        />
      </label>
      
      <label>
        Color
        <input
          type="color"
          value={gridState.gridColor}
          onChange={(e) => {
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
      </label>

      <label>
        Opacity
        <input
          type="range"
          min={0}
          max={100}
          value={gridState.gridOpacity}
          onChange={(e) => {
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
      </label>

      <center>
        <button type="submit">Apply</button>
      </center>
    </form>
  );
}
