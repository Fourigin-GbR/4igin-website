(function (jQuery) 
{
    var toolbox = toolbox || {};
    toolbox.AboutAccordion = toolbox.AboutAccordion || (function (jQuery)
    {
        var AboutAccordionInstances = [];

        var AboutAccordion = function (jTrigger, jTarget, settings)
        {
            var triggerClickProxy = jQuery.proxy(triggerClickHandler, this);

            var jTrigger = jTrigger;
            var jTarget = jTarget;
            var AboutAccordionInstancesInt = AboutAccordionInstances.length;
                        
            jQuery.extend(true, this,
            {
                toggleSpeed: 400,
                collapseOther: true
            }, settings,
            {
                jTrigger: jTrigger,
                jTarget: jTarget,
                AboutAccordionInstancesInt: AboutAccordionInstancesInt,
                triggerClickProxy: triggerClickProxy
            });

            appendClones.call(this);
            initView.call(this);
            
            AboutAccordionInstances.push(this);
                        
            attachTriggerEventHandlers.call(this);
        };

        AboutAccordion.STATE_OPENED = 0x01;
        AboutAccordion.STATE_CLOSED = 0x02;

        var initView = function initView()
        {
            this.jTrigger.addClass("closed");
            this.jTarget.hide();
            
            initResize.call(this);
            
            this.state = AboutAccordion.STATE_CLOSED;
        };
        
        var initResize = function initResize ()
        {
            var that = this;

            jQuery(window).resize(function()
            {
                AboutAccordion.closeAll(that, true);
            });
        };
        
        var appendClones = function appendClones()
        {
            var jRow = this.jTrigger.parents(".row");
            
            this.jLargeTarget = this.jTarget.clone();
            this.jSmallTarget = this.jTarget.clone();
            
            var uId = Math.random().toString(36).substr(2, 9);
            this.uId = uId;
                       
            jRow.append(this.jLargeTarget.addClass("large " + uId));
            
            this.jTrigger.after(this.jSmallTarget.addClass("small " + uId));
        };

        var triggerClickHandler = function triggerClickHandler(event)
        {
            event.preventDefault();
            toggleContent.call(this);
        };

        var attachTriggerEventHandlers = function attachTriggerEventHandlers()
        {
            this.jTrigger.on('click', this.triggerClickProxy);
        };

        var toggleContent = function toggleContent()
        {         
            if (this.state === AboutAccordion.STATE_CLOSED)
            {
                open.call(this);
            }
            else if (this.state === AboutAccordion.STATE_OPENED)
            {
                close.call(this);
            }
        };

        var open = function open()
        {
            var jTarget;

            if(window.innerWidth > 991)
            {
                jTarget = this.jLargeTarget;
            }
            else
            {
                jTarget = this.jSmallTarget;
            }

            if (this.state === AboutAccordion.STATE_OPENED)
            {
                return;
            }

            if (this.collapseOther && window.innerWidth > 991)
            {
                AboutAccordion.closeAll(this);
            }
            
            jTarget.stop().slideDown(this.toggleSpeed);
            this.jTrigger.addClass("opened");
            this.jTrigger.removeClass("closed");

            this.state = AboutAccordion.STATE_OPENED;
        };

        var close = function close()
        {
            var jTarget;

            if (window.innerWidth > 991)
            {
                jTarget = this.jLargeTarget;
            }
            else
            {
                jTarget = this.jSmallTarget;
            }

            if (this.state === AboutAccordion.STATE_CLOSED)
            {
                return;
            }

            if (this.collapseOther && window.innerWidth > 991)
            {
                AboutAccordion.closeAll(this);
            }
            
            jTarget.stop().slideUp(this.toggleSpeed);
            this.jTrigger.addClass("closed");
            this.jTrigger.removeClass("opened");

            this.state = AboutAccordion.STATE_CLOSED;
        };

        AboutAccordion.closeAll = function closeAll(mainInstance, resize)
        {
            var start;
            var end;
                        
            if(resize !== "undefined")
            {
                start = 0;
                end = AboutAccordionInstances.length -1;
            }
            else
            {
                if (window.innerWidth > 991)
                {
                    start = 0;
                    end = AboutAccordionInstances.lengt - 1;
                }
                else
                {
                    start = 0;
                    end = AboutAccordionInstances.lengt -1;
                }
            }
                               
                       
            for (var i = start, instance; i <= end; i++)
            {                
                instance = AboutAccordionInstances[i];

                if (instance.state === AboutAccordion.STATE_OPENED)
                {
                    var jTarget;

                    if (window.innerWidth > 991)
                    {
                        jTarget = instance.jLargeTarget;
                    }
                    else
                    {
                        jTarget = instance.jSmallTarget;
                    }
                    
                    instance.state = AboutAccordion.STATE_CLOSED;
                    instance.jTrigger.addClass("closed");
                    instance.jTrigger.removeClass("opened");

                    jTarget.stop().slideUp(instance.toggleSpeed);
                }
            }
        };
        return AboutAccordion;

    }(jQuery));
    
    //jQuery plugin function
    jQuery.fn.jQAboutAboutAccordion = function (jTarget, settings)
    {
        return this.each(function ()
        {
            var jThis = jQuery(this);
            
            //if already initialized 
            if (jTarget.data('accordion'))
            {
                return;
            }

            var accordion = new toolbox.AboutAccordion(jThis, jTarget, settings);
            jThis.data('accordion', accordion);
        });
    };
})(jQuery);