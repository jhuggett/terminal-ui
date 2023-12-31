import { within } from "@jhuggett/terminal/bounds/bounds";
import { Element } from "@jhuggett/terminal/elements/element";

export class TextComponent {
  element: Element<{ text: string }>;

  constructor(public text: string, public container: Element<any>) {
    this.element = container.createChildElement(() => within(container), {
      text,
    });

    this.element.renderer = ({ cursor, properties }) => {
      cursor.write(properties.text);
    };

    this.element.render();
  }
}
