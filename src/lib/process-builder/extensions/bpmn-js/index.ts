// @ts-ignore
import CustomRenderer from "./custom-renderer/CustomRenderer";
import CustomContextPad from "./custom-context-pad/CustomContextPad";

export default {
  __init__: ['customContextPad', "customRenderer"],
  customRenderer: ["type", CustomRenderer],
  customContextPad: ["type", CustomContextPad],
};
