import { PageComponent, ImageComponent, VideoComponent, NoteComponent, TaskComponent, Composable, Component, PageItemComponent, InputDialog, MediaInputDialog, TextInputDialog } from "./main.js";

type InputComponentConstructor<T = MediaInputDialog | TextInputDialog> = {
    new (): T;
}

class App {
    private readonly page: Component & Composable;
    constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);

        // const image = new ImageComponent('Image Title', 'https://fastly.picsum.photos/id/15/200/300.jpg?hmac=lozQletmrLG9PGBV1hTM1PnmvHxKEU0lAZWu8F2oL30');
        // this.page.addChild(image);

        // const video = new VideoComponent('Video Title', 'https://www.youtube.com/watch?v=90IJanuV_0M');
        // this.page.addChild(video);

        // const note = new NoteComponent('New Note', 'Hello I am a note and this is the first note i am making wowzers')
        // this.page.addChild(note);

        // const task = new TaskComponent('Task', ['study', 'eat', 'game']);
        // this.page.addChild(task);

        const imageBtn = document.querySelector('.button-image')! as HTMLButtonElement;
        imageBtn.addEventListener('click', () => {            
            const dialog = new InputDialog();
            const mediaSection = new MediaInputDialog();

            dialog.addChild(mediaSection);
            dialog.attachTo(dialogRoot);
            
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            })

            dialog.setOnSubmitListener(() => {
                const image = new ImageComponent(mediaSection.title, mediaSection.url);
                this.page.addChild(image);
                dialog.removeFrom(dialogRoot);
            })

            dialog.attachTo(dialogRoot);
        })

        const videoBtn = document.querySelector('.button-video')! as HTMLButtonElement;
        videoBtn.addEventListener('click', () => {            
            const dialog = new InputDialog();
            const mediaSection = new MediaInputDialog();
            
            dialog.addChild(mediaSection);
            dialog.attachTo(dialogRoot);
            
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            })

            dialog.setOnSubmitListener(() => {
                const video = new VideoComponent(mediaSection.title, mediaSection.url);
                this.page.addChild(video);
                dialog.removeFrom(dialogRoot);
            })

            dialog.attachTo(dialogRoot);
        })

        const noteBtn = document.querySelector('.button-note')! as HTMLButtonElement;
        noteBtn.addEventListener('click', () => {            
            const dialog = new InputDialog();
            const textSection = new TextInputDialog();
            
            dialog.addChild(textSection);
            dialog.attachTo(dialogRoot);
            
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            })

            dialog.setOnSubmitListener(() => {
                const text = new NoteComponent(textSection.title, textSection.body);
                this.page.addChild(text);
                dialog.removeFrom(dialogRoot);
            })

            dialog.attachTo(dialogRoot);
        })

        const taskBtn = document.querySelector('.button-task')! as HTMLButtonElement;
        taskBtn.addEventListener('click', () => {            
            const dialog = new InputDialog();
            const textSection = new TextInputDialog();
            
            dialog.addChild(textSection);
            dialog.attachTo(dialogRoot);
            
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            })

            dialog.setOnSubmitListener(() => {
                const taskArray = textSection.body.split(" ")
                const task = new TaskComponent(textSection.title, taskArray);
                console.log(textSection.body);
                
                this.page.addChild(task);
                dialog.removeFrom(dialogRoot);
            })

            dialog.attachTo(dialogRoot);
        })
    }

    private bindElementToDialog<T extends MediaInputDialog | TextInputDialog> 
        (selector: string, 
        InputComponent: InputComponentConstructor<T>, 
        makeSection: (input: T) => Component) {
        const element = document.querySelector(selector)! as HTMLButtonElement;
        element.addEventListener('click', () => {            
            const dialog = new InputDialog();
            const input = new InputComponent();

            dialog.addChild(input);
            dialog.attachTo(this.dialogRoot);
            
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(this.dialogRoot);
            })

            dialog.setOnSubmitListener(() => {
                const image = makeSection(input)
                this.page.addChild(image);
                dialog.removeFrom(this.dialogRoot);
            })

            dialog.attachTo(this.dialogRoot);
        })
    }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);