document.addEventListener('DOMContentLoaded', function() {
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    months.forEach(month => {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    const currentYear = new Date().getFullYear();
    const years = [currentYear - 1, currentYear, currentYear + 1];

    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });

    const savedData = localStorage.getItem('formData');
    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById('month').value = data.month;
        document.getElementById('year').value = data.year;
        document.getElementById('fee').value = data.fee;
        document.getElementById('participants').value = data.participants;
        displayTable(data);
    }
});

function saveData() {
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    const fee = parseFloat(document.getElementById('fee').value);
    const participants = parseInt(document.getElementById('participants').value);
    const total = fee * participants;

    const percentages = [0.32, 0.24, 0.16, 0.12, 0.08, 0.08];
    const values = percentages.map(p => (p * total).toFixed(2));

    const data = {
        month, year, fee, participants, total, values
    };

    localStorage.setItem('formData', JSON.stringify(data));
    displayTable(data);
}

function displayTable(data) {
    document.getElementById('displayTitle').textContent = `Premiação de ${data.month}/${data.year}`;
    document.getElementById('displayFee').textContent = `R$${data.fee.toFixed(2)}`;
    document.getElementById('displayParticipants').textContent = data.participants;
    document.getElementById('displayTotal').textContent = `R$${data.total.toFixed(2)}`;

    document.getElementById('firstPlace').textContent = `R$${data.values[0]}`;
    document.getElementById('secondPlace').textContent = `R$${data.values[1]}`;
    document.getElementById('thirdPlace').textContent = `R$${data.values[2]}`;
    document.getElementById('fourthPlace').textContent = `R$${data.values[3]}`;
    document.getElementById('fifthPlace').textContent = `R$${data.values[4]}`;
    document.getElementById('admin').textContent = `R$${data.values[5]}`;
    document.getElementById('resultsTable').style.display = 'table';
    document.getElementById('downloadButton').style.display = 'block';
}

function downloadImage() {
    const tableContainer = document.getElementById('tableContainer');
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    const monthName = document.getElementById('month').options[document.getElementById('month').selectedIndex].text;

    html2canvas(tableContainer, {
        backgroundColor: '#fff' // Garante que o fundo seja branco
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `${monthName}.${year}.png`; // Nomeia a imagem com o formato #mes-selecionado.ano#
        link.href = canvas.toDataURL();
        link.click();
    });
}