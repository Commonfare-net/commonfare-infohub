
var getSupportedLanguages = function() {
  var langsBlock = jQuery("#block-selettorelingua-2")
  return langsBlock.find("li").map(function () {
    return jQuery(this).attr('class').replace("is-active", '').replace(" ", '')
  })
}

var getSelectedLanguage = function() {
  if(localStorage.language) return localStorage.language
  var langsBlock = jQuery("#block-selettorelingua-2")
  localStorage.language  = langsBlock.find("li.is-active").eq(0).attr('class').replace('is-active', '').replace(' ', '')
  return localStorage.language
}

var isCurrentLanguage = function(lang) {
  return lang === getSelectedLanguage()
}

Drupal.behaviors.informing_desktyop_small_h = {
  attach: function (context, settings) {
    jQuery(function ($) {

      if(isMobile()) return

      var block = $("#get-informed");

      if($(window).height() >= 820)
        block.removeClass('small-height')
      else
        block.addClass("small-height")

    })
  }
}

Drupal.behaviors.informing_mobile_accordion = {
  attach: function (context, settings) {
    jQuery(function ($) {

      var block = $(".path-taxonomy .card-content .card-item");
      if(!block.size()) return
      if(block.is(".processed-mobile-menu")) return
      block.addClass("processed-mobile-menu")

      block.find('h2').on("click", function () {

        if ($(this).parent().next().is(':visible')) {
          document.location  = block.find('h2').parent().next().next().find('a').attr('href')
        }

        block.find('h2').parent().next().hide()
        block.find('h2').parent().next().next().hide()

        $(this).parent().next().show()
        $(this).parent().next().next().show()

        return false
      })

    })
  }
}

Drupal.behaviors.informing_mobile_menu = {
  attach: function (context, settings) {
    jQuery(function ($) {

      var block = $(".mobile-menu");
      if(!block.size()) return
      if(block.is(".processed-mobile-menu")) return
      block.addClass("processed-mobile-menu")

      block.on("click", function () {
        $(".mobile-menu-item").show()
      })

      $(".mobile-menu-item .close-button").on("click", function () {
        $(".mobile-menu-item ").fadeOut()
      })


    })
  }
}

Drupal.behaviors.informing_home_scrolling = {
  attach: function (context, settings) {
    jQuery(function ($) {

      var block = $(".commonfare-homepage");
      if(!block.size()) return
      if(block.is(".processed-commonfare-homepage")) return
      block.addClass("processed-commonfare-homepage")

      var alist = $(".menu-base-theme li a");
      var mm = $('.mobile-menu-item')

      alist.eq(isMobile() ? 0 : 1).parent().addClass("active")
      $('.copyright').hide()

      block.onepage_scroll({
         sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
         easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                          // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
         animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
         pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
         updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
         beforeMove: function(index) {

          if(mm.size() && mm.is(':visible')) {
             mm.hide()
          }

           if (index !== 1) {
             $('.about-main-header').fadeOut()
             $('.main-header').fadeIn()
           }

           if (index !== 3) {
             $('.copyright').fadeOut()
           }

         },  // This option accepts a callback function. The function will be called before the page moves.
         afterMove: function(index) {

           if (index === 1) {
             $('.about-main-header').fadeIn()
             $('.main-header').fadeOut()
           }

           if (index === 3) {
             $('.copyright').fadeIn()
           }

           alist.parent().removeClass("active")
           var idx = 1;
           alist.eq(index - idx).parent().addClass("active")
         },   // This option accepts a callback function. The function will be called after the page moves.
         loop: true,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
         keyboard: true,                  // You can activate the keyboard controls
         responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
                                          // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                          // the browser's width is less than 600, the fallback will kick in.
         direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
      });

      $('body').height($(window).height())
      $('body').addClass('with-onepager');

      $('.about-main-header').show()
      $('.main-header').hide()

      $("#about .button_how").on('click', function() {
        // document.location = document.location.toString().substr(0, document.location.toString().indexOf("#")) + "#get-informed"
        block.moveDown()
      })

      alist.on('click', function() {

        var idx = alist.index(this)

        alist.parent().removeClass("active")
        alist.eq(idx).parent().addClass("active")

        block.moveTo(idx+1)

        return false
      })


      switch (document.location.hash) {
        case "#about":
          block.moveTo(1)
        case "#get-informed":
          block.moveTo(2)
        case "#participate":
          block.moveTo(3)
          break;
      }

    })
  }
};

Drupal.behaviors.informing_language_selector = {
  attach: function (context, settings) {
    jQuery(function ($) {

      var block = $(".language-selector");

      if(!block.size()) return
      if(block.is(".processed-language-selector")) return
      block.addClass("processed-language-selector")

      var langsBlock = $("#block-selettorelingua-2")
      var langsList = langsBlock.find("li")

      block.find('.dropdown-menu li a').on('click', function() {
        var lang = $(this).data('lang')
        langsList.each(function() {
          if ($(this).hasClass(lang)) {
            localStorage.language = lang
            document.location = $(this).find("a").attr("href")
          }
        })
        return false
      })


      var isCurrent = isCurrentLanguage(localStorage.language)
      if (localStorage.language && !isCurrent) {
        block.find('.dropdown-menu li a[href="#'+ localStorage.language +'"]').trigger('click')
      }

    })
  }
};

Drupal.behaviors.informing_link_cards = {
  attach: function (context, settings) {
    jQuery(function ($) {

      var block = $(".card-content .card-item .wrapper");

      if(!block.size()) return
      if(block.is(".processed-nn")) return
      block.addClass("processed-nn")

      block.on('click', function() {
        document.location = $(this).find(".button_how a").attr("href");
      })

    })
  }
};
Drupal.behaviors.informing_country_form = {
  attach: function (context, settings) {
    jQuery(function ($) {

      var block = $(".country-form form");

      if(!block.size()) return
      if(block.is(".processed-country-form")) return
      block.addClass("processed-country-form")

      var countrySelector = $('.country-selector')

      var lbl = countrySelector.find('.btn .label')
      var opts = block.find('select option')

      var label = countrySelector.find('.btn .label')
      var curr = countrySelector.find('.btn .curr')

      var lang = getSelectedLanguage()

      localStorage.originalMsg = localStorage.originalMsg || label.text()
      var setLanguage = null
      var sel = opts.filter(':selected')
      if (sel.size()) {

        var txt = sel.text()
        if(sel.val() === 'All') {

          if(lang && lang !== 'en') {
            setLanguage = lang
          } else {
            label.text(Drupal.t("Please select the country of your interest"))
            block.parent().find('.card-item').remove()
          }

        }
        else {
          label.text(Drupal.t(localStorage.originalMsg))
          curr.text(sel.text())
          // console.warn(label.text(), curr.text());
        }

      }

      opts.each(function() {
        var match = countrySelector.find('.dropdown-menu li a[href="#'+ $(this).attr('value') +'"]')
        if(match.size()) {
          match.text( $(this).text() )
        }
      })

      countrySelector.find('.dropdown-menu li a')
        .on("click", function() {

          var lang = $(this).attr("href").substr(1)
          block.find('select').val(lang)
          block.find('input[type="submit"]').trigger('click')

          return false;
        })

      if (setLanguage) {
        countrySelector.find('.dropdown-menu li a[href="#'+ setLanguage +'"]').trigger('click')
      }

      block.hide()
      countrySelector.removeClass('hidden')

    })
  }
};
Drupal.behaviors.informing_node_next_prev = {
  attach: function (context, settings) {
    jQuery(function ($) {

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
