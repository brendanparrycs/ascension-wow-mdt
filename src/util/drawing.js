function isOnLine(point, start, end, tolerance) {
  const min = Math.min(start, end) - tolerance;
  const max = Math.max(start, end) + tolerance;
  return point > min && point < max;
}

export function splitDrawingAtPoint(drawing, point, mapZoom) {
  if (!drawing.positions.length) return null;

  const tolerance = drawing.stroke / mapZoom / 4;
  let lineIndex = 0;
  let posIndex = 1;
  let found = false;

  for (; lineIndex < drawing.positions.length; ++lineIndex) {
    const line = drawing.positions[lineIndex];
    if (line.length <= 1) continue;

    for (posIndex = 1; posIndex < line.length; ++posIndex) {
      const prevPos = line[posIndex - 1];
      const curPos = line[posIndex];

      if (
        isOnLine(point[0], prevPos[0], curPos[0], tolerance) &&
        isOnLine(point[1], prevPos[1], curPos[1], tolerance)
      ) {
        found = true;
        break;
      }
    }

    if (found) break;
  }

  if (!found) return null;

  const line1 = drawing.positions[lineIndex].slice(0, posIndex - 1);
  const line2 = drawing.positions[lineIndex].slice(posIndex + 1);

  const newPositions = [...drawing.positions];

  newPositions.splice(lineIndex, 1);
  if (line2.length > 0) newPositions.splice(lineIndex, 0, line2);
  if (line1.length > 0) newPositions.splice(lineIndex, 0, line1);

  return { ...drawing, positions: newPositions };
}
