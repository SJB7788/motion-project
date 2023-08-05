interface Component {
    attachTo(parent: HTMLElement, position?: InsertPosition): void
}

class BaseComponent<T extends HTMLElement> implements Component{
  protected readonly element: T;
  constructor(htmlString: string) {
    const template = document.createElement("template");
    template.innerHTML = htmlString;
    this.element = template.content.firstElementChild! as T;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
    parent.insertAdjacentElement(position, this.element);
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement>{
  constructor() {
    super('<ul class="page">This is PageComponent!</ul>')
  }

}

export class ImageComponent extends BaseComponent<HTMLElement>{
  constructor(title: string, url: string) {
    super(`<section class="jmage">
                <div class="image__holder">
                    <image class="image__thumbnail"></image>
                </div>
                <p class="image__title"></p>
            </section>`);

    const imageElement = this.element.querySelector(
      ".image__thumbnail"
    )! as HTMLImageElement;
    imageElement.src = url;
    imageElement.alt = title;

    const titleElement = this.element.querySelector(
      ".image__title"
    )! as HTMLParagraphElement;
    titleElement.textContent = title;
  }
}
