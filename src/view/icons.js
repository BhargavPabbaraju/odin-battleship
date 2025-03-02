export function renderIcon(name) {
  const span = document.createElement("span");
  span.innerText = name;
  span.classList.add("material-symbols-outlined");
  return span;
}

export const icons = {
  SHIP: "sailing",
  WATER: "water",
  SUNK: "destruction",
};
