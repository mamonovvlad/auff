let ctx = document.getElementById("chart").getContext("2d");
const data = {
  labels: [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ],
  datasets: [
    {
      label: "Data",
      data: [2, 4, 3, 5, 2, 3, 2, 4, 3, 5, 2, 3, 1, 3, 1, 2, 3, 4],
      backgroundColor: ["#fff63d"],
      borderColor: ["#000"],
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    y: {
      min: 0,
      max: 6,
    },
  },
};
new Chart(ctx, {
  type: "bar",
  data: data,
  options: options,
});
