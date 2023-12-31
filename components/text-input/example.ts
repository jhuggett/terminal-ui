import { BunShell, blue } from "@jhuggett/terminal";
import { within } from "@jhuggett/terminal/bounds/bounds";
import { TextInputComponent } from "./text-input";

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
    () => within(root, { height: 2 }),
    {}
  );

  const textComponent = new TextInputComponent({
    container,
    label: "Name > ",
    placeholder: "Enter your name",
    async validator(value) {
      if (value.length < 3) return "Name must be at least 3 characters";
      if (value.length > 10) return "Name must be at most 10 characters";
    },
    disallowedCharacters: ["a", "b", "c"],
  });

  textComponent.inputElement.focus();

  textComponent.onSubmit.subscribe((value) => {
    console.log(`\nSubmitted: ${value}`);
    stop = true;
    return "unsubscribe";
  });

  while (!stop) {
    shell.render();
    await shell.userInteraction();
  }

  textComponent.destroy();
} catch (error) {
  console.error(error);
}

shell.disableMouseTracking();
