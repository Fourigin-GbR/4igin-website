(function (jQuery)
{
    jQuery.fn.scrollToAddClass = function scrollToAddClass(options)
    {
        var jView = jQuery(this);
        var jWindow = jQuery(window);

        var settings = jQuery.extend(
        {
            className: "animate",
            delay: 0
        }, options);

//----------------------------------------------------------------------------------------------------------------------
        var initView = function initView()
        {
            //init window.scroll function
            initScroll();
        };

//----------------------------------------------------------------------------------------------------------------------
//          initialize scroll behavior
//----------------------------------------------------------------------------------------------------------------------
        var initScroll = function initScroll()
        {
            var viewPortHeight = jWindow.height();
            var viewTopPosition = jView.offset().top;
            var initScrollTop = jQuery(document).scrollTop() + viewPortHeight;
            
            if (viewTopPosition <= initScrollTop)
            {
                addClass();
            }

            jWindow.scroll(function ()
            {
                var scrollTop = jQuery(document).scrollTop() + viewPortHeight;
                window.xxScrollTop = scrollTop;

                if (viewTopPosition <= scrollTop)
                {
                    addClass();
                }
            });
        };

//----------------------------------------------------------------------------------------------------------------------
//          add class
//----------------------------------------------------------------------------------------------------------------------
        var addClass = function addClass()
        {
            setTimeout(function ()
            {
                jView.addClass(settings.className);
            }, settings.delay);
            
        };

        initView();
    };

}(jQuery));