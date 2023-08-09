class BaseComponent {
    constructor(htmlString) {
        const template = document.createElement("template");
        template.innerHTML = htmlString;
        this.element = template.content.firstElementChild;
    }
    attachTo(parent, position = "afterbegin") {
        parent.insertAdjacentElement(position, this.element);
    }
    removeFrom(parent) {
        if (parent !== this.element.parentElement) {
            throw new Error('Parent mismatch!');
        }
        parent.removeChild(this.element);
    }
}
export class ImageComponent extends BaseComponent {
    constructor(title, url) {
        super(`<section class="image">
                <div class="image__holder">
                    <image class="image__thumbnail"></image>
                </div>
                <p class="image__title"></p>
            </section>`);
        const imageElement = this.element.querySelector(".image__thumbnail");
        imageElement.src = url;
        imageElement.alt = title;
        const titleElement = this.element.querySelector(".image__title");
        titleElement.textContent = title;
    }
}
export class VideoComponent extends BaseComponent {
    constructor(title, url) {
        super(`<section class="video">
    <div class="video__holder">
        <iframe class="video__thumbnail"></iframe>
    </div>
    <p class="video__title"></p>
</section>`);
        const videoElement = this.element.querySelector(".video__thumbnail");
        const embedLink = url.replace('watch?v=', 'embed/');
        videoElement.src = embedLink;
        const titleElement = this.element.querySelector(".video__title");
        titleElement.textContent = title;
    }
}
export class NoteComponent extends BaseComponent {
    constructor(title, content) {
        super(`<section class="note">
    <div class="note__holder">
        <h1 class="note__title"></h1>
    </div>
    <p class="note__content"></p>
</section>`);
        const contentElement = this.element.querySelector(".note__content");
        contentElement.textContent = content;
        const titleElement = this.element.querySelector(".note__title");
        titleElement.textContent = title;
    }
}
export class TaskComponent extends BaseComponent {
    constructor(title, task) {
        super(`<section class="task">
    <div class="task__holder">
        <h1 class="task__title"></h1>
        <ul class="task__list"></ul>
    </div>
    <p class="task__content"></p>
</section>`);
        const listElement = this.element.querySelector(".task__list");
        let number = 0;
        task.forEach((task) => {
            const taskElement = document.createElement('input');
            taskElement.id = `task__input__${number}`;
            taskElement.type = 'checkbox';
            const taskTitleElement = document.createElement('label');
            taskTitleElement.id = `task__label__${number}`;
            taskTitleElement.innerHTML = task;
            listElement.appendChild(taskElement);
            listElement.appendChild(taskTitleElement);
        });
        const titleElement = this.element.querySelector(".task__title");
        titleElement.textContent = title;
    }
}
export class PageItemComponent extends BaseComponent {
    constructor() {
        super(`<li class="page-item">
          <section class="page-item__body"></section>
            <div class="page-item__controls">
              <button class="close">&times;</button>
            </div>
          </li>`);
        const closeBtn = this.element.querySelector('.close');
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        };
    }
    addChild(child) {
        const container = this.element.querySelector('.page-item__body');
        child.attachTo(container);
    }
    setOnCloseListener(listener) {
        this.closeListener = listener;
    }
}
export class PageComponent extends BaseComponent {
    constructor(pageItemConstructor) {
        super('<ul class="page"></ul>');
        this.pageItemConstructor = pageItemConstructor;
    }
    addChild(section) {
        const item = new this.pageItemConstructor();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
        });
    }
}
export class InputDialog extends BaseComponent {
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
    `);
        const closeBtn = this.element.querySelector('.close');
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        };
        const submitBtn = this.element.querySelector('.dialog__submit');
        submitBtn.onclick = () => {
            this.submitListener && this.submitListener();
        };
    }
    setOnCloseListener(listener) {
        this.closeListener = listener;
    }
    setOnSubmitListener(listener) {
        this.submitListener = listener;
    }
    addChild(child) {
        const body = this.element.querySelector('#dialog__body');
        child.attachTo(body);
    }
}
export class MediaInputDialog extends BaseComponent {
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
    `);
    }
    get title() {
        const element = this.element.querySelector('#title');
        return element.value;
    }
    get url() {
        const element = this.element.querySelector('#url');
        return element.value;
    }
}
export class TextInputDialog extends BaseComponent {
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
    `);
    }
    get title() {
        const element = this.element.querySelector('#title');
        console.log(element.value);
        return element.value;
    }
    get body() {
        const element = this.element.querySelector('#body');
        console.log(element.value);
        return element.value;
    }
}
