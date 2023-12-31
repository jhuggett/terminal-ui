import { BunShell, blue } from "@jhuggett/terminal";
import { within } from "@jhuggett/terminal/bounds/bounds";
import { SelectComponent } from "./select";

const shell = new BunShell();
shell.showCursor(false);
shell.clear();

const root = shell.rootElement;

shell.onWindowResize(() => {
  shell.invalidateCachedSize();
  shell.clear();
  root.recalculateBounds();
  shell.render();
});

shell.enableMouseTracking();

let stop = false;
root.on("Escape", () => {
  stop = true;
});

root.focus();

try {
  const container = root.createChildElement(
    () => within(root, { height: 20 }),
    {}
  );

  const select = new SelectComponent({
    container,
    label: "Select a color:",
    options: [
      { name: "AliceBlue", value: "#F0F8FF" },
      { name: "AntiqueWhite", value: "#FAEBD7" },
      { name: "Aqua", value: "#00FFFF" },
      { name: "Aquamarine", value: "#7FFFD4" },
      { name: "Azure", value: "#F0FFFF" },
      { name: "Beige", value: "#F5F5DC" },
      { name: "Bisque", value: "#FFE4C4" },
      { name: "Black", value: "#000000" },
      { name: "BlanchedAlmond", value: "#FFEBCD" },
      { name: "Blue", value: "#0000FF" },
      { name: "BlueViolet", value: "#8A2BE2" },
      { name: "Brown", value: "#A52A2A" },
      { name: "BurlyWood", value: "#DEB887" },
      { name: "CadetBlue", value: "#5F9EA0" },
      { name: "Chartreuse", value: "#7FFF00" },
      { name: "Chocolate", value: "#D2691E" },
      { name: "Coral", value: "#FF7F50" },
      { name: "CornflowerBlue", value: "#6495ED" },
      { name: "Cornsilk", value: "#FFF8DC" },
      { name: "Crimson", value: "#DC143C" },
      { name: "Cyan", value: "#00FFFF" },
      { name: "DarkBlue", value: "#00008B" },
      { name: "DarkCyan", value: "#008B8B" },
      { name: "DarkGoldenRod", value: "#B8860B" },
      { name: "DarkGray", value: "#A9A9A9" },
      { name: "DarkGreen", value: "#006400" },
      { name: "DarkKhaki", value: "#BDB76B" },
      { name: "DarkMagenta", value: "#8B008B" },
      { name: "DarkOliveGreen", value: "#556B2F" },
      { name: "DarkOrange", value: "#FF8C00" },
      { name: "DarkOrchid", value: "#9932CC" },
      { name: "DarkRed", value: "#8B0000" },
      { name: "DarkSalmon", value: "#E9967A" },
      { name: "DarkSeaGreen", value: "#8FBC8F" },
      { name: "DarkSlateBlue", value: "#483D8B" },
      { name: "DarkSlateGray", value: "#2F4F4F" },
      { name: "DarkTurquoise", value: "#00CED1" },
      { name: "DarkViolet", value: "#9400D3" },
      { name: "DeepPink", value: "#FF1493" },
      { name: "DeepSkyBlue", value: "#00BFFF" },
      { name: "DimGray", value: "#696969" },
      { name: "DodgerBlue", value: "#1E90FF" },
      { name: "FireBrick", value: "#B22222" },
      { name: "FloralWhite", value: "#FFFAF0" },
      { name: "ForestGreen", value: "#228B22" },
      { name: "Fuchsia", value: "#FF00FF" },
      { name: "Gainsboro", value: "#DCDCDC" },
      { name: "GhostWhite", value: "#F8F8FF" },
      { name: "Gold", value: "#FFD700" },
      { name: "GoldenRod", value: "#DAA520" },
      { name: "Gray", value: "#808080" },
      { name: "Green", value: "#008000" },
    ],
    textForOption: (option) => option.name,
  });

  select.element.focus();

  while (!stop) {
    shell.render();
    await shell.userInteraction();
  }
} catch (error) {
  console.error(error);
}

shell.disableMouseTracking();
shell.showCursor(true);
