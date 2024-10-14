// Şirketler ve telefon numaralarını saklamak için bir nesne
let companies = {
    balorman_int_bolu: { name: "BALORMAN INT BOLU", employees: [] },
    balorman_int_akhisar: { name: "BALORMAN INT AKHİSAR", employees: [] },
    balorman_maslak_merkez: { name: "BALORMAN MASLAK MERKEZ", employees: [] },
    balorman_maslak_8: { name: "BALORMAN MASLAK(8. KAT)", employees: [] },
    balorman_darica: { name: "BALORMAN DARICA", employees: [] },
    palet_global: { name: "PALET GLOBAL", employees: [] }
};

// localStorage'dan verileri yükle
function loadData() {
    const savedData = localStorage.getItem('companyData');
    if (savedData) {
        companies = JSON.parse(savedData);
    }
}

// Verileri localStorage'a kaydet
function saveData() {
    localStorage.setItem('companyData', JSON.stringify(companies));
}

// Tabloları güncelleme fonksiyonu (admin için)
function updateAdminTables() {
    const companiesDiv = document.getElementById('companies');
    companiesDiv.innerHTML = '';

    for (let companyId in companies) {
        const company = companies[companyId];
        const section = document.createElement('div');
        section.className = 'company-section mb-5';
        section.innerHTML = `
            <h2 class="mb-3">${company.name}</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>İsim</th>
                        <th>Dahili Numara</th>
                        <th>E-posta</th>
                        <th>Departman</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody id="${companyId}TableBody"></tbody>
            </table>
        `;
        companiesDiv.appendChild(section);

        const tableBody = document.getElementById(`${companyId}TableBody`);
        company.employees.forEach((employee, index) => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = employee.name;
            row.insertCell(1).textContent = employee.number;
            row.insertCell(2).textContent = employee.email || '-';
            row.insertCell(3).textContent = employee.department || '-';
            
            const actionsCell = row.insertCell(4);
            actionsCell.innerHTML = `
                <button onclick="editEmployee('${companyId}', ${index})" class="btn btn-sm btn-primary">Düzenle</button>
                <button onclick="deleteEmployee('${companyId}', ${index})" class="btn btn-sm btn-danger">Sil</button>
            `;
        });
    }
}

// Tabloları güncelleme fonksiyonu (user için)
function updateUserTables() {
    const companiesDiv = document.getElementById('companies');
    companiesDiv.innerHTML = '';

    for (let companyId in companies) {
        const company = companies[companyId];
        const section = document.createElement('div');
        section.className = 'company-section mb-5';
        section.innerHTML = `
            <h2 class="mb-3">${company.name}</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>İsim</th>
                        <th>Dahili Numara</th>
                        <th>E-posta</th>
                        <th>Departman</th>
                    </tr>
                </thead>
                <tbody id="${companyId}TableBody"></tbody>
            </table>
        `;
        companiesDiv.appendChild(section);

        const tableBody = document.getElementById(`${companyId}TableBody`);
        company.employees.forEach((employee) => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = employee.name;
            row.insertCell(1).textContent = employee.number;
            row.insertCell(2).textContent = employee.email || '-';
            row.insertCell(3).textContent = employee.department || '-';
        });
    }
}

// Yeni kişi ekleme fonksiyonu
function addEmployee() {
    const company = document.getElementById('company').value;
    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;
    const email = document.getElementById('email').value;
    const department = document.getElementById('department').value;

    if (company && name && number) {
        companies[company].employees.push({ name, number, email, department });
        saveData();
        updateAdminTables();
        // Form alanlarını temizle
        document.getElementById('name').value = '';
        document.getElementById('number').value = '';
        document.getElementById('email').value = '';
        document.getElementById('department').value = '';
    } else {
        alert('Lütfen gerekli alanları doldurun!');
    }
}

// Kişi düzenleme fonksiyonu
function editEmployee(companyId, index) {
    const employee = companies[companyId].employees[index];
    document.getElementById('editCompany').value = companyId;
    document.getElementById('editName').value = employee.name;
    document.getElementById('editNumber').value = employee.number;
    document.getElementById('editEmail').value = employee.email || '';
    document.getElementById('editDepartment').value = employee.department || '';
    document.getElementById('editIndex').value = index;
    
    // Düzenleme modalını göster
    $('#editModal').modal('show');
}

// Düzenleme kaydetme fonksiyonu
function saveEdit() {
    const companyId = document.getElementById('editCompany').value;
    const index = parseInt(document.getElementById('editIndex').value);
    const name = document.getElementById('editName').value;
    const number = document.getElementById('editNumber').value;
    const email = document.getElementById('editEmail').value;
    const department = document.getElementById('editDepartment').value;

    if (name && number) {
        companies[companyId].employees[index] = { name, number, email, department };
        saveData();
        updateAdminTables();
        $('#editModal').modal('hide');
    } else {
        alert('Lütfen gerekli alanları doldurun!');
    }
}

// Kişi silme fonksiyonu// ... (önceki kodlar aynı kalacak)

// Kişi düzenleme fonksiyonu
function editEmployee(companyId, index) {
    const employee = companies[companyId].employees[index];
    document.getElementById('editCompany').value = companyId;
    document.getElementById('editName').value = employee.name;
    document.getElementById('editNumber').value = employee.number;
    document.getElementById('editEmail').value = employee.email || '';
    document.getElementById('editDepartment').value = employee.department || '';
    document.getElementById('editIndex').value = index;
    
    // Düzenleme modalını göster
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
}

// Düzenleme kaydetme fonksiyonu
function saveEdit() {
    const companyId = document.getElementById('editCompany').value;
    const index = parseInt(document.getElementById('editIndex').value);
    const name = document.getElementById('editName').value;
    const number = document.getElementById('editNumber').value;
    const email = document.getElementById('editEmail').value;
    const department = document.getElementById('editDepartment').value;

    if (name && number) {
        companies[companyId].employees[index] = { name, number, email, department };
        saveData();
        updateAdminTables();
        const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
        editModal.hide();
    } else {
        alert('Lütfen gerekli alanları doldurun!');
    }
}

// ... (diğer fonksiyonlar aynı kalacak)

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    // Sayfanın admin mi yoksa user mı olduğunu kontrol et
    if (document.body.classList.contains('admin-page')) {
        updateAdminTables();
        // Edit modal için event listener ekle
        document.getElementById('editModal').addEventListener('hidden.bs.modal', function () {
            document.getElementById('editForm').reset();
        });
    } else {
        updateUserTables();
    }
});
function deleteEmployee(companyId, index) {
    if (confirm('Bu kişiyi silmek istediğinizden emin misiniz?')) {
        companies[companyId].employees.splice(index, 1);
        saveData();
        updateAdminTables();
    }
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    // Sayfanın admin mi yoksa user mı olduğunu kontrol et
    if (document.body.classList.contains('admin-page')) {
        updateAdminTables();
    } else {
        updateUserTables();
    }
});