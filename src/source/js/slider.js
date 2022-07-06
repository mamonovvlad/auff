import Swiper from "swiper/bundle";

new Swiper(".news-container", {
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next-news",
    prevEl: ".swiper-button-prev-news",
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

$(function () {
  new Swiper(".images-container", {
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".swiper-button-next-images",
      prevEl: ".swiper-button-prev-images",
    },
  });
});
//Cars
new Swiper(".new-product-container", {
  slidesPerColumn: 1,
  slidesPerColumnFill: "row",
  loop: true,
  navigation: {
    nextEl: ".button-next-new-product",
    prevEl: ".button-prev-new-product",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
    },
    576: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
    },
    1024: {
      spaceBetween: 20,
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    1200: {
      spaceBetween: 30,
      slidesPerView: 4,
      slidesPerGroup: 4,
    },
  },
});
new Swiper(".good-price-container", {
  slidesPerColumnFill: "row",
  slidesPerColumn: 2,
  loop: true,
  navigation: {
    nextEl: ".button-next-good-price",
    prevEl: ".button-prev-good-price",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
    },
    576: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 20,
    },
    1024: {
      spaceBetween: 20,
      slidesPerView: 4,
      slidesPerGroup: 4,
    },
    1200: {
      spaceBetween: 30,
      slidesPerView: 5,
      slidesPerGroup: 5,
    },
  },
});

new Swiper(".best-offer-container", {
  slidesPerColumnFill: "row",
  slidesPerColumn: 1,
  slidesPerView: "auto",
  // loop: true,
  navigation: {
    nextEl: ".button-next-best-offer",
    prevEl: ".button-prev-best-offer",
  },
  breakpoints: {
    320: {
      spaceBetween: 10,
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      spaceBetween: 20,
      slidesPerView: "auto",
    },
    1200: {
      spaceBetween: 30,
    },
  },
});
new Swiper(".comparisons-container", {
  navigation: {
    prevEl: ".comparisons__prev",
    nextEl: ".comparisons__next",
  },
  simulateTouch: true,
  breakpoints: {
    320: {
      spaceBetween: 16,
      slidesPerView: 1,
    },
    576: {
      spaceBetween: 20,
    },
    768: {
      spaceBetween: 30,
      slidesPerView: 2,
    },
    1200: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
  },
});
let galleryThumbs = new Swiper(".gallery-thumbs", {
  spaceBetween: 10,
  slidesPerView: 4,
  loop: true,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
});
let galleryTop = new Swiper(".gallery-top", {
  spaceBetween: 10,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: galleryThumbs,
  },
});

//Page Card
new Swiper(".similar-ads-container", {
  slidesPerColumnFill: "row",
  slidesPerColumn: 1,
  navigation: {
    nextEl: ".button-next-good-price",
    prevEl: ".button-prev-good-price",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      spaceBetween: 20,
      slidesPerView: 4,
    },
  },
});

let page = parseInt($("input[name=\"page\"]").val());
let pageCount = parseInt($("input[name=\"page_count\"]").val());
if (page >= pageCount && pageCount <= 1) {
  $('div.pagination__block').hide();
}
if (page >= pageCount) {
  $('#show-more').hide();
}
let loadingFlag = false;
$(document).on('click', '#show-more', function () {
  if (!loadingFlag) {
    loadingFlag = true;
    let csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
    $.ajax({
      type: 'post',
      url: window.location.href,
      data: {
        'page': page + 1,
        '_csrf': csrfToken
      },
      success: function (data) {
        page++;
        loadingFlag = false;btn__disabled
        $('div.advanced-search__content-card').append(data);
        if (page >= pageCount) {
          $('#show-more').hide();
        }
        $('div.pagination__block div.pagination').hide();
        new Swiper(".images-container", {
          slidesPerView: 1,
          pagination: {
            el: ".swiper-pagination",
            type: "progressbar"
          },
          navigation: {
            nextEl: ".swiper-button-next-images",
            prevEl: ".swiper-button-prev-images"
          }
        });
      }
    });
  }
});
