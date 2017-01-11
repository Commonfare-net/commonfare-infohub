
// handle UI for the section groups interaction
var handleWelfareGroup = function($, block) {

  var wrappers = block.find(".views-field-nothing");

  var doTap = function (e) {

    if (e) {
      var btn = $(e.target)
      if(btn.is(".term-details") || btn.parent().is(".term-details")) {

        var tid = btn.data("tid") || btn.parent().data("tid");

        var parts = document.location.pathname.split('/')
        var lang = ""

        if (parts.length > 0) {
          if (parts[1].length == 2) {
            lang += "/" + parts[1]
          }
        }

        document.location.pathname = lang + "/informing/" + tid;
        return false;
      }
    }

    var el = $(this);
    var p = el.parents(".views-field-nothing")
    var isActive = p.is(".active")

    wrappers.removeClass('active');
    if(isActive) {
      p.removeClass("active")
    } else {

      var o = $("#block-views-block-welfare-measure-sections-block-1-2").offset();
      var po = p.offset();

      p.addClass("active")
      p.css({
        top: -1 * (po.top - o.top),
        left: -1 * (po.left - o.left),
      });
    }

    return false;
  }

  var termItem = block.find(".term-item a.wrapper")
  // handle swipe
  termItem.hammer({
    dragLockToAxis: true,
    dragBlockHorizontal: true
  }).bind("swipeleft swiperight", function (ev) {

    var dir = ev.type == "swipeleft" ? 1 : -1;
    var idx = termItem.index($(ev.target));

    idx = idx + dir

    if(idx == termItem.size())
      idx = 0;
    if(idx == -1)
      idx = termItem.size() - 1;

    doTap.call(termItem.eq(idx)[0])

    return true;
  });

  termItem.on("click", doTap);
};

//entry point for informing
Drupal.behaviors.informing_groups_section = {
  attach: function (context, settings) {
    jQuery(function ($) {

      if(!isMobile()) return;

      var block = $("#block-views-block-welfare-measure-sections-block-1-2");

      if(!block.size()) return;
      if(block.is(".processed")) return;
      block.addClass("processed");

      handleWelfareGroup($, block)

    })
  }
};
