interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void
}

class BaseComponent<T extends HTMLElement> implements Component {
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
    super(`<section class="image">
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

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class="video">
    <div class="video__holder">
        <iframe class="video__thumbnail"></iframe>
    </div>
    <p class="video__title"></p>
</section>`)

    const videoElement = this.element.querySelector(
      ".video__thumbnail"
    )! as HTMLIFrameElement;
    const embedLink = url.replace('watch?v=', 'embed/');
    videoElement.src = embedLink; // url -> videoID -> embed

    const titleElement = this.element.querySelector(
      ".video__title"
    )! as HTMLParagraphElement;
    titleElement.textContent = title;
  }
}

export class NoteComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, content: string) {
    super(`<section class="note">
    <div class="note__holder">
        <h1 class="note__title"></h1>
    </div>
    <p class="note__content"></p>
</section>`)

    const contentElement = this.element.querySelector(
      ".note__content"
    )! as HTMLParagraphElement;
    contentElement.textContent = content;

    const titleElement = this.element.querySelector(
      ".note__title"
    )! as HTMLParagraphElement;
    titleElement.textContent = title;
  }
}

export class TaskComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, task: string[]) {
    super(`<section class="task">
    <div class="task__holder">
        <h1 class="task__title"></h1>
        <ul class="task__list"></ul>
    </div>
    <p class="task__content"></p>
</section>`)

    const listElement = this.element.querySelector(
      ".task__list"
    )! as HTMLUListElement;

    let number = 0;
    task.forEach((task) => {
      const taskElement = document.createElement('input');
      taskElement.id = `task__input__${number}`;
      taskElement.type = 'checkbox'
      const taskTitleElement = document.createElement('label');
      taskTitleElement.id = `task__label__${number}`;
      taskTitleElement.innerHTML = task;
      listElement.appendChild(taskElement);
      listElement.appendChild(taskTitleElement);
    })

    const titleElement = this.element.querySelector(
      ".task__title"
    )! as HTMLParagraphElement;
    titleElement.textContent = title;
  }
}