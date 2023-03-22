var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Bitcoin Price',
                    data: [],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
                {
                label: 'Predicted Bitcoin Price',
                    data: [],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
            }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });

        function updateChart() {
              
            fetch('https://api.coincap.io/v2/assets/bitcoin')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var time = data.timestamp;
                console.log(time);
                var price = data.data.priceUsd;
                console.log(price);
                
                chart.data.labels.push(time);
                chart.data.datasets[0].data.push(price);
                chart.data.datasets[1].data.push(parseInt(price)+5);
        
                
                

                chart.update();
            });

            /*
            fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
              .then(response => response.json())
              .then(data => {
                var time = new Date(data.time.updatedISO);
                var price = data.bpi.USD.rate_float;
                chart.data.labels.push(time.toLocaleTimeString());
                chart.data.datasets[0].data.push(price);
                
                var predictedPrice = chart.data.datasets[1];
                predictedPrice.data.push(price+5);
                predictedPrice.backgroundColor = 'rgb(54, 162, 235)';
                predictedPrice.borderColor = 'rgb(54, 162, 235)';
                chart.update();
              });
            */

          }

        setInterval(updateChart, 3000);