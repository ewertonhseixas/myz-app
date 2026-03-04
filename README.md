# Mutant: Ano Zero - Terminal da Zona ☢️

O **Terminal da Zona** é uma ferramenta digital completa e imersiva para auxiliar jogadores e mestres do RPG **Mutant: Ano Zero**. Desenvolvido com uma estética *retro-futurista pós-apocalíptica*, o aplicativo automatiza as mecânicas do sistema, permitindo que o foco permaneça na narrativa e na sobrevivência.

## 🔗 Acesse Agora
O aplicativo está pronto para uso direto no navegador:
👉 **[Acesse o Terminal Central](index.html)**

---

## 🛠️ Módulos do Sistema

### 🎲 Dice Roller Inteligente (`roller.html`)
Simulador de dados otimizado que segue estritamente as regras de Mutant: Year Zero:
- **Separação de Pools:** Dados de Atributo (Amarelo), Perícia (Verde) e Item (Preto).
- **Mecânica de Forçar (Push):** Mantém automaticamente os sucessos (☢️) e falhas críticas (☣️ ou 💥), permitindo a rolagem apenas dos dados seguros.
- **Log em Tempo Real:** Registro detalhado e histórico de rolagens.

### 👤 Hub de Personagens (`personagens.html`)
Ficha de personagem dinâmica com banco de dados 100% sincronizado:
- **Dados Oficiais:** Mutações, Talentos, Perícias e Equipamentos atualizados conforme os livros base.
- **Atributos & Traumas:** Controle de danos e recuperação de Força, Agilidade, Astúcia e Empatia.
- **Progressão:** Gestão de Experiência (limite de 15), Pontos de Mutação (PM) e Podridão (ROT).
- **Inventário Automático:** Sistema de carga baseado na força com pesos oficiais (Pequeno, Leve, Normal, Pesado).

### 🏗️ Gestão da Arca (`arca.html`)
Painel de controle comunitário para a sobrevivência da colônia:
- **Níveis de DEV:** Acompanhamento de Comida, Cultura, Tecnologia e Guerra.
- **Galeria de Projetos:** Banco de dados completo de projetos oficiais com requisitos de DEV e bônus.
- **Multiplicador de Trabalho:** Sistema automático que escala a dificuldade dos projetos baseado no número de jogadores.
- **Demografia:** Controle de população e recursos básicos.

### 🗺️ Mapa da Zona (`mapa.html`)
Grade interativa para exploração e registro da Zona:
- **Setores Customizáveis:** Registro de Nível de Podridão, Ameaças e Pontos de Interesse.
- **Feedback Visual:** Cores dinâmicas baseadas no risco do setor.

---

## 📂 Estrutura do Projeto

- `/` : Arquivos HTML principais (módulos).
  - Inclui a nova **Barra de Navegação Superior (Top Nav)** interativa e responsiva em todas as subpáginas (Roller, Personagens, Arca, Mapa e Encontros).
- `/js` : Lógica do sistema, dados de referência e persistência.
  - O Hub de Personagens agora inicia no prático formato de visualização em **Cards** por padrão, oferecendo visão rápida de atributos e destaques.
- `/css` : Folhas de estilo com estética CRT e responsividade.
- `/assets` : Recursos visuais e mídias.
- `/reference_data` : Documentos originais usados na sincronização do banco de dados.

---

## 💻 Especificações Técnicas

- **Tecnologias:** HTML5, CSS3 (Vanilla) e JavaScript (ES6+).
- **Estética:** Design CRT retro-tech, Dark Mode por padrão e micro-animações.
- **Responsividade:** Totalmente otimizado para Desktop, Tablet e Mobile.
- **Persistência:** Salvamento automático via `localStorage` (sem necessidade de servidor).

---

## 📜 Regras de Dados (Free League)

| Dado | Cor | Sucesso (6) | Falha (1) | Consequência |
| :--- | :--- | :---: | :---: | :--- |
| **Atributo** | Amarelo | ☢️ | ☣️ | Trauma ao Forçar |
| **Perícia** | Verde | ☢️ | - | Operação Segura |
| **Item** | Preto | ☢️ | 💥 | Dano ao Equip. ao Forçar |

---

**Desenvolvido por:** [ewertonhseixas](https://github.com/ewertonhseixas)  
*Este é um projeto de fã, não oficial. Mutant: Year Zero é propriedade da Free League Publishing.*
