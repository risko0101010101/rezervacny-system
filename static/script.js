document.getElementById('pridat').addEventListener('click', async () => {
    const datum = document.getElementById('datum').value;
    const cas = document.getElementById('cas').value;
    const miesto = document.getElementById('miesto').value;
    const popis = document.getElementById('popis').value;

    const response = await fetch('/pridat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ datum, cas, miesto, popis })
    });

    const result = await response.json();
    if (response.ok) {
        alert(result.message);
        nacitajRezervacie();
    } else {
        alert(result.error);
    }
});

async function nacitajRezervacie() {
    const response = await fetch('/zobraz');
    const rezervacie = await response.json();

    const tbody = document.getElementById('rezervacie-list');
    tbody.innerHTML = '';
    rezervacie.forEach(rez => {
        const row = `<tr>
            <td>${rez.datum}</td>
            <td>${rez.cas}</td>
            <td>${rez.miesto}</td>
            <td>${rez.popis}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

window.onload = nacitajRezervacie;
