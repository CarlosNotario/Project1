/* plugin init */
$(document).ready(function() {
  /* default */
  $('.home').btnStyle();

  /* videos ripples */
  $('.videos').btnStyle({
    videos: true
  });

  /* supports ie9 + */
  $('.about').btnStyle({
    about: true,
  });
});

/*jquery plugin */
;
(function($, window, document, undefined) {
  /* Create the defaults once */
  var pluginName = "btnStyle",
    defaults = {
      render: true,
      videos: false,
      about: false,
    };

  /*  The actual plugin constructor */
  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);

    this._home = home;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var $element = $(this.element);

      if (this.options.render) this.render($element);
      $element.on('mouseup mousedown mouseleave', this.effMaterial.bind(this));
    },

    /* render */
    render: function($element) {
      var txt = $element.text();
      $element.addClass(pluginName).html('<em>' + txt + '</em><span></span>');
    },

    /* effMaterial */
    effMaterial: function(e) {
      var $target, $span, tmpl, spanRadius, animating;

      $target = $(e.currentTarget).find('> span');
      tmpl = this.options.about ? '<span></span>' : '<span class="trs"></span>';

      if (e.type === 'mousedown') {
        /* add new span */
        $target.append(tmpl);
        $span = $target.find('span').last();
        spanRadius = $span.width() / 2;

        /*  span positioning */
        if (this.options.videos) {
          $span.css({
            'left': '50%',
            'top': '50%',
            'margin-left': -spanRadius,
            'margin-top': -spanRadius,
          });
        } else {
          var x = e.pageX - $target.offset().left,
            y = e.pageY - $target.offset().top;

          $span.css({
            'left': x - spanRadius,
            'top': y - spanRadius
          });
        }

        animating = true;
      } else {
        animating = false;
      }

      /*  call motion */
      if (this.options.about) {
        this.motion.material_about($target.find('span').last(), animating);
      } else {
        this.motion.material($target.find('span').last(), animating);
      }
    },

    /*  motion object */
    motion: {
      material: function($element, boolean) {
        if (boolean) {
          $element.css({
            '-webkit-transform': 'scale(1)',
            '-ms-transform': 'scale(1)',
            'transform': 'scale(1)'
          });
        } else {
          $element.css({
            '-webkit-transform': 'scale(2)',
            '-ms-transform': 'scale(2)',
            'transform': 'scale(2)'
          }).delay(200).fadeOut(300, function() {
            $element.remove();
          });
        }
      },

      material_about: function($element, boolean) {
        if (boolean) {
          TweenMax.from($element, 0.2, {
            scale: 0,
            opacity: 0,
            ease: Elastic.EaseInOut
          });
        } else {
          TweenMax.to($element, 0.4, {
            delay: 0.1,
            scale: 2,
            opacity: 0,
            ease: Elastic.EaseInOut,
            onComplete: function() {
              $element.remove();
            }
          });
        }
      }
    },
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName,
          new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);
