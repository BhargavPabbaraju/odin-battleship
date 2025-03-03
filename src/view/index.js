import "./styles.css";
import { icons, renderIcon } from "./icons";
import { CellState } from "../utils";

function renderCell(id, row = -1, col = -1, content = "") {
  const cell = document.createElement("span");
  cell.setAttribute("id", id);
  cell.classList.add("grid-cell");
  cell.innerText = content;
  if (id?.startsWith("computer") && row > -1 && col > -1) {
    cell.addEventListener("click", window.controller.clickCell);
  }
  return cell;
}

function renderGrid(id, gridSize) {
  const div = document.createElement("div");
  div.classList.add("blue-border");
  const numberRow = document.createElement("div");
  numberRow.appendChild(renderCell());
  numberRow.classList.add("row");
  for (let i = 0; i < gridSize; i++) {
    numberRow.appendChild(renderCell(`${id}-row-${i}`, -1, -1, i));
  }
  div.appendChild(numberRow);

  for (let i = 0; i < gridSize; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    div.appendChild(row);
    row.appendChild(renderCell(`${id}-col-${i}`, -1, -1, i));
    for (let j = 0; j < gridSize; j++) {
      row.appendChild(renderCell(`${id}-${i}-${j}`, i, j));
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
        const cell = document.getElementById(`player-${i}-${j}`);
        cell.appendChild(renderIcon(icons.SHIP));
        cell.style.color = "lightgrey";
      }
    }
  }
}

export function renderInitialContent(playerBoard) {
  renderGrid("player", playerBoard.size);
  renderGrid("computer", playerBoard.size);

  renderPlayerShips(playerBoard);
}

export function renderPlayedCell(row, col, opponent, cellState, positions) {
  const cell = document.getElementById(`${opponent}-${row}-${col}`);
  cell.replaceChildren();
  cell.style.color = opponent === "player" ? "red" : "blue";
  switch (cellState) {
    case CellState.HAS_SHIP:
      cell.appendChild(renderIcon(icons.SHIP));
      break;
    case CellState.WATER:
      const icon = renderIcon(icons.WATER);
      cell.appendChild(icon);
      icon.style.fontSize = "16px";
      break;
    case CellState.SHIP_SUNK:
      positions.forEach(([r, c]) => {
        const cell2 = document.getElementById(`${opponent}-${r}-${c}`);
        cell2.replaceChildren();
        cell2.appendChild(renderIcon(icons.SUNK));
        cell2.style.color = opponent === "player" ? "red" : "blue";
      });
      break;
  }
}

export function renderActiveShips(player, activeShips) {
  const div = document.getElementById(`${player}-ships`);
  div.replaceChildren();
  div.appendChild(renderIcon(icons.SHIP));
  const span = document.createElement("span");
  span.innerText = activeShips;
  div.appendChild(span);
}
