function main() {
  d3.csv("Cost and Degrees Granted by State.csv").then(function (data) {
    data = data.filter((d) => d.State !== "United States");

    const states = data.map((d) => d.State);

    d3.select("#state-select")
      .selectAll("option")
      .data(states)
      .enter()
      .append("option")
      .text((d) => d)
      .attr("value", (d) => d);

    updatePieChart(states[0]);

    d3.select("#state-select").on("change", function () {
      const selectedState = this.value;
      updatePieChart(selectedState);
    });

    function updatePieChart(selectedState) {
      const stateData = data.find((d) => d.State === selectedState);
      const width = 300;
      const height = 300;
      const radius = Math.min(width, height) / 2;

      const color = d3
        .scaleOrdinal()
        .domain(Object.keys(stateData).slice(3))
        .range(d3.schemeCategory10);

      const pie = d3
        .pie()
        .value((d) => +d[1])
        .sort(null);

      const arc = d3.arc().innerRadius(0).outerRadius(radius);

      const svg = d3
        .select("#pie-chart")
        .html("")
        .append("svg")
        .attr("width", 700)
        .attr("height", 400)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      const arcs = svg
        .selectAll("arc")
        .data(pie(Object.entries(stateData).slice(3)))
        .enter()
        .append("g")
        .attr("class", "arc");

      arcs
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.data[0]));

      const legend = svg
        .selectAll(".legend")
        .data(pie(Object.entries(stateData).slice(3)))
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr(
          "transform",
          (d, i) => `translate(${width / 2 + 10}, ${i * 20 - height / 4})`
        );

      legend
        .append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", (d) => color(d.data[0]));

      legend
        .append("text")
        .attr("x", 20)
        .attr("y", 9)
        .attr("dy", ".35em")
        .text((d) => d.data[0]);

      svg
        .append("text")
        .attr("x", 0)
        .attr("y", height / 2 + 20)
        .attr("text-anchor", "middle")
        .text(`Majors Distribution in ${selectedState}`);
    }
  });
}
