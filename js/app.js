domo.get('/data/v1/dash?fields=order_status,customer_geolocation_state&groupby=customer_geolocation_state&limit=6').then(function(data){
    let states = [];
    let payments = [];
    data.forEach(function(item, index) {
        if(item.customer_geolocation_state !== 'sp'){
            states[index] = item.customer_geolocation_state;
            payments[index] = item.order_status;
        }
    });

    var ctx = document.getElementById('chart1').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: states,
            datasets: [{
                backgroundColor: ['#e5d8fc','#e5d8fc','#e5d8fc','#e5d8fc','#9c6cf3','#e5d8fc'],
                data: payments,
                borderWidth: 1,
                borderRadius: 30,
                borderSkipped: false,
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            datalabels: {
                anchor: 'end',
                align: 'top',
                font: {
                    size: 12,
                    weight: 'bold'
                },
                formatter: function(payments) {
                    return payments;
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                },
                y: {
                    display: false,
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                }
            }
        }
    });

    new Chart("chart2", {
        type: "line",
        data: {
          labels: states,
          datasets: [{
            backgroundColor:"rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: payments
          }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                },
                y: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                }
            }
        }
    });

});
console.log(window);
domo.get('/data/v1/dash?fields=order_status,review_score&groupby=review_score&limit=6').then(function(data){
    console.log(data);
    const transformedData = data.map(item => ({
        x: item.order_status,
        y: item.review_score !== null ? item.review_score : 0
    }));
    console.log(transformedData);
    new Chart("chart3", {
        type: "scatter",
        data: {
        datasets: [{
            pointRadius: 4,
            pointBackgroundColor: "rgba(0,0,255,1)",
            data: transformedData
        }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                },
                y: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                }
            }
        }
    });
});

domo.get('/data/v1/dash?fields=order_status,customer_geolocation_state&groupby=order_status&limit=6').then(function(data){
    let states_count = [];
    let order_status = [];
    let count = 0;
    data.forEach(function(items, index){
        order_status[index] = items.order_status;
        states_count[index] = items.customer_geolocation_state;
        count += items.customer_geolocation_state;
    });
    let percentage = [];
    states_count.forEach(function(item, key){
        percentage[key] = (item/count)*100;
    });

    var ctx = document.getElementById('chart4').getContext('2d');
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [{
            label: states_count,
            data: percentage,
            backgroundColor: ['Yellow', 'Green', 'Red', 'Blue', 'Orange', 'Gray'],
            borderColor: "transparent",
            borderWidth: 10,
            offset: 50,
            borderRadius: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            roundedCorners: {
              radius: 20
            },
            datalabels: {
                formatter: (value) => {
                  return value ;
                },
              },
          },
        legend: {
          display: true
        },
      }
    });
});



