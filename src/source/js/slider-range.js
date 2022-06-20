import "ion-rangeslider";
$(function () {
  let $range = $(".range-slider"),
    $inputFrom = $(".js-input-from"),
    $inputTo = $(".js-input-to"),
    instance,
    min = 0,
    max = 32000,
    from = 0,
    to = 0;

  $range.ionRangeSlider({
    skin: "modern",
    type: "double",
    min: min,
    max: max,
    from: 100,
    to: 5000,
    onStart: updateInputs,
    onChange: updateInputs,
  });
  instance = $range.data("ionRangeSlider");

  function updateInputs(data) {
    from = data.from;
    to = data.to;

    $inputFrom.prop("value", from);
    $inputTo.prop("value", to);
  }

  $inputFrom.on("input", function () {
    let val = $(this).prop("value");

    // validate
    if (val < min) {
      val = min;
    } else if (val > to) {
      val = to;
    }

    instance.update({
      from: val,
    });
  });

  $inputTo.on("input", function () {
    let val = $(this).prop("value");

    // validate
    if (val < from) {
      val = from;
    } else if (val > max) {
      val = max;
    }

    instance.update({
      to: val,
    });
  });

  let $priceRange = $(".range-slider-price"),
    $priceInputFrom = $(".js-input-from-price"),
    $priceInputTo = $(".js-input-to-price"),
    priceInstance,
    priceMin = 0,
    priceMax = 32000,
    priceFrom = 0,
    priceTo = 0;

  $priceRange.ionRangeSlider({
    skin: "modern",
    type: "double",
    min: priceMin,
    max: priceMax,
    from: 100,
    to: 5000,
    onStart: priceUpdateInputs,
    onChange: priceUpdateInputs,
  });
  priceInstance = $priceRange.data("ionRangeSlider");

  function priceUpdateInputs(data) {
    priceFrom = data.from;
    priceTo = data.to;

    $priceInputFrom.prop("value", priceFrom);
    $priceInputTo.prop("value", priceTo);
  }

  $priceInputFrom.on("input", function () {
    let val = $(this).prop("value");

    // validate
    if (val < priceMin) {
      val = priceMin;
    } else if (val > priceTo) {
      val = priceTo;
    }

    priceInstance.update({
      from: val,
    });
  });

  $priceInputTo.on("input", function () {
    let val = $(this).prop("value");

    // validate
    if (val < priceFrom) {
      val = priceFrom;
    } else if (val > priceMax) {
      val = priceMax;
    }
    priceInstance.update({
      to: val,
    });
  });
});
