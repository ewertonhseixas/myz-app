let diceState = [];
let hasPushed = false;
let characters = [];
let selectedChar = null;

document.addEventListener("DOMContentLoaded", () => {
    loadCharacters();
    renderCharacterSelection();
    atualizarPericias(); // Initial load
});

function loadCharacters() {
    const saved = localStorage.getItem("myz_characters");
    if (saved) {
        characters = JSON.parse(saved);
    }
}

function renderCharacterSelection() {
    const select = document.getElementById("select-character");
    characters.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.innerText = c.name + (c.type === 'npc' ? ' (NPC)' : '');
        select.appendChild(opt);
    });
}

function selecionarPersonagem(id) {
    selectedChar = characters.find(c => c.id == id) || null;

    // Reset selectors
    document.getElementById("select-attribute").value = "";
    document.getElementById("qty-base").value = 0;
    document.getElementById("qty-skill").value = 0;
    document.getElementById("qty-gear").value = 0;

    renderCharacterSelection();
    atualizarPericias();
    atualizarEquipamentos();
    renderizarDicas();
}

function renderizarDicas() {
    const tipsArea = document.getElementById("char-tips-area");
    const tipsList = document.getElementById("char-tips-list");

    if (!selectedChar || ((selectedChar.talents || []).length === 0 && (selectedChar.mutations || []).length === 0)) {
        tipsArea.style.display = "none";
        return;
    }

    tipsArea.style.display = "block";
    tipsList.innerHTML = "";

    // Talentos
    (selectedChar.talents || []).forEach(t => {
        const item = document.createElement("div");
        item.className = "stunt-item";
        item.style.borderColor = "var(--accent)";
        item.innerHTML = `<strong>${t.name.toUpperCase()}:</strong> ${t.desc || 'Sem detalhes.'}`;
        tipsList.appendChild(item);
    });
}

function atualizarPericias() {
    const attr = document.getElementById("select-attribute").value;
    const skillSelect = document.getElementById("select-skill");

    // Reset skill selection and value
    skillSelect.value = "";
    document.getElementById("qty-skill").value = 0;

    skillSelect.innerHTML = '<option value="">Selecione...</option>';

    if (selectedChar) {
        // Update Base Qty based on selected attribute
        if (attr) {
            document.getElementById("qty-base").value = selectedChar.stats[attr] || 0;
        } else {
            document.getElementById("qty-base").value = 0;
        }

        // Get Special skill for role
        const role = selectedChar.role.toLowerCase();
        const mySpec = SPECIALIST_SKILLS[role];

        // 1. My Special
        if (mySpec && (!attr || mySpec.attr === attr)) {
            const val = selectedChar.skills.especialista || 0;
            appendSkillOption(skillSelect, mySpec.name, 'especialista', val, true);
        }

        // 2. Basics
        BASIC_SKILLS.filter(s => !attr || s.attr === attr)
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach(s => {
                const val = selectedChar.skills[s.id] || 0;
                appendSkillOption(skillSelect, s.name, s.id, val, false);
            });

        // 3. Other Specials (only if no attribute filter or matches)
        const otherSpecs = Object.keys(SPECIALIST_SKILLS)
            .filter(r => r !== role)
            .map(r => SPECIALIST_SKILLS[r]);

        otherSpecs.filter(s => !attr || s.attr === attr)
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach(s => {
                const val = selectedChar.skills[s.id] || 0;
                appendSkillOption(skillSelect, s.name, s.id, val, true);
            });
    } else {
        // Manual mode: Show all basics
        if (!attr) document.getElementById("qty-base").value = 0;

        BASIC_SKILLS.filter(s => !attr || s.attr === attr)
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach(s => {
                appendSkillOption(skillSelect, s.name, s.id, 0, false);
            });
    }
}

function appendSkillOption(select, name, id, val, isSpecial) {
    const opt = document.createElement("option");
    opt.value = id;
    opt.dataset.val = val;
    opt.innerText = name + (isSpecial ? ' (ESP)' : '');
    select.appendChild(opt);
}

function atualizarValorPericia() {
    const select = document.getElementById("select-skill");
    const skillId = select.value;
    const opt = select.options[select.selectedIndex];
    const qtyInput = document.getElementById("qty-skill");

    if (!skillId) {
        qtyInput.value = 0;
        return;
    }

    // Find which attribute matches this skill
    let attrId = '';
    const skillBase = BASIC_SKILLS.find(s => s.id === skillId);
    if (skillBase) {
        attrId = skillBase.attr;
    } else {
        // Check if it's a specialist skill
        for (const role in SPECIALIST_SKILLS) {
            if (SPECIALIST_SKILLS[role].id === skillId || skillId === 'especialista') {
                attrId = SPECIALIST_SKILLS[role].attr;
                break;
            }
        }
    }

    if (attrId) {
        const attrSelect = document.getElementById("select-attribute");
        if (attrSelect.value !== attrId) {
            attrSelect.value = attrId;
            atualizarPericias(); // Re-populate skills list with the new attribute filter
            document.getElementById("select-skill").value = skillId; // Restore selected skill
        }
    }

    if (opt) {
        qtyInput.value = opt.dataset.val || 0;
    }
}

function atualizarEquipamentos() {
    const select = document.getElementById("select-gear");
    select.innerHTML = '<option value="0">Sem Equipamento</option>';
    if (selectedChar && selectedChar.inventory) {
        selectedChar.inventory.filter(i => (i.bonus || i.dice || 0) > 0).forEach(i => {
            const val = i.bonus || i.dice || 0;
            const opt = document.createElement("option");
            opt.value = val;
            opt.innerText = i.name;
            select.appendChild(opt);
        });
    }
}

function atualizarValorEquip() {
    const select = document.getElementById("select-gear");
    if (select.value == "0") {
        document.getElementById("qty-gear").value = 0;
    } else if (selectedChar && select.value) {
        document.getElementById("qty-gear").value = select.value;
    }
}

function modificarDado(tipo, valor) {
    const input = document.getElementById(`qty-${tipo}`);
    let num = parseInt(input.value) + valor;

    // Dimensões de modificadores costumam ser menores (-10 a +10)
    if (tipo === 'modifier') {
        if (num < -10) num = -10;
        if (num > 10) num = 10;
    } else {
        if (num < 0) num = 0;
        if (num > 20) num = 20;
    }
    input.value = num;
}

// STEP TRANSITIONS
function irParaModificadores() {
    // Deprecated step, rolling directly
    rolarDados(false);
}

function voltarParaSelecao() {
    document.getElementById('step-3-results').style.display = 'none';
    document.getElementById('step-1-selection').style.display = 'block';
    document.querySelector('header').style.display = 'block';
    window.scrollTo(0, 0);
}

function novaRolagem() {
    document.getElementById('step-3-results').style.display = 'none';
    document.getElementById('step-1-selection').style.display = 'block';
    document.querySelector('header').style.display = 'block';
    // Clear dice but keep selection
    diceState = [];
    hasPushed = false;
    document.getElementById('qty-modifier').value = 0;
    renderArena();
    updatePanel();
    updateButtons();
    window.scrollTo(0, 0);
}

function rolarDados(isPush) {
    if (!isPush) {
        diceState = [];
        hasPushed = false;
        document.getElementById("stunts-section").style.display = "none";

        const qBase = parseInt(document.getElementById('qty-base').value);
        const qSkill = parseInt(document.getElementById('qty-skill').value);
        const qGear = parseInt(document.getElementById('qty-gear').value);
        const qMod = parseInt(document.getElementById('qty-modifier').value);

        // Add Base dice
        for (let i = 0; i < qBase; i++) diceState.push({ type: 'base', value: 0, locked: false });

        // Add Skill dice
        for (let i = 0; i < qSkill; i++) diceState.push({ type: 'skill', value: 0, locked: false });

        // Add Modifier dice (Separate pool)
        if (qMod > 0) {
            for (let i = 0; i < qMod; i++) diceState.push({ type: 'mod-plus', value: 0, locked: false });
        } else if (qMod < 0) {
            const qNeg = Math.abs(qMod);
            for (let i = 0; i < qNeg; i++) diceState.push({ type: 'mod-minus', value: 0, locked: false });
        }

        // Add Gear dice
        for (let i = 0; i < qGear; i++) diceState.push({ type: 'gear', value: 0, locked: false });

        // Change screen to Results
        document.getElementById('step-1-selection').style.display = 'none';
        document.getElementById('step-3-results').style.display = 'block';
        document.querySelector('header').style.display = 'none';
        window.scrollTo(0, 0);
    } else {
        hasPushed = true;
        diceState.forEach(d => {
            if (d.type === 'base' && (d.value === 1 || d.value === 6)) d.locked = true;
            if (d.type === 'gear' && (d.value === 1 || d.value === 6)) d.locked = true;
            if (d.type === 'skill' && d.value === 6) d.locked = true;
            if (d.type === 'mod-plus' && d.value === 6) d.locked = true;
            if (d.type === 'mod-minus' && d.value === 6) d.locked = true;
        });
    }

    diceState.forEach(d => {
        if (!d.locked) d.value = Math.floor(Math.random() * 6) + 1;
    });

    renderArena();
    updatePanel();
    updateButtons();
    checkStunts();
    addRollToLog(isPush);
    updateImmediateLog();
}

function updateImmediateLog() {
    const logArea = document.getElementById("current-roll-log");
    const charName = selectedChar ? selectedChar.name : "Manual";
    const attrSelect = document.getElementById('select-attribute');
    const attrName = attrSelect.options[attrSelect.selectedIndex]?.text || "Base";
    const skillSelect = document.getElementById('select-skill');
    const skillName = skillSelect.options[skillSelect.selectedIndex]?.text || "Sem Perícia";
    const gearSelect = document.getElementById('select-gear');
    const gearOptionText = gearSelect.options[gearSelect.selectedIndex]?.text || "Sem Equipamento";

    const gearName = gearOptionText.includes(']') ? gearOptionText.split(']')[1].trim() : gearOptionText;

    const qBase = parseInt(document.getElementById('qty-base').value);
    const qSkill = parseInt(document.getElementById('qty-skill').value);
    const qGear = parseInt(document.getElementById('qty-gear').value);
    const qMod = parseInt(document.getElementById('qty-modifier').value);

    let html = `<strong style="color:var(--accent)">${charName.toUpperCase()}</strong> ${hasPushed ? '<span style="color:var(--danger)"> (PUSH)</span>' : ''}<br>`;

    html += `<span style="color:var(--color-base)">${attrName} (${qBase})</span> + `;
    html += `<span style="color:var(--color-skill)">${skillName} (${qSkill})</span> + `;
    html += `<span style="color:var(--color-gear)">${gearName} (${qGear})</span>`;

    if (qMod !== 0) {
        const modColor = qMod > 0 ? '#ffffff' : '#ff4d4d';
        html += ` <span style="color:${modColor}; font-weight:bold;"> [MOD: ${qMod > 0 ? '+' : ''}${qMod}]</span>`;
    }

    logArea.innerHTML = html;
}

function checkStunts() {
    let s = 0, negS = 0;
    diceState.forEach(d => {
        if (d.type === 'mod-minus') {
            if (d.value === 6) negS++;
        } else {
            if (d.value === 6) s++;
        }
    });

    let finalS = Math.max(0, s - negS);

    const stuntPanel = document.getElementById("stunts-section");
    if (finalS > 1) {
        const skillId = document.getElementById("select-skill").value;
        const stunts = STUNTS_DATA[skillId] || STUNTS_DATA[getMappedSkillId(skillId)] || [];

        if (stunts.length > 0) {
            stuntPanel.style.display = "block";
            document.getElementById("stunt-count").innerText = finalS - 1;
            const list = document.getElementById("stunts-list");
            list.innerHTML = "";
            stunts.forEach(stunt => {
                const item = document.createElement("div");
                item.className = "stunt-item";
                item.innerText = stunt;
                list.appendChild(item);
            });
        }
    } else {
        stuntPanel.style.display = "none";
    }
}

function getMappedSkillId(id) {
    // Specialist ID mapping if necessary
    if (id === 'especialista' && selectedChar) {
        const role = selectedChar.role.toLowerCase();
        return SPECIALIST_SKILLS[role]?.id || '';
    }
    return id;
}

function renderArena() {
    const arena = document.getElementById('dice-arena');
    arena.innerHTML = '';
    if (hasPushed) {
        arena.classList.remove('arena-unpushed');
        arena.classList.add('arena-pushed');
    } else {
        arena.classList.remove('arena-pushed');
        if (diceState.length > 0) arena.classList.add('arena-unpushed');
    }

    diceState.forEach(d => {
        const div = document.createElement('div');
        div.className = `die die-${d.type} ${d.locked ? 'locked' : 'rolling'}`;
        div.dataset.value = d.value;
        div.style.setProperty('--delay', Math.random() * 200);

        let displayVal = d.value;
        if (d.value === 6) displayVal = '☢';
        if (d.value === 1 && (d.type === 'base' || d.type === 'gear')) {
            displayVal = d.type === 'base' ? '☣' : '⚡';
        }
        div.innerText = displayVal;
        arena.appendChild(div);
    });
}

function updatePanel() {
    let s = 0, t = 0, g = 0, negS = 0;
    diceState.forEach(d => {
        if (d.type === 'mod-minus') {
            if (d.value === 6) negS++;
        } else {
            if (d.value === 6) s++;
        }

        if (hasPushed) {
            if (d.type === 'base' && d.value === 1) t++;
            if (d.type === 'gear' && d.value === 1) g++;
        }
    });

    // Annulling successes with negative dice ☢️
    let finalS = Math.max(0, s - negS);

    const sEl = document.getElementById('counter-success');
    const tEl = document.getElementById('counter-trauma');
    const dEl = document.getElementById('counter-damage');

    sEl.innerText = finalS;
    tEl.innerText = hasPushed ? t : (diceState.length > 0 ? '-' : '0');
    dEl.innerText = hasPushed ? g : (diceState.length > 0 ? '-' : '0');

    // Highlighting prominent results
    sEl.style.transform = finalS > 0 ? 'scale(1.2)' : 'scale(1)';
    sEl.style.textShadow = finalS > 0 ? '0 0 15px var(--success)' : 'none';

    if (hasPushed) {
        tEl.style.transform = t > 0 ? 'scale(1.2)' : 'scale(1)';
        tEl.style.textShadow = t > 0 ? '0 0 15px var(--danger)' : 'none';
        dEl.style.transform = g > 0 ? 'scale(1.2)' : 'scale(1)';
        dEl.style.textShadow = g > 0 ? '0 0 15px var(--danger)' : 'none';
    }
}

function updateButtons() {
    const pushBtn = document.getElementById('btn-push');
    if (hasPushed || diceState.length === 0) {
        pushBtn.disabled = true;
    } else {
        let canPush = diceState.some(d => {
            if (d.type === 'base' && (d.value === 1 || d.value === 6)) return false;
            if (d.type === 'gear' && (d.value === 1 || d.value === 6)) return false;
            if (d.type === 'skill' && d.value === 6) return false;
            if (d.type === 'mod-plus' && d.value === 6) return false;
            if (d.type === 'mod-minus' && d.value === 6) return false;
            return true;
        });
        pushBtn.disabled = !canPush;
    }
}

function toggleModal() {
    document.getElementById('rules-modal').classList.toggle('active');
}

function limpar() {
    document.getElementById("select-character").value = "";
    document.getElementById("select-attribute").value = "";
    document.getElementById("select-skill").innerHTML = '<option value="">Selecione...</option>';
    document.getElementById("select-gear").innerHTML = '<option value="">Selecione...</option>';
    document.getElementById('qty-base').value = 0;
    document.getElementById('qty-skill').value = 0;
    document.getElementById('qty-gear').value = 0;
    document.getElementById('qty-modifier').value = 0;
    diceState = [];
    hasPushed = false;
    selectedChar = null;
    document.getElementById("stunts-section").style.display = "none";
    document.getElementById("char-tips-area").style.display = "none";
    document.getElementById('step-1-selection').style.display = 'block';
    document.getElementById('step-2-modifiers').style.display = 'none';
    document.getElementById('step-3-results').style.display = 'none';
    renderArena();
    updatePanel();
    updateButtons();
}

// LOGGING SYSTEM
function toggleLogModal() {
    const modal = document.getElementById("log-modal");
    const active = modal.classList.toggle("active");
    toggleNoScroll(active);
    if (active) renderLog();
}

function addRollToLog(isPush) {
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const charName = selectedChar ? selectedChar.name : "Manual";
    const attrName = document.getElementById('select-attribute').value || "---";
    const skillSelect = document.getElementById('select-skill');
    const skillName = skillSelect.options[skillSelect.selectedIndex]?.text || "---";
    const gearSelect = document.getElementById('select-gear');
    const gearName = gearSelect.options[gearSelect.selectedIndex]?.text || "---";
    const situMod = document.getElementById('qty-modifier').value;

    let s = 0, t = 0, g = 0, negS = 0;
    diceState.forEach(d => {
        if (d.type === 'mod-minus') {
            if (d.value === 6) negS++;
        } else {
            if (d.value === 6) s++;
        }

        if (hasPushed) {
            if (d.type === 'base' && d.value === 1) t++;
            if (d.type === 'gear' && d.value === 1) g++;
        }
    });

    const finalS = Math.max(0, s - negS);

    const rollData = {
        timestamp: now.getTime(),
        date: dateStr,
        time: timeStr,
        character: charName,
        attribute: attrName,
        skill: skillName,
        gear: gearName,
        modifier: situMod,
        successes: finalS,
        trauma: t,
        damage: g,
        isPush: isPush
    };

    let history = JSON.parse(localStorage.getItem('myz_roll_history') || '[]');
    history.unshift(rollData);
    if (history.length > 50) history.pop(); // Limit to 50
    localStorage.setItem('myz_roll_history', JSON.stringify(history));
}

function renderLog() {
    const list = document.getElementById('roll-log-list');
    const history = JSON.parse(localStorage.getItem('myz_roll_history') || '[]');

    if (history.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #666;">Nenhuma rolagem registrada ainda.</p>';
        return;
    }

    list.innerHTML = history.map(h => `
        <div style="background: rgba(0,0,0,0.4); border: 1px solid #333; padding: 10px; border-radius: 5px; font-size: 0.85rem;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #222; margin-bottom: 5px; padding-bottom: 2px;">
                <span style="color: var(--accent); font-weight: bold;">${h.character.toUpperCase()} ${h.isPush ? '(PUSH)' : ''}</span>
                <span style="color: #666; font-size: 0.7rem;">${h.date} ${h.time}</span>
            </div>
            <div style="color: #aaa; margin-bottom: 5px;">
                ${h.attribute.toUpperCase()} + ${h.skill} + ${h.gear} (MOD: ${h.modifier})
            </div>
            <div style="display: flex; gap: 15px;">
                <span style="color: var(--success);">☢ ${h.successes}</span>
                <span style="color: var(--danger);">☣ ${h.trauma}</span>
                <span style="color: var(--color-gear);">⚡ ${h.damage}</span>
            </div>
        </div>
    `).join('');
}

function limparLog() {
    if (confirm("Deseja realmente apagar todo o histórico de rolagens?")) {
        localStorage.removeItem('myz_roll_history');
        renderLog();
    }
}
