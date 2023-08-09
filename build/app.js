import { PageComponent, ImageComponent, VideoComponent, NoteComponent, TaskComponent, PageItemComponent, InputDialog, MediaInputDialog, TextInputDialog } from "./main.js";
class App {
    constructor(appRoot, dialogRoot) {
        this.dialogRoot = dialogRoot;
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);
        const imageBtn = document.querySelector('.button-image');
        imageBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const mediaSection = new MediaInputDialog();
            dialog.addChild(mediaSection);
            dialog.attachTo(dialogRoot);
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                const image = new ImageComponent(mediaSection.title, mediaSection.url);
                this.page.addChild(image);
                dialog.removeFrom(dialogRoot);
            });
            dialog.attachTo(dialogRoot);
        });
        const videoBtn = document.querySelector('.button-video');
        videoBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const mediaSection = new MediaInputDialog();
            dialog.addChild(mediaSection);
            dialog.attachTo(dialogRoot);
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                const video = new VideoComponent(mediaSection.title, mediaSection.url);
                this.page.addChild(video);
                dialog.removeFrom(dialogRoot);
            });
            dialog.attachTo(dialogRoot);
        });
        const noteBtn = document.querySelector('.button-note');
        noteBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const textSection = new TextInputDialog();
            dialog.addChild(textSection);
            dialog.attachTo(dialogRoot);
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                const text = new NoteComponent(textSection.title, textSection.body);
                this.page.addChild(text);
                dialog.removeFrom(dialogRoot);
            });
            dialog.attachTo(dialogRoot);
        });
        const taskBtn = document.querySelector('.button-task');
        taskBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const textSection = new TextInputDialog();
            dialog.addChild(textSection);
            dialog.attachTo(dialogRoot);
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                const taskArray = textSection.body.split(" ");
                const task = new TaskComponent(textSection.title, taskArray);
                console.log(textSection.body);
                this.page.addChild(task);
                dialog.removeFrom(dialogRoot);
            });
            dialog.attachTo(dialogRoot);
        });
    }
    bindElementToDialog(selector, InputComponent, makeSection) {
        const element = document.querySelector(selector);
        element.addEventListener('click', () => {
            const dialog = new InputDialog();
            const input = new InputComponent();
            dialog.addChild(input);
            dialog.attachTo(this.dialogRoot);
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(this.dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                const image = makeSection(input);
                this.page.addChild(image);
                dialog.removeFrom(this.dialogRoot);
            });
            dialog.attachTo(this.dialogRoot);
        });
    }
}
new App(document.querySelector('.document'), document.body);
