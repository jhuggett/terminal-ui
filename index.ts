import { BunShell, blue } from "@jhuggett/terminal";
import { TextComponent } from "./components/text/text";
import { within } from "@jhuggett/terminal/bounds/bounds";

const shell = new BunShell();

shell.enableMouseTracking();

try {
  const textComponentContainer = shell.rootElement.createChildElement(
    () => within(shell.rootElement),
    {}
  );
  textComponentContainer.renderer = ({ cursor }) => {
    cursor.properties.backgroundColor = blue();
    cursor.fill(" ");
  };
  textComponentContainer.render();

  const textComponent = new TextComponent(
    "Hello, World!",
    textComponentContainer
  );

  shell.render();
} catch (error) {
  console.error(error);
}

shell.disableMouseTracking();
