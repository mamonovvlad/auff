import "selectize";

let xhr;
let select_transport_type, $select_transport_type;
let select_transport_type_id, $select_transport_type_id;
let select_body_type, $select_body_type;
let select_body_type_id, $select_body_type_id;
let select_fuel, $select_fuel;
let select_fuel_id, $select_fuel_id;
let select_transmission, $select_transmission;
let select_transmission_id, $select_transmission_id;
let select_drive, $select_drive;
let select_drive_id, $select_drive_id;
let select_manufacturer, $select_manufacturer;
let select_manufacturer_id, $select_manufacturer_id;
let select_model, $select_model;
let select_model_id, $select_model_id;
let select_modification, $select_modification;
let select_modification_id, $select_modification_id;
let select_year_from, $select_year_from;
let select_year_before, $select_year_before;
let select_region, $select_region;
let select_city, $select_city;
let select_region_id, $select_region_id;
let select_city_id, $select_city_id;

$select_manufacturer = $("#manufacturer").selectize({
  valueField: "slug",
  labelField: "name",
  searchField: ["name"],
  onItemRemove: function() {
    select_model.clear();
    if (typeof select_modification !== "undefined") {
      select_modification.clear();
    }
  }
  ,
  onChange: function(value) {
    if (!value.length) return;
    select_model.clear();
    select_model.clearOptions();
    select_model.load(function(callback) {
      xhr && xhr.abort();
      let csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
      let api_url = "/api/car/group-model-list";
      if (typeof select_modification !== "undefined") {
        api_url = "/api/car/model-list";
      }
      xhr = $.ajax({
        url: api_url,
        type: "POST",
        dataType: "json",
        data: {
          manufacturer: value,
          _csrf: csrfToken
        },
        success: function(results) {
          callback(results);
        },
        error: function() {
          callback();
        }
      });
    });
    /*select_year_from.clear();
    select_year_from.clearOptions();
    if (typeof select_year_before !== "undefined") {
      select_year_before.clear();
      select_year_before.clearOptions();
    }
    for (let i = 2021; i >= 1970; i--) {
      select_year_from.addOption({ id: i, name: i });
      if (typeof select_year_before !== "undefined") {
        select_year_before.addOption({ id: i, name: i });
      }
    }*/
  }
});

$select_manufacturer_id = $("#manufacturer_id").selectize({
  valueField: "id",
  labelField: "name",
  searchField: ["name"],
  onItemRemove: function() {
    select_model_id.clear();
    if (typeof select_modification_id !== "undefined") {
      select_modification_id.clear();
    }
  }
  ,
  onChange: function(value) {
    if (!value.length) return;
    select_model_id.clear();
    select_model_id.clearOptions();
    select_model_id.load(function(callback) {
      xhr && xhr.abort();
      let csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
      let api_url = "/api/car/group-model-list";
      if (typeof select_modification_id !== "undefined") {
        api_url = "/api/car/model-list";
      }
      xhr = $.ajax({
        url: api_url,
        type: "POST",
        dataType: "json",
        data: {
          manufacturer_id: value,
          _csrf: csrfToken
        },
        success: function(results) {
          callback(results);
        },
        error: function() {
          callback();
        }
      });
    });
  }
});

$select_model = $("#model").selectize({
  valueField: "slug",
  labelField: "name",
  searchField: ["name"],
  load: function(value, callback) {
    let csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
    xhr = $.ajax({
      url: "/api/car/model-list",
      type: "POST",
      dataType: "json",
      data: {
        manufacturer: value,
        _csrf: csrfToken
      },
      success: function(results) {
        callback(results);
      },
      error: function() {
        callback();
      }
    });
  },
  render: {
    item: function(item) {
      if (item.years) {
        return "<div class=\"option\" data-years=\"" + item.years + "\">" + item.name + "</div>";
      } else {
        return "<div class=\"option\">" + item.name + "</div>";
      }
    },
    option: function(item) {
      if (item.years) {
        return "<div class=\"option\" data-years=\"" + item.years + "\">" + item.name + "</div>";
      } else {
        return "<div class=\"option\">" + item.name + "</div>";
      }
    }
  },
  onItemRemove: function() {
    if (typeof select_modification !== "undefined") {
      select_modification.clear();
    }
    /*select_year_from.clear();
    if (typeof select_year_before !== "undefined") {
      select_year_before.clear();
    }*/
  },
  onChange: function(value) {
    if (!value.length) return;
    if (typeof select_modification !== "undefined") {
      select_modification.clear();
      select_modification.clearOptions();
      select_modification.load(function(callback) {
        xhr && xhr.abort();
        let csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
        xhr = $.ajax({
          url: "/api/car/modification-list",
          type: "POST",
          dataType: "json",
          data: {
            model_id: value,
            _csrf: csrfToken
          },
          success: function(results) {
            callback(results);
          },
          error: function() {
            callback();
          }
        });
      });
    }
    let item = this.options[value];
    /*select_year_from.clear();
    select_year_from.clearOptions();
    if (typeof select_year_before !== "undefined") {
      select_year_before.clear();
      select_year_before.clearOptions();
    }
    let years = item.years.split(";");
    let year_from = parseInt(years[0]);
    let year_before = parseInt(years[1]);
    for (let i = year_before; i >= year_from; i--) {
      select_year_from.addOption({ id: i, name: i });
      if (typeof select_year_before !== "undefined") {
        select_year_before.addOption({ id: i, name: i });
      }
    }*/
  }
});

$select_model_id = $("#model_id").selectize({
  valueField: "id",
  labelField: "name",
  searchField: ["name"],
  load: function(value, callback) {
    let csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
    xhr = $.ajax({
      url: "/api/car/model-list",
      type: "POST",
      dataType: "json",
      data: {
        manufacturer_id: value,
        _csrf: csrfToken
      },
      success: function(results) {
        callback(results);
      },
      error: function() {
        callback();
      }
    });
  },
  render: {
    item: function(item) {
      if (item.years) {
        return "<div class=\"option\" data-years=\"" + item.years + "\">" + item.name + "</div>";
      } else {
        return "<div class=\"option\">" + item.name + "</div>";
      }
    },
    option: function(item) {
      if (item.years) {
        return "<div class=\"option\" data-years=\"" + item.years + "\">" + item.name + "</div>";
      } else {
        return "<div class=\"option\">" + item.name + "</div>";
      }
    }
  },
  onItemRemove: function() {
    if (typeof select_modification !== "undefined") {
      select_modification.clear();
    }
  },
  onChange: function(value) {
    if (!value.length) return;
    if (typeof select_modification_id !== "undefined") {
      select_modification_id.clear();
      select_modification_id.clearOptions();
      select_modification_id.load(function(callback) {
        xhr && xhr.abort();
        let csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
        xhr = $.ajax({
          url: "/api/car/modification-list",
          type: "POST",
          dataType: "json",
          data: {
            model_id: value,
            _csrf: csrfToken
          },
          success: function(results) {
            callback(results);
          },
          error: function() {
            callback();
          }
        });
      });
    }
    let item = this.options[value];
  }
});

$select_modification = $("#modification").selectize({
  valueField: "id",
  labelField: "name",
  searchField: ["name"]
});

$select_modification_id = $("#modification_id").selectize({
  valueField: "id",
  labelField: "name",
  searchField: ["name"]
});

$select_year_from = $("#year_from").selectize({
  valueField: "id",
  labelField: "name",
  searchField: ["name"],
  onChange: function(value_from) {
    if (!value_from.length) return;
    if (typeof select_year_before == "undefined") return;
    let value_before = select_year_before.getValue();
    if (!value_before.length) return;
    if (value_from > value_before) {
      select_year_from.setValue(value_before);
      select_year_before.setValue(value_from);
    }
  }
});

$select_year_before = $("#year_before").selectize({
  valueField: "id",
  labelField: "name",
  searchField: ["name"],
  onChange: function(value_before) {
    if (!value_before.length) return;
    if (typeof select_year_from == "undefined") return;
    let value_from = select_year_from.getValue();
    if (!value_from.length) return;
    if (value_from > value_before) {
      select_year_from.setValue(value_before);
      select_year_before.setValue(value_from);
    }
  }
});

$select_region = $("#region").selectize({
  onItemRemove: function() {
    select_city.clear();
  }
  ,
  onChange: function(value) {
    if (!value.length) return;
    select_city.clear();
    select_city.clearOptions();
    select_city.load(function(callback) {
      xhr && xhr.abort();
      let csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
      xhr = $.ajax({
        url: "/api/geo/city-list",
        type: "POST",
        dataType: "json",
        data: {
          region: value,
          _csrf: csrfToken
        },
        success: function(results) {
          callback(results);
        },
        error: function() {
          callback();
        }
      });
    });
  }
});

$select_city = $("#city").selectize({
  valueField: "slug",
  labelField: "name",
  searchField: ["name"]
});

$select_region_id = $("#region_id").selectize({
  onItemRemove: function() {
    select_city_id.clear();
  }
  ,
  onChange: function(value) {
    if (!value.length) return;
    select_city_id.clear();
    select_city_id.clearOptions();
    select_city_id.load(function(callback) {
      xhr && xhr.abort();
      let csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
      xhr = $.ajax({
        url: "/api/geo/city-list",
        type: "POST",
        dataType: "json",
        data: {
          region_id: value,
          _csrf: csrfToken
        },
        success: function(results) {
          callback(results);
        },
        error: function() {
          callback();
        }
      });
    });
  }
});

$select_city_id = $("#city_id").selectize({
  valueField: "id",
  labelField: "name",
  searchField: ["name"]
});

$select_transport_type = $("#transport_type").selectize({
  onItemRemove: function() {
    if (typeof select_manufacturer !== "undefined") {
      select_manufacturer.clear();
    }
    if (typeof select_model !== "undefined") {
      select_model.clear();
    }
    if (typeof select_modification !== "undefined") {
      select_modification.clear();
    }
    if (typeof select_body_type !== "undefined") {
      select_body_type.clear();
    }
    if (typeof select_fuel !== "undefined") {
      select_fuel.clear();
    }
    if (typeof select_transmission !== "undefined") {
      select_transmission.clear();
    }
    if (typeof select_drive !== "undefined") {
      select_drive.clear();
    }
  }
  ,
  onChange: function(value) {
    if (!value.length) return;
    if (typeof select_manufacturer !== "undefined") {
      select_manufacturer.clear();
      select_manufacturer.clearOptions();
      select_manufacturer.load(function(callback) {
        let csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
        $.ajax({
          url: "/api/car/manufacturer-list",
          type: "POST",
          dataType: "json",
          data: {
            transport_type: value,
            _csrf: csrfToken
          },
          success: function(results) {
            callback(results);
          },
          error: function() {
            callback();
          }
        });
      });
    }
    if (typeof select_body_type !== "undefined") {
      select_body_type.clear();
      select_body_type.clearOptions();
      select_body_type.load(function(callback) {
        let csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
        $.ajax({
          url: "/api/car/body-type-list",
          type: "POST",
          dataType: "json",
          data: {
            transport_type: value,
            _csrf: csrfToken
          },
          success: function(results) {
            callback(results);
          },
          error: function() {
            callback();
          }
        });
      });
    }
    if (typeof select_fuel !== "undefined") {
      select_fuel.clear();
      select_fuel.clearOptions();
      select_fuel.load(function(callback) {
        let csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
        $.ajax({
          url: "/api/car/fuel-list",
          type: "POST",
          dataType: "json",
          data: {
            transport_type: value,
            _csrf: csrfToken
          },
          success: function(results) {
            callback(results);
          },
          error: function() {
            callback();
          }
        });
      });
    }
    if (typeof select_transmission !== "undefined") {
      select_transmission.clear();
      select_transmission.clearOptions();
      select_transmission.load(function(callback) {
        let csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
        $.ajax({
          url: "/api/car/transmission-list",
          type: "POST",
          dataType: "json",
          data: {
            transport_type: value,
            _csrf: csrfToken
          },
          success: function(results) {
            callback(results);
          },
          error: function() {
            callback();
          }
        });
      });
    }
    if (typeof select_drive !== "undefined") {
      select_drive.clear();
      select_drive.clearOptions();
      select_drive.load(function(callback) {
        let csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
        $.ajax({
          url: "/api/car/drive-list",
          type: "POST",
          dataType: "json",
          data: {
            transport_type: value,
            _csrf: csrfToken
          },
          success: function(results) {
            callback(results);
          },
          error: function() {
            callback();
          }
        });
      });
    }
  }
});

$select_transport_type_id = $("#transport_type_id").selectize({
  onItemRemove: function() {
    if (typeof select_manufacturer_id !== "undefined") {
      select_manufacturer_id.clear();
    }
    if (typeof select_model_id !== "undefined") {
      select_model_id.clear();
    }
    if (typeof select_modification_id !== "undefined") {
      select_modification_id.clear();
    }
    if (typeof select_body_type_id !== "undefined") {
      select_body_type_id.clear();
    }
    if (typeof select_fuel_id !== "undefined") {
      select_fuel_id.clear();
    }
    if (typeof select_transmission_id !== "undefined") {
      select_transmission_id.clear();
    }
    if (typeof select_drive_id !== "undefined") {
      select_drive_id.clear();
    }
  }
  ,
  onChange: function(value) {
    if (!value.length) return;
    if (typeof select_manufacturer_id !== "undefined") {
      select_manufacturer_id.clear();
      select_manufacturer_id.clearOptions();
      select_manufacturer_id.load(function(callback) {
        let csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
        $.ajax({
          url: "/api/car/manufacturer-list",
          type: "POST",
          dataType: "json",
          data: {
            transport_type_id: value,
            _csrf: csrfToken
          },
          success: function(results) {
            callback(results);
          },
          error: function() {
            callback();
          }
        });
      });
    }
    if (typeof select_body_type_id !== "undefined") {
      select_body_type_id.clear();
      select_body_type_id.clearOptions();
      select_body_type_id.load(function(callback) {
        let csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
        $.ajax({
          url: "/api/car/body-type-list",
          type: "POST",
          dataType: "json",
          data: {
            transport_type_id: value,
            _csrf: csrfToken
          },
          success: function(results) {
            callback(results);
          },
          error: function() {
            callback();
          }
        });
      });
    }
    if (typeof select_fuel_id !== "undefined") {
      select_fuel_id.clear();
      select_fuel_id.clearOptions();
      select_fuel_id.load(function(callback) {
        let csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
        $.ajax({
          url: "/api/car/fuel-list",
          type: "POST",
          dataType: "json",
          data: {
            transport_type_id: value,
            _csrf: csrfToken
          },
          success: function(results) {
            callback(results);
          },
          error: function() {
            callback();
          }
        });
      });
    }
    if (typeof select_transmission_id !== "undefined") {
      select_transmission_id.clear();
      select_transmission_id.clearOptions();
      select_transmission_id.load(function(callback) {
        let csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
        $.ajax({
          url: "/api/car/transmission-list",
          type: "POST",
          dataType: "json",
          data: {
            transport_type_id: value,
            _csrf: csrfToken
          },
          success: function(results) {
            callback(results);
          },
          error: function() {
            callback();
          }
        });
      });
    }
    if (typeof select_drive_id !== "undefined") {
      select_drive_id.clear();
      select_drive_id.clearOptions();
      select_drive_id.load(function(callback) {
        let csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
        $.ajax({
          url: "/api/car/drive-list",
          type: "POST",
          dataType: "json",
          data: {
            transport_type_id: value,
            _csrf: csrfToken
          },
          success: function(results) {
            callback(results);
          },
          error: function() {
            callback();
          }
        });
      });
    }
  }
});

$select_body_type = $("#body_type").selectize({
  valueField: "slug",
  labelField: "name",
  searchField: ["name"]
});

$select_fuel = $("#fuel").selectize({
  valueField: "slug",
  labelField: "name",
  searchField: ["name"]
});

$select_transmission = $("#transmission").selectize({
  valueField: "slug",
  labelField: "name",
  searchField: ["name"]
});

$select_drive = $("#drive").selectize({
  valueField: "slug",
  labelField: "name",
  searchField: ["name"]
});

$select_body_type_id = $("#body_type_id").selectize({
  valueField: "id",
  labelField: "name",
  searchField: ["name"]
});

$select_fuel_id = $("#fuel_id").selectize({
  valueField: "id",
  labelField: "name",
  searchField: ["name"]
});

$select_transmission_id = $("#transmission_id").selectize({
  valueField: "id",
  labelField: "name",
  searchField: ["name"]
});

$select_drive_id = $("#drive_id").selectize({
  valueField: "id",
  labelField: "name",
  searchField: ["name"]
});

$("select").selectize({
  create: false,
  persist: false,
  openOnFocus: false,
  onInitialize: function() {
    let that = this;
    this.$control.on("click", function() {
      that.ignoreFocusOpen = true;
      setTimeout(function() {
        that.ignoreFocusOpen = false;
      }, 50);
    });
  },
  onFocus: function() {
    if (!this.ignoreFocusOpen) {
      this.open();
    }
  }
});

if (typeof $select_transport_type[0] !== "undefined") {
  select_transport_type = $select_transport_type[0].selectize;
}
if (typeof $select_transport_type_id[0] !== "undefined") {
  select_transport_type_id = $select_transport_type_id[0].selectize;
}
if (typeof $select_body_type[0] !== "undefined") {
  select_body_type = $select_body_type[0].selectize;
}
if (typeof $select_body_type_id[0] !== "undefined") {
  select_body_type_id = $select_body_type_id[0].selectize;
}
if (typeof $select_fuel[0] !== "undefined") {
  select_fuel = $select_fuel[0].selectize;
}
if (typeof $select_fuel_id[0] !== "undefined") {
  select_fuel_id = $select_fuel_id[0].selectize;
}
if (typeof $select_transmission[0] !== "undefined") {
  select_transmission = $select_transmission[0].selectize;
}
if (typeof $select_transmission_id[0] !== "undefined") {
  select_transmission_id = $select_transmission_id[0].selectize;
}
if (typeof $select_drive[0] !== "undefined") {
  select_drive = $select_drive[0].selectize;
}
if (typeof $select_drive_id[0] !== "undefined") {
  select_drive_id = $select_drive_id[0].selectize;
}
if (typeof $select_modification[0] !== "undefined") {
  select_modification = $select_modification[0].selectize;
}
if (typeof $select_modification_id[0] !== "undefined") {
  select_modification_id = $select_modification_id[0].selectize;
}
if (typeof $select_model[0] !== "undefined") {
  select_model = $select_model[0].selectize;
}
if (typeof $select_model_id[0] !== "undefined") {
  select_model_id = $select_model_id[0].selectize;
}
if (typeof $select_manufacturer[0] !== "undefined") {
  select_manufacturer = $select_manufacturer[0].selectize;
}
if (typeof $select_manufacturer_id[0] !== "undefined") {
  select_manufacturer_id = $select_manufacturer_id[0].selectize;
}
if (typeof $select_year_from[0] !== "undefined") {
  select_year_from = $select_year_from[0].selectize;
}
if (typeof $select_year_before[0] !== "undefined") {
  select_year_before = $select_year_before[0].selectize;
}
if (typeof $select_region[0] !== "undefined") {
  select_region = $select_region[0].selectize;
}
if (typeof $select_city[0] !== "undefined") {
  select_city = $select_city[0].selectize;
}
if (typeof $select_region_id[0] !== "undefined") {
  select_region_id = $select_region_id[0].selectize;
}
if (typeof $select_city_id[0] !== "undefined") {
  select_city_id = $select_city_id[0].selectize;
}

$("ul.transport_type li").on("click", function() {
  let transport_type = $(this).attr("data-name");
  $('input[name="transport_type"]').val(transport_type);
  if (typeof select_manufacturer !== "undefined") {
    select_manufacturer.clear();
    select_manufacturer.clearOptions();
    select_manufacturer.load(function(callback) {
      let csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
      $.ajax({
        url: "/api/car/manufacturer-list",
        type: "POST",
        dataType: "json",
        data: {
          transport_type: transport_type,
          _csrf: csrfToken
        },
        success: function(results) {
          callback(results);
        },
        error: function() {
          callback();
        }
      });
    });
  }
  if (typeof select_model !== "undefined") {
    select_model.clear();
    select_model.clearOptions();
  }
});