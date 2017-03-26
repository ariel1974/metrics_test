/**
 * Created by arielil on 26/03/2017.
 */

// https://metrics.librato.com/s/metrics/cls.api.in.latency?duration=21600&q=latency&source_filter=prod-svc-metrics-get_insights_%2A
var d = new Date();
 d.setDate(d.getDate()-1);


$.ajax({
    type: "GET",
    url: "https://metrics-api.librato.com/v1/metrics/cls.api.in.latency?count=100" +
    "&period=3600&resolution=60&source=prod-svc-metrics-get_insights_*",
    dataType: 'json',
    beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "Basic " + btoa("dave.loper@cloudlock.com" + ":" + '0a597a0d16345e659d888650fccfdfde1f7db30004ae25bce2da90802a759509'));
    },
    success: function (data){

        var series = [];

        _.each(_.keys(data.measurements), function(key, i) {
            series.push({
                name: key,
                data: _.map(data.measurements[key], function (m) {
                    return [m.measure_time * 1000, m.value];
                })
            });
        });

        Highcharts.chart('container', {
            chart: {
                type: 'spline',
            // Edit chart spacing
            spacingBottom: 5,
            spacingTop: 10,
            spacingLeft: 5,
            spacingRight: 5,

                // Explicitly tell the width and height of a chart
                //width: '300px',
                        height: '350px'
            },
            title: {
                text: null
            },
            subtitle: {
                //text: 'via Librato API'
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                    month: '%e. %b',
                    year: '%b'
                },
                title: {
                    visible: false
                }
            },
            yAxis: {
                min: 0,
                title: {
                    visible: false
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
            },

            plotOptions: {
                spline: {
                    marker: {
                        enabled: true
                    }
                }
            },

            series: series
        });

    }
});