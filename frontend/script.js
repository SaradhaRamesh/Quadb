// frontend/script.js
document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:3000/tickers');
    const tickers = await response.json();

    const tickersTable = document.getElementById('tickers');
    tickersTable.innerHTML = '';

    tickers.forEach((ticker, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${ticker.name}</td>
            <td>₹ ${ticker.last}</td>
            <td>₹ ${ticker.buy} / ₹ ${ticker.sell}</td>
            <td>${ticker.volume}</td>
            <td>${ticker.base_unit}</td>
        `;
        tickersTable.appendChild(row);
    });

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        document.querySelector('.container').classList.toggle('dark-mode');
        document.querySelectorAll('th').forEach(th => th.classList.toggle('dark-mode'));
        document.querySelectorAll('tr:nth-child(even)').forEach(tr => tr.classList.toggle('dark-mode'));
        document.querySelectorAll('tr:nth-child(odd)').forEach(tr => tr.classList.toggle('dark-mode'));
        document.querySelectorAll('.buttons button').forEach(button => button.classList.toggle('dark-mode'));
        document.querySelectorAll('.telegram button').forEach(button => button.classList.toggle('dark-mode'));
    });
});
