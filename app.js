/**
 * Created by arielil on 26/03/2017.
 */

// https://metrics.librato.com/s/metrics/cls.api.in.latency?duration=21600&q=latency&source_filter=prod-svc-metrics-get_insights_%2A

$.ajax({
    type: "GET",
    url: "https://metrics-api.librato.com/v1/metrics/cls.api.in.latency?count=20" +
    "&resolution=60&source=prod-svc-metrics-get_insights_*",
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
                    return [m.measure_time, m.value];
                })
            });
        });

        Highcharts.chart('container', {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'uMetrics Insights'
            },
            subtitle: {
                text: 'via Librato API'
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                    month: '%e. %b',
                    year: '%b'
                },
                title: {
                    text: 'Date'
                }
            },
            yAxis: {
                min: 0
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