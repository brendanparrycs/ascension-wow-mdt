import { useCallback } from "react";
import Button from "../../../Common/Button";
import FillIcon from "../../../Common/Icons/FillIcon";
import { useAppDispatch } from "../../../../store/storeUtil";
import { rgbToHex } from "../../../../util/colors";
import { setDrawColor } from "../../../../store/reducers/mapReducer";

const colors = [
  [152, 0, 0],
  [255, 0, 0],
  [255, 153, 0],
  [255, 255, 0],
  [0, 255, 0],
  [0, 255, 255],
  [74, 134, 232],
  [0, 0, 255],
  [153, 0, 255],
  [255, 0, 255],
  [221, 126, 107],
  [234, 153, 153],
  [249, 203, 156],
  [255, 229, 153],
  [182, 215, 168],
  [162, 196, 201],
  [164, 194, 244],
  [159, 197, 232],
  [180, 167, 214],
  [213, 166, 189],
  [204, 65, 37],
  [224, 102, 102],
  [246, 178, 107],
  [255, 217, 102],
  [147, 196, 125],
  [118, 165, 175],
  [109, 158, 235],
  [111, 168, 220],
  [142, 124, 195],
  [194, 123, 160],
  [166, 28, 0],
  [204, 0, 0],
  [230, 145, 56],
  [241, 194, 50],
  [106, 168, 79],
  [69, 129, 142],
  [60, 120, 216],
  [61, 133, 198],
  [103, 78, 167],
  [166, 77, 121],
  [133, 32, 12],
  [153, 0, 0],
  [180, 95, 6],
  [191, 144, 0],
  [56, 118, 29],
  [19, 79, 92],
  [17, 85, 204],
  [11, 83, 148],
  [53, 28, 117],
  [116, 27, 71],
  [91, 15, 0],
  [102, 0, 0],
  [120, 63, 4],
  [127, 96, 0],
  [39, 78, 19],
  [12, 52, 61],
  [28, 69, 135],
  [7, 55, 99],
  [32, 18, 77],
  [76, 17, 48],
  [0, 0, 0],
  [67, 67, 67],
  [102, 102, 102],
  [153, 153, 153],
  [183, 183, 183],
  [204, 204, 204],
  [217, 217, 217],
  [239, 239, 239],
  [243, 243, 243],
  [255, 255, 255],
].map(([r, g, b]) => rgbToHex(r, g, b));

export default function ColorChooser({ openChooser, setOpenChooser }) {
  const dispatch = useAppDispatch();
  const isOpen = openChooser === "color";

  const onSelectColor = useCallback(
    (newColor) => {
      setOpenChooser(null);
      dispatch(setDrawColor(newColor));
    },
    [dispatch, setOpenChooser]
  );

  return (
    <div>
      <Button
        className={`font-bold w-12 h-12 p-2 ${
          isOpen ? "text-primary !bg-gold" : "hover:text-primary"
        }`}
        onClick={() => setOpenChooser(isOpen ? null : "color")}
      >
        <FillIcon className="w-full h-full" />
      </Button>
      {isOpen && (
        <div className="grid gap-0.5 grid-cols-10 bg-primary border-2 border-gold rounded-md p-2 fixed translate-y-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => onSelectColor(color)}
              className="rounded-sm w-5 h-5"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
