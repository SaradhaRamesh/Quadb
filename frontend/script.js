document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/tickers')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tickers');
            tbody.innerHTML = '';
            data.forEach((ticker, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${ticker.name}</td>
                    <td>${ticker.last}</td>
                    <td>${ticker.buy} / ${ticker.sell}</td>
                    <td>${((ticker.sell - ticker.buy) / ticker.buy * 100).toFixed(2)}%</td>
                    <td>${ticker.volume}</td>
                `;
                tbody.appendChild(tr);
            });

            const bestPrice = Math.max(...data.map(ticker => parseFloat(ticker.buy)));
            document.getElementById('best-price').textContent = `₹ ${bestPrice.toLocaleString()}`;
        })
        .catch(error => console.error('Error fetching data:', error));
});
//1