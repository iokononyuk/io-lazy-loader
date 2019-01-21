class IOLazyLoader {
    public document: Document = document; 
    public window: Window = window;
    private config: IOLoaderConfig;
    constructor(config: IOLoaderConfig) {
        this.config = config;
        this.initIOLoader();
    }


    public initIOLoader(): void {
        if (this.config.afterInit) {
            this.config.afterInit();
        }
        setTimeout(() => {
            this.document.addEventListener('scroll', (event: UIEvent) => {
                let images = document.querySelectorAll(`[${this.config.attribute}]`);
                images.forEach((img: HTMLElement) => {
                    if ( img.getAttribute('loaded') == 'true' ) {
                        return false;
                    }
                    if (this.needLoadImage(this.config.loadingOffset, img.offsetTop)) {
                        img.setAttribute('loaded', 'true');
                        this.loadImage(img);
                    }
                });
            })
        }, 0);
    }


    private needLoadImage(loadingOffset: number | string, offsetTop: number): boolean {
        return -(this.window.pageYOffset - offsetTop) < loadingOffset;
    }

    private loadImage(image: HTMLElement): void {
        if ( this.config.beforeLoad ) {
            this.config.beforeLoad(image)
        }
        let src =image.getAttribute(this.config.attribute);
        image.setAttribute(this.config.setAttribute, src);
        if ( this.config.afterLoad ) {
            this.config.afterLoad(image)
        }
    }
}

interface IOLoaderConfig { 
    attribute: string;
    setAttribute: string;
    loadingOffset: number | string;
    afterInit?: Function;
    beforeLoad?: (image) => {};
    afterLoad?: (image) => {};
}