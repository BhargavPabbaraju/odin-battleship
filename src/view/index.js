import "./styles.css";
import { icons, renderIcon } from "./icons";

function renderCell(id, content = "") {
  const cell = document.createElement("span");
  cell.setAttribute("id", id);
  cell.classList.add("grid-cell");
  cell.innerText = content;
  return cell;
}

function renderGrid(id, gridSize) {
  const div = document.createElement("div");
  const numberRow = document.createElement("div");
  numberRow.appendChild(renderCell());
  numberRow.classList.add("row");
  for (let i = 0; i < gridSize; i++) {
    numberRow.appendChild(renderCell(`${id}-row-${i}`, i));
  }
  div.appendChild(numberRow);

  for (let i = 0; i < gridSize; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    div.appendChild(row);
    row.appendChild(renderCell(`${id}-col-${i}`, i));
    for (let j = 0; j < gridSize; j++) {
      row.appendChild(renderCell(`${id}-${i}-${j}`));
    }
  }

  const grid = document.getElementById(id + "-grid");
  grid.replaceChildren();
  grid.appendChild(div);
}

function renderPlayerShips(playerBoard) {
  for (let i = 0; i < playerBoard.size; i++) {
    for (let j = 0; j < playerBoard.size; j++) {
      if (playerBoard.at(i, j) !== null) {
        console.log(i, j);
        const cell = document.getElementById(`player-${i}-${j}`);
        cell.appendChild(renderIcon(icons.SHIP));
      }
    }
  }
}

export function renderInitialContent(playerBoard) {
  renderGrid("player", playerBoard.size);
  renderGrid("computer", playerBoard.size);

  renderPlayerShips(playerBoard);
}
