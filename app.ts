import { PageComponent, ImageComponent, VideoComponent, NoteComponent, TaskComponent } from "./main.js";

class App {
    private readonly page: PageComponent;
    constructor(appRoot: HTMLElement) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);

        const image = new ImageComponent('Image Title', 'https://fastly.picsum.photos/id/15/200/300.jpg?hmac=lozQletmrLG9PGBV1hTM1PnmvHxKEU0lAZWu8F2oL30');
        image.attachTo(appRoot, 'beforeend');

        const video = new VideoComponent('Video Title', 'https://www.youtube.com/watch?v=90IJanuV_0M');
        video.attachTo(appRoot, 'beforeend');

        const note = new NoteComponent('New Note', 'Hello I am a note and this is the first note i am making wowzers')
        note.attachTo(appRoot, 'beforeend');

        const task = new TaskComponent('Task', ['study', 'eat', 'game']);
        task.attachTo(appRoot, 'beforeend');
    }
}

new App(document.querySelector('.document')! as HTMLElement);