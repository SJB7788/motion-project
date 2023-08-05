import { PageComponent, ImageComponent } from "./main.js";

class App {
    private readonly page: PageComponent;
    constructor (appRoot: HTMLElement) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
    
        const image = new ImageComponent('Image Title', 'https://fastly.picsum.photos/id/15/200/300.jpg?hmac=lozQletmrLG9PGBV1hTM1PnmvHxKEU0lAZWu8F2oL30')
        image.attachTo(appRoot, 'beforeend');
    }
}

new App(document.querySelector('.document')! as HTMLElement);