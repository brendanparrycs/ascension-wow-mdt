import { createLayerComponent } from "@react-leaflet/core";
import { Pather } from "../../Leaflet/Pather";

const PathLayerComponent = createLayerComponent(
  (props, context) => {
    const instance = new Pather({ ...props });
    return { instance, context: { ...context, overlayContainer: instance } };
  },
  (instance, props, prevProps) => {
    if (props.mode !== prevProps.mode) {
      instance.setMode(props.mode);
    }

    if (props.strokeColor && props.strokeColor !== prevProps.strokeColor) {
      instance.setStrokeColor(props.strokeColor);
    }

    instance.setOptions(props);
  }
);

export default PathLayerComponent;
