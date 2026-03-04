let characters = [];
let currentCharacterId = null;
let hubViewMode = 'details'; // 'card' ou 'details'

const TALENTS_BASE = {
    "Adestrador de Cães": [
        {
            "name": "Cão de Briga",
            "desc": "Concede modificação +2 ao usar o cão para a perícia Lutar"
        },
        {
            "name": "Melhor Amigo do Mutante",
            "desc": "O cão pode ajudar o dono a Suportar e Mover, usando a perícia Incitar Cachorro e os atributos do cão"
        },
        {
            "name": "Sabujo",
            "desc": "Concede modificação +2 ao usar o cão para a perícia Incitar Cachorro com o objetivo de rastrear"
        }
    ],
    "Batedor": [
        {
            "name": "Caçador de Monstros",
            "desc": "Concede modificação +2 ao usar a perícia Observar contra feras"
        },
        {
            "name": "Catador",
            "desc": "Concede modificação +2 na perícia Encontrar o Caminho para localizar artefatos no setor em vez de ameaças"
        },
        {
            "name": "Podrid&ocirc;metro",
            "desc": "Permite uma nova proeza em Encontrar o Caminho: encontrar rotas que reduzem o nível de Podridão do setor em 1 durante a visita"
        }
    ],
    "Brutamonte": [
        {
            "name": "Atravessar",
            "desc": "Permite usar a perícia Mover baseando-se no atributo Força em vez de Agilidade"
        },
        {
            "name": "Golpe Surpresa",
            "desc": "O dano de ataques desarmados sobe de 1 para 2"
        },
        {
            "name": "Jeitinho Meigo",
            "desc": "Ao usar a perícia Intimidar, a vítima sofre +1 ponto adicional de dúvida"
        }
    ],
    "Chefão": [
        {
            "name": "Chantagista",
            "desc": "Concede modificação +2 na perícia Comandar para extorsão na Arca"
        },
        {
            "name": "Comandante",
            "desc": "Concede modificação +2 na perícia Comandar ao enviar a gangue para lutar no seu lugar"
        },
        {
            "name": "Pistoleiros",
            "desc": "Garante armas sucateadas e munição básica para todos os membros da gangue enquanto estiverem na Arca"
        }
    ],
    "Cronista": [
        {
            "name": "Agitador",
            "desc": "Concede modificação +2 ao usar a perícia Inspirar em alguém para as perícias Lutar ou Atirar"
        },
        {
            "name": "Artista",
            "desc": "Permite rolar Inspirar na Arca; cada ☢ concede D6 balas ou rações de grude"
        },
        {
            "name": "Serra-osso",
            "desc": "Concede modificação +2 na perícia Curar para tratar ferimentos graves (não se aplica a traumas comuns)"
        }
    ],
    "Engenhoqueiro": [
        {
            "name": "Inventor",
            "desc": "Concede modificação +2 na perícia Fazer Gambiarra para criar novos dispositivos"
        },
        {
            "name": "Remendador",
            "desc": "Concede modificação +2 na perícia Fazer Gambiarra para consertar equipamentos"
        },
        {
            "name": "Tunador",
            "desc": "Oferece +1 de modificação ao usar veículos para Lutar ou Mover, e para consertá-los/modificá-los"
        }
    ],
    "Escravo": [
        {
            "name": "Cínico",
            "desc": "Concede modificação +2 na perícia Superar apenas quando sofre o trauma Dúvida"
        },
        {
            "name": "Rebelde",
            "desc": "Cada ☢ obtido na perícia Superar gera modificação +1 para a sua próxima ação"
        },
        {
            "name": "Resiliente",
            "desc": "Concede modificação +2 na perícia Superar apenas quando sofre o trauma Dano"
        }
    ],
    "Negociante": [
        {
            "name": "Crápula",
            "desc": "Ao usar a perícia Manipular, a vítima sofre +1 ponto adicional de dúvida"
        },
        {
            "name": "Informação Importante",
            "desc": "O personagem possui informações incriminatórias sobre um PNJ importante"
        },
        {
            "name": "Trambiqueiro",
            "desc": "Ao usar a perícia Fazer um Trato para acordos paralelos, recebe o dobro da mercadoria"
        }
    ],
    "Gerais": [
        {
            "name": "Açougueiro",
            "desc": "Permite extrair rações de grude (contaminado) de carcaças de monstros igual à Força original da criatura"
        },
        {
            "name": "Admirador",
            "desc": "Um PNJ se torna um seguidor leal que fará qualquer coisa para ajudar"
        },
        {
            "name": "Aritmética Pessoal",
            "desc": "Permite usar a perícia Sentir Emoções baseando-se no atributo Astúcia em vez de Empatia"
        },
        {
            "name": "Arqueólogo",
            "desc": "Concede modificação +2 na perícia Compreender sobre prédios e instalações da Velha Era"
        },
        {
            "name": "Assassino",
            "desc": "Causa +1 de dano extra ao acertar um tiro em alcance Perto ou Alcance das Mãos"
        },
        {
            "name": "Bom Jogo de Pernas",
            "desc": "Concede modificação +2 ao se defender em combate corpo a corpo"
        },
        {
            "name": "Burro de Carga",
            "desc": "Permite carregar o dobro de objetos sem sofrer sobrecarga"
        },
        {
            "name": "Cabeça Fria",
            "desc": "Permite usar a perícia Mover baseando-se no atributo Astúcia em vez de Agilidade"
        },
        {
            "name": "Combatente Veterano",
            "desc": "Soma +2 na iniciativa e permite gastar uma manobra para aumentar a iniciativa em mais +2 durante o combate"
        },
        {
            "name": "Conselheiro",
            "desc": "Alvos ajudados por você recebem +1 adicional de modificação se seguirem suas ordens"
        },
        {
            "name": "Covarde",
            "desc": "Permite rolar Mover para usar um amigo como cobertura e fazê-lo levar o tiro no seu lugar"
        },
        {
            "name": "Cozinheiro da Zona",
            "desc": "Permite rolar Conhecer a Zona para purificar D6 rações de grude ou água por cada ☢"
        },
        {
            "name": "Especialista em Arma",
            "desc": "Concede modificação +2 com um tipo específico de arma escolhido"
        },
        {
            "name": "Estóico",
            "desc": "Permite usar a perícia Suportar baseando-se no atributo Astúcia em vez de Força"
        },
        {
            "name": "Est&ocirc;mago de Passarinho",
            "desc": "Só precisa comer grude uma vez a cada dois dias para evitar perda de Força"
        },
        {
            "name": "Faz-Tudo",
            "desc": "Permite adotar um novo papel, ganhando nível 1 na nova perícia de especialista (exige 3 talentos prévios)"
        },
        {
            "name": "Franco Atirador",
            "desc": "Causa +1 de dano extra ao acertar um tiro em alcance Longo ou Distante"
        }
    ]
};

const MUTATIONS_BASE = {
    "11": {
        "name": "Anfíbio",
        "desc": "Corpo com traços de peixes e répteis. Respirar embaixo d'água (1 PM); Usar escamas para eliminar dano sofrido (1 PM por ponto); Morder inimigo (Dano = PM gastos)"
    },
    "12": {
        "name": "Asas de Inseto",
        "desc": "Asas de mosca ou borboleta nas costas. Voar até 30m (1 PM); Voar até inimigo e lutar no mesmo turno (1 PM + manobra); Zumbido que causa 1 ponto de dúvida por PM gasto"
    },
    "13": {
        "name": "Cuspe &Aacute;cido",
        "desc": "Glândulas bucais que geram ácido potente. Cuspir ácido (1 PM, causa 1 dano imediato + 1 por turno); Derreter barras/cordas metálicas (1 PM); Abrir fechaduras simples (1 PM)"
    },
    "14": {
        "name": "Esporos",
        "desc": "Sacos de esporos ocultos no corpo. Ardor nos olhos da vítima (1 PM = 1 fadiga); Feder horrivelmente para causar náusea (1 PM = 1 dano); Ocultar-se na nuvem para fugir (1 PM)"
    },
    "15": {
        "name": "Homem-Fera",
        "desc": "Metade humano, metade fera selvagem. Atacar com presas e garras (Dano = PM gastos); Rugido bestial (1 PM = 1 dúvida por inimigo); Recuperar pontos de trauma quando acabado (1 PM por ponto)"
    },
    "16": {
        "name": "&Iacute;mã Humano",
        "desc": "Habilidade de gerar campos magnéticos. Afastar ou atrair objetos metálicos leves (1 PM); Arremessar objetos de metal (Dano = PM gastos); Proteger-se de balas metálicas (1 PM reduz dano em 1)"
    },
    "21": {
        "name": "Insetóide",
        "desc": "Corpo com traços do mundo dos insetos. Usar pele endurecida para reduzir dano (1 PM reduz dano em 1); Escalar superfícies verticais (1 PM); Curar 1 ponto de dano (1 PM)"
    },
    "22": {
        "name": "Luminescência",
        "desc": "Habilidade natural de emitir luz. Lampejo cegante (1 PM = cegueira por 1 turno); Iluminar área (1 PM); Dobrar a luz para se ocultar e fugir sem rolar Mover (1 PM)"
    },
    "23": {
        "name": "Necrófago",
        "desc": "Metabolismo e mandíbulas robustas. Comer carne crua sem receber pontos de Podridão (1 PM); Morder vítima (Dano = PM gastos)"
    },
    "24": {
        "name": "Papa-Podridão",
        "desc": "Insensibilidade aos efeitos da Podridão. Eliminar ponto de trauma por Podridão (1 PM); Usar Ponto de Podridão para recuperar qualquer trauma (1 PM); Emitir podridão concentrada (1 PM = 1 dano, gasta Ponto de Podridão)"
    },
    "25": {
        "name": "Parasita",
        "desc": "Absorve energia vital de humanoides. Roubar pontos de atributo do alvo (1 PM = 1 ponto); Roubar mutação de outro por 1 turno (1 PM); Curar trauma de outro sofrendo o mesmo trauma (1 PM por ponto)"
    },
    "26": {
        "name": "Patocinese",
        "desc": "Habilidade de afetar o estado emocional alheio. Causar medo e ansiedade (1 PM = 1 dúvida); Curar ponto de dúvida por toque (1 PM); Afetar o humor geral de um grupo (1 PM)"
    },
    "31": {
        "name": "Pernas de Rã",
        "desc": "Músculos poderosos para saltos. Salto longo ou alto (1 PM); Saltar no inimigo e lutar no mesmo turno (1 PM + manobra); Saltar para fugir de conflito (1 PM)"
    },
    "32": {
        "name": "Pirocinese",
        "desc": "Habilidade de atear fogo com a mente. Atear fogo a objeto inflamável (1 PM); Fazer ser vivo entrar em chamas (1 PM = 1 dano); Derreter gelo ou aquecer área gelada (1 PM)"
    },
    "33": {
        "name": "Planta Humana",
        "desc": "Corpo com traços do mundo vegetal. Nutrição solar em vez de grude (1 PM); Espinhos corporais em combate (Dano = PM gastos); Pele de casca reduz dano (1 PM reduz dano em 1)"
    },
    "34": {
        "name": "Quatro Braços",
        "desc": "Possui quatro braços funcionais. Lutar duas vezes no mesmo turno (1 PM + manobra); Defender-se contra vários ataques (1 PM por defesa extra); Escalar com facilidade (1 PM em vez de rolar Mover)"
    },
    "35": {
        "name": "Rastreador",
        "desc": "Sentido de olfato hiperdesenvolvido. Seguir rastros (1 PM por dia); Sentir inimigo se esgueirando (1 PM remove 1 sucesso do inimigo); Farejar grude na Zona (1 PM = D6 rações contaminadas)"
    },
    "36": {
        "name": "Reflexos Extremos",
        "desc": "Reações em velocidade sobre-humana. Esquivar-se de ataques reduzindo dano (1 PM reduz dano em 1); Lutar ou Atirar várias vezes no turno (1 PM por ataque extra)"
    },
    "41": {
        "name": "Reptiliano",
        "desc": "Corpo com traços de répteis. Mudar cor da pele (1 PM = sucesso automático em Esgueirar); Contorcer corpo para passar por frestas (1 PM); Hipnotizar com os olhos (1 PM = 1 confusão)"
    },
    "42": {
        "name": "Sonar",
        "desc": "Emissão e percepção de ondas de som. Ver na escuridão absoluta (1 PM); Atordoar inimigos (1 PM = 1 fadiga por vítima); Atrapalhar tiros inimigos (1 PM remove 1 sucesso); B&ocirc;nus de Iniciativa (+2 por PM)"
    },
    "43": {
        "name": "Sopro de Fogo",
        "desc": "V&ocirc;mito de gases em ignição. Atear fogo a objetos (1 PM); Vomitar fogo em um inimigo (Dano = PM gastos); Soprar fogo em vários inimigos (1 PM = 1 dano em cada)"
    },
    "44": {
        "name": "Telepatia",
        "desc": "Ler e afetar mentes humanoides. Obter respostas mentais (1 PM por pergunta); Plantar um pensamento simples na mente do alvo (1 PM)"
    },
    "45": {
        "name": "Terror Mental",
        "desc": "Cria alucinações vívidas e paralisantes. Causar confusão ou dúvida (Dano = PM gastos); Fazer alvo perder a próxima ação (1 PM por vítima); Criar ilusão grandiosa (2 PM)"
    },
    "46": {
        "name": "Titeriteiro",
        "desc": "Assumir controle de outras criaturas. Decidir a próxima ação da vítima (1 PM); Forçar a vítima a se ferir (Dano da arma + PM gastos)"
    },
    "51": {
        "name": "Velocista",
        "desc": "Velocidade extrema em curtas distâncias. Mover o dobro do deslocamento no turno (1 PM); Escapar de conflito automaticamente (1 PM)"
    }
};

const EQUIPMENT_BASE = {
    "Acendedor": {
        "weight": "leve",
        "cost": "1",
        "desc": "Para acender tochas e lanternas"
    },
    "Água Limpa (Ra&ccedil;&atilde;o)": {
        "weight": "pequeno",
        "cost": "1/2",
        "desc": "Restaura Agilidade"
    },
    "Arco": {
        "weight": "normal",
        "cost": "1-2",
        "desc": "B&ocirc;nus +1, alcance Longo, dano 1",
        "bonus": 1,
        "damage": 1,
        "range": "Longo"
    },
    "Bast&atilde;o com Espinhos": {
        "weight": "normal",
        "cost": "1-2",
        "desc": "B&ocirc;nus +2, dano 2"
    },
    "Bin&oacute;culos Sucateados": {
        "weight": "leve",
        "cost": "3-6",
        "desc": "B&ocirc;nus +1 para Observar"
    },
    "Birita (Dose)": {
        "weight": "normal",
        "cost": "1/4",
        "desc": "Garrafa cont&eacute;m 10 doses"
    },
    "Botas": {
        "weight": "normal",
        "cost": "1-2",
        "desc": "B&ocirc;nus +1 para Suportar jornadas"
    },
    "Canh&atilde;o Sucateado": {
        "weight": "normal",
        "cost": "10+",
        "desc": "B&ocirc;nus +1, Longo, dano 4",
        "bonus": 1,
        "damage": 4,
        "range": "Longo"
    },
    "Cobertor": {
        "weight": "normal",
        "cost": "1",
        "desc": "B&ocirc;nus +2 para Suportar frio"
    },
    "Corda": {
        "weight": "normal",
        "cost": "1",
        "desc": "B&ocirc;nus +2 para Mover (escalar)"
    },
    "Derringer": {
        "weight": "leve",
        "cost": "3-6",
        "desc": "B&ocirc;nus +1, Perto, dano 1"
    },
    "Estilingue": {
        "weight": "leve",
        "cost": "1",
        "desc": "B&ocirc;nus +1, Curta, dano 1",
        "bonus": 1,
        "damage": 1,
        "range": "Curta"
    },
    "Faca Sucateada": {
        "weight": "leve",
        "cost": "1",
        "desc": "B&ocirc;nus +1, dano 2",
        "bonus": 1,
        "damage": 2,
        "range": "M&atilde;os"
    },
    "Ferramentas": {
        "weight": "normal",
        "cost": "1-2",
        "desc": "B&ocirc;nus +1 para Fazer Gambiarra"
    },
    "Grude (Ra&ccedil;&atilde;o)": {
        "weight": "pequeno",
        "cost": "1",
        "desc": "Restaura For&ccedil;a"
    },
    "Lan&ccedil;a-Chamas": {
        "weight": "pesado",
        "cost": "5-10",
        "desc": "B&ocirc;nus +1, Perto, dano 2"
    },
    "Pistola Sucateada": {
        "weight": "normal",
        "cost": "3-6",
        "desc": "B&ocirc;nus +1, Curta, dano 2",
        "bonus": 1,
        "damage": 2,
        "range": "Curta"
    },
    "Rifle Sucateado": {
        "weight": "normal",
        "cost": "4-8",
        "desc": "B&ocirc;nus +1, Longo, dano 2",
        "bonus": 1,
        "damage": 2,
        "range": "Longo"
    },
    "Traje Anti-Podrid&atilde;o": {
        "weight": "normal",
        "cost": "4-8",
        "desc": "N&iacute;vel de Prote&ccedil;&atilde;o 3"
    },
    "Corrente de Bicicleta": {
        "bonus": 1,
        "damage": 1,
        "range": "Perto",
        "weight": "normal"
    },
    "Desarmado": {
        "bonus": 0,
        "damage": 1,
        "range": "M&atilde;os",
        "weight": "normal"
    },
    "Fac&atilde;o": {
        "bonus": 2,
        "damage": 2,
        "range": "M&atilde;os",
        "weight": "normal"
    },
    "Lan&ccedil;a Sucateada": {
        "bonus": 1,
        "damage": 2,
        "range": "Perto",
        "weight": "normal"
    },
    "Machado Sucateado": {
        "bonus": 1,
        "damage": 3,
        "range": "M&atilde;os",
        "weight": "normal"
    },
    "Soqueira": {
        "bonus": 1,
        "damage": 1,
        "range": "M&atilde;os",
        "weight": "normal"
    },
    "Taco de Beisebol": {
        "bonus": 2,
        "damage": 1,
        "range": "M&atilde;os",
        "weight": "normal"
    },
    "Derringer Sucateada": {
        "bonus": 1,
        "damage": 1,
        "range": "Perto",
        "weight": "normal"
    },
    "Lan&ccedil;a-chamas": {
        "bonus": 1,
        "damage": 2,
        "range": "Perto",
        "weight": "normal"
    },
    "Pedra Arremessada": {
        "bonus": 0,
        "damage": 1,
        "range": "Curta",
        "weight": "normal"
    },
    "Arco Composto": {
        "bonus": 2,
        "damage": 1,
        "range": "Longo",
        "weight": "normal"
    },
    "Besta": {
        "bonus": 3,
        "damage": 1,
        "range": "Longo",
        "weight": "normal"
    },
    "Escopeta": {
        "bonus": 2,
        "damage": 3,
        "range": "Curta",
        "weight": "normal"
    },
    "Fuzil de Assalto": {
        "bonus": 3,
        "damage": 2,
        "range": "Longo",
        "weight": "normal"
    },
    "Katana": {
        "bonus": 3,
        "damage": 2,
        "range": "M&atilde;os",
        "weight": "normal"
    },
    "Pistola Semi-Autom&aacute;tica": {
        "bonus": 2,
        "damage": 2,
        "range": "Curta",
        "weight": "normal"
    },
    "Rev&oacute;lver": {
        "bonus": 3,
        "damage": 2,
        "range": "Curta",
        "weight": "normal"
    },
    "Rifle de Ca&ccedil;a": {
        "bonus": 2,
        "damage": 2,
        "range": "Longo",
        "weight": "normal"
    },
    "Serra El&eacute;trica": {
        "bonus": 2,
        "damage": 3,
        "range": "M&atilde;os",
        "weight": "normal"
    },
    "Sinalizador": {
        "bonus": 2,
        "damage": 2,
        "range": "Curta",
        "weight": "normal"
    },
    "Pistola Maser": {
        "bonus": 2,
        "damage": 3,
        "range": "Curta",
        "weight": "normal"
    }
};

const SKILLS_BASE = {
    "suportar": "Básica (Força). Proezas (por cada ☢ extra): Ajuda um amigo na mesma situação a não precisar rolar.",
    "impelir": "Básica (Força). Proezas (por cada ☢ extra): Arremessa objeto (+dano igual aos sucessos extras); revela passagem ou objeto escondido.",
    "lutar": "Básica (Força). Proezas (por cada ☢ extra): +1 de dano; causa fadiga; +2 na iniciativa; desarmar; derrubar/empurrar; agarrar.",
    "esgueirar": "Básica (Agilidade). Proezas (por cada ☢ extra): +1 de modificação no primeiro ataque de uma emboscada.",
    "mover": "Básica (Agilidade). Proezas (por cada ☢ extra): Ajuda um amigo a escapar de uma enrascada sem precisar rolar.",
    "atirar": "Básica (Agilidade). Proezas (por cada ☢ extra): +1 de dano; trava o inimigo (fadiga); +2 na iniciativa; desarmar; derrubar/empurrar.",
    "observar": "Básica (Astúcia). Proezas (por cada ☢ extra): Responde: Está vindo atrás de mim? Há mais deles? Como passo por aqui?.",
    "compreender": "Básica (Astúcia). Proezas (por cada ☢ extra): Você consegue ensinar outra pessoa a usar o artefato.",
    "conhecer a zona": "Básica (Astúcia). Proezas (por cada ☢ extra): Responde sobre a ameaça/fen&ocirc;meno: Como pode me ferir? Como posso feri-lo?.",
    "sentir emoções": "Básica (Empatia). Proezas (por cada ☢ extra): Responde: Ele está mentindo? Quer me ferir? Quer algo de mim?.",
    "manipular": "Básica (Empatia). Proezas (por cada ☢ extra): Causa 1 ponto de dúvida no alvo por cada sucesso extra.",
    "curar": "Básica (Empatia). Proezas (por cada ☢ extra): Recupera pontos de atributo extras (no caso de \"Cuidar dos Acabados\").",
    "intimidar": "Especialista (Brutamonte) (Força). Proezas (por cada ☢ extra): Causa 1 ponto de dúvida no alvo por cada sucesso extra.",
    "fazer gambiarra": "Especialista (Engenhoqueiro) (Astúcia). Proezas (por cada ☢ extra): Dispositivo durável; +1 b&ocirc;nus equip.; +1 dano; cano extra; +1 proteção; +3 explosão; estilhaços; dobro de carga.",
    "encontrar o caminho": "Especialista (Batedor) (Agilidade). Proezas (por cada ☢ extra): Acha artefato; avalia Podridão; acha balas; acha grude; acha água; tempo /2; atravessa rápido.",
    "fazer um trato": "Especialista (Negociante) (Empatia). Proezas (por cada ☢ extra): Ganha balas; grude; água limpa; birita; ou consegue \"sujeira\" (informação) de alguém.",
    "incitar cachorro": "Especialista (Adestrador) (Agilidade). Proezas (por cada ☢ extra): Rastreio: Horas de atraso da presa; se está ferida; se está sozinha.",
    "inspirar": "Especialista (Cronista) (Empatia). Proezas (por cada ☢ extra): Transfere sucessos para outro; cada sucesso elimina um sucesso do alvo (ao atrapalhar).",
    "comandar": "Especialista (Chefão) (Astúcia). Proezas (por cada ☢ extra): Extorsão: Ganha balas; grude; água limpa; ou birita.",
    "superar": "Especialista (Escravo) (Força). Proezas (por cada ☢ extra): Cada sucesso elimina um ponto de trauma sofrido (de qualquer tipo)."
};

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    loadCharacters();

    // Garantir estado inicial limpo (Hub visível, Dashboard oculto)
    const hubHeader = document.getElementById("hub-header");
    const hubMain = document.getElementById("hub-main");
    const dash = document.getElementById("char-dashboard");

    if (hubHeader) hubHeader.style.display = "block";
    if (hubMain) hubMain.style.display = "grid";
    if (dash) dash.style.display = "none";

    renderHub();
    injectDatalists();
});

function injectDatalists() {
    if (document.getElementById("talent-list-data")) return;

    const talentList = document.createElement("datalist");
    talentList.id = "talent-list-data";
    for (const cat in TALENTS_BASE) {
        TALENTS_BASE[cat].forEach(t => {
            const opt = document.createElement("option");
            opt.value = t.name;
            talentList.appendChild(opt);
        });
    }
    document.body.appendChild(talentList);

    const mutationList = document.createElement("datalist");
    mutationList.id = "mutation-list-data";
    for (const code in MUTATIONS_BASE) {
        const opt = document.createElement("option");
        opt.value = MUTATIONS_BASE[code].name;
        mutationList.appendChild(opt);
    }
    document.body.appendChild(mutationList);

    const equipList = document.getElementById("equip-list");
    if (equipList) {
        equipList.innerHTML = "";
        for (const item in EQUIPMENT_BASE) {
            const opt = document.createElement("option");
            opt.value = item;
            equipList.appendChild(opt);
        }
    }
}

// Persistência
function saveCharacters() {
    localStorage.setItem("myz_characters", JSON.stringify(characters));
}

function loadCharacters() {
    const saved = localStorage.getItem("myz_characters");
    if (saved) {
        characters = JSON.parse(saved);
    }
}

// Renderização do Hub
function renderHub(filter = 'all') {
    const grid = document.getElementById("hub-main");
    if (!grid) return;
    grid.innerHTML = "";

    let filtered = characters;
    if (filter === 'all') {
        const activeFilterBtn = document.querySelector('.btn-filter.active');
        if (activeFilterBtn) {
            const filterAttr = activeFilterBtn.getAttribute('onclick');
            if (filterAttr.includes('pc')) filter = 'pc';
            else if (filterAttr.includes('npc')) filter = 'npc';
        }
    }

    if (filter === 'pc') filtered = characters.filter(c => c.type === 'pc');
    if (filter === 'npc') filtered = characters.filter(c => c.type === 'npc');

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-hub">
                <p>NENHUM REGISTRO ${filter !== 'all' ? 'NESTA CATEGORIA' : ''}.</p>
                <button class="btn-primary" onclick="abrirModalEscolhaCriacao()">+ CRIAR PRIMEIRO MUTANTE</button>
            </div>
        `;
        return;
    }

    grid.className = `character-hub-grid mode-${hubViewMode}`;

    filtered.forEach(char => {
        const card = document.createElement("div");
        card.className = `character-card redesign type-${char.type} view-${hubViewMode}`;
        card.onclick = () => verDetalhes(char.id);

        const charName = char.name || "Sem Nome";
        const charRole = char.role || "Sem Função";

        const forca = (char.stats?.forca || 0) - (char.traumas?.dano || 0);
        const agi = (char.stats?.agilidade || 0) - (char.traumas?.fadiga || 0);
        const ast = (char.stats?.astucia || 0) - (char.traumas?.confusao || 0);
        const emp = (char.stats?.empatia || 0) - (char.traumas?.duvida || 0);

        const skills = char.skills || {};
        const talents = char.talents || [];
        const mutations = char.mutations || [];

        const sortedSkills = Object.entries(skills)
            .filter(([name, val]) => val > 0)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4);

        const skillsHtml = sortedSkills.length > 0
            ? sortedSkills.map(([name, val]) => {
                let displayName = name.toUpperCase();
                if (name === 'especialista' && char.role) {
                    const roleData = SPECIALIST_SKILLS[char.role.toLowerCase()];
                    if (roleData && roleData.name) {
                        displayName = roleData.name.toUpperCase();
                    }
                }
                return `<div class="hub-skill-item"><span>${displayName}</span><span>${val}</span></div>`;
            }).join('')
            : '<div class="dim" style="grid-column: span 2; text-align: center;">Nenhuma Perícia Ativa</div>';

        card.innerHTML = `
            <div class="card-header-redesign">
                <div class="card-portrait-hub">
                    <img src="${char.img || 'assets/no avatar.webp'}" alt="Portrait" onerror="this.src='assets/no avatar.webp'">
                </div>
                <div class="header-main-info">
                    <h3 class="char-name-hub">${charName.toUpperCase()}</h3>
                    <p class="char-role-hub">${charRole.toUpperCase()}</p>
                </div>
                <div class="card-tag-hub">${char.type === 'pc' ? 'PJ' : 'NPC'}</div>
            </div>

            <div class="hub-details-area">
                <div class="card-stats-grid-hub">
                    <div class="hub-stat-box red">
                        <div class="hub-stat-icon">🛡️</div>
                        <div class="hub-stat-val">${forca}</div>
                        <div class="hub-stat-label">FOR</div>
                    </div>
                    <div class="hub-stat-box yellow">
                        <div class="hub-stat-icon">⚡</div>
                        <div class="hub-stat-val">${agi}</div>
                        <div class="hub-stat-label">AGI</div>
                    </div>
                    <div class="hub-stat-box blue">
                        <div class="hub-stat-icon">🧠</div>
                        <div class="hub-stat-val">${ast}</div>
                        <div class="hub-stat-label">AST</div>
                    </div>
                    <div class="hub-stat-box green">
                        <div class="hub-stat-icon">💚</div>
                        <div class="hub-stat-val">${emp}</div>
                        <div class="hub-stat-label">EMP</div>
                    </div>
                </div>

                <div class="card-hub-section">
                    <div class="hub-section-title">PERÍCIAS DE DESTAQUE</div>
                    <div class="hub-skills-grid">
                        ${skillsHtml}
                    </div>
                </div>

                <div class="card-hub-section">
                    <div class="hub-section-title">TALENTOS & MUTAÇÕES</div>
                    <div class="hub-mini-list dot-list">
                        ${[...talents, ...mutations].length > 0 ? [...talents, ...mutations].slice(0, 3).map(tm => `<div>• ${tm.name}</div>`).join('') : '<div class="dim">Nenhum</div>'}
                        ${([...talents, ...mutations]).length > 3 ? `<div class="dim">... e mais ${([...talents, ...mutations]).length - 3}</div>` : ''}
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function toggleHubView() {
    hubViewMode = (hubViewMode === 'card') ? 'details' : 'card';
    const btn = document.getElementById("btn-toggle-view");
    if (btn) {
        btn.innerHTML = hubViewMode === 'card' ? "CARD 🎴" : "RESUMO 📋";
    }
    renderHub();
}

function abrirModalHeaderComId(id) {
    currentCharacterId = id;
    loadCharacterDataToHeaderModal(id);
    document.getElementById("modal-edit-header").classList.add("active");
    toggleNoScroll(true);
}

function loadCharacterDataToHeaderModal(id) {
    const char = characters.find(c => c.id === id);
    if (!char) return;

    document.getElementById("edit-char-name").value = char.name || "";
    document.getElementById("edit-player-name").value = char.playerName || "";
    document.getElementById("edit-char-role").value = char.role || "adestrador";
    document.getElementById("edit-char-type").value = char.type || "pc";
    document.getElementById("edit-char-img").value = char.img || "";
}

function deletarPersonagemComId(id) {
    if (confirm("Tem certeza que deseja apagar permanentemente este registro?")) {
        characters = characters.filter(c => c.id !== id);
        saveCharacters();
        renderHub();
    }
}

// Modais
function abrirModalEscolhaCriacao() {
    document.getElementById("modal-escolha").classList.add("active");
    toggleNoScroll(true);
}

function abrirModalManual() {
    fecharModais();
    document.getElementById("modal-manual").classList.add("active");
    toggleNoScroll(true);
}

function abrirModalEditSkills() {
    document.getElementById("modal-edit-skills").classList.add("active");
    toggleNoScroll(true);
    renderEditSkills();
}

function fecharModalEditSkills() {
    document.getElementById("modal-edit-skills").classList.remove("active");
    toggleNoScroll(false);
}

function fecharModais() {
    document.querySelectorAll(".modal").forEach(m => m.classList.remove("active"));
    toggleNoScroll(false);
}

function abrirModalEscolhaAvatar() {
    document.getElementById("modal-avatar").classList.add("active");
    toggleNoScroll(true);
}

function visualizarImagem() {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;

    document.getElementById("full-view-img").src = char.img || "assets/no avatar.webp";
    document.getElementById("modal-view-image").classList.add("active");
    toggleNoScroll(true);
}

// Criação
function criarPersonagemManual() {
    const nameInput = document.getElementById("new-char-name");
    const name = nameInput.value.trim();
    const role = document.getElementById("new-char-role").value;
    const type = document.querySelector('input[name="char-type"]:checked').value;

    if (!name) {
        alert("O Personagem precisa de um nome.");
        return;
    }

    const newChar = {
        id: Date.now(),
        name: name,
        role: role,
        type: type,
        stats: {
            forca: 2,
            agilidade: 2,
            astucia: 2,
            empatia: 2
        },
        traumas: { dano: 0, fadiga: 0, confusao: 0, duvida: 0 },
        conditions: { fome: false, sede: false, sono: false, frio: false },
        pm: 0,
        rot: 0,
        playerName: "",
        dream: "",
        appearance: "",
        img: "",
        skills: {},
        talents: [],
        mutations: [],
        inventory: []
    };

    characters.push(newChar);
    saveCharacters();
    fecharModais();
    nameInput.value = "";
    renderHub();
}

function deletarPersonagemAtual() {
    if (!currentCharacterId) return;
    if (confirm("Tem certeza que deseja apagar permanentemente este registro?")) {
        characters = characters.filter(c => c.id !== currentCharacterId);
        saveCharacters();
        voltarAoHub();
    }
}

function duplicarPersonagemAtual() {
    const original = characters.find(c => c.id === currentCharacterId);
    if (!original) return;

    const copy = JSON.parse(JSON.stringify(original));
    copy.id = Date.now();
    copy.name = copy.name + " (Cópia)";

    characters.push(copy);
    saveCharacters();
    alert("Personagem duplicado com sucesso!");
    voltarAoHub();
}

// Navegação e Dashboard
function verDetalhes(id) {
    currentCharacterId = id;
    const char = characters.find(c => c.id === id);
    if (!char) return;

    // Garantir que campos novos existam
    if (!char.conditions) char.conditions = { fome: false, sede: false, sono: false, frio: false };
    if (char.pm === undefined) char.pm = 0;
    if (char.rot === undefined) char.rot = 0;
    if (char.playerName === undefined) char.playerName = "";
    if (char.dream === undefined) char.dream = "";
    if (char.appearance === undefined) char.appearance = "";
    if (!char.img) char.img = "";
    if (!char.skills) char.skills = {};
    if (!char.skillNotes) char.skillNotes = {};
    if (!char.talents) char.talents = [];
    if (!char.inventory) char.inventory = [];
    if (char.xp === undefined) char.xp = 0;
    if (!char.relationships) char.relationships = { buddy: "", npcs: [] };
    if (!char.mutations) char.mutations = [];

    document.getElementById("hub-header").style.display = "none";
    document.getElementById("hub-main").style.display = "none";
    document.getElementById("char-dashboard").style.display = "grid";

    atualizarVisualDashboard();
}

function atualizarVisualDashboard() {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;

    // Cabeçalho
    document.getElementById("dash-char-name").innerText = char.name.toUpperCase();
    document.getElementById("dash-char-role").innerText = char.role.toUpperCase();
    document.getElementById("dash-player-name").innerText = "JOGADOR: " + (char.playerName || "---").toUpperCase();
    document.getElementById("dash-char-img").src = char.img || "assets/no avatar.webp";

    // Stats Apresentação
    const stats = ["forca", "agilidade", "astucia", "empatia"];
    const traumas = { forca: "dano", agilidade: "fadiga", astucia: "confusao", empatia: "duvida" };

    stats.forEach(s => {
        document.getElementById(`val-${s}`).innerText = char.stats[s];
        document.getElementById(`val-${traumas[s]}`).innerText = char.traumas[traumas[s]];
    });

    // Perícias Apresentação (Ordenadas Alfabeticamente)
    const skillsList = document.getElementById("skills-list");
    skillsList.innerHTML = "";

    let allTrained = [];
    BASIC_SKILLS.forEach(skill => {
        const val = char.skills[skill.id] || 0;
        if (val > 0) allTrained.push({ ...skill, val, type: 'basic' });
    });

    const specData = SPECIALIST_SKILLS[char.role.toLowerCase()];
    if (specData) {
        const valSpec = char.skills.especialista || 0;
        if (valSpec > 0) {
            allTrained.push({
                id: 'especialista',
                name: specData.name,
                attr: specData.attr,
                val: valSpec,
                type: 'special'
            });
        }
    }

    allTrained.sort((a, b) => a.name.localeCompare(b.name));

    allTrained.forEach(skill => {
        const item = document.createElement("div");
        item.className = "skill-disp-item";
        if (skill.type === 'special') item.classList.add("special");
        item.innerHTML = `<span>${skill.name} <small>(${skill.attr})</small></span><span class="val">${skill.val}</span>`;
        item.onclick = () => abrirDetalhePericia(skill.id, skill.name, skill.attr);
        skillsList.appendChild(item);
    });

    if (skillsList.innerHTML === "") {
        skillsList.innerHTML = "<p class='text-muted' style='font-size:0.7rem'>NENHUMA PERÍCIA TREINADA.</p>";
    }

    // Mutações Apresentação
    const mutList = document.getElementById("mutations-list");
    mutList.innerHTML = "";
    (char.mutations || []).forEach(m => {
        const tag = document.createElement("div");
        tag.className = "talent-tag";
        tag.style.borderColor = "var(--accent)";
        tag.style.color = "var(--accent)";
        tag.innerText = m.name.toUpperCase();
        tag.onclick = (e) => { e.stopPropagation(); abrirDetalheMutacao(m.name); };
        mutList.appendChild(tag);
    });
    if (mutList.innerHTML === "") {
        mutList.innerHTML = "<p class='text-muted' style='font-size:0.7rem'>NENHUMA MUTAÇÃO REGISTRADA.</p>";
    }

    // Talentos Apresentação (Ordenados Alfabeticamente)
    const talentsList = document.getElementById("talents-list");
    talentsList.innerHTML = "";
    const sortedTalents = [...(char.talents || [])].sort((a, b) => a.name.localeCompare(b.name));

    sortedTalents.forEach((talent, index) => {
        const tag = document.createElement("div");
        tag.className = "talent-tag";
        tag.innerText = talent.name.toUpperCase();
        tag.onclick = () => abrirDetalheTalento(talent.name);
        talentsList.appendChild(tag);
    });

    if (talentsList.innerHTML === "") {
        talentsList.innerHTML = "<p class='text-muted' style='font-size:0.7rem'>NENHUM TALENTO ADQUIRIDO.</p>";
    }

    // Inventário Apresentação
    const invListMini = document.getElementById("inventory-list-mini");
    invListMini.innerHTML = "";
    const weightLabels = { "pequeno": "Pequeno (0)", "leve": "Leve (0.5)", "normal": "Normal (1)", "pesado": "Pesado (2)" };
    (char.inventory || []).forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "inv-item-mini";
        const valBonus = item.bonus || item.dice || 0;
        const diceText = valBonus > 0 ? ` [🎲${valBonus}]` : '';
        const weightText = weightLabels[item.weight] || item.weight;
        div.innerHTML = `<span>${item.name}${diceText}</span><small>${weightText.toString().toUpperCase()}</small>`;
        div.onclick = (e) => { e.stopPropagation(); abrirEditItem(index); };
        invListMini.appendChild(div);
    });
    atualizarBarraCarga();

    // XP Dots
    const xpDots = document.getElementById("xp-dots");
    xpDots.innerHTML = "";
    for (let i = 1; i <= 15; i++) {
        const dot = document.createElement("div");
        dot.className = `xp-dot ${i <= (char.xp || 0) ? 'filled' : ''}`;
        xpDots.appendChild(dot);
    }

    // Relações Apresentação
    const buddiesList = document.getElementById("disp-buddies-list");
    if (buddiesList) {
        buddiesList.innerHTML = "";
        // Migração se existir o campo legado 'buddy'
        if (char.relationships.buddy && (!char.relationships.buddies || char.relationships.buddies.length === 0)) {
            char.relationships.buddies = [{ name: char.relationships.buddy, desc: "" }];
            delete char.relationships.buddy;
        }

        const buddies = (char.relationships.buddies || []).map(b => typeof b === 'string' ? { name: b, desc: "" } : b);
        if (buddies.length === 0) {
            buddiesList.innerHTML = "<p class='text-muted' style='font-size:0.7rem'>NENHUM PARCEIRO.</p>";
        } else {
            buddies.forEach(b => {
                const item = document.createElement("div");
                item.className = "relation-item-mini";
                let html = `<div class="relation-header-mini"><span>${b.name.toUpperCase()}</span></div>`;
                if (b.desc) {
                    html += `<div class="relation-desc-mini">${b.desc}</div>`;
                }
                item.innerHTML = html;
                buddiesList.appendChild(item);
            });
        }
    }

    const npcsList = document.getElementById("disp-npcs-relations");
    if (npcsList) {
        npcsList.innerHTML = "";
        const npcs = char.relationships.npcs || [];
        if (npcs.length === 0) {
            npcsList.innerHTML = "<p class='text-muted' style='font-size:0.7rem'>NENHUMA RELAÇÃO.</p>";
        } else {
            npcs.forEach(npc => {
                const item = document.createElement("div");
                item.className = "relation-item-mini";
                const relLabel = (npc.relation || npc.rel || "").toUpperCase();
                let html = `
                    <div class="relation-header-mini">
                        <span>${npc.name.toUpperCase()}</span>
                        <small>${relLabel}</small>
                    </div>`;
                if (npc.desc) {
                    html += `<div class="relation-desc-mini">${npc.desc}</div>`;
                }
                item.innerHTML = html;
                npcsList.appendChild(item);
            });
        }
    }

    // Condições Tags
    const condList = document.getElementById("conditions-list");
    condList.innerHTML = "";
    Object.keys(char.conditions).forEach(key => {
        if (char.conditions[key]) {
            const tag = document.createElement("span");
            tag.className = "condition-tag";
            tag.innerText = key.toUpperCase();
            condList.appendChild(tag);
        }
    });

    // Trackers
    document.getElementById("disp-pm").innerText = char.pm;
    document.getElementById("disp-rot").innerText = char.rot;

    // Identidade
    document.getElementById("disp-dream").innerText = char.dream || "Nenhum registro.";
    document.getElementById("disp-appearance").innerText = char.appearance || "Nenhum registro.";
}

// Funções de Abertura de Modais de Edição
function abrirDetalheMutacao(id) {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;
    const m = char.mutations.find(x => x.name === id); // Assuming 'id' is actually the name
    if (!m) return;

    document.getElementById("det-mut-id").value = m.id; // This might be undefined if m.id is not set
    document.getElementById("det-mut-nome").innerText = m.name.toUpperCase();
    document.getElementById("det-mut-desc").innerText = m.desc;
    document.getElementById("det-mut-notes").value = m.notes || "";

    document.getElementById("modal-mutation-detail").classList.add("active");
    toggleNoScroll(true);
}

function abrirModalEditHeader() {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;

    document.getElementById("edit-char-name").value = char.name;
    document.getElementById("edit-player-name").value = char.playerName || "";
    document.getElementById("edit-char-role").value = char.role;
    document.getElementById("edit-char-type").value = char.type || "pc";
    document.getElementById("edit-char-img").value = char.img || "";

    document.getElementById("modal-edit-header").classList.add("active");
    toggleNoScroll(true);
}

function abrirModalEditAtributo(attr) {
    // We reuse the stats modal but we can highlight the specific row if needed
    // For now, just open it as requested.
    abrirModalEditStats();
}

function abrirModalEditConditions() {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;

    document.getElementById("edit-cond-fome").checked = char.conditions.fome;
    document.getElementById("edit-cond-sede").checked = char.conditions.sede;
    document.getElementById("edit-cond-sono").checked = char.conditions.sono;
    document.getElementById("edit-cond-frio").checked = char.conditions.frio;

    document.getElementById("modal-edit-conditions").classList.add("active");
}

function salvarHeader() {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;

    const nameInput = document.getElementById("edit-char-name").value.trim();
    const playerInput = document.getElementById("edit-player-name")?.value.trim() || "";
    const roleInput = document.getElementById("edit-char-role").value;
    const typeInput = document.getElementById("edit-char-type").value;
    const urlImg = document.getElementById("edit-char-img").value.trim();

    if (nameInput) char.name = nameInput;
    char.playerName = playerInput;
    char.type = typeInput;

    // Se a função mudou, precisamos garantir que o dashboard reflita isso
    if (char.role !== roleInput) {
        char.role = roleInput;
    }

    if (urlImg) char.img = urlImg;

    saveCharacters();
    fecharModais();
    atualizarVisualDashboard();
    renderHub();
}

function handleImageUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const char = characters.find(c => c.id === currentCharacterId);
            if (char) {
                char.img = e.target.result;
                saveCharacters();
                atualizarVisualDashboard();
                renderHub();
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function abrirModalEditStats() {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;

    // Preencher campos do modal
    document.getElementById("edit-forca").value = char.stats.forca;
    document.getElementById("edit-agilidade").value = char.stats.agilidade;
    document.getElementById("edit-astucia").value = char.stats.astucia;
    document.getElementById("edit-empatia").value = char.stats.empatia;

    document.getElementById("edit-dano").innerText = char.traumas.dano;
    document.getElementById("edit-fadiga").innerText = char.traumas.fadiga;
    document.getElementById("edit-confusao").innerText = char.traumas.confusao;
    document.getElementById("edit-duvida").innerText = char.traumas.duvida;

    document.getElementById("modal-edit-stats").classList.add("active");
}

function abrirModalEditTrackers() {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;

    document.getElementById("edit-pm").innerText = char.pm;
    document.getElementById("edit-rot").innerText = char.rot;
    document.getElementById("modal-edit-trackers").classList.add("active");
}

function abrirModalEditConditions() {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;

    document.getElementById("edit-cond-fome").checked = char.conditions.fome;
    document.getElementById("edit-cond-sede").checked = char.conditions.sede;
    document.getElementById("edit-cond-sono").checked = char.conditions.sono;
    document.getElementById("edit-cond-frio").checked = char.conditions.frio;

    document.getElementById("modal-edit-conditions").classList.add("active");
}

function abrirModalEditIdentity() {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;

    document.getElementById("edit-dream").value = char.dream;
    document.getElementById("edit-appearance").value = char.appearance;
    document.getElementById("modal-edit-identity").classList.add("active");
}

function abrirModalEditSkills() {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;

    renderEditSkills();
    document.getElementById("modal-edit-skills").classList.add("active");
}

function renderEditSkills() {
    const char = characters.find(c => c.id === currentCharacterId);
    const container = document.getElementById("edit-skills-container");
    container.innerHTML = "";

    const userRole = char.role.toLowerCase();

    // 1. Skill especial da função do personagem
    const mySpec = SPECIALIST_SKILLS[userRole];
    if (mySpec) {
        const val = char.skills.especialista || 0;
        appendSkillEditRow(container, mySpec.name, 'especialista', val, true);
    }

    // 2. Perícias Básicas (Ordem Alfabética)
    BASIC_SKILLS.sort((a, b) => a.name.localeCompare(b.name)).forEach(skill => {
        const val = char.skills[skill.id] || 0;
        appendSkillEditRow(container, skill.name, skill.id, val, false);
    });

    // 3. Outras Perícias de Especialista (Ordem Alfabética)
    const otherSpecs = Object.keys(SPECIALIST_SKILLS)
        .filter(r => r !== userRole)
        .map(r => SPECIALIST_SKILLS[r])
        .sort((a, b) => a.name.localeCompare(b.name));

    otherSpecs.forEach(spec => {
        const val = char.skills[spec.id] || 0;
        appendSkillEditRow(container, spec.name, spec.id, val, true);
    });
}

function appendSkillEditRow(container, name, id, val, isSpecial) {
    const item = document.createElement("div");
    item.className = "skill-edit-item" + (isSpecial ? " specialist" : "");
    item.innerHTML = `
        <label>${name.toUpperCase()}${isSpecial ? ' (ESPEC.)' : ''}</label>
        <div class="spinner">
            <button class="btn-spin" onclick="updateSkill('${id}', -1)">-</button>
            <input type="text" id="edit-skill-${id}" readonly value="${val}">
            <button class="btn-spin" onclick="updateSkill('${id}', 1)">+</button>
        </div>
    `;
    container.appendChild(item);
}

function abrirModalEditTalents() {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;

    renderEditTalents();
    document.getElementById("modal-edit-talents").classList.add("active");
}

function renderEditTalents() {
    const char = characters.find(c => c.id === currentCharacterId);
    const list = document.getElementById("edit-talents-list");
    list.innerHTML = "";

    const userRoleText = char.role.toLowerCase();
    // Prioritize role talents
    const roleKey = Object.keys(TALENTS_BASE).find(k => k.toLowerCase() === userRoleText);

    const sorted = [...char.talents].sort((a, b) => a.name.localeCompare(b.name));

    sorted.forEach((talent, index) => {
        const row = document.createElement("div");
        row.className = "talent-edit-row";
        row.innerHTML = `
            <div class="talent-info-mini" onclick="abrirDetalheTalento('${talent.name}')">
                <strong>${talent.name.toUpperCase()}</strong>
                <p style="font-size: 0.65rem; color: #666; margin: 0">${talent.desc ? (talent.desc.substring(0, 40) + '...') : 'Sem descrição.'}</p>
            </div>
            <button class="btn-remove" onclick="removerTalento('${talent.name}')">✖</button>
        `;
        list.appendChild(row);
    });
}

function checkPredefinedTalent(name) {
    for (const cat in TALENTS_BASE) {
        const t = TALENTS_BASE[cat].find(x => x.name === name);
        if (t) {
            document.getElementById("new-talent-desc").value = t.desc;
            return;
        }
    }
}

function adicionarTalento() {
    const char = characters.find(c => c.id === currentCharacterId);
    const nameInput = document.getElementById("new-talent-name");
    const descInput = document.getElementById("new-talent-desc");

    const name = nameInput.value.trim();
    const desc = descInput.value.trim();

    if (!name) return;

    char.talents.push({ name, desc });
    nameInput.value = "";
    descInput.value = "";

    saveCharacters();
    renderEditTalents();
    atualizarVisualDashboard();
}

function rolarMutacaoAleatoria() {
    let roll;
    let code;
    do {
        const d1 = Math.floor(Math.random() * 6) + 1;
        const d2 = Math.floor(Math.random() * 6) + 1;
        code = `${d1}${d2}`;
        roll = MUTATIONS_BASE[code];
    } while (!roll);

    document.getElementById("new-mutation-name").value = roll.name;
    document.getElementById("new-mutation-desc").value = roll.desc;
}

function checkPredefinedMutation(name) {
    for (const code in MUTATIONS_BASE) {
        if (MUTATIONS_BASE[code].name === name) {
            document.getElementById("new-mutation-desc").value = MUTATIONS_BASE[code].desc;
            return;
        }
    }
}

// Funções de Atualização (Invocadas pelos Modais)
function updateBaseStat(type, change) {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;

    let newVal = (char.stats[type] || 2) + change;
    if (newVal < 1) newVal = 1;
    if (newVal > 5) newVal = 5;

    char.stats[type] = newVal;
    document.getElementById(`edit-${type}`).value = newVal;

    saveCharacters();
    atualizarVisualDashboard();
}

function updateTrauma(type, change) {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;

    let newVal = (char.traumas[type] || 0) + change;
    if (newVal < 0) newVal = 0;

    char.traumas[type] = newVal;
    document.getElementById(`edit-${type}`).innerText = newVal;

    saveCharacters();
    atualizarVisualDashboard();
}

function toggleCondition(type) {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;

    char.conditions[type] = document.getElementById(`edit-cond-${type}`).checked;

    saveCharacters();
    atualizarVisualDashboard();
}

function updateTracker(type, change) {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;

    let newVal = (char[type] || 0) + change;
    if (newVal < 0) newVal = 0;
    if (type === 'pm' && newVal > 10) newVal = 10;

    char[type] = newVal;
    document.getElementById(`edit-${type}`).innerText = newVal;

    saveCharacters();
    atualizarVisualDashboard();
}

function updateIdentity(field, value) {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;

    char[field] = value;
    saveCharacters();
    atualizarVisualDashboard();
}

function updateSkill(id, change) {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;

    let newVal = (char.skills[id] || 0) + change;
    if (newVal < 0) newVal = 0;
    if (newVal > 5) newVal = 5;

    char.skills[id] = newVal;
    const input = document.getElementById(`edit-skill-${id}`);
    if (input) input.value = newVal;

    saveCharacters();
    atualizarVisualDashboard();
}

function adicionarTalento() {
    const char = characters.find(c => c.id === currentCharacterId);
    const nameInput = document.getElementById("new-talent-name");
    const descInput = document.getElementById("new-talent-desc");

    const name = nameInput.value.trim();
    const desc = descInput.value.trim();

    if (!name) return;

    char.talents.push({ name, desc });
    nameInput.value = "";
    descInput.value = "";

    saveCharacters();
    renderEditTalents();
    atualizarVisualDashboard();
}

function removerTalento(name) {
    const char = characters.find(c => c.id === currentCharacterId);
    char.talents = char.talents.filter(t => t.name !== name);
    saveCharacters();
    renderEditTalents();
    atualizarVisualDashboard();
}

// --- Detalhes e Phase 3 ---
let currentDetailSkillId = null;
function abrirDetalhePericia(id, name, attr) {
    const char = characters.find(c => c.id === currentCharacterId);
    currentDetailSkillId = id;

    document.getElementById("detalhe-pericia-nome").innerText = name.toUpperCase();
    document.getElementById("detalhe-pericia-attr").innerText = attr.toUpperCase();

    // Texto Base e Notas
    const baseDesc = SKILLS_BASE[id.toLowerCase()] || "Descrição não disponível.";
    document.getElementById("detalhe-pericia-base").innerText = baseDesc;

    const customNotes = char.skillNotes[id] || "Nenhuma nota adicionada.";
    document.getElementById("detalhe-pericia-notes").innerText = customNotes;

    // Preencher textarea
    document.getElementById("edit-pericia-desc").value = char.skillNotes[id] || "";

    toggleModalEdit('skill', false); // Começar em modo visualização
    document.getElementById("modal-skill-detail").classList.add("active");
}

function salvarDescricaoPericia() {
    const char = characters.find(c => c.id === currentCharacterId);
    char.skillNotes[currentDetailSkillId] = document.getElementById("edit-pericia-desc").value;

    saveCharacters();
    abrirDetalhePericia(currentDetailSkillId, document.getElementById("detalhe-pericia-nome").innerText, document.getElementById("detalhe-pericia-attr").innerText);
}

let currentDetailTalentName = null;
function abrirDetalheTalento(name) {
    const char = characters.find(c => c.id === currentCharacterId);
    const talent = char.talents.find(t => t.name === name);
    if (!talent) return;

    currentDetailTalentName = name;
    document.getElementById("detalhe-talento-nome").innerText = talent.name.toUpperCase();
    document.getElementById("detalhe-talento-desc-text").innerText = talent.desc || "Sem descrição disponível.";

    // Notes
    const notes = talent.notes || "";
    document.getElementById("detalhe-talento-notes-text").innerText = notes || "Nenhuma nota adicionada.";
    document.getElementById("edit-talento-notes").value = notes;

    toggleModalEdit('talent', false);
    document.getElementById("modal-talent-detail").classList.add("active");
}

function salvarDescricaoTalento() {
    const char = characters.find(c => c.id === currentCharacterId);
    const talent = char.talents.find(t => t.name === currentDetailTalentName);
    if (talent) {
        talent.notes = document.getElementById("edit-talento-notes").value;
        saveCharacters();
        abrirDetalheTalento(currentDetailTalentName);
    }
}

function toggleModalEdit(type, isEditing) {
    const view = document.getElementById(`${type}-view-mode`);
    const edit = document.getElementById(`${type}-edit-mode`);
    if (view && edit) {
        view.style.display = isEditing ? 'none' : 'block';
        edit.style.display = isEditing ? 'block' : 'none';
    }
}

// Inventário
function abrirModalEditInventory() {
    renderEditInventory();
    document.getElementById("modal-edit-inventory").classList.add("active");
}

function renderEditInventory() {
    const char = characters.find(c => c.id === currentCharacterId);
    const list = document.getElementById("edit-inventory-list");
    list.innerHTML = "";

    const weightLabels = { "pequeno": "Pequeno", "leve": "Leve", "normal": "Normal", "pesado": "Pesado" };
    (char.inventory || []).forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "edit-row click-edit";
        const valBonus = item.bonus || item.dice || 0;
        const diceText = valBonus > 0 ? ` | 🎲 +${valBonus}` : '';
        const weightText = weightLabels[item.weight] || item.weight;
        div.innerHTML = `
            <div class="row-info" onclick="abrirEditItem(${index})">
                <strong>${item.name}</strong> (${weightText})${diceText}
            </div>
            <button class="btn-remove" onclick="removerItem(${index})">✖</button>
        `;
        list.appendChild(div);
    });
}

function toggleCustomWeight(val) {
    const customInput = document.getElementById("new-item-weight-custom");
    customInput.style.display = (val === "outro") ? "block" : "none";
}

function checkPredefinedItem(name) {
    const item = EQUIPMENT_BASE[name];
    if (item) {
        document.getElementById("new-item-weight").value = item.weight;
        toggleCustomWeight(item.weight);
    }
}

function adicionarItem() {
    const char = characters.find(c => c.id === currentCharacterId);
    const nameInput = document.getElementById("new-item-name");
    const weightSelect = document.getElementById("new-item-weight");
    const customWeightInput = document.getElementById("new-item-weight-custom");
    const diceInput = document.getElementById("new-item-dice");

    const name = nameInput.value.trim();
    let weight = weightSelect.value;
    const dice = parseInt(diceInput.value) || 0;

    if (!name) return;

    if (weight === "outro") {
        const val = parseFloat(customWeightInput.value);
        if (isNaN(val)) {
            alert("Por favor, insira um valor numérico para o peso.");
            return;
        }
        weight = val; // Store numerical value
    }

    char.inventory.push({
        name,
        weight,
        bonus: dice, // Unificando para bonus
        desc: ""
    });
    nameInput.value = "";
    customWeightInput.value = "";
    diceInput.value = "";
    weightSelect.value = "normal";
    toggleCustomWeight("normal");

    saveCharacters();
    renderEditInventory();
    atualizarVisualDashboard();
}

function removerItem(index) {
    const char = characters.find(c => c.id === currentCharacterId);
    char.inventory.splice(index, 1);
    saveCharacters();
    renderEditInventory();
    atualizarVisualDashboard();
}

let currentEditItemIndex = null;
function abrirEditItem(index) {
    const char = characters.find(c => c.id === currentCharacterId);
    const item = char.inventory[index];
    if (!item) return;

    currentEditItemIndex = index;

    // View Mode Population
    const weightLabels = { "pequeno": "Pequeno (0)", "leve": "Leve (0.5)", "normal": "Normal (1.0)", "pesado": "Pesado (2.0)" };
    const weightText = weightLabels[item.weight] || item.weight;

    document.getElementById("detalhe-item-title").innerText = item.name.toUpperCase();
    document.getElementById("detalhe-item-weight").innerText = weightText;

    const bonusVal = item.bonus || 0;
    document.getElementById("detalhe-item-bonus-val").innerText = bonusVal > 0 ? `+${bonusVal}` : "---";
    document.getElementById("detalhe-item-bonus-box").style.display = bonusVal > 0 ? "block" : "none";

    document.getElementById("detalhe-item-notes").innerText = item.desc || "Nenhuma nota adicionada.";

    // Edit Mode Population
    document.getElementById("edit-item-name").value = item.name;
    document.getElementById("edit-item-bonus").value = item.bonus || 0;
    document.getElementById("edit-item-desc").value = item.desc || "";

    const weightSelect = document.getElementById("edit-item-weight");
    const weightCustom = document.getElementById("edit-item-weight-custom-detail");

    const standardWeights = ["pequeno", "leve", "normal", "pesado"];
    if (standardWeights.includes(item.weight)) {
        weightSelect.value = item.weight;
        weightCustom.style.display = "none";
    } else {
        weightSelect.value = "outro";
        weightCustom.style.display = "block";
        weightCustom.value = item.weight;
    }

    toggleModalEdit('item', false);
    document.getElementById("modal-item-detail").classList.add("active");
}

function salvarItemDetail() {
    const char = characters.find(c => c.id === currentCharacterId);
    const item = char.inventory[currentEditItemIndex];
    if (!item) return;

    item.name = document.getElementById("edit-item-name").value.trim();
    item.bonus = parseInt(document.getElementById("edit-item-bonus").value) || 0;
    item.desc = document.getElementById("edit-item-desc").value.trim();

    const weightType = document.getElementById("edit-item-weight").value;
    if (weightType === "outro") {
        item.weight = parseFloat(document.getElementById("edit-item-weight-custom-detail").value) || 0;
    } else {
        item.weight = weightType;
    }

    saveCharacters();
    atualizarVisualDashboard();
    abrirEditItem(currentEditItemIndex);
}

function atualizarBarraCarga() {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;

    const weightMap = { "normal": 1, "pesado": 2, "leve": 0.5, "pequeno": 0 };
    let currentCarga = 0;

    char.inventory.forEach(item => {
        let val = parseFloat(item.weight);
        if (isNaN(val)) {
            val = weightMap[item.weight] || 0;
        }
        currentCarga += val;
    });

    const maxCarga = (char.stats.forca || 2) * 2;
    const perc = Math.min((currentCarga / maxCarga) * 100, 100);

    const fill = document.getElementById("inventory-bar-fill");
    const alertBox = document.getElementById("overload-alert");

    if (fill) {
        fill.style.width = perc + "%";
        if (currentCarga > maxCarga) {
            fill.style.background = "var(--neon-red)";
            if (alertBox) alertBox.style.display = "block";
        } else {
            fill.style.background = "linear-gradient(90deg, var(--neon-blue), #00ffaa)";
            if (alertBox) alertBox.style.display = "none";
        }
    }

    const statusText = document.getElementById("inventory-status-text");
    if (statusText) {
        statusText.innerText = `Carga: ${currentCarga.toFixed(1)} / ${maxCarga}`;
        if (currentCarga > maxCarga) statusText.style.color = "var(--neon-red)";
        else statusText.style.color = "#aaa";
    }
}

// Relações NPCs
function abrirModalEditNPCs() {
    resetSocialNPCForm();
    renderEditNPCs();
    document.getElementById("modal-edit-npcs").classList.add("active");
}

function renderEditNPCs() {
    const char = characters.find(c => c.id === currentCharacterId);
    const container = document.getElementById("edit-npcs-list");
    container.innerHTML = "";

    (char.relationships.npcs || []).forEach((npc, index) => {
        const row = document.createElement("div");
        row.className = "edit-row";
        const relLabel = (npc.relation || npc.rel || "").toUpperCase();
        row.innerHTML = `
            <div class="row-info" style="cursor:default">
                <strong>${npc.name}</strong>
                <small>(${relLabel})</small>
            </div>
            <div class="row-actions">
                <button class="btn-edit-small" onclick="abrirEdicaoNPC(${index})" title="Editar" style="margin-right:5px">✏️</button>
                <button class="btn-remove" onclick="removerNPC(${index})">×</button>
            </div>
        `;
        container.appendChild(row);
    });
}

let currentEditNPCIndex = null;
function abrirEdicaoNPC(index) {
    const char = characters.find(c => c.id === currentCharacterId);
    const npc = char.relationships.npcs[index];
    if (!npc) return;

    currentEditNPCIndex = index;
    document.getElementById("new-npc-name").value = npc.name;
    document.getElementById("new-npc-rel").value = npc.relation || npc.rel || "proteger";
    document.getElementById("new-npc-desc").value = npc.desc || "";

    const btnAdd = document.querySelector("#modal-edit-npcs .talent-entry-box button");
    btnAdd.innerText = "SALVAR";
    btnAdd.onclick = salvarEdicaoNPC;
}

function salvarEdicaoNPC() {
    const char = characters.find(c => c.id === currentCharacterId);
    const name = document.getElementById("new-npc-name").value.trim();
    const rel = document.getElementById("new-npc-rel").value;
    const desc = document.getElementById("new-npc-desc").value.trim();

    if (!name) return;
    char.relationships.npcs[currentEditNPCIndex] = { name, relation: rel, desc };

    resetSocialNPCForm();
    renderEditNPCs();
}

function resetSocialNPCForm() {
    currentEditNPCIndex = null;
    document.getElementById("new-npc-name").value = "";
    document.getElementById("new-npc-rel").value = "proteger";
    document.getElementById("new-npc-desc").value = "";
    const btnAdd = document.querySelector("#modal-edit-npcs .talent-entry-box button");
    if (btnAdd) {
        btnAdd.innerText = "ADD";
        btnAdd.onclick = adicionarNPC;
    }
}

function adicionarNPC() {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;

    const nameInput = document.getElementById("new-npc-name");
    const name = nameInput.value.trim();
    const rel = document.getElementById("new-npc-rel").value;
    const desc = document.getElementById("new-npc-desc").value.trim();

    if (!name) return;
    if (!char.relationships.npcs) char.relationships.npcs = [];
    char.relationships.npcs.push({ name, relation: rel, desc });

    resetSocialNPCForm();
    renderEditNPCs();
}

function removerNPC(index) {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;
    char.relationships.npcs.splice(index, 1);
    renderEditNPCs();
}

function salvarNPCs() {
    resetSocialNPCForm();
    saveCharacters();
    fecharModais();
    atualizarVisualDashboard();
}

// Parceiros (Buddies)
function abrirModalEditBuddies() {
    resetSocialBuddyForm();
    renderEditBuddies();
    document.getElementById("modal-edit-buddies").classList.add("active");
}

function renderEditBuddies() {
    const char = characters.find(c => c.id === currentCharacterId);
    const container = document.getElementById("edit-buddies-list");
    container.innerHTML = "";

    // Migração se necessário
    if (char.relationships.buddy && (!char.relationships.buddies || char.relationships.buddies.length === 0)) {
        char.relationships.buddies = [char.relationships.buddy];
        delete char.relationships.buddy;
    }

    (char.relationships.buddies || []).forEach((b, index) => {
        const buddy = typeof b === 'string' ? { name: b, desc: "" } : b;
        const row = document.createElement("div");
        row.className = "edit-row";
        row.innerHTML = `
            <div class="row-info" style="cursor:default">
                <strong>${buddy.name}</strong>
            </div>
            <div class="row-actions">
                <button class="btn-edit-small" onclick="abrirEdicaoBuddy(${index})" title="Editar" style="margin-right:5px">✏️</button>
                <button class="btn-remove" onclick="removerBuddy(${index})">×</button>
            </div>
        `;
        container.appendChild(row);
    });
}

let currentEditBuddyIndex = null;
function abrirEdicaoBuddy(index) {
    const char = characters.find(c => c.id === currentCharacterId);
    const b = char.relationships.buddies[index];
    if (!b) return;

    const buddy = typeof b === 'string' ? { name: b, desc: "" } : b;

    currentEditBuddyIndex = index;
    document.getElementById("new-buddy-name").value = buddy.name;
    document.getElementById("new-buddy-desc").value = buddy.desc || "";

    const btnAdd = document.querySelector("#modal-edit-buddies .talent-entry-box button");
    btnAdd.innerText = "SALVAR";
    btnAdd.onclick = salvarEdicaoBuddy;
}

function salvarEdicaoBuddy() {
    const char = characters.find(c => c.id === currentCharacterId);
    const name = document.getElementById("new-buddy-name").value.trim();
    const desc = document.getElementById("new-buddy-desc").value.trim();

    if (!name) return;
    char.relationships.buddies[currentEditBuddyIndex] = { name, desc };

    resetSocialBuddyForm();
    renderEditBuddies();
}

function resetSocialBuddyForm() {
    currentEditBuddyIndex = null;
    document.getElementById("new-buddy-name").value = "";
    document.getElementById("new-buddy-desc").value = "";
    const btnAdd = document.querySelector("#modal-edit-buddies .talent-entry-box button");
    if (btnAdd) {
        btnAdd.innerText = "ADD";
        btnAdd.onclick = adicionarBuddy;
    }
}

function adicionarBuddy() {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;

    const nameInput = document.getElementById("new-buddy-name");
    const name = nameInput.value.trim();
    const desc = document.getElementById("new-buddy-desc").value.trim();

    if (!name) return;
    if (!char.relationships.buddies) char.relationships.buddies = [];
    char.relationships.buddies.push({ name, desc });

    resetSocialBuddyForm();
    renderEditBuddies();
}

function removerBuddy(index) {
    const char = characters.find(c => c.id === currentCharacterId);
    if (!char) return;
    char.relationships.buddies.splice(index, 1);
    renderEditBuddies();
}

function salvarBuddies() {
    resetSocialBuddyForm();
    saveCharacters();
    fecharModais();
    atualizarVisualDashboard();
}

// XP
function abrirModalEditXP() {
    renderEditXP();
    document.getElementById("modal-edit-xp").classList.add("active");
}

function renderEditXP() {
    const char = characters.find(c => c.id === currentCharacterId);
    const container = document.getElementById("xp-edit-container");
    container.innerHTML = "";

    for (let i = 1; i <= 15; i++) {
        const label = document.createElement("label");
        label.className = "xp-check-label";
        const checked = i <= (char.xp || 0);
        label.innerHTML = `
            <input type="checkbox" ${checked ? 'checked' : ''} onchange="updateXPRange(${i})">
            <span>${i}</span>
        `;
        container.appendChild(label);
    }
}

function updateXPRange(value) {
    const char = characters.find(c => c.id === currentCharacterId);
    char.xp = value;
    saveCharacters();
    renderEditXP();
    atualizarVisualDashboard();
}

// Mutações
function abrirModalEditMutations() {
    renderEditMutations();
    document.getElementById("modal-edit-mutations").classList.add("active");
}

function renderEditMutations() {
    const char = characters.find(c => c.id === currentCharacterId);
    const list = document.getElementById("edit-mutations-list");
    list.innerHTML = "";

    (char.mutations || []).forEach(m => {
        const row = document.createElement("div");
        row.className = "talent-edit-row";
        row.innerHTML = `
            <div class="talent-info-mini" onclick="abrirDetalheMutacao('${m.name}')">
                <strong>${m.name.toUpperCase()}</strong>
                <p style="font-size: 0.65rem; color: #666; margin: 0">${m.desc ? (m.desc.substring(0, 40) + '...') : 'Sem descrição.'}</p>
            </div>
            <button class="btn-remove" onclick="removerMutacao('${m.name}')">✖</button>
        `;
        list.appendChild(row);
    });
}

function adicionarMutacao() {
    const char = characters.find(c => c.id === currentCharacterId);
    const nameInput = document.getElementById("new-mutation-name");
    const descInput = document.getElementById("new-mutation-desc");

    const name = nameInput.value.trim();
    const desc = descInput.value.trim();

    if (!name) return;

    char.mutations.push({ name, desc });
    nameInput.value = "";
    descInput.value = "";

    saveCharacters();
    renderEditMutations();
    atualizarVisualDashboard();
}

function removerMutacao(name) {
    const char = characters.find(c => c.id === currentCharacterId);
    char.mutations = char.mutations.filter(m => m.name !== name);
    saveCharacters();
    renderEditMutations();
    atualizarVisualDashboard();
}

let currentDetailMutName = null;
function abrirDetalheMutacao(name) {
    const char = characters.find(c => c.id === currentCharacterId);
    const mut = char.mutations.find(m => m.name === name);
    if (!mut) return;

    currentDetailMutName = name;
    document.getElementById("detalhe-mutacao-nome").innerText = mut.name.toUpperCase();
    document.getElementById("detalhe-mutacao-desc-text").innerText = mut.desc || "Sem descrição disponível.";

    // Notes
    const notes = mut.notes || "";
    document.getElementById("detalhe-mutacao-notes-text").innerText = notes || "Nenhuma nota adicionada.";
    document.getElementById("edit-mutacao-notes").value = notes;

    toggleModalEdit('mutation', false);
    document.getElementById("modal-mutation-detail").classList.add("active");
}

function salvarDescricaoMutacao() {
    const char = characters.find(c => c.id === currentCharacterId);
    const mut = char.mutations.find(m => m.name === currentDetailMutName);
    if (mut) {
        mut.notes = document.getElementById("edit-mutacao-notes").value;
        saveCharacters();
        abrirDetalheMutacao(currentDetailMutName);
    }
}

function voltarAoHub() {
    currentCharacterId = null;
    document.getElementById("hub-header").style.display = "block";
    document.getElementById("hub-main").style.display = "grid";
    document.getElementById("char-dashboard").style.display = "none";
    renderHub();
}

// Filtros
function filterCharacters(type) {
    document.querySelectorAll(".btn-filter").forEach(btn => {
        btn.classList.remove("active");
    });

    // Encontrar o botão correto pelo type attribute ou texto se necessário
    // Simplificando: o clique já passa o type, vamos marcar o botão clicado
    event.currentTarget.classList.add("active");

    renderHub(type);
}
