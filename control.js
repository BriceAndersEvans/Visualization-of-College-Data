new (class control {
    constructor(data) {
        const root = d3.select('body').append('div')
            .style('width', '96vw').style('height', '60vw');

        console.log(data);

        this.mapJS = new map(this, root);
        this.piechart = new pieChart(this, root);

    }

    Test(str) {
        console.log(str);
    }

    Respond(selection, opacity)
    {
        this.parallelCoord.setOpacity(selection, opacity);
        this.rect.setOpacity(selection, opacity);
    }
})()