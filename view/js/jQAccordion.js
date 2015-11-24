(function (jQuery) 
{
    var toolbox = toolbox || {};
    toolbox.Accordion = toolbox.Accordion || (function (jQuery)
    {
        var AccordionInstances = [];

        var Accordion = function (jTrigger, jTarget, settings)
        {
            var triggerClickProxy = jQuery.proxy(triggerClickHandler, this);

            var jTrigger = jTrigger;
            var jTarget = jTarget;
            var jParent = jTrigger.parents(".skill-wrapper");
            var AccordionInstancesInt = AccordionInstances.length;

            jQuery.extend(true, this,
            {
                toggleSpeed: 400,
                collapseOther: true
            }, settings,
            {
                jTrigger: jTrigger,
                jTarget: jTarget,
                jParent: jParent,
                AccordionInstancesInt: AccordionInstancesInt,
                triggerClickProxy: triggerClickProxy
            });

            appendClones.call(this);
            initView.call(this);
            
            AccordionInstances.push(this);
                        
            attachTriggerEventHandlers.call(this);
        };

        Accordion.STATE_OPENED = 0x01;
        Accordion.STATE_CLOSED = 0x02;

        var initView = function initView()
        {
            this.jParent.addClass("closed");
            this.jTarget.hide();
            
            initResize.call(this);
            
            this.state = Accordion.STATE_CLOSED;
        };
        
        var initResize = function initResize ()
        {
            var that = this;

            jQuery(window).resize(function()
            {
                Accordion.closeAll(that, true);
            });
        };
        
        var appendClones = function appendClones()
        {
            var jRow = this.jTrigger.parents(".row");
            var jParent = this.jParent;
            
            this.jLargeTarget = this.jTarget.clone();
            this.jSmallTarget = this.jTarget.clone();
            
            var uId = Math.random().toString(36).substr(2, 9);
            this.uId = uId;
                       
            jRow.append(this.jLargeTarget.addClass("large " + uId));
            jParent.parent().after(this.jSmallTarget.addClass("small " + uId));
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
            if (this.state === Accordion.STATE_CLOSED)
            {
                open.call(this);
            }
            else if (this.state === Accordion.STATE_OPENED)
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

            if (this.state === Accordion.STATE_OPENED)
            {
                return;
            }

            if (this.collapseOther)
            {
                Accordion.closeAll(this);
            }

            jTarget.stop().slideDown(this.toggleSpeed);
            this.jParent.addClass("opened");
            this.jParent.removeClass("closed");

            this.state = Accordion.STATE_OPENED;
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

            if (this.state === Accordion.STATE_CLOSED)
            {
                return;
            }

            if (this.collapseOther)
            {
                Accordion.closeAll(this);
            }

            jTarget.stop().slideUp(this.toggleSpeed);
            this.jParent.addClass("closed");
            this.jParent.removeClass("opened");

            this.state = Accordion.STATE_CLOSED;
        };

        Accordion.closeAll = function closeAll(instance, resize)
        {
            var start;
            var end;
            
            if(resize)
            {
                start = 0;
                end = AccordionInstances.length -1;
            }
            else
            {
                if (window.innerWidth > 991)
                {
                    if (instance.AccordionInstancesInt % 2)
                    {
                        start = instance.AccordionInstancesInt - 1;
                        end = instance.AccordionInstancesInt;
                    }
                    else
                    {
                        start = instance.AccordionInstancesInt;
                        end = instance.AccordionInstancesInt + 1;
                    }
                }
                else
                {
                    start = 0;
                    end = AccordionInstances.lengt -1;
                }
            }
                       
            for (var i = start, instance; i <= end; i++)
            {                
                instance = AccordionInstances[i];

                if (instance.state === Accordion.STATE_OPENED)
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
                    
                    instance.state = Accordion.STATE_CLOSED;
                    instance.jParent.addClass("closed");
                    instance.jParent.removeClass("opened");

                    jTarget.stop().slideUp(instance.toggleSpeed);
                }
            }
        };
        return Accordion;

    }(jQuery));
    
    //jQuery plugin function
    jQuery.fn.jQAccordion = function (jTarget, settings)
    {
        return this.each(function ()
        {
            var jThis = jQuery(this);
            
            //if already initialized 
            if (jTarget.data('accordion'))
            {
                return;
            }

            var accordion = new toolbox.Accordion(jThis, jTarget, settings);

            jThis.data('accordion', accordion);
        });
    };
})(jQuery);