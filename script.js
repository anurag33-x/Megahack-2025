function showPage(pageId, element) {
    // Hide all pages
    document.querySelectorAll('.page, .dashboard').forEach(page => {
        page.classList.remove('active');
    });

    // Show the selected page
    document.getElementById(pageId).classList.add('active');

    // Reset all sidebar buttons
    document.querySelectorAll('.sidebar a').forEach(link => link.classList.remove('active'));

    // Highlight the clicked sidebar button
    element.classList.add('active');

    if (pageId === 'dashboard') {
        drawChart();
    }
}

let chartInstance = null;
function drawChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    if (chartInstance) {
        chartInstance.destroy();
    }
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            datasets: [{
                label: 'Sales ($)',
                data: [120, 190, 300, 500, 250],
                backgroundColor: 'rgba(54, 162, 235, 0.6)'
            }]
        },
        options: { responsive: true }
    });
}

function addMenuItem() {
    let name = document.getElementById('menuItemName').value;
    let price = document.getElementById('menuItemPrice').value;
    let fileInput = document.getElementById('uploadMenuFile');
    let file = fileInput.files[0];

    if (!name || !price || !file) return alert("Complete all fields!");

    let reader = new FileReader();
    reader.onload = function(event) {
        document.getElementById('menuList').innerHTML += `
            <div class="menu-item">
                <img src="${event.target.result}" alt="${name}">
                <p>🍽️ ${name} - $${price}</p>
            </div>`;
    };
    reader.readAsDataURL(file);
}
