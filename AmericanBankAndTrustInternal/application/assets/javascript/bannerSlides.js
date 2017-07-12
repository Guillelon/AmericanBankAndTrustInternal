/**
 * jsBanner library v1.0
 *
 * Includes jQuery
 * http://jquery.com/
 *
 * Original Author: Patrick Welborn
 *
 * Co-author: Pedro Canterini (changes, cleanup and documentation)
 * Date: Sep 4 2012
 *
 * COPYRIGHT Â© 2012 BANCVUE, LTD ALL RIGHTS RESERVED
 * https://www.bancvue.com/
 */


var banner; //banner variable with global scope

/**
 * Banner setup is called from global.js
 * Don't forget to call this or you will just
 * get the static content of the first slide
 */
function setupBanner() {

    // easing functions
    $f.extend($f.easing, {
        easingIn: function (x, t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        }
    });
    $f.extend($f.easing, {
        easingOut: function (x, t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        }
    });

    $f('#bannerPreloader').removeClass('hide');

    /**
     * @constructor
     * @type {Banner}
     */
    banner = new Banner({
        banner: '#banner', // String identifying banner id
        bannerPreloader: '#bannerPreloader', // String identifying banner preloader id
        bannerNavigation: '#bannerNavigation .button', // String identifying banner navigation buttons
        bannerPlayback: '#bannerPlayback .button', // String identifying banner playback buttons
        bannerSlides: '#bannerSlides > .slide, #bannerSlides > .dotContentlet', // String identifying banner slides
        loadAllSlides: false, // preloads all images
        lazyLoadNextSlide: true,
        duration: 8000, // Integer defining duration of slide playback in milliseconds
        autoPlay: true, // Boolean indicating whether slide show should auto play
        shuffle: false, // Shuffle slides and nav
        navEvents: false // Runs buttonMouseOver and buttonMouseDown (on the bannerNavigation buttons) on slidechange automatically
    });

    banner.initialize(); //INIT
}

/**
 * BannerSlides controls all events related to slides and navigation
 */
function BannerSlides() {

    var body = $f('body');
    var slides = $f('#bannerSlides > .slide, #bannerSlides > .dotContentlet');


    var bannerNavigation = $f('#bannerPlayback');
    var browser = $f.browser;
    var isIE8 = (browser.msie && browser.version <= "8.0");
    var self = this;

    //banner vars
    var prevSlide;
    var currentSlideIndex;
    var direction = 1;


    /**
     * Initializes the banner
     * Executes before the image preloader starts
     */
    this.initialize = function () {

        // Add js class to the body on older FirstBranches
        if (!body.hasClass('js')) {
            body.addClass('js');
        }

        // $f(window).resize(function() {
        //   self.onResizeWindow();
        // });

        // banner clickable container
        // $f('#banner .clickable').click(function(){
        //   window.location=$f(this).find("a").attr("href");
        // });

        bannerNavigation.removeClass('hide'); // show nav
        slides.fadeOut(0); // hides content while assets are loading
    };

    // this.onResizeWindow = function() {

    //   var currentSlide = slides.eq(currentSlideIndex);
    //   var slideW = $f('#bannerSlides').width();

    //   slides.each(function(index, el) {
    //     $f(this).css('left', slideW);
    //   });

    //   currentSlide.css({'left': 0});

    // }

    /**
     * imagesReady is called when all images for a certain slide
     * are done loadind. There is no need to ap pend them
     * since background-image is set to the html target
     */
    this.imagesReady = function (images) {
        // console.log('bannerSlides - ', 'images for this slide ready');
        // If you need to target this slide use:
        // console.log($f('#bannerSlides .slide').eq(images.slideID));

        // grabs all image tags in this slide (not background images);
        var currentSlide = slides.eq(images.slideID);
        var slideImages = currentSlide.find('img');
        // slideImages.retinafy();

        // $f('.slideContent').show(); // brings content back after assets are loaded.

    };

    // All slides and images loaded
    this.slidesReady = function () {
        // console.log('all slides loaded.');
        // retinafy all image tags in the banner
        // slides.find('img').retinafy();
    };

    /**
     * Triggered when the user rolls over a navigation button
     * @param {Array} data Use data.buttonContainer to target the container
     * and data.buttonIndex to target the button index
     */
    this.mouseOver = function (data) {
        //console.log($f(data.buttonContainer).eq(data.buttonIndex));
    };

    /**
     * Triggered when the user rolls out of a navigation button
     * @param {Array} data Use data.buttonContainer to target the container
     * and data.buttonIndex to target the button index
     */
    this.mouseOut = function (data) {
        //console.log($f(data.buttonContainer).eq(data.buttonIndex));
    };

    /**
     * Triggered when the user clicks a navigation button
     * @param {Array} data Use data.buttonContainer to target the container
     * and data.buttonIndex to target the button index
     */
    this.mouseDown = function (data) {
        //console.log($f(data.buttonContainer).eq(data.buttonIndex));
        //console.log('mouseDown'+data.buttonIndex);
        data.buttonIndex == 0 ? direction = -1 : direction = 1;
    };

    /**
     * Triggered when a new slide is set and runs before slideExit
     * @param {int} index current slide index
     */
    this.slideEnter = function (index) {
        // console.log('slideEnter');

        currentSlideIndex = index;
        var currentSlide = slides.eq(index);

        $f('#bannerNavigation .button').eq(index).addClass('active');

        //slides.removeClass('hide');

        slides.fadeOut();
        currentSlide.fadeIn();

        // slide animation
        if (prevSlide) {
            prevSlide.fadeOut();
            currentSlide.fadeIn();
        }
        else {
            // runs only when the first slide runs for the first time
            currentSlide.removeClass('hide').fadeIn(500);
        }


        // var slideW = $f('#bannerSlides').width();

        // // slide animation
        // if (prevSlide){
        //   $f('.slideContent').fadeOut(200);
        //   currentSlide.css({'left': slideW*direction});
        //   //$f('.slideContent').fadeOut();
        //   prevSlide.css('left', 0).stop().animate({'left': -1 * slideW*direction}, 1000, function() {
        //     $f(this).find('.slideContent').fadeOut();
        //   });
        //   currentSlide.stop().animate({'left': 0}, 1000, function() {
        //     $f('.slideContent').fadeIn();
        //   }).find('.slideContent').fadeOut();
        // }
        // else{
        //   // runs only when the first slide runs for the first time
        //   $f('.slideContent').fadeOut(0);
        //   currentSlide.css({left: 0}).removeClass('hide').fadeIn(500).find('.slideContent').fadeIn();
        // }

        prevSlide = currentSlide;
        // resets direction
        direction = 1;

    };

    /**
     * Triggered when a new slide is set and runs after slideEnter
     * @param {int} index current slide index
     */
    this.slideExit = function (index) {
        $f('#bannerNavigation .button').eq(index).removeClass('active');
        // slides.eq(index).addClass('hide'); // hides the other slides
    };
}