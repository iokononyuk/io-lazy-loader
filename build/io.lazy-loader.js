var IOLazyLoader = (function () {
    function IOLazyLoader(config) {
        this.document = document;
        this.window = window;
        this.config = config;
        this.initIOLoader();
    }
    IOLazyLoader.prototype.initIOLoader = function () {
        var _this = this;
        if (this.config.afterInit) {
            this.config.afterInit();
        }
        setTimeout(function () {
            _this.document.addEventListener('scroll', function (event) {
                var images = document.querySelectorAll("[" + _this.config.attribute + "]");
                images.forEach(function (img) {
                    if (img.getAttribute('loaded') == 'true') {
                        return false;
                    }
                    if (_this.needLoadImage(_this.config.loadingOffset, img.offsetTop)) {
                        img.setAttribute('loaded', 'true');
                        _this.loadImage(img);
                    }
                });
            });
        }, 0);
    };
    IOLazyLoader.prototype.needLoadImage = function (loadingOffset, offsetTop) {
        return -(this.window.pageYOffset - offsetTop) < loadingOffset;
    };
    IOLazyLoader.prototype.loadImage = function (image) {
        if (this.config.beforeLoad) {
            this.config.beforeLoad(image);
        }
        var src = image.getAttribute(this.config.attribute);
        image.setAttribute(this.config.setAttribute, src);
        if (this.config.afterLoad) {
            this.config.afterLoad(image);
        }
    };
    return IOLazyLoader;
}());
//# sourceMappingURL=io.lazy-loader.js.map