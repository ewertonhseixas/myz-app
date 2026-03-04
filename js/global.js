/**
 * Global logic for Mutant Year Zero Dice Roller
 * Handles the floating D6 button and quick roller modal across all pages.
 */

const BASIC_SKILLS = [
    { id: "atirar", name: "Atirar", attr: "agilidade" },
    { id: "compreender", name: "Compreender", attr: "astucia" },
    { id: "conhecer_zona", name: "Conhecer a Zona", attr: "astucia" },
    { id: "curar", name: "Curar", attr: "empatia" },
    { id: "esgueirar", name: "Esgueirar", attr: "agilidade" },
    { id: "impelir", name: "Impelir", attr: "forca" },
    { id: "lutar", name: "Lutar", attr: "forca" },
    { id: "manipular", name: "Manipular", attr: "empatia" },
    { id: "mover", name: "Mover", attr: "agilidade" },
    { id: "observar", name: "Observar", attr: "astucia" },
    { id: "sentir_emocoes", name: "Sentir Emoções", attr: "empatia" },
    { id: "suportar", name: "Suportar", attr: "forca" }
];

const SPECIALIST_SKILLS = {
    "adestrador": { name: "Incitar Cachorro", attr: "agilidade", id: "incitar_cachorro" },
    "batedor": { name: "Encontrar o Caminho", attr: "agilidade", id: "encontrar_caminho" },
    "brutamonte": { name: "Intimidar", attr: "forca", id: "intimidar" },
    "chefão": { name: "Comandar", attr: "astucia", id: "comandar" },
    "cronista": { name: "Inspirar", attr: "empatia", id: "inspirar" },
    "engenheiro": { name: "Fazer Gambiarra", attr: "astucia", id: "fazer_gambiarra" },
    "escravo": { name: "Superar", attr: "forca", id: "superar" },
    "negociante": { name: "Fazer um Trato", attr: "empatia", id: "fazer_um_trato" }
};

const STUNTS_DATA = {
    "atirar": ["+1 de dano", "Trava o inimigo (fadiga)", "+2 na iniciativa", "Desarmar", "Derrubar/empurrar"],
    "compreender": ["Você consegue ensinar outra pessoa a usar o artefato"],
    "conhecer_zona": ["Como pode me ferir?", "Como posso feri-lo?"],
    "curar": ["Recupera pontos de atributo extras"],
    "esgueirar": ["+1 de modificação no primeiro ataque de uma emboscada"],
    "impelir": ["Arremessa objeto (+dano igual aos sucessos extras)", "Revela passagem ou objeto escondido"],
    "lutar": ["+1 de dano", "Causa fadiga", "+2 na iniciativa", "Desarmar", "Derrubar/empurrar", "Agarrar"],
    "manipular": ["Causa 1 ponto de dúvida no alvo por cada sucesso extra"],
    "mover": ["Ajuda um amigo a escapar de uma enrascada sem precisar rolar"],
    "observar": ["Estou sendo seguido?", "Há mais deles?", "Como passo por aqui?"],
    "sentir_emocoes": ["Ele está mentindo?", "Quer me ferir?", "Quer algo de mim?"],
    "suportar": ["Ajuda um amigo na mesma situação a não precisar rolar"],
    "intimidar": ["Causa 1 ponto de dúvida no alvo por cada sucesso extra"],
    "fazer_gambiarra": ["Dispositivo durável", "+1 bônus equip.", "+1 dano", "Cano extra", "+1 proteção", "+3 explosão", "Estilhaços", "Dobro de carga"],
    "encontrar_caminho": ["Acha artefato", "Avalia Podridão", "Acha balas", "Acha grude", "Acha água", "Tempo /2", "Atravessa rápido"],
    "fazer_um_trato": ["Ganha balas; grude; água limpa; birita", "Consegue 'sujeira'"],
    "incitar_cachorro": ["Horas de atraso", "Se está ferida", "Se está sozinha"],
    "inspirar": ["Transfere sucessos para outro", "Elimina um sucesso do alvo"],
    "comandar": ["Ganha balas; grude; água limpa; birita"],
    "superar": ["Elimina um ponto de trauma sofrido"]
};

document.addEventListener("DOMContentLoaded", () => {
    console.log("Mutant Year Zero Global Roller Loaded");
    injectGlobalD6();
});

/**
 * Trava o scroll do body quando um modal está aberto.
 * @param {boolean} active 
 */
function toggleNoScroll(active) {
    if (active) document.body.classList.add("no-scroll");
    else document.body.classList.remove("no-scroll");
}

function injectGlobalD6() {
    // 1. Create Floating Button
    const btn = document.createElement('button');
    btn.className = 'global-d6-btn';
    btn.style.cssText = `
        position: fixed; 
        bottom: 30px; 
        right: 30px; 
        width: 60px; 
        height: 60px; 
        background: #ffb703; 
        color: #000; 
        z-index: 10000; 
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        border: none;
    `;
    btn.innerHTML = '<span>Rolar</span><strong>D6</strong>';
    btn.onclick = openQuickRoller;
    document.body.appendChild(btn);

    // 2. Create Quick Roller Modal structure
    const modal = document.createElement('div');
    modal.id = 'quick-roller-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeQuickRoller()">&times;</span>
            <h2 style="text-align: center; margin-bottom: 20px; margin-top: 20px;">ROLAGEM RÁPIDA D6</h2>
            
            <div class="quick-roller-body">
                <div class="input-row" style="margin-bottom: 15px;">
                    <div class="input-group" style="flex: 1; margin:0">
                        <label style="font-size: 0.6rem; color: #888;">TIPO</label>
                        <select id="quick-roll-type" onchange="updateQuickRollerUI()" style="font-weight: bold;">
                            <option value="d6">D6</option>
                            <option value="d66">D66</option>
                            <option value="d666">D666</option>
                        </select>
                    </div>
                    <div class="input-group" id="quick-qty-container" style="flex: 1; margin:0">
                        <label style="font-size: 0.6rem; color: #888;">QTD</label>
                        <div class="spinner">
                            <button class="btn-spin" onclick="updateQuickQty(-1)">-</button>
                            <input type="text" id="quick-qty" value="1" style="width: 50px; text-align: center; background: transparent; color: #fff; border: none; font-family: 'Teko', sans-serif; font-size: 2rem; padding: 0; pointer-events: none;">
                            <button class="btn-spin" onclick="updateQuickQty(1)">+</button>
                        </div>
                    </div>
                </div>

                <div id="quick-dice-arena" class="quick-die-arena">
                    <!-- Dados rolados aparecem aqui -->
                </div>

                <div class="quick-stats">
                    <div id="quick-stat-sum" class="counter-item" style="display: flex; gap: 8px; align-items: center;">
                        <span class="label" style="font-size: 0.75rem; color: #888;">SOMA:</span>
                        <span id="quick-sum" class="val" style="font-size: 1.1rem; color: #fff !important;">0</span>
                    </div>
                    <div id="quick-stat-success" class="counter-item" style="display: flex; gap: 8px; align-items: center;">
                        <span class="label" style="font-size: 0.75rem; color: #888;">SUCES. (6):</span>
                        <span id="quick-success" class="val" style="font-size: 1.1rem;">0</span>
                    </div>
                    <div id="quick-stat-fail" class="counter-item" style="display: flex; gap: 8px; align-items: center;">
                        <span class="label" style="font-size: 0.75rem; color: #888;">FALHAS (1):</span>
                        <span id="quick-fail" class="val" style="font-size: 1.1rem; color: #ff4d4d !important;">0</span>
                    </div>
                </div>

                <button class="btn-primary" onclick="rollQuickDice()" style="width: 100%; height: 50px; font-size: 1.2rem;">ROLAR AGORA</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function openQuickRoller() {
    document.getElementById('quick-roller-modal').classList.add('active');
    toggleNoScroll(true);
    updateQuickRollerUI();
}

function closeQuickRoller() {
    document.getElementById('quick-roller-modal').classList.remove('active');
    toggleNoScroll(false);
    document.getElementById('quick-dice-arena').innerHTML = '';
    document.getElementById('quick-success').innerText = '0';
    document.getElementById('quick-fail').innerText = '0';
    document.getElementById('quick-sum').innerText = '0';
}

function updateQuickRollerUI() {
    const type = document.getElementById('quick-roll-type').value;
    const qtyContainer = document.getElementById('quick-qty-container');
    const statsSum = document.getElementById('quick-stat-sum');
    const statsSucc = document.getElementById('quick-stat-success');
    const statsFail = document.getElementById('quick-stat-fail');

    if (type === 'd6') {
        qtyContainer.style.display = 'flex';
        statsSum.style.display = 'flex';
        statsSucc.style.display = 'flex';
        statsFail.style.display = 'flex';
    } else {
        qtyContainer.style.display = 'none';
        statsSum.style.display = 'none';
        statsSucc.style.display = 'none';
        statsFail.style.display = 'none';
    }
}

function updateQuickQty(val) {
    const input = document.getElementById('quick-qty');
    let num = parseInt(input.value) + val;
    if (num < 1) num = 1;
    if (num > 15) num = 15;
    input.value = num;
}

function rollQuickDice() {
    const type = document.getElementById('quick-roll-type').value;
    const arena = document.getElementById('quick-dice-arena');
    arena.innerHTML = '';

    if (type === 'd6') {
        const qty = parseInt(document.getElementById('quick-qty').value);
        let successes = 0;
        let failures = 0;
        let totalSum = 0;

        for (let i = 0; i < qty; i++) {
            const val = Math.floor(Math.random() * 6) + 1;
            totalSum += val;
            const die = document.createElement('div');
            die.className = 'die die-base rolling';
            die.style.setProperty('--delay', Math.random() * 200);

            let displayVal = val;
            if (val === 6) {
                displayVal = '☢';
                successes++;
            } else if (val === 1) {
                displayVal = '☣';
                failures++;
            }

            die.innerText = displayVal;
            arena.appendChild(die);
        }

        document.getElementById('quick-success').innerText = successes;
        document.getElementById('quick-fail').innerText = failures;
        document.getElementById('quick-sum').innerText = totalSum;
    } else {
        // D66 or D666
        const numDice = type === 'd66' ? 2 : 3;
        let result = "";
        for (let i = 0; i < numDice; i++) {
            const val = Math.floor(Math.random() * 6) + 1;
            result += val;

            const die = document.createElement('div');
            die.className = 'die die-base rolling';
            die.style.setProperty('--delay', i * 100);
            die.innerText = (val === 6) ? '☢' : (val === 1 ? '☣' : val);
            arena.appendChild(die);
        }

        // Show concatenated result in a special badge
        const resBadge = document.createElement('div');
        resBadge.style.cssText = "width: 100%; text-align: center; font-size: 3rem; color: var(--accent); font-family: 'Teko', sans-serif; margin-top: 10px; border-top: 1px solid #333; padding-top: 5px;";
        resBadge.innerText = "RESULTADO: " + result;
        arena.appendChild(resBadge);
    }
}

function toggleNav() {
    const navLinks = document.getElementById('nav-links');
    if (navLinks) {
        navLinks.classList.toggle('show');
    }
}

