function run() {
  const ctx = document.getElementById("myChart");

  var Data = d3.csv("Grad Numbers and Tuition by Year.csv").then((data) => {
    var length = Object.keys(data).length;
    var index = 0;
    var avgTuition = [];
    var gradAssociates = [];
    var gradBachelors = [];
    var gradDoctors = [];
    var gradMasters = [];
    data.forEach((e) => {
      console.log(e);
      avgTuition[index] = e["All Institutions Avg Tuition"];
      gradAssociates[index] = e["Graduates with Associates Degree"];
      gradBachelors[index] = e["Graduates with Bachelors Degree"];
      gradDoctors[index] = e["Graduates with Doctors Degree"];
      gradMasters[index] = e["Graduates with Masters Degree"];
      index = index + 1;
    });

    var yearRange = [
      "1969-70",
      "1979-80",
      "1980-81",
      "1981-82",
      "1982-83",
      "1983-84",
      "1984-85",
      "1985-86",
      "1986-87",
      "1987-88",
      "1988-89",
      "1989-90",
      "1990-91",
      "1991-92",
      "1992-93",
      "1993-94",
      "1994-95",
      "1995-96",
      "1996-97",
      "1997-98",
      "1998-99",
      "1999-2000",
      "2000-01",
      "2001-02",
      "2002-03",
      "2003-04",
      "2004-05",
      "2005-06",
      "2006-07",
      "2007-08",
      "2008-09",
      "2009-10",
      "2010-11",
      "2011-12",
      "2012-13",
      "2013-14",
      "2014-15",
      "2015-16",
      "2016-17",
      "2017-18",
      "2018-19",
      "2019-20",
      "2020-21",
    ];

    new Chart(ctx, {
      data: {
        labels: yearRange,
        datasets: [
          {
            type: "bar",
            label: "Average Tuition",
            data: avgTuition,
            yAxisID: "y1",
            borderWidth: 1,
          },
          {
            type: "line",
            label: "Number of Associate Graduates",
            data: gradAssociates,
          },
          {
            type: "line",
            label: "Number of Bachelor Graduates",
            data: gradBachelors,
          },
          {
            type: "line",
            label: "Number of Doctor Graduates",
            data: gradDoctors,
          },
          {
            type: "line",
            label: "Number of Master Graduates",
            data: gradMasters,
          },
        ],
      },
      options: {
        plugins: {
          title: {
              display: true,
              text: 'Number of Graduates and Tuition Cost by Year'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Year",
            },
          },
          y: {
            display: true,
            beginAtZero: true,
            type: "linear",
            position: "left",
            title: {
              display: true,
              text: "Number of Graduates",
            },
          },
          y1: {
            display: true,
            type: "linear",
            position: "right",
            title: {
              display: true,
              text: "Tuition",
            },
            min: 0,
            max: 30000,
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        },
      },
    });
  });
}
