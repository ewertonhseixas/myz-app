let arcaData = {
    nome: "",
    tipo: "",
    coord: "",
    estacao: "Primavera",
    agua: "",
    populacao: 200,
    devs: {
        comida: 0,
        cultura: 0,
        tecnologia: 0,
        guerra: 0
    },
    projetos: [],
    editingProjectId: null
};

let currentProjectId = null; // Para o multiplicador de jogadores

// Ao carregar a página, ler do localStorage
document.addEventListener("DOMContentLoaded", () => {
    loadData();
    renderAll();
});

// Sistema de Save Automático
function saveData() {
    arcaData.nome = document.getElementById("arca-nome").value;
    arcaData.tipo = document.getElementById("arca-tipo").value;
    arcaData.coord = document.getElementById("arca-coord").value;
    arcaData.estacao = document.getElementById("arca-estacao").value;
    arcaData.agua = document.getElementById("arca-agua").value;

    localStorage.setItem("myz_arca_data", JSON.stringify(arcaData));
}

// Carrega os dados persistidos
function loadData() {
    const saved = localStorage.getItem("myz_arca_data");
    if (saved) {
        arcaData = JSON.parse(saved);
    }
}

// Atualiza toda a tela com os dados
function renderAll() {
    // Inputs básicos
    document.getElementById("arca-nome").value = arcaData.nome || "";
    document.getElementById("arca-tipo").value = arcaData.tipo || "";
    document.getElementById("arca-coord").value = arcaData.coord || "";
    document.getElementById("arca-estacao").value = arcaData.estacao || "Primavera";
    document.getElementById("arca-agua").value = arcaData.agua || "";

    // Display
    document.getElementById("disp-arca-nome").innerText = arcaData.nome || "---";
    document.getElementById("disp-arca-tipo").innerText = arcaData.tipo || "---";
    document.getElementById("disp-arca-coord").innerText = arcaData.coord || "---";
    document.getElementById("disp-arca-estacao").innerText = arcaData.estacao || "Primavera";
    document.getElementById("disp-arca-agua").innerText = arcaData.agua || "---";


    // População
    document.getElementById("pop-display").innerText = arcaData.populacao;

    // --- Utilitários ---
    function toggleNoScroll(active) {
        if (active) document.body.classList.add("no-scroll");
        else document.body.classList.remove("no-scroll");
    }
    // DEVs - Dashboard Display
    document.getElementById("disp-dev-comida").innerText = arcaData.devs.comida;
    document.getElementById("disp-dev-cultura").innerText = arcaData.devs.cultura;
    document.getElementById("disp-dev-tecnologia").innerText = arcaData.devs.tecnologia;
    document.getElementById("disp-dev-guerra").innerText = arcaData.devs.guerra;

    // DEVs - Modal Inputs
    document.getElementById("edit-dev-comida").value = arcaData.devs.comida;
    document.getElementById("edit-dev-cultura").value = arcaData.devs.cultura;
    document.getElementById("edit-dev-tecnologia").value = arcaData.devs.tecnologia;
    document.getElementById("edit-dev-guerra").value = arcaData.devs.guerra;

    // Projetos
    renderProjetos();
}

// Modificadores Rápidos
function modPop(val) {
    arcaData.populacao += val;
    if (arcaData.populacao < 0) arcaData.populacao = 0;
    saveData();
    renderAll();
}

function modDev(tipo, val) {
    arcaData.devs[tipo] += val;
    if (arcaData.devs[tipo] < 0) arcaData.devs[tipo] = 0;
    if (arcaData.devs[tipo] > 50) arcaData.devs[tipo] = 50; // Max DEV level é geralmente 50+
    saveData();
    renderAll();
}

// Gerenciamento dos Dados Base da Arca via Modal
function abrirModalEditInfo() {
    document.getElementById("modal-edit-info").classList.add("active");
}

function fecharModalInfo() {
    document.getElementById("modal-edit-info").classList.remove("active");
}

function salvarArcaInfo() {
    saveData();
    fecharModalInfo();
    renderAll();
}

// Gerenciamento de DEVs via Modal
function abrirModalEditDev() {
    document.getElementById("modal-edit-dev").classList.add("active");
}

function fecharModalDev() {
    document.getElementById("modal-edit-dev").classList.remove("active");
}

// Gerenciamento de Projetos via Modal
function abrirModalProjeto(id = null) {
    arcaData.editingProjectId = id;
    const modal = document.getElementById("modal-projeto");
    const title = modal.querySelector("h2");

    if (id) {
        title.innerText = "EDITAR PROJETO";
        const p = arcaData.projetos.find(x => x.id === id);
        document.getElementById("proj-nome").value = p.nome || p.name || "";
        document.getElementById("proj-trabalho").value = p.trabalhoTotal;
        document.getElementById("proj-desc").value = p.desc || "";
        document.getElementById("proj-efeito").value = p.efeito || "";
    } else {
        title.innerText = "NOVO PROJETO CUSTOMIZADO";
        document.getElementById("proj-nome").value = "";
        document.getElementById("proj-trabalho").value = "10";
        document.getElementById("proj-desc").value = "";
        document.getElementById("proj-efeito").value = "";
    }

    modal.classList.add("active");
    toggleNoScroll(true);
}

function fecharModalProjeto() {
    document.getElementById("modal-projeto").classList.remove("active");
    arcaData.editingProjectId = null;
    toggleNoScroll(false);
}

// --- Galeria de Projetos Presets ---
function abrirGaleriaProjetos() {
    document.getElementById("modal-project-gallery").classList.add("active");
    toggleNoScroll(true);
    filtrarGaleria(); // Inicializa a lista
}

function fecharGaleria() {
    document.getElementById("modal-project-gallery").classList.remove("active");
    toggleNoScroll(false);
}

function filtrarGaleria() {
    const search = document.getElementById("project-search").value.toLowerCase();
    const type = document.getElementById("filter-type").value;
    const list = document.getElementById("project-gallery-list");
    list.innerHTML = "";

    const filtered = PRESET_PROJECTS.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search);
        const matchesType = type === "todos" || (Array.isArray(p.type) ? p.type.includes(type) : p.type === type);
        return matchesSearch && matchesType;
    });

    if (filtered.length === 0) {
        list.innerHTML = `<p style="text-align:center; grid-column: 1/-1; color: #666;">Nenhum projeto encontrado.</p>`;
        return;
    }

    filtered.forEach(p => {
        const card = document.createElement("div");
        card.className = "preset-project-card";
        card.onclick = () => abrirDetalheProjeto(p.id);

        let tagsHtml = "";
        let tipos = p.type || ["geral"];
        if (Array.isArray(tipos)) {
            tagsHtml = tipos.map(t => `<span class="project-tag tag-${t}">${t.toUpperCase()}</span>`).join(' ');
        } else {
            tagsHtml = `<span class="project-tag tag-${tipos}">${tipos.toUpperCase()}</span>`;
        }

        const projectNome = (p.name || p.nome || "Projeto Desconhecido").toUpperCase();
        const projectTrabalho = p.work || p.trabalhoTotal || "?";
        const projectBonus = p.bonus || p.efeito || "?";

        card.innerHTML = `
            <div class="tags-container">${tagsHtml}</div>
            <h4 style="color: #fff !important; margin: 5px 0;">${projectNome}</h4>
            
        `;
        list.appendChild(card);
    });
}

function abrirDetalheProjeto(id) {
    const p = PRESET_PROJECTS.find(x => x.id === id);
    if (!p) return;

    document.getElementById("det-proj-nome").innerText = p.name.toUpperCase();

    let typeStr = Array.isArray(p.type) ? p.type.map(t => t.toUpperCase()).join(" / ") : p.type.toUpperCase();
    document.getElementById("det-proj-bonus").innerText = "📈 " + p.bonus + " (" + typeStr + ")";

    document.getElementById("det-proj-skills").innerText = p.skills;
    document.getElementById("det-proj-work").innerText = "🔨 " + p.work + " Pontos de Trabalho";
    document.getElementById("det-proj-desc").innerText = p.desc + "\n\nREQUISITOS: " + p.requirements + "\n\nEFEITO: " + p.effect;

    const btn = document.getElementById("btn-start-project");
    btn.onclick = () => iniciarProjetoPreset(p.id);

    document.getElementById("modal-project-detail").classList.add("active");
    toggleNoScroll(true);
}

function fecharDetalheProjeto() {
    document.getElementById("modal-project-detail").classList.remove("active");
}

function iniciarProjetoPreset(id) {
    const p = PRESET_PROJECTS.find(x => x.id === id);
    if (!p) return;

    currentProjectId = id;
    document.getElementById("input-player-count").value = 1;
    document.getElementById("modal-player-count").classList.add("active");
}

function modPlayerCount(val) {
    const input = document.getElementById("input-player-count");
    let current = parseInt(input.value) || 1;
    current += val;
    if (current < 1) current = 1;
    if (current > 20) current = 20;
    input.value = current;
}

function fecharModalPlayerCount() {
    document.getElementById("modal-player-count").classList.remove("active");
    currentProjectId = null;
}

function confirmarPlayerCount() {
    if (currentProjectId === null) return;
    const p = PRESET_PROJECTS.find(x => x.id === currentProjectId);
    if (!p) return;

    const numJogadores = parseInt(document.getElementById("input-player-count").value) || 1;
    const trabalhoFinal = p.work * numJogadores;

    // Adiciona à lista de projetos ativos
    arcaData.projetos.push({
        id: Date.now(),
        nome: p.name,
        desc: p.desc,
        efeito: p.bonus,
        skills: p.skills,
        trabalhoAtual: 0,
        trabalhoTotal: trabalhoFinal
    });

    saveData();
    fecharModalPlayerCount();
    fecharDetalheProjeto();
    fecharGaleria();
    renderProjetos();
}

// Bind do botão de confirmação
document.addEventListener("DOMContentLoaded", () => {
    const btnConfirm = document.getElementById("btn-confirm-player-count");
    if (btnConfirm) {
        btnConfirm.onclick = confirmarPlayerCount;
    }
});

function salvarNovoProjeto() {
    const nome = document.getElementById("proj-nome").value.trim();
    const trabalhoStr = document.getElementById("proj-trabalho").value;
    const desc = document.getElementById("proj-desc").value.trim();
    const efeito = document.getElementById("proj-efeito").value.trim();

    if (!nome) {
        alert("O projeto precisa de um nome.");
        return;
    }

    const trabalhoTotal = parseInt(trabalhoStr);
    if (isNaN(trabalhoTotal) || trabalhoTotal <= 0) {
        alert("O projeto precisa de um número válido de Pontos de Trabalho totais (mín. 1).");
        return;
    }

    if (arcaData.editingProjectId) {
        // Editando existente
        const p = arcaData.projetos.find(x => x.id === arcaData.editingProjectId);
        if (p) {
            p.nome = nome;
            p.trabalhoTotal = trabalhoTotal;
            p.desc = desc;
            p.efeito = efeito;
            if (p.trabalhoAtual > p.trabalhoTotal) p.trabalhoAtual = p.trabalhoTotal;
        }
    } else {
        // Novo customizado
        arcaData.projetos.push({
            id: Date.now(),
            nome: nome,
            desc: desc,
            efeito: efeito,
            skills: "Variável",
            trabalhoAtual: 0,
            trabalhoTotal: trabalhoTotal
        });
    }

    saveData();
    fecharModalProjeto();
    fecharGaleria(); // Caso tenha vindo da galeria
    renderProjetos();
}

function deletarProjeto(id) {
    if (confirm("Tem certeza que deseja apagar este projeto?")) {
        arcaData.projetos = arcaData.projetos.filter(p => p.id !== id);
        saveData();
        renderProjetos();
    }
}

function modProjetoWork(id, qty) {
    const p = arcaData.projetos.find(x => x.id === id);
    if (p) {
        p.trabalhoAtual += qty;
        if (p.trabalhoAtual < 0) p.trabalhoAtual = 0;
        if (p.trabalhoAtual > p.trabalhoTotal) p.trabalhoAtual = p.trabalhoTotal;
        saveData();
        renderProjetos();

        if (p.trabalhoAtual === p.trabalhoTotal) {
            alert(`O projeto "${p.nome}" foi concluído! Adicione manualmente os modificadores de DEV.`);
        }
    }
}

function renderProjetos() {
    const container = document.getElementById("projetos-lista");
    container.innerHTML = "";

    if (arcaData.projetos.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#666; margin-top:20px;">Nenhum projeto em andamento. Protejam a Arca!</p>`;
        return;
    }

    arcaData.projetos.forEach(p => {
        const isDone = p.trabalhoAtual >= p.trabalhoTotal;

        // Formatação dos Textos com Ícones e Requisitos da Fase 3
        const displayNome = p.nome || p.name || "Sem Nome";
        const descHtml = p.desc ? `<p class="project-desc">${p.desc}</p>` : "";
        const skillsHtml = p.skills ? `<p class="project-skills"><strong>Perícias:</strong> ${p.skills}</p>` : "";
        const reqHtml = p.requirements && p.requirements !== "Nenhum" ? `<p class="project-skills" style="color:#ffb703;"><strong>Requisitos:</strong> ${p.requirements}</p>` : "";
        const efeitoHtml = p.efeito ? `<p class="project-effect">📈 <strong>Bônus:</strong> ${p.efeito}</p>` : "";

        let html = `
            <div class="project-card ${isDone ? 'project-done' : ''}">
                <div class="project-info">
                    <h4>${displayNome.toUpperCase()}</h4>
                    <div class="project-details">
                        ${descHtml}
                        ${reqHtml}
                        ${skillsHtml}
                        ${efeitoHtml}
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(p.trabalhoAtual / p.trabalhoTotal) * 100}%"></div>
                    </div>
                    <span class="progress-text">🔨 Trabalho: ${p.trabalhoAtual} / ${p.trabalhoTotal}</span>
                </div>
                <div class="project-actions">
                    <button class="btn-small" onclick="modProjetoWork(${p.id}, -1)">-</button>
                    <button class="btn-small plus" onclick="modProjetoWork(${p.id}, 1)">+1</button>
                    <button class="btn-small" onclick="abrirModalProjeto(${p.id})">✏️</button>
                    <button class="btn-small text-danger" onclick="deletarProjeto(${p.id})">✖</button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", html);
    });
}

// Mobile Text Swaps for Gallery
function checkMobileGalleryNames() {
    const isMobile = window.innerWidth <= 600;
    const optTodos = document.getElementById('opt-todos');
    if (optTodos) {
        optTodos.textContent = isMobile ? "Todos" : "Todos os Tipos";
    }
}
window.addEventListener('resize', checkMobileGalleryNames);
document.addEventListener('DOMContentLoaded', checkMobileGalleryNames);
checkMobileGalleryNames();
