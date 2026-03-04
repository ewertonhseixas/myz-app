let mapData = {
    x: 10,
    y: 10,
    cells: {} // Formato: "0-0": { icon: "", title: "", threat: 0, notes: "" }
};
let currentEditCell = "";

document.addEventListener("DOMContentLoaded", () => {
    loadMapData();
    renderMap();
});

function loadMapData() {
    const saved = localStorage.getItem("myz_map_data");
    if (saved) {
        mapData = JSON.parse(saved);
        document.getElementById("map-x").value = mapData.x;
        document.getElementById("map-y").value = mapData.y;
    } else {
        // Se nunca tiver entrado (não há mapa config), mostra painel
        document.getElementById("mapa-setup").style.display = "block";
    }
}

function saveMapData() {
    localStorage.setItem("myz_map_data", JSON.stringify(mapData));
}

function generateMapConfig() {
    let newX = parseInt(document.getElementById("map-x").value);
    let newY = parseInt(document.getElementById("map-y").value);

    if (isNaN(newX) || newX < 1) newX = 10;
    if (isNaN(newY) || newY < 1) newY = 10;

    mapData.x = newX;
    mapData.y = newY;

    // We keep existing cell data even if the map shrinks, 
    // it just won't be rendered. If it expands, new cells are empty.

    saveMapData();
    document.getElementById("mapa-setup").style.display = "none";
    renderMap();
}

function toggleSetup() {
    let setup = document.getElementById("mapa-setup");
    if (setup.style.display === "none" || setup.style.display === "") {
        setup.style.display = "block";
    } else {
        setup.style.display = "none";
    }
}

// O Grid agora: Colunas = Números (01, 02..), Linhas = Letras (A, B..)
function getRowName(index) {
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let div = index + 1;
    let rowName = "";
    while (div > 0) {
        let mod = (div - 1) % 26;
        rowName = letters.charAt(mod) + rowName;
        div = Math.floor((div - mod) / 26);
    }
    return rowName;
}

function getCoordName(col, row) {
    let rowStr = getRowName(row);
    let colNum = (col + 1).toString().padStart(2, '0');
    return rowStr + colNum;
}

function renderMap() {
    const grid = document.getElementById("map-grid");
    grid.innerHTML = "";

    // Configurar o CSS Grid
    grid.style.gridTemplateColumns = `repeat(${mapData.x}, 1fr)`;

    for (let r = 0; r < mapData.y; r++) {
        for (let c = 0; c < mapData.x; c++) {
            let key = `${c}-${r}`;
            let coordName = getCoordName(c, r);
            let cellData = mapData.cells[key];

            let cellDiv = document.createElement("div");
            cellDiv.className = "map-cell";
            // Highlight para preenchimento ou ameaça
            if (cellData) {
                if (cellData.icon || cellData.title || cellData.notes) {
                    cellDiv.classList.add("has-content");
                }
                if (cellData.threat && cellData.threat > 0) {
                    cellDiv.classList.add(`threat-${cellData.threat}`);
                }
            }

            let iconHtml = cellData && cellData.icon ? `<div class="cell-icon">${cellData.icon}</div>` : '';

            cellDiv.innerHTML = `
                <span class="cell-coord">${coordName}</span>
                ${iconHtml}
            `;

            cellDiv.onclick = () => openModalSetor(key, coordName);
            grid.appendChild(cellDiv);
        }
    }
}

// Funções do Modal de Setor
function openModalSetor(key, coordName) {
    currentEditCell = key;
    let cellData = mapData.cells[key] || { icon: "", title: "", threat: 0, notes: "" };

    document.getElementById("modal-setor-title").innerText = `SETOR ${coordName}`;
    document.getElementById("setor-icon").value = cellData.icon || "";
    document.getElementById("setor-titulo").value = cellData.title || "";
    document.getElementById("setor-notas").value = cellData.notes || "";

    // Atualiza view do Ameaça
    selectThreat(cellData.threat || 0);

    document.getElementById("modal-setor").classList.add("active");
}

function selectThreat(level) {
    document.getElementById("setor-ameaca").value = level;

    // Lista segura de IDs de theats
    const threats = [0, 1, 2, 3];
    threats.forEach(i => {
        let btn = document.getElementById(`tb-${i}`);
        if (btn) {
            btn.classList.remove('active');
            if (i === parseInt(level)) {
                btn.classList.add('active');
            }
        }
    });
}

function abrirModalInfo() {
    document.getElementById("modal-info").classList.add("active");
}

function fecharModalInfo() {
    document.getElementById("modal-info").classList.remove("active");
}

function fecharModalSetor() {
    document.getElementById("modal-setor").classList.remove("active");
    currentEditCell = "";
}

function salvarSetor() {
    if (!currentEditCell) return;

    let icon = document.getElementById("setor-icon").value;
    let title = document.getElementById("setor-titulo").value.trim();
    let threat = parseInt(document.getElementById("setor-ameaca").value) || 0;
    let notes = document.getElementById("setor-notas").value.trim();

    // Remove if completely empty to save space, else save
    if (!icon && !title && threat === 0 && !notes) {
        delete mapData.cells[currentEditCell];
    } else {
        mapData.cells[currentEditCell] = { icon, title, threat, notes };
    }

    saveMapData();
    fecharModalSetor();
    renderMap();
}

// Funções de Limpar Mapa
function abrirModalClear() {
    document.getElementById("modal-clear").classList.add("active");
}

function fecharModalClear() {
    document.getElementById("modal-clear").classList.remove("active");
}

function confirmarClearMapa() {
    mapData.cells = {};
    saveMapData();
    fecharModalClear();
    renderMap();
}
