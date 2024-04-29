// @ts-ignore
import CustomRenderer from "./custom-renderer/CustomRenderer";
import CustomContextPad from "./custom-context-pad/custom-context-pad.extension";
import CustomPalette from "./custom-palette/custom-palette.extension";

export default {
  __init__: ['customContextPad', 'customRenderer', 'paletteProvider'],
  customRenderer: ["type", CustomRenderer],
  customContextPad: ["type", CustomContextPad],
  paletteProvider: ["type", CustomPalette]
};
