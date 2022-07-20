"use strict";
//module
import "./pages/card";

window.addEventListener("DOMContentLoaded", function() {
  //Alert Open
  let alert = document.querySelector(".alert");
  let alertClose = document.querySelector(".alert .close");
  let audio = document.querySelector(".notification_audio");
  let tabsArr = [];
  const textarea = document.querySelector(".textarea");
  const password = document.querySelectorAll(".password");
  const anchors = document.querySelectorAll(".up");
  const links = document.querySelectorAll(".privacy-policy .nav a");
  const tagsParent = document.querySelector(".tags");
  let tags = document.querySelectorAll(".tag");
  const tagsBtn = document.querySelector(".tags__show");
  
  if (alert) {
    setTimeout(() => {
      alert.classList.add("alert-active");
      audio.volume = 0.3;
      audio.play();
    }, 1000);
    alertClose.addEventListener("click", function() {
      alert.classList.remove("alert-active");
    });
  }
  
  //Scroll Footer
  for (let link of links) {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      
      const blockID = link.getAttribute("href");
      
      document.querySelector(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }
  for (let anchor of anchors) {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      
      const blockID = anchor.getAttribute("href");
      
      document.querySelector(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }
  //textarea
  if (textarea) {
    textarea.addEventListener("keydown", autosize);
    
    function autosize() {
      let el = this;
      setTimeout(function() {
        el.style.cssText = "padding:0";
        el.style.cssText = "height:" + el.scrollHeight + "px";
      }, 0);
    }
  }
  if (password) {
    password.forEach((item) => {
      item.querySelector(".trigger").addEventListener("click", function() {
        if (item.querySelector("input").type === "password") {
          item.querySelector("input").setAttribute("type", "text");
        } else {
          item.querySelector("input").setAttribute("type", "password");
        }
      });
    });
  }
  
  
  const hideTabs = () => {
    if (tags && typeof tags !== "undefined") {
      tags.forEach((item) => {
        tabsArr.push(item);
        item.classList.add("dn");
        if (tags.length >= 5) {
          tagsBtn.classList.remove("dn");
        } else {
          tagsBtn.classList.add("dn");
        }
      });
    }
  };
  
  const showTabs = (idx = 5) => {
    if (tabsArr) {
      tabsArr.slice(0, idx).forEach((item) => {
        item.classList.remove("dn");
      });
    }
  };
  
  if (tagsBtn) {
    tagsBtn.addEventListener("click", () => {
      tagsParent.classList.add("tags--active");
      tagsBtn.classList.add("dn");
      showTabs(tags.length);
    });
  }
  
  const activeTags = (i = 0) => {
    if (document.querySelector(".navigation-block .wrapper")) {
      document
        .querySelectorAll(".navigation-block .wrapper button")
        [i].classList.add("active--title");
    }
  };
  
  if (document.querySelector(".navigation-block .wrapper")) {
    document
      .querySelector(".navigation-block .wrapper")
      .addEventListener("click", (e) => {
        let target = e.target;
        if (target && target.classList.contains("title")) {
          document
            .querySelectorAll(".navigation-block .wrapper button")
            .forEach((btn, idx) => {
              btn.classList.remove("active--title");
            });
          target.classList.add("active--title");
        }
      });
  }
  document
    .querySelectorAll(".navigation-block .wrapper button")
    .forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        if (idx === 0) {
          document.querySelectorAll(".news-container .card").forEach((item) => {
            item.classList.remove("active");
          });
        } else {
          document.querySelectorAll(".news-container .card").forEach((item) => {
            item.classList.add("active");
          });
        }
      });
    });
  
  
  activeTags();
  hideTabs();
  showTabs();
  
});

$(document).ready(function() {
  //tab
  $(".tab__disclosure").on("click", function() {
    if ($(this).hasClass("active") || $(this).parent(".tab__title").next(".tab__content").css("display") === "block") {
      $(this).removeClass("active");
      $(this).parent(".tab__title").next(".tab__content").slideUp(250);
    } else {
      $(".settings__tab").removeClass("active");
      $(this).addClass("active");
      $(this).parent(".tab__title").next(".tab__content").slideDown(250);
    }
  });
  
  $(".open-all__button").on("click", function() {
    let openAll = $(".open-all");
    let tabContent = $(".tab__content");
    let tabDisclosure = $(".tab__disclosure");
    if (openAll.hasClass("active")) {
      openAll.removeClass("active");
      tabDisclosure.removeClass("active");
      tabContent.removeClass("active");
      tabContent.slideUp(250);
    } else {
      openAll.addClass("active");
      tabContent.addClass("active");
      tabDisclosure.addClass("active");
      tabContent.slideDown(250);
    }
  });
  
  $(".btn--animate")
    .on("mouseenter", function(e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find("span").css({ top: relY, left: relX });
    })
    .on("mouseout", function(e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find("span").css({ top: relY, left: relX });
    });
  
  setTimeout(function() {
    $(".loading-content").removeClass("loading-content");
    $(".preloader__box").fadeOut("");
  }, 1000);
  
  //Burger
  
  $(document).on("click", function(e) {
    if ($(e.target).closest(".burger_show").length) {
      $(".burger__menu").addClass("burger_active");
      $(".blur").addClass("blur_active");
      $("body").addClass("hidden");
    } else if (
      !$(e.target).closest(".burger__box").length ||
      $(e.target).closest(".burger_hidden").length
    ) {
      $(".burger__menu").removeClass("burger_active");
      $(".blur").removeClass("blur_active");
      $("body").removeClass("hidden");
    }
    e.stopPropagation();
  });
  
  //Item Languages
  $(".item_languages a").click(function() {
    $(".item_languages a").removeClass("active");
    $(this).addClass("active");
  });
  
  //Item User
  $(".item_user").click(function(e) {
    let $menu = $(".user__menu");
    if ($menu.css("display") === "none") {
      $menu.fadeIn(300);
      $(this).addClass("active");
      let firstClick = true;
      $(document).bind("click.myEvent", function(e) {
        if (!firstClick && $(e.target).closest(".user__menu").length === 0) {
          $menu.fadeOut(300);
          $(".item_user").removeClass("active");
          $(document).unbind("click.myEvent");
        }
        firstClick = false;
      });
    }
  });
  
  // Personal Click
  $(".menu__items a").click(function() {
    $(".menu__items a").removeClass("active");
    $(this).addClass("active");
  });
  $(".personal__burger button").click(function() {
    $(".personal__menu").toggleClass("active_burger");
  });
  $(".show__menu").click(function() {
    $(".personal__menu").toggleClass("active_burger");
    $(".personal__menu").toggleClass("open");
    $(".personal-area").toggleClass("hidden");
    $(".back").hide(150);
    $(".user-wrapper").show(150);
    $(".user-wrapper").css("display", "flex");
  });
  //questions
  $(".question__category").click(function() {
    $(".question__category").removeClass("active");
    $(this).addClass("active");
  });
  
  function readURL(input) {
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = function(e) {
        $("#imagePreview").css(
          "background-image",
          "url(" + e.target.result + ")"
        );
        $("#imagePreview").fadeOut(650);
        $("#imagePreview").fadeIn(650);
        $(".avatar-upload").attr("data-user-photo", "custom");
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  
  $("#imageUpload").change(function() {
    //readURL(this);
  });
  
  //Footer
  $(".footer .car-catalog").click(function() {
    $(this).toggleClass("active_plus");
    $(".nav_car-catalog").slideToggle(300);
  });
  $(".footer .other").click(function() {
    $(this).toggleClass("active_plus");
    $(".nav_other").slideToggle(300);
  });
  
  $(".choosing-car").click(function() {
    $(this).toggleClass("active_plus");
    $(".lists__choosing-car").slideToggle(300);
  });
  $(" .btn__search-info").click(function() {
    $(this).toggleClass("active_plus");
    $(".search-info").slideToggle(300);
  });
  
  //Footer Subscription Issued
  $(".button-subscribe").click(function() {
    $(".subscription-issued").fadeIn();
    setTimeout(function() {
      $(".subscription-issued").fadeOut();
    }, 4000);
  });
  //Footer Mail
  if (window.matchMedia("(max-width: 768px)").matches) {
    $("#footer_email").attr("placeholder", "Введите email");
  }
  
  // // Clear Form
  $(".clear-filter").on("click", function() {
    let headerBlock = $(".header__box-search");
    headerBlock.find(".select").each(function(index, element) {
      element.selectize && element.selectize.clear();
    });
    $("input[name=\"price\"]").val("");
    $("label.price input[type=\"text\"]").each(function() {
      $(this).val("");
    });
  });
  
  //  notifications
  $(".article__close").click(function() {
    $(this).closest(".article__item").remove();
  });
  //  helpers media
  let w = $(window).width();
  if (w <= 576) {
    $(".desktop").remove();
  } else {
    $(".mobile").remove();
  }
  
  $(".name__tab .item-tab")
    .click(function() {
      $(".item-tab")
        .removeClass("active_tab")
        .eq($(this).index())
        .addClass("active_tab");
      $(".item__tab").hide().eq($(this).index()).fadeIn();
    })
    .eq(0)
    .addClass("active_tab");
  
  
  //hidden subscribe-window
  $(".window__close").click(function() {
    $(".subscribe-window").fadeOut();
  });
  
  //advanced search
  $(".advanced-search__content_filter").on("click", function() {
    $(".filter").addClass("open");
    $("body").addClass("hidden");
  });
  $(".close-filter").on("click", function() {
    $(".filter").removeClass("open");
    $("body").removeClass("hidden");
  });
  $("#exitFilter").on("click", function() {
    $("#menuFilter").removeClass("open");
    $("body").removeClass("hidden");
  });
  //advanced search row card
  $("#addRow").on("click", function() {
    $(".advanced-search__content-card").attr("data-view", "list");
    $(this).addClass("active");
    $("#removeRow").removeClass("active");
  });
  $("#removeRow").on("click", function() {
    $(".advanced-search__content-card").attr("data-view", "gallery");
    $(this).addClass("active");
    $("#addRow").removeClass("active");
  });
  // hidden small__block
  $(".main__block .close").on("click", function() {
    $(".small__block").fadeOut();
    $(".small__block_filter").fadeOut();
  });
  
  $(".custom__input_minus").click(function() {
    let result = +$(".custom__input_result").val() - 1;
    if (result < 0) result = 0;
    $(".custom__input_result").val(result);
  });
  
  $(".custom__input_plus").click(function() {
    let result = +$(".custom__input_result").val() + 1;
    $(".custom__input_result").val(result);
  });
  
  if (window.matchMedia("(max-width: 768px)").matches) {
    $(".dialog").on("click", function() {
      $(".dialogs").css("display", "none");
      $(".messages").css("display", "block");
    });
    $(".name__user button").click("click", function() {
      $(".dialogs").css("display", "block");
      $(".messages").css("display", "none");
    });
  } else {
    $(".dialog").on("click", function() {
      $(".dialog").removeClass("active__dialog");
      $(this).addClass("active__dialog");
    });
  }
  //personal navigation
  $(".personal-navigation button").on("click", function() {
    $(".personal-navigation button").removeClass("active");
    $(this).addClass("active");
  });
  $("#chosenAds").on("click", function() {
    $(".chosen__viewed--wrapper").fadeOut(200);
    $(".chosen__filter").fadeOut(200);
    setTimeout(function() {
      $(".chosen__ads").fadeIn(200);
    }, 200);
  });
  $("#chosenFilter").on("click", function() {
    $(".chosen__viewed--wrapper").fadeOut(200);
    $(".chosen__ads").fadeOut(200);
    setTimeout(function() {
      $(".chosen__filter").fadeIn(200);
    }, 200);
  });
  $("#chosenViewed").on("click", function() {
    $(".chosen__filter").fadeOut(200);
    $(".chosen__ads").fadeOut(200);
    setTimeout(function() {
      $(".chosen__viewed--wrapper").fadeIn(200);
    }, 200);
  });
  //ads.html
  $("#adsActive").on("click", function() {
    $(".ads__archive").fadeOut(200);
    $(".moderation").fadeOut(200);
    setTimeout(function() {
      $(".ads__active").fadeIn(200);
    }, 200);
  });
  $("#adsArchive").on("click", function() {
    $(".ads__active").fadeOut(200);
    $(".moderation").fadeOut(200);
    setTimeout(function() {
      $(".ads__archive").fadeIn(200);
    }, 200);
  });
  $("#moderation").on("click", function() {
    $(".ads__active").fadeOut(200);
    $(".ads__archive").fadeOut(200);
    setTimeout(function() {
      $(".moderation").fadeIn(200);
    }, 200);
  });
  
  $(".select-action__button").click(function(e) {
    e.preventDefault();
    $(".select-action__content").fadeToggle();
    $(".select-action__burger").toggleClass("active");
  });
  $(".select-action__content button").click(function() {
    $(".select-action__content").fadeOut();
    $(".select-action__burger").removeClass("active");
  });
  $(document).on("click", function(e) {
    if (!$(e.target).closest(".select-action").length) {
      $(".select-action__content").fadeOut();
      $(".select-action__burger").removeClass("active");
    }
    e.stopPropagation();
  });
  //  wide search
  
  $(".check-radio").on("click", function() {
    $(".check-all").prop("checked", false);
  });
  $(".check-all").on("click", function() {
    $(".check-radio").prop("checked", false);
  });
  $(".checked-radio").on("click", function() {
    $(".checked-all").prop("checked", false);
  });
  $(".checked-all").on("click", function() {
    $(".checked-radio").prop("checked", false);
  });
  // questions
  
  $("#selectAll").on("click", function() {
    if ($(this).is(":checked")) {
      $(".article__checkbox").prop("checked", true);
    } else {
      $(".article__checkbox").prop("checked", false);
    }
  });
  $(".article__checkbox").on("click", function() {
    $("#selectAll").prop("checked", false);
  });
  $(".show__block").on("click", function() {
    $(".small__block_filter").toggleClass("active");
  });
  $(".close__block").on("click", function() {
    $(".small__block_filter").removeClass("active");
    $(".burger__animate button").removeClass("opened");
  });
  
  let label = $(".label input");
  label.on("input", function() {
    if ($(this).val().length) {
      $(this).parent(".label").addClass("active__label");
      $(this)
        .next(".info")
        .find(".required-field")
        .removeClass("active__field");
    } else {
      $(this).parent(".label").removeClass("active__label");
      $(this).next(".info").find(".required-field").addClass("active__field");
    }
  });
  let select = $(".selectized");
  select.on("change", function() {
    if ($(".selectized option:selected").val().length) {
      $(this).parent(".label").addClass("active__label");
      $(this)
        .next(".info")
        .find(".required-field")
        .removeClass("active__field");
    } else {
      $(this).parent(".label").removeClass("active__label");
      $(this).next(".info").find(".required-field").addClass("active__field");
    }
  });
  
  $(".delete").on("click", function() {
    $(".popup-window").fadeOut();
  });
  
  $(".files span").on("click", function() {
    let $src = $(this).find("img").attr("src");
    $(".show__image").fadeIn();
    $(".image img").attr("src", $src);
  });
  
  
  $(".img").on("click", function() {
    let $src = $(this).find("img").attr("src");
    $(".show__image").fadeIn();
    $(".image img").attr("src", $src);
  });
  
  $(".image .button__hidden").click(function() {
    $(".show__image").fadeOut();
  });
  
  
  let buttonNext = $(".btn__disabled");
  $("#agreements").on("click", function() {
    if ($(this).is(":checked")) {
      buttonNext.removeClass("disabled");
      buttonNext.prop("disabled", false);
    } else {
      buttonNext.addClass("disabled");
      buttonNext.prop("disabled", true);
    }
  });
  $(".swiper-slide ").on("click", function(e) {
    if (
      $(e.target).closest(".swiper-navigation").length ||
      $(e.target).closest(".swiper-navigation").length ||
      $(e.target).closest(".car__links a").length
    ) {
      //return false;
    } else {
      let url = $(this).find(".name").attr("href");
      if (typeof url !== "undefined") {
        window.location.href = $(this).find(".name").attr("href");
      }
    }
  });
  
  $(".show__image .wrapper").on("click", function(e) {
    if ($(e.target).closest(".wrapper .image").length !== 1) {
      $(".show__image").fadeOut();
    }
    
  });
  
});


if (window.matchMedia("(min-width: 769px)").matches) {
  $(".ae-select-content").attr(
    "src",
    $(".dropdown-menu  li.selected img ").attr("src")
  );
  
  $(".dropdown-menu > li").click(function() {
    $(".ae-select-content").attr("src", $(this).find("img").attr("src"));
    $(".dropdown-menu  li").removeClass("selected");
    $(this).addClass("selected");
  });
  
  $(".dropdown").click(function() {
    $(".dropdown-menu").toggleClass("ae-hide");
    $(".toggle").toggleClass("is-active");
  });
  $(document).on("click", function(e) {
    if (!e.target.closest(".dropdown")) {
      $(".dropdown-menu").addClass("ae-hide");
      $(".toggle").removeClass("is-active");
    }
  });
} else if (window.matchMedia("(max-width: 768px)").matches) {
  $(".dropdown-menu > li").click(function() {
    $(".dropdown-menu  li").removeClass("selected");
    $(this).addClass("selected");
  });
  
  $(".dropdown-menu li").attr("data-tippy-placement", "top");
  $(".dropdown-menu").removeClass("ae-hide scroll");
}
