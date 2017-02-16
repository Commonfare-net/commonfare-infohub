
var handleContent = function ($, block) {

  if(!block.size()) return;
  if(block.is(".processed")) return;
  block.addClass("processed");

  var termItem = block.find(".views-row")

  if(termItem.size() <= 1) return;

  var getNextIdx = function(dir, curr_idx) {

    if (curr_idx === undefined) {
      curr_idx = termItem.index(termItem.filter(':visible').eq(0));
    }

    var idx = curr_idx + dir

    if(idx == termItem.size())
      idx = 0;
    if(idx == -1)
      idx = termItem.size() - 1;

    return idx
  }

  termItem.hide().eq(0).show()

  termItem.find('.title a').on('click', false)
  termItem.on("click", function(ev) {
    document.location = $(this).find('.title a').attr('href')
    return false
  })

  termItem.hammer({
    dragLockToAxis: true,
    dragBlockHorizontal: true
  }).bind("swipeleft swiperight", function (ev) {

    var dir = ev.type == "swipeleft" ? 1 : -1;

    var curr_idx = termItem.index($(ev.target));
    var idx = getNextIdx(dir, curr_idx)

    var curr = termItem.eq(curr_idx)
    var next = termItem.eq(idx)

    next.show()
    curr.css({
      position: "absolute"
    }).animate({
      left: dir === 1 ? -100 : 100,
      opacity: 0
    }, 200, function () {

      curr.hide().css({
        position: "inherit",
        left: 0,
        right: 0,
        opacity: 1
      });

    })


    return true;
  });

}

var setTitle = function($, title) {

  var c = $('#mobile-title')
  if (c.size()) {
    c.empty()
    c.append(title)
    return
  }

  c = $("<div id='mobile-title'></div>")
  c.append(title)
  $(".region-header").append(c)

};

var setContentHeight = function($) {
  var ww = $(".welfare-wrapper")
  ww.height(window.informing.getContentHeight() - 120)
}

//entry point for informing
Drupal.behaviors.informing_content_list = {
  attach: function (context, settings) {
    jQuery(function ($) {

      var block = $("#block-commonfare-content .welfare-info");

      if(!block.size()) return

      if(!isMobile()) {

        var termItem = block.find(".views-row")
        termItem.find('.title a').on('click', false)
        termItem.on("click", function(ev) {
          document.location = $(this).find('.title a').attr('href')
          return false
        })

        // align blocks height
        var maxh = 0
        var w = block.find('.welfare-wrapper')
        w.each(function() {
          var _h = $(this).height()
          maxh = _h > maxh ? _h : maxh
        })

        w.height(maxh)

        return
      }

      if(block.is(".processed-c")) return
      block.addClass("processed-c")

      handleContent($, block)

      var title = $("#page-title h1").text()
      setTitle($, title)

      setContentHeight($)

    })
  }
};

Drupal.behaviors.informing_link_cards = {
  attach: function (context, settings) {
    jQuery(function ($) {

      if(isMobile()) return;

      var block = $(".commonfare-homepage .card-content .card-item .wrapper, .path-taxonomy .card-content .card-item .wrapper");

      if(!block.size()) return
      if(block.is(".processed-nn")) return
      block.addClass("processed-nn")

      block.on('click', function() {
        document.location = $(this).find(".button_how a").attr("href");
      })

    })
  }
};
Drupal.behaviors.informing_fit_home = {
  attach: function (context, settings) {
    jQuery(function ($) {

      // if(isMobile()) return;

      var block = $(".commonfare-homepage");

      if(!block.size()) return
      if(block.is(".processed-xx")) return
      block.addClass("processed-xx")


      var about = $("#about"),
          get_informed = $("#get-informed"),
          participate = $("#participate"),
          admin = $('#toolbar-administration'),
          screens = [ about, get_informed, participate  ],
          win = $(window)

      var h = win.height()
      if (admin.size()) {
        h -= admin.height()
      }

      screens.forEach(function(screen) {
        screen.height(h)
      })

      about.on('click', function() {
        document.location = document.location.toString().substr(0, document.location.toString().indexOf("#")) + "#get-informed"
      })


    })
  }
};
Drupal.behaviors.informing_node_next_prev = {
  attach: function (context, settings) {
    jQuery(function ($) {

      if(isMobile()) return;

      var block = $("#block-views-block-measure-list-by-term-block-1");

      if(!block.size()) return
      if(block.is(".processed-nnd")) return
      block.addClass("processed-nnd")

      var ilist = block.find('.item-list')
      var alist = ilist.find('ul > li a');
      var title = $('.region-page-title h1 > span').text()

      var nextLink = null, prevLink = null;
      var currentIndex = 0
      var listLength = alist.size()

      ilist.hide()

      alist.each(function(i, el) {
          console.warn(i, $(this).text());
        if ($(this).text() === title) {
          currentIndex = i
        }
      })

      var n = $('.node-navigation')
      var next = n.find('.next')
      var prev = n.find('.prev')


      if (currentIndex === 0) {
        prev.hide()
      }
      else {
        var aprev = alist.eq(currentIndex-1)
        prevLink = aprev.attr("href")
        prev.find('.title').text( aprev.text() )
      }

      if (currentIndex === listLength-1) {
        next.hide()
      }
      else {
        var anext = alist.eq(currentIndex+1)
        nextLink = anext.attr("href")
        next.find('.title').text( anext.text() )
      }

      next.on('click', function() {
        if(nextLink === null) return false
        document.location = nextLink
      })
      prev.on('click', function() {
        if(prevLink === null) return false
        document.location = prevLink
      })

      block.find('.hidden').removeClass("hidden")

    })
  }
};
