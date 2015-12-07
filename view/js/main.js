//equalizet plugin
jQuery.fn.equalize = function equalize(options)
{
    var jElements = options.jElements;
    var settings = jQuery.extend(
    {
        recalculate: true
    }, options);

    var equalizeCells = function equalizeCells()
    {
        var maxHeight = 0;

        if (!jElements.length)
        {
            console.error("jElements are empty: ", jElements);
            return false;
        }
        else
        {
            jElements.attr("style", "");

            for (var i = 0; i < jElements.length; i++)
            {
                var jElement = jQuery(jElements[i]);
                var currentHeight = jElement.height();

                if (maxHeight < currentHeight)
                {
                    maxHeight = currentHeight;
                }
            }
            jElements.height(maxHeight + "px");
        }
    };

    var initView = function initView()
    {
        if (window.innerWidth < 481)
        {
            return;
        }

        equalizeCells();

        if (settings.recalculate)
        {
            recalculateOnResize();
        }
    };

    var recalculateOnResize = function recalculateOnResize()
    {
        var jWindow = jQuery(window);
        var lastWindowWidth = window.innerWidth;

        jWindow.on('resize', function ()
        {
            var windowWidth = window.innerWidth;

            if (windowWidth !== lastWindowWidth)
            {
                lastWindowWidth = windowWidth;
                equalizeCells();
            }
        });
    };

    initView();
};

jQuery(document).ready(function ()
{
    var jAboutAccordionTriggerCollection = jQuery(".about-person");
    var jAccordionTriggerCollection = jQuery(".read-more");
    var jHeader = jQuery("#header");
    var jNavigationBar = jQuery("#navigation");
    var navigationBarHeight = jNavigationBar.height();
    var navigationBarOffsetTop = jNavigationBar.offset().top;
    var scrollTop = jQuery(document).scrollTop();
    var jAnimationContainer = jQuery(".animationContainer");
    var jEqualizerElements = jQuery(".service");
    var jCarouselElements = jQuery(".carousel");
    
    for (var j = 0; j < jAboutAccordionTriggerCollection.length; j++)
    {
        var jAccordionTrigger = jQuery(jAboutAccordionTriggerCollection[j]);
        var targetSelektor = "#" + jAccordionTrigger.find("a").attr("href").split("#")[1];

        var jAccordionTarget = jQuery(targetSelektor);

        jAccordionTrigger.jQAboutAboutAccordion(jAccordionTarget);
    }

    for (var j = 0; j < jAccordionTriggerCollection.length; j++)
    {
        var jAccordionTrigger = jQuery(jAccordionTriggerCollection[j]);
        var jAccordionTarget = jAccordionTrigger.parents(".skill-wrapper").find(".skill-info");

        jAccordionTrigger.jQAccordion(jAccordionTarget);
    }

    var fixNavbar = function fixNavbar(scrollTop)
    {
        if (scrollTop >= navigationBarOffsetTop)
        {
            jNavigationBar.css({"position": "fixed"});
            jHeader.css({"margin-bottom": navigationBarHeight + "px"});
        }
        else if (scrollTop < navigationBarOffsetTop)
        {
            jNavigationBar.css({"position": "static"});
            jHeader.css({"margin-bottom": "0px"});
        }
    };

    fixNavbar(scrollTop);

    jQuery(window).scroll(function (event)
    {
        var scrollTop = jQuery(document).scrollTop();
        fixNavbar(scrollTop);
    });

    jAnimationContainer.find("span").css({"opacity": 0});
    jAnimationContainer.scrollToAddClass({delay: 300});

    jQuery().equalize({jElements: jEqualizerElements});

    jQuery('a.scroll').click(function (event)
    {
        event.preventDefault();

        jQuery('html, body').animate(
        {
            scrollTop: jQuery(jQuery.attr(this, 'href')).offset().top
        }, 500);
        return false;
    });

    /* Carousel Elements */
    console.info("Init: ", jCarouselElements, jCarouselElements.find(".carouselItem"));
    jCarouselElements.find(".carouselItem").on("click", function() {
        var jThis = jQuery(this);
        console.log("Clicked it");
        jThis.data("position", "1");
    });

});