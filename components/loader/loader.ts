import { white } from "@jhuggett/terminal";
import { within } from "@jhuggett/terminal/bounds/bounds";
import { Element } from "@jhuggett/terminal/elements/element";

export type Props = {
  text: string;
  container: Element<any>;
};

export class LoaderComponent {
  spinnerElement: Element<{
    frame: number;
  }>;
  textElement: Element<{ text: string }>;

  frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

  constructor(public props: Props) {
    const { container } = props;

    this.spinnerElement = container.createChildElement(
      () => within(container, { width: 1, height: 1 }),
      {
        frame: 0,
      }
    );

    this.textElement = container.createChildElement(
      () =>
        within(container, {
          height: 1,
          paddingLeft: 2,
        }),
      {
        text: props.text,
      }
    );

    this.textElement.renderer = ({ cursor, properties }) => {
      cursor.write(properties.text, {
        italic: true,
        foregroundColor: white(0.6),
      });
    };

    this.spinnerElement.renderer = ({ cursor, properties: { frame } }) => {
      cursor.write(this.frames[frame]);
    };

    this.spinnerElement.render();
    this.textElement.render();

    this.animate();
  }

  destroy() {
    this.spinnerElement.destroy();
    this.textElement.destroy();
    this.spinnerElement.clear();
    this.textElement.clear();

    this.stopAnimating = true;
  }

  updateText(text: string) {
    this.textElement.reactivelyUpdateProperties(() => ({ text }));
  }

  stopAnimating = false;

  async animate() {
    while (!this.stopAnimating) {
      this.spinnerElement.reactivelyUpdateProperties(({ frame }) => ({
        frame: (frame + 1) % this.frames.length,
      }));
      this.props.container.shell.render();
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
}
