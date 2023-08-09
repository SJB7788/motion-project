export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void
  removeFrom(parent: HTMLElement): void
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

  removeFrom(parent: HTMLElement) {
    if (parent !== this.element.parentElement) {
      throw new Error('Parent mismatch!')
    }
    parent.removeChild(this.element);
  }
}

// Content Components

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

// page components

type OnCloseListener = () => void;

type SectionContainerConstructor = {
  new(): SectionContainer;
}

export interface Composable {
  addChild(child: Component): void;
}

interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
}

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
  private closeListener?: OnCloseListener;
  constructor() {
    super(`<li class="page-item">
          <section class="page-item__body"></section>
            <div class="page-item__controls">
              <button class="close">&times;</button>
            </div>
          </li>`);
    const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener()
    }
  }

  addChild(child: Component) {
    const container = this.element.querySelector('.page-item__body')! as HTMLElement;
    child.attachTo(container);
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;

  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>')
  }

  addChild(section: Component) {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    })
  }
}

// dialog
type OnSubmitListener = () => void;

export class InputDialog extends BaseComponent<HTMLElement> implements Composable {
  closeListener?: OnCloseListener;
  submitListener?: OnSubmitListener
  constructor() {
    super(`
    <section class="dialog">
      <div class="dialog__container">
        <button class="close">&times;</button>
        <div id="dialog__body">
            <button class="dialog__submit">ADD</button>
        </div>
      </div>
    </section>
    `)
    const closeBtn = this.element.querySelector('.close')! as HTMLElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener()
    }
    const submitBtn = this.element.querySelector('.dialog__submit')! as HTMLElement;
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener()
    }
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener
  }

  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener
  }

  addChild(child: Component) {
    const body = this.element.querySelector('#dialog__body')! as HTMLElement;
    child.attachTo(body);
  }
}

export class MediaInputDialog extends BaseComponent<HTMLElement> {
  constructor() {
    super(`<div>
      <div class="form__container">
        <label for="title">Title</label>
        <input type="text" id="title"/>
      </div>
      <div class="form__container">
        <label for="url">URL</label>
        <input type="text" id="url"/>
      </div>
    </div>
    `)
  }

  get title(): string {
    const element = this.element.querySelector('#title')! as HTMLInputElement;
    return element.value
  }

  get url(): string {
    const element = this.element.querySelector('#url')! as HTMLTextAreaElement;
    return element.value
  }
}

export class TextInputDialog extends BaseComponent<HTMLElement> {
  constructor() {
    super(`<div>
      <div class="form__container">
        <label for="title">Title</label>
        <input type="text" id="title"/>
      </div>
      <div class="form__container">
        <label for="body">Body</label>
        <textarea type="text" row="3" id="body"></textarea>
      </div>
    </div>
    `)
  }

  get title(): string {
    const element = this.element.querySelector('#title')! as HTMLInputElement;
    console.log(element.value);
    
    return element.value
  }

  get body(): string {
    const element = this.element.querySelector('#body')! as HTMLInputElement;    
    console.log(element.value);
    return element.value
  }
}