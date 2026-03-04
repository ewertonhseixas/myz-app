const PRESET_PROJECTS = [
    {
        "id": 1,
        "name": "Defesas",
        "requirements": "Nenhum",
        "skills": "Impelir ou Observar",
        "work": 2,
        "bonus": "Guerra +2D6",
        "desc": "Paliçadas, fossos ou fortificações para proteção",
        "type": [
            "guerra"
        ]
    },
    {
        "id": 2,
        "name": "Grupo de Caça",
        "requirements": "Nenhum",
        "skills": "Suportar ou Atirar",
        "work": 1,
        "bonus": "Sup. Comida +2D6",
        "desc": "Expedições organizadas para caçar animais na Zona",
        "type": [
            "comida"
        ]
    },
    {
        "id": 3,
        "name": "Canibalismo",
        "requirements": "Nenhum",
        "skills": "Lutar ou Manipular",
        "work": 1,
        "bonus": "Sup. Comida +3D6, Cultura -D6",
        "desc": "Consumo de habitantes para evitar a inanição",
        "type": [
            "comida",
            "cultura"
        ]
    },
    {
        "id": 4,
        "name": "Terra de Cultivo",
        "requirements": "Nenhum",
        "skills": "Suportar ou Conhecer a Zona",
        "work": 3,
        "bonus": "Sup. Comida +3D6",
        "desc": "Plantação organizada de grãos ou cogumelos",
        "type": [
            "comida"
        ]
    },
    {
        "id": 5,
        "name": "Mercado de Escravos",
        "requirements": "Nenhum",
        "skills": "Lutar ou Manipular",
        "work": 2,
        "bonus": "Sup. Comida +D6, Guerra +D6",
        "desc": "Comércio de mutantes entre facções",
        "type": [
            "comida",
            "guerra"
        ]
    },
    {
        "id": 6,
        "name": "Chiqueiro",
        "requirements": "Nenhum",
        "skills": "Suportar ou Conhecer a Zona",
        "work": 2,
        "bonus": "Sup. Comida +2D6",
        "desc": "Captura e criação de porcos mutantes",
        "type": [
            "comida"
        ]
    },
    {
        "id": 7,
        "name": "Templo",
        "requirements": "Nenhum",
        "skills": "Suportar ou Manipular",
        "work": 1,
        "bonus": "Cultura +D6",
        "desc": "Local para veneração de divindades ou do Ancião",
        "type": [
            "cultura"
        ]
    },
    {
        "id": 8,
        "name": "Luta-Livre da Zona",
        "requirements": "Nenhum",
        "skills": "Lutar ou Manipular",
        "work": 1,
        "bonus": "Guerra +D6",
        "desc": "Jaula para combates e apostas de balas",
        "type": [
            "guerra"
        ]
    },
    {
        "id": 9,
        "name": "Expedição à Zona",
        "requirements": "Nenhum (apenas 1 por Assembleia)",
        "skills": "Nenhuma",
        "work": 1,
        "bonus": "Variável",
        "desc": "Exploração em larga escala de um setor alvo",
        "type": [
            "geral"
        ]
    },
    {
        "id": 10,
        "name": "Museu",
        "requirements": "Cultura 5",
        "skills": "Compreender",
        "work": 2,
        "bonus": "Cultura +D6, Tecnologia +D6",
        "desc": "Exibição de objetos e história da Velha Era",
        "type": [
            "cultura",
            "tecnologia"
        ]
    },
    {
        "id": 11,
        "name": "Estátua",
        "requirements": "Cultura 5",
        "skills": "Suportar ou Sentir Emoções",
        "work": 1,
        "bonus": "Cultura +D6",
        "desc": "Grande efígie para inflar o ego de um líder",
        "type": [
            "cultura"
        ]
    },
    {
        "id": 12,
        "name": "Relógio Solar",
        "requirements": "Cultura 5",
        "skills": "Compreender",
        "work": 1,
        "bonus": "Tecnologia +D6",
        "desc": "Haste metálica para marcação das horas",
        "type": [
            "tecnologia"
        ]
    },
    {
        "id": 13,
        "name": "Torre de Vigia",
        "requirements": "Tecnologia 5",
        "skills": "Suportar ou Observar",
        "work": 1,
        "bonus": "Guerra +D6",
        "desc": "Ponto elevado para avistar inimigos distantes",
        "type": [
            "guerra"
        ]
    },
    {
        "id": 14,
        "name": "Porto",
        "requirements": "Tecnologia 10 (Próximo à água)",
        "skills": "Suportar ou Compreender",
        "work": 2,
        "bonus": "(Requisito p/ Navio)",
        "desc": "Cais para carga e descarga de barcos",
        "type": [
            "geral"
        ]
    },
    {
        "id": 15,
        "name": "Moinho",
        "requirements": "Tecnologia 10, Terra de Cultivo",
        "skills": "Suportar ou Compreender",
        "work": 2,
        "bonus": "Sup. Comida +2D6",
        "desc": "Mecanismo para moer plantas e fazer farinha",
        "type": [
            "comida"
        ]
    },
    {
        "id": 16,
        "name": "Defumadouro",
        "requirements": "Sup. Comida 5, Tecnologia 10, Grupo de Caça",
        "skills": "Suportar ou Compreender",
        "work": 2,
        "bonus": "Sup. Comida +D6",
        "desc": "Cabana para defumar carne e fazê-la durar mais",
        "type": [
            "comida"
        ]
    },
    {
        "id": 17,
        "name": "Mercado",
        "requirements": "Sup. Comida 10, Cultura 10",
        "skills": "Manipular",
        "work": 2,
        "bonus": "Sup. Comida +D6, Cultura +D6",
        "desc": "&Aacute;rea para escambo e comércio organizado",
        "type": [
            "comida",
            "cultura"
        ]
    },
    {
        "id": 18,
        "name": "Milícia",
        "requirements": "Guerra 10",
        "skills": "Lutar ou Manipular",
        "work": 2,
        "bonus": "Guerra +2D6",
        "desc": "Força armada para proteger a Arca",
        "type": [
            "guerra"
        ]
    },
    {
        "id": 19,
        "name": "Biblioteca",
        "requirements": "Cultura 10",
        "skills": "Compreender",
        "work": 3,
        "bonus": "Cultura +3D6",
        "desc": "Coleção de livros e revistas da Velha Era",
        "type": [
            "cultura"
        ]
    },
    {
        "id": 20,
        "name": "Estábulos",
        "requirements": "Sup. Comida 10",
        "skills": "Suportar ou Conhecer a Zona",
        "work": 2,
        "bonus": "Sup. Comida +D6, Guerra +D6",
        "desc": "Captura e doma de Bestamargas e montarias",
        "type": [
            "comida",
            "guerra"
        ]
    },
    {
        "id": 21,
        "name": "Taverna",
        "requirements": "Sup. Comida 10",
        "skills": "Suportar ou Sentir Emoções",
        "work": 1,
        "bonus": "Cultura +D6",
        "desc": "Local para comer, beber e trocar histórias",
        "type": [
            "cultura"
        ]
    },
    {
        "id": 22,
        "name": "Teatro",
        "requirements": "Cultura 10",
        "skills": "Manipular",
        "work": 2,
        "bonus": "Cultura +2D6",
        "desc": "Palco para peças sobre o destino do Povo",
        "type": [
            "cultura"
        ]
    },
    {
        "id": 23,
        "name": "Câmara de Tortura",
        "requirements": "Guerra 10, Cultura 10",
        "skills": "Lutar ou Manipular",
        "work": 1,
        "bonus": "Guerra +D6",
        "desc": "Local para interrogar traidores e malfeitores",
        "type": [
            "guerra"
        ]
    },
    {
        "id": 24,
        "name": "Tribunal",
        "requirements": "Guerra 10, Cultura 10",
        "skills": "Lutar ou Compreender",
        "work": 2,
        "bonus": "Cultura +D6, Guerra +D6",
        "desc": "Sistema jurídico para punir crimes na Arca",
        "type": [
            "cultura",
            "guerra"
        ]
    },
    {
        "id": 25,
        "name": "Roda d'&Aacute;gua",
        "requirements": "Tecnologia 10",
        "skills": "Suportar ou Compreender",
        "work": 1,
        "bonus": "Tecnologia +D6",
        "desc": "Geração de energia para moinhos ou geradores",
        "type": [
            "tecnologia"
        ]
    },
    {
        "id": 26,
        "name": "Oficina",
        "requirements": "Tecnologia 10",
        "skills": "Suportar ou Compreender",
        "work": 3,
        "bonus": "Tecnologia +2D6",
        "desc": "Local para conserto de equipamentos (cobra balas)",
        "type": [
            "tecnologia"
        ]
    },
    {
        "id": 27,
        "name": "Vigilância",
        "requirements": "Guerra 10, Cultura 10",
        "skills": "Esgueirar ou Manipular",
        "work": 1,
        "bonus": "Guerra +D6",
        "desc": "Sistema de informantes e espionagem interna",
        "type": [
            "guerra"
        ]
    },
    {
        "id": 28,
        "name": "Calendário",
        "requirements": "Tecnologia 15, Cultura 10",
        "skills": "Compreender",
        "work": 1,
        "bonus": "Cultura +D6",
        "desc": "Observações astron&ocirc;micas para marcar o ano",
        "type": [
            "cultura"
        ]
    },
    {
        "id": 29,
        "name": "Moinho de Vento",
        "requirements": "Tecnologia 15, Sup. Comida 10, Oficina",
        "skills": "Suportar ou Compreender",
        "work": 1,
        "bonus": "Tecnologia +D6",
        "desc": "Estrutura para mover moinhos ou geradores",
        "type": [
            "tecnologia"
        ]
    },
    {
        "id": 30,
        "name": "Tinta e Papel",
        "requirements": "Tecnologia 15, Cultura 10",
        "skills": "Compreender",
        "work": 2,
        "bonus": "Cultura +2D6",
        "desc": "Produção de material para escrita",
        "type": [
            "cultura"
        ]
    },
    {
        "id": 31,
        "name": "Destilaria",
        "requirements": "Sup. Comida 5, Tecnologia 15, Oficina",
        "skills": "Compreender",
        "work": 1,
        "bonus": "Birita custa metade 21",
        "desc": "Equipamento para produzir birita e químicos",
        "type": [
            "geral"
        ]
    },
    {
        "id": 32,
        "name": "Exército",
        "requirements": "Guerra 20",
        "skills": "Lutar ou Manipular",
        "work": 2,
        "bonus": "Guerra +2D6",
        "desc": "Força poderosa para campanhas na Zona",
        "type": [
            "guerra"
        ]
    },
    {
        "id": 33,
        "name": "Banco",
        "requirements": "Guerra 10, Cultura 20",
        "skills": "Compreender ou Manipular",
        "work": 1,
        "bonus": "Cultura +D6",
        "desc": "Local seguro para guardar bens valiosos",
        "type": [
            "cultura"
        ]
    },
    {
        "id": 34,
        "name": "Navio",
        "requirements": "Tecnologia 20, Porto",
        "skills": "Suportar ou Compreender",
        "work": 3,
        "bonus": "Sup. +D6, Cul. +D6, Guerra +D6",
        "desc": "Grande embarcação de sucata para 50 pessoas",
        "type": [
            "guerra"
        ]
    },
    {
        "id": 35,
        "name": "Gerador",
        "requirements": "Tecnologia 20, Oficina, Motor a Vapor/Veículo/Esteira",
        "skills": "Compreender",
        "work": 2,
        "bonus": "Tecnologia +2D6",
        "desc": "Máquina para gerar corrente elétrica",
        "type": [
            "tecnologia"
        ]
    },
    {
        "id": 36,
        "name": "Heliógrafo",
        "requirements": "Tecnologia 20, Oficina, Contato c/ Povoado",
        "skills": "Suportar ou Compreender",
        "work": 2,
        "bonus": "Cultura +D6",
        "desc": "Sistema de espelhos para mensagens por luz",
        "type": [
            "cultura"
        ]
    },
    {
        "id": 37,
        "name": "Escola",
        "requirements": "Cultura 20",
        "skills": "Compreender ou Conhecer a Zona",
        "work": 2,
        "bonus": "Cultura +D6, Tecnologia +D6",
        "desc": "Local para ensinar o Povo sobre o mundo",
        "type": [
            "cultura",
            "tecnologia"
        ]
    },
    {
        "id": 38,
        "name": "Abrigo",
        "requirements": "Guerra 20, Tecnologia 10",
        "skills": "Mover ou Observar",
        "work": 2,
        "bonus": "Guerra +2D6",
        "desc": "Túneis ocultos e rotas de fuga subterrâneas",
        "type": [
            "guerra"
        ]
    },
    {
        "id": 39,
        "name": "Máquina de Impressão",
        "requirements": "Tecnologia 20, Cultura 20, Oficina, Tinta e Papel",
        "skills": "Suportar ou Compreender",
        "work": 2,
        "bonus": "Cultura +2D6",
        "desc": "Maquinário para imprimir panfletos e livros",
        "type": [
            "cultura"
        ]
    },
    {
        "id": 40,
        "name": "Povoado",
        "requirements": "Guerra 20, Cultura 20, Setor explorado a 2D6 da Arca",
        "skills": "Suportar",
        "work": 3,
        "bonus": "Novo local (DEVs em 0) 27",
        "desc": "Estabelecimento de uma nova Arca na Zona",
        "type": [
            "geral"
        ]
    },
    {
        "id": 41,
        "name": "Estrada",
        "requirements": "Tecnologia 20",
        "skills": "Suportar ou Compreender",
        "work": 1,
        "bonus": "Sup. +D6, Cul. +D6 (se conectar povoado)",
        "desc": "Caminho para veículos através de um setor",
        "type": [
            "geral"
        ]
    },
    {
        "id": 42,
        "name": "Fundição",
        "requirements": "Tecnologia 25, Oficina",
        "skills": "Suportar ou Compreender",
        "work": 3,
        "bonus": "(Requisito projetos avançados)",
        "desc": "Fornalha para moldar novos itens de metal",
        "type": [
            "geral"
        ]
    },
    {
        "id": 43,
        "name": "Lab. de Explosivos",
        "requirements": "Tecnologia 30, Guerra 10, Destilaria",
        "skills": "Compreender",
        "work": 1,
        "bonus": "Guerra +D6",
        "desc": "Oficina para produzir pólvora e balas",
        "type": [
            "guerra"
        ]
    },
    {
        "id": 44,
        "name": "Autocracia",
        "requirements": "Guerra 30 (Não combinado c/ Sufrágio)",
        "skills": "Compreender",
        "work": 2,
        "bonus": "Guerra +2D6",
        "desc": "Um Chefão assume o governo absoluto",
        "type": [
            "guerra"
        ]
    },
    {
        "id": 45,
        "name": "Livre Iniciativa",
        "requirements": "Tecnologia 30 (Não Coletivismo/Autocracia/Escravos)",
        "skills": "Manipular",
        "work": 2,
        "bonus": "Tecnologia +2D6",
        "desc": "Sistema de fortuna individual e fim da escravidão",
        "type": [
            "tecnologia"
        ]
    },
    {
        "id": 46,
        "name": "Coletivismo",
        "requirements": "Sup. Comida 30 (Não Livre Iniciativa)",
        "skills": "Manipular",
        "work": 2,
        "bonus": "Sup. Comida +2D6",
        "desc": "Distribuição igualitária e fim da propriedade",
        "type": [
            "comida"
        ]
    },
    {
        "id": 47,
        "name": "Sufrágio",
        "requirements": "Cultura 30 (Não Autocracia)",
        "skills": "Manipular",
        "work": 2,
        "bonus": "Tecnologia +2D6",
        "desc": "Introdução do direito ao voto para o Povo",
        "type": [
            "tecnologia"
        ]
    },
    {
        "id": 48,
        "name": "Motor a Vapor",
        "requirements": "Tecnologia 30, Fundição, Destilaria",
        "skills": "Suportar ou Compreender",
        "work": 2,
        "bonus": "Tecnologia +2D6",
        "desc": "Motor movido a lenha para geradores ou trens",
        "type": [
            "tecnologia"
        ]
    },
    {
        "id": 49,
        "name": "Carro a Vapor",
        "requirements": "Tecnologia 30, Motor a Vapor",
        "skills": "Compreender",
        "work": 3,
        "bonus": "Tempo exploração pela metade 33",
        "desc": "Veículo motorizado para até 10 passageiros",
        "type": [
            "geral"
        ]
    },
    {
        "id": 50,
        "name": "Via Férrea",
        "requirements": "Tecnologia 35, Fundição",
        "skills": "Suportar ou Compreender",
        "work": 2,
        "bonus": "(Requisito Trem)",
        "desc": "Construção de trilhos por um setor da Zona",
        "type": [
            "geral"
        ]
    },
    {
        "id": 51,
        "name": "Trem",
        "requirements": "Tecnologia 30, Motor a Vapor, Via Férrea",
        "skills": "Compreender",
        "work": 3,
        "bonus": "Sup., Cul., Tec. +D6 (se conectar povoado)",
        "desc": "Transporte ferroviário de alta velocidade",
        "type": [
            "geral"
        ]
    },
    {
        "id": 52,
        "name": "Arsenal",
        "requirements": "Tecnologia 35, Guerra 10, Fundição",
        "skills": "Atirar ou Compreender",
        "work": 2,
        "bonus": "Guerra +2D6",
        "desc": "Produção em massa de armas de fogo",
        "type": [
            "guerra"
        ]
    },
    {
        "id": 53,
        "name": "Cirurgia",
        "requirements": "Tecnologia 35, Destilaria",
        "skills": "Compreender",
        "work": 2,
        "bonus": "+2 p/ Curar; Morte Sessão -1 37",
        "desc": "Clínica médica para tratar ferimentos graves",
        "type": [
            "geral"
        ]
    },
    {
        "id": 54,
        "name": "Luzes Elétricas",
        "requirements": "Tecnologia 40, Oficina, Gerador",
        "skills": "Compreender",
        "work": 2,
        "bonus": "Tecnologia +2D6",
        "desc": "Iluminação total da Arca à noite",
        "type": [
            "tecnologia"
        ]
    },
    {
        "id": 55,
        "name": "Rádio",
        "requirements": "Tecnologia 50, Oficina, Gerador",
        "skills": "Compreender",
        "work": 2,
        "bonus": "Tecnologia +2D6",
        "desc": "Dispositivo para comunicação a longa distância",
        "type": [
            "tecnologia"
        ]
    }
];
