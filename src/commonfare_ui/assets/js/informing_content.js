
//entry point for informing
Drupal.behaviors.informing_groups_section = {
  attach: function (context, settings) {
    jQuery(function ($) {

      if(!isMobile()) return;

      var block = $("#block-commonfare-content .welfare-info");

      if(!block.size()) return;
      if(block.is(".processed")) return;
      block.addClass("processed");

      


    })
  }
};
