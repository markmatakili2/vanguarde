document.addEventListener('DOMContentLoaded', function() {
    const modals = document.querySelectorAll('.modal');
    const actionMenus = document.querySelectorAll('.action-menu');

    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.classList.remove('show');
                resetForm(modal);
            });
        }

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                resetForm(modal);
            }
        });
    });

    actionMenus.forEach(menu => {
        const actionBtn = menu.querySelector('.action-btn');
        if (actionBtn) {
            actionBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                actionMenus.forEach(m => {
                    if (m !== menu) m.classList.remove('open');
                });
                menu.classList.toggle('open');
            });
        }
    });

    document.addEventListener('click', function() {
        actionMenus.forEach(menu => menu.classList.remove('open'));
    });

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const modal = form.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
                addNewRow(form);
                resetForm(form);
            }
        });
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to delete this item?')) {
                this.closest('tr').remove();
            }
        });
    });

    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            const cells = row.querySelectorAll('td');
            populateEditForm(cells);
        });
    });
});

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        resetForm(modal);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        resetForm(modal);
    }
}

function resetForm(container) {
    const form = container.querySelector('form');
    if (form) {
        form.reset();
    }
}

function addNewRow(form) {
    const formData = new FormData(form);
    const table = document.querySelector('table tbody');

    if (!table) return;

    const row = document.createElement('tr');
    const cells = [];

    formData.forEach((value, key) => {
        cells.push(value);
    });

    const timestamp = new Date().toLocaleDateString();
    cells.push(timestamp);

    let rowHTML = '';
    cells.forEach((cell, index) => {
        if (index === 1 && cell === '') {
            rowHTML += `<td><div class="table-photo-placeholder">👤</div></td>`;
        } else if (index === 1) {
            rowHTML += `<td><img src="${cell}" alt="Photo" class="table-photo" onerror="this.parentElement.innerHTML='<div class=\"table-photo-placeholder\">👤</div>'"></td>`;
        } else {
            const displayText = cell.length > 50 ? cell.substring(0, 50) + '...' : cell;
            rowHTML += `<td>${displayText}</td>`;
        }
    });

    rowHTML += `
        <td>
            <div class="table-actions">
                <div class="action-menu">
                    <button class="action-btn">⋯</button>
                    <div class="dropdown">
                        <a href="#" class="btn-edit">Edit</a>
                        <a href="#" class="btn-delete">Delete</a>
                    </div>
                </div>
            </div>
        </td>
    `;

    row.innerHTML = rowHTML;
    table.appendChild(row);

    attachRowEventListeners(row);
}

function attachRowEventListeners(row) {
    const actionBtn = row.querySelector('.action-btn');
    const menu = row.querySelector('.action-menu');
    const deleteBtn = row.querySelector('.btn-delete');
    const editBtn = row.querySelector('.btn-edit');

    if (actionBtn) {
        actionBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const allMenus = document.querySelectorAll('.action-menu');
            allMenus.forEach(m => {
                if (m !== menu) m.classList.remove('open');
            });
            menu.classList.toggle('open');
        });
    }

    if (deleteBtn) {
        deleteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to delete this item?')) {
                row.remove();
            }
        });
    }

    if (editBtn) {
        editBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const cells = row.querySelectorAll('td');
            populateEditForm(cells);
        });
    }
}

function populateEditForm(cells) {
    const modal = document.querySelector('.modal.show') || document.querySelector('.modal');
    if (!modal) return;

    const inputs = modal.querySelectorAll('input, textarea');
    let cellIndex = 0;

    inputs.forEach((input, index) => {
        if (cellIndex < cells.length - 1) {
            let value = cells[cellIndex].innerText;

            if (cells[cellIndex].querySelector('img')) {
                value = cells[cellIndex].querySelector('img').src;
            } else if (cells[cellIndex].querySelector('.table-photo-placeholder')) {
                value = '';
            }

            input.value = value;
            cellIndex++;
        }
    });

    openModal(modal.id);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function setActiveMenu(selector) {
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(selector);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}
