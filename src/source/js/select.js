import "selectize";

let xhr;
let select_manufacturer, $select_manufacturer;
let select_model, $select_model;
$select_manufacturer = $("#manufacturer_id").selectize({
  onItemRemove: function () {
    select_model.clear();
  },
  onChange: function (value) {
    if (!value.length) return;
    select_model.clear();
    select_model.clearOptions();
    select_model.load(function (callback) {
      xhr && xhr.abort();
      let csrfToken = $('meta[name="csrf-token"]').attr("content");
      xhr = $.ajax({
        url: "/model/list",
        type: "POST",
        dataType: "json",
        data: {
          manufacturer_id: value,
          _csrf: csrfToken,
        },
        success: function (results) {
          callback(results);
        },
        error: function () {
          callback();
        },
      });
    });
  },
});

$select_model = $("#model_id").selectize({
  valueField: "name",
  labelField: "name",
  searchField: ["name"],
});

$("select").selectize({
  create: false,
  persist: false,
  openOnFocus: false,
  onInitialize: function () {
    let that = this;
    this.$control.on("click", function () {
      that.ignoreFocusOpen = true;
      setTimeout(function () {
        that.ignoreFocusOpen = false;
      }, 50);
    });
  },
  onFocus: function () {
    if (!this.ignoreFocusOpen) {
      this.open();
    }
  },
});

if (typeof $select_model[0] !== "undefined") {
  select_model = $select_model[0].selectize;
}
if (typeof $select_manufacturer[0] !== "undefined") {
  select_manufacturer = $select_manufacturer[0].selectize;
}
