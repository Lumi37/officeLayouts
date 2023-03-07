export function highlightOffice(target, selectedShape) {
  if (selectedShape) selectedShape.classList.remove("highlighted");
  selectedShape = target;
  selectedShape.classList.add("highlighted");
  return selectedShape;
}
