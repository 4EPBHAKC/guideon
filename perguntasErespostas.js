document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userMessageInput = document.getElementById("user-message");
    const sendButton = document.getElementById("send-button");
    sendButton.addEventListener("click", sendMessage);
    userMessageInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
    // Função para calcular a similaridade entre duas strings
    function calculateStringSimilarity(str1, str2) {
        const a = str1.toLowerCase();
        const b = str2.toLowerCase();
        const maxLength = Math.max(a.length, b.length);
        let shared = 0;

        for (let i = 0; i < maxLength; i++) {
            if (a[i] === b[i]) {
                shared++;
            } else {
                break;
            }
        }
        return shared / maxLength;
    }
    // Objeto que mapeia perguntas às respostas
    const faq = {
        "qual é a capital do Brasil?": [
            "A capital do Brasil é Brasília.",
            "Brasília é a capital do Brasil.",
            "Brasília foi escolhida como a capital em 1960.",
            "Brasília é a sede do governo federal brasileiro.",
            "A capital do Brasil foi transferida de Rio de Janeiro para Brasília."
        ],
        "Brasília é?": [
            "Brasília é a capital do Brasil.",
            "Brasília é a capital do Brasil foi fundada em 1960.",
            "A cidade de Brasília foi projetada por Oscar Niemeyer e Lúcio Costa, é a capital do Brasil e foi fundada em 1960."
        ],
        "qual é a contribuição de Oscar Niemeyer para a arquitetura brasileira?": [
            "Oscar Niemeyer foi um renomado arquiteto brasileiro conhecido por sua contribuição significativa para a arquitetura modernista no Brasil.",
            "Ele é famoso por projetar muitos edifícios icônicos, incluindo o Palácio do Planalto em Brasília e o Museu de Arte Contemporânea de Niterói.",
            "Niemeyer também desempenhou um papel fundamental na criação do plano urbanístico de Brasília."
        ],
        "quem é Lúcio Costa?": [
            "Lúcio Costa foi um arquiteto e urbanista brasileiro, conhecido por ser o principal responsável pelo plano urbanístico de Brasília.",
            "Ele colaborou com Oscar Niemeyer na criação do projeto arquitetônico da capital brasileira.",
            "Lúcio Costa é considerado uma figura importante na história da arquitetura e do urbanismo no Brasil."
        ],
        "outra pergunta?": [
            "Resposta para a outra pergunta.",
            "Outra possível resposta."
        ],
        "Quem foi o fundador do Brasil?": [
            "O Brasil foi descoberto pelos portugueses em 1500, liderados por Pedro Álvares Cabral.",
            "Pedro Álvares Cabral é considerado o descobridor do Brasil.",
            "A chegada de Cabral ao Brasil marca o início da colonização portuguesa.",
            "Cabral chegou ao Brasil em 22 de abril de 1500."
        ],
        "Qual é a língua oficial do Brasil?": [
            "A língua oficial do Brasil é o português.",
            "O português é a língua falada e escrita em todo o país."
        ],
        "Quem foi Dom Pedro II?": [
            "Dom Pedro II foi o segundo e último imperador do Brasil.",
            "Ele reinou de 1831 até a proclamação da República em 1889.",
            "Dom Pedro II era conhecido por seu apoio à educação e à ciência no Brasil."
        ],
        "Qual é o maior rio do Brasil?": [
            "O maior rio do Brasil é o rio Amazonas.",
            "O rio Amazonas é o segundo rio mais longo do mundo, depois do Nilo."
        ],
        "Quantos estados o Brasil possui?": [
            "O Brasil possui 26 estados e o Distrito Federal.",
            "Cada estado tem seu próprio governo e administração."
        ],
        "Quem é Pelé?": [
            "Pelé é amplamente considerado um dos maiores jogadores de futebol de todos os tempos.",
            "Ele nasceu no Brasil e é conhecido por suas conquistas no futebol internacional.",
            "Pelé venceu três Copas do Mundo com a seleção brasileira."
        ],
        "O que é o Carnaval do Brasil?": [
            "O Carnaval do Brasil é uma festa popular que ocorre antes da Quaresma.",
            "É famoso por desfiles de escolas de samba, festas de rua e música animada.",
            "O Carnaval é uma das festas mais celebradas e coloridas do Brasil."
        ],
        "Quem foi Machado de Assis?": [
            "Machado de Assis foi um renomado escritor brasileiro do século XIX.",
            "Ele é conhecido por suas obras literárias, incluindo 'Dom Casmurro' e 'Memórias Póstumas de Brás Cubas.'",
            "Machado de Assis é frequentemente considerado um dos maiores escritores em língua portuguesa."
        ],
        "Qual é o prato nacional do Brasil?": [
            "O prato nacional do Brasil é a feijoada.",
            "A feijoada é um prato feito com feijão-preto e várias carnes, geralmente servido com arroz, couve e laranja."
        ],
        "Quem é a figura histórica conhecida como Zumbi dos Palmares?": [
            "Zumbi dos Palmares foi um líder quilombola brasileiro do século XVII.",
            "Ele liderou o Quilombo dos Palmares, uma comunidade de escravos fugitivos.",
            "Zumbi é um símbolo da resistência à escravidão no Brasil."
        ],
        "O que é o Cristo Redentor?": [
            "O Cristo Redentor é uma estátua monumental localizada no Rio de Janeiro.",
            "É um dos ícones mais reconhecíveis do Brasil e do mundo.",
            "A estátua representa Jesus Cristo e está localizada no topo do Morro do Corcovado."
        ],
        "Quem foi Ayrton Senna?": [
            "Ayrton Senna foi um famoso piloto de Fórmula 1 brasileiro.",
            "Ele é considerado um dos maiores pilotos de todos os tempos.",
            "Senna conquistou três campeonatos mundiais na Fórmula 1 antes de sua trágica morte em um acidente em 1994."
        ],
        "O que é a Floresta Amazônica?": [
            "A Floresta Amazônica é a maior floresta tropical do mundo.",
            "Ela abrange uma grande parte do território brasileiro e é vital para a biodiversidade global.",
            "A Amazônia desempenha um papel crucial na regulação do clima e na conservação da natureza."
        ],
        "Qual é a dança tradicional do Brasil?": [
            "A dança tradicional do Brasil inclui o samba, o forró e o frevo, entre outros.",
            "O samba é especialmente associado ao Carnaval e à cultura brasileira."
        ],
        "Quem é Jorge Amado?": [
            "Jorge Amado foi um renomado escritor brasileiro do século XX.",
            "Ele é conhecido por obras como 'Gabriela, Cravo e Canela' e 'Dona Flor e Seus Dois Maridos.'",
            "Amado retratou a cultura e as pessoas da Bahia em suas histórias."
        ],
        "Qual é a moeda do Brasil?": [
            "A moeda do Brasil é o Real (R$).",
            "O Real é a moeda oficial do país desde 1994."
        ],
        "O que é o futebol para o Brasil?": [
            "O futebol é uma paixão nacional no Brasil.",
            "O país é conhecido por sua forte cultura de futebol e já ganhou a Copa do Mundo cinco vezes.",
            "O Maracanã, no Rio de Janeiro, é um dos estádios de futebol mais famosos do mundo."
        ],
        "Quem é Clarice Lispector?": [
            "Clarice Lispector foi uma renomada escritora e jornalista ucraniana-brasileira.",
            "Ela é conhecida por suas obras literárias, incluindo 'A Hora da Estrela' e 'A Paixão Segundo G.H.'.",
            "Lispector é considerada uma das vozes mais influentes da literatura brasileira do século XX."
        ],
        "Qual é o hino nacional do Brasil?": [
            "O hino nacional do Brasil é chamado 'Hino Nacional Brasileiro.'",
            "A música foi composta por Francisco Manuel da Silva e é um dos símbolos nacionais do país."
        ],
        "oi": [
            "Oi! Como posso ajudar você hoje?",
            "Olá! Em que posso ser útil?",
            "Oi, como está? Em que posso auxiliar?",
            "Olá, é um prazer falar com você! Como posso ser útil?",
            "Oi! Estou aqui para responder às suas perguntas.",
            "Olá, como posso ajudá-lo hoje?",
            "Oi, como vai? Estou à disposição para ajudar.",
            "Olá! Como posso ser de assistência?",
            "Oi, tudo bem? Como posso ajudar você?",
            "Olá, estou aqui para responder às suas dúvidas. Como posso ajudar?",
            "Oi! Qual é a sua pergunta hoje?",
            "Olá, é bom tê-lo aqui! Em que posso ser útil?",
            "Oi, como posso auxiliar você?",
            "Olá! Estou aqui para fornecer informações.",
            "Oi, qual é o seu interesse hoje?",
            "Olá, como posso ser de serviço?",
            "Oi! Estou à disposição para ajudar no que for preciso.",
            "Olá, o que você gostaria de saber?",
            "Oi, como posso ser útil para você hoje?",
            "Olá! Como posso ajudar você?"
        ],
        "e aí": [
            "E aí! Como posso ajudar você?",
            "Oi! Em que posso ser útil hoje?",
            "E aí, tudo bem? Estou aqui para responder às suas perguntas.",
            "E aí! Como posso ser útil hoje?",
            "E aí, como posso ajudar?",
            "Oi! Como vai? Estou à disposição para ajudar.",
            "E aí! Como posso ser de assistência?",
            "Oi, tudo bem? Como posso ajudar você?",
            "E aí, estou aqui para responder às suas dúvidas. Como posso ajudar?",
            "Oi, como posso auxiliar você?"
        ],
        "olá": [
            "Olá! É um prazer falar com você. Como posso ser útil?",
            "Oi, como vai? Em que posso auxiliar?",
            "Olá, estou à disposição para ajudar. Como posso ajudar você?",
            "Olá! Como posso ajudar você hoje?",
            "Olá, como posso ajudá-lo?",
            "Oi! Como posso ser de assistência?",
            "Olá, tudo bem? Como posso ajudar você?",
            "Oi, como posso auxiliar você?",
            "Olá! Estou aqui para responder às suas perguntas.",
            "Olá, é bom tê-lo aqui! Em que posso ser útil?"
        ],
        "O que é o amor?": [
            "O amor é um sentimento profundo de carinho, afeto e apego por alguém ou algo.",
            "É uma emoção complexa que pode assumir muitas formas, como amor romântico, amor familiar e amizade.",
            "O amor pode ser uma fonte de felicidade e conexão humana."
        ],
        "Como o amor é expresso?": [
            "O amor pode ser expresso de várias maneiras, incluindo palavras de carinho, gestos de afeto, atos de bondade e apoio emocional.",
            "Expressões de amor podem incluir abraços, beijos, presentes e tempo de qualidade junto com a pessoa amada.",
            "Cada pessoa pode expressar e receber amor de maneira única."
        ],
        "Quais são os diferentes tipos de amor?": [
            "Existem muitos tipos de amor, incluindo o amor romântico entre parceiros, o amor platônico entre amigos, o amor familiar e o amor próprio.",
            "O amor pode ser incondicional, onde não há expectativas em troca, ou pode ser condicional, dependendo do comportamento ou ações.",
            "Cada tipo de amor tem suas próprias características e significados."
        ],
        "O que é o amor romântico?": [
            "O amor romântico é uma forma de amor que envolve atração física e emocional por uma pessoa em um contexto romântico.",
            "Pode incluir sentimentos de paixão, desejo e compromisso com um parceiro íntimo.",
            "O amor romântico é frequentemente associado a relacionamentos amorosos."
        ],
        "Qual é a importância do amor na vida humana?": [
            "O amor desempenha um papel fundamental na vida humana, proporcionando conexão emocional, apoio social e bem-estar psicológico.",
            "Pode ser uma fonte de felicidade, satisfação e significado na vida.",
            "O amor também é central em relacionamentos familiares e românticos."
        ],
        "Como o amor pode ser duradouro em um relacionamento?": [
            "Um amor duradouro em um relacionamento pode ser cultivado por meio de comunicação aberta, confiança, respeito mútuo e compromisso.",
            "Manter a chama do romance viva, compartilhar interesses comuns e demonstrar apreço são formas de fortalecer o amor ao longo do tempo.",
            "É importante trabalhar juntos para superar desafios e adversidades."
        ],
        "Quais são os benefícios do amor próprio?": [
            "O amor próprio envolve cuidar de si mesmo, valorizar-se e manter uma autoestima saudável.",
            "Os benefícios do amor próprio incluem maior resiliência emocional, autoconfiança, capacidade de estabelecer limites saudáveis e relacionamentos mais positivos.",
            "O amor próprio é essencial para o bem-estar mental e emocional."
        ],
        "Como o amor pode ser expresso em amizades?": [
            "O amor em amizades pode ser expresso por meio de apoio, lealdade, empatia e compartilhamento de experiências.",
            "Amigos frequentemente demonstram amor um pelo outro oferecendo suporte emocional, ouvindo e estando presentes nos momentos bons e ruins.",
            "Amizades verdadeiras são baseadas no amor e na camaradagem."
        ],
        "Quais são os elementos-chave de um relacionamento amoroso saudável?": [
            "Um relacionamento amoroso saudável inclui comunicação eficaz, confiança, respeito, compromisso e empatia.",
            "Ambos os parceiros devem se sentir valorizados e ouvidos, e o relacionamento deve ser baseado em apoio mútuo.",
            "A comunicação aberta é fundamental para resolver conflitos e manter a harmonia."
        ],
        "O que o amor significa para você?": [
            "O significado do amor pode variar de pessoa para pessoa, e muitas vezes é uma experiência profundamente pessoal e única.",
            "Para algumas pessoas, o amor pode ser a força motriz de suas vidas, enquanto outras podem encontrar significado em outras áreas.",
            "O amor é uma parte fundamental da experiência humana."
        ],
        "Quando Adolf Hitler morreu?": [
            "Adolf Hitler morreu em 30 de abril de 1945.",
            "A morte de Hitler ocorreu no final da Segunda Guerra Mundial, durante a Batalha de Berlim.",
            "Ele se suicidou em seu bunker em Berlim juntamente com Eva Braun, sua companheira."
        ],
        "Como Adolf Hitler morreu?": [
            "Adolf Hitler cometeu suicídio por envenenamento e disparando um tiro em sua cabeça.",
            "Ele tomou veneno cianeto e, em seguida, atirou em si mesmo para garantir que sua morte fosse imediata.",
            "Sua morte foi confirmada por testemunhas em seu bunker."
        ],
        "Onde Adolf Hitler morreu?": [
            "Adolf Hitler morreu em seu bunker, conhecido como o Führerbunker, em Berlim, Alemanha.",
            "Foi neste local que ele se refugiou durante os últimos dias da Segunda Guerra Mundial."
        ],
        "Por que Adolf Hitler cometeu suicídio?": [
            "Adolf Hitler cometeu suicídio como a derrota da Alemanha na Segunda Guerra Mundial era iminente.",
            "Ele estava enfrentando a invasão das forças aliadas e a queda de Berlim.",
            "Hitler optou pelo suicídio em vez de ser capturado pelas forças inimigas."
        ],
        "Qual foi o impacto da morte de Adolf Hitler?": [
            "A morte de Adolf Hitler marcou o fim do Terceiro Reich e o colapso do regime nazista na Alemanha.",
            "Foi um evento significativo no final da Segunda Guerra Mundial.",
            "O suicídio de Hitler também encerrou sua liderança sobre o movimento nazista."
        ],
        "Houve alguma controvérsia em torno da morte de Hitler?": [
            "Houve teorias conspiratórias e especulações em torno da morte de Hitler, com algumas alegações de que ele teria escapado.",
            "No entanto, a versão amplamente aceita é que ele cometeu suicídio em seu bunker em Berlim.",
            "Diversas investigações e evidências confirmaram sua morte."
        ],
        "Quem sucedeu Adolf Hitler após sua morte?": [
            "Após a morte de Adolf Hitler, Karl Dönitz tornou-se o presidente do Reich e Joseph Goebbels tornou-se o chanceler por um curto período.",
            "No entanto, o governo nazista estava em colapso e não durou muito tempo após a morte de Hitler."
        ],
        "Como foi o funeral de Adolf Hitler?": [
            "O corpo de Adolf Hitler e de Eva Braun foi encontrado queimado após o suicídio.",
            "Eles foram enterrados em um buraco no jardim do Führerbunker.",
            "Posteriormente, seus corpos foram exumados pelos soviéticos para confirmação de sua morte."
        ],
        "Qual é o legado de Adolf Hitler?": [
            "O legado de Adolf Hitler é amplamente negativo, pois ele liderou o regime nazista responsável pelo Holocausto e a Segunda Guerra Mundial.",
            "Ele é lembrado como um dos maiores vilões da história e suas ações causaram a morte de milhões de pessoas."
        ],
        "Como a morte de Adolf Hitler é vista na Alemanha hoje?": [
            "A morte de Adolf Hitler é vista na Alemanha como parte da história sombria do país.",
            "A Alemanha reconhece o papel do nazismo e busca lembrar o passado para evitar que tais horrores se repitam.",
            "O bunker onde Hitler morreu é atualmente um estacionamento e não há monumentos em sua homenagem."
        ],
        "O que é musculação?": [
            "Musculação é uma forma de exercício que envolve o uso de pesos, máquinas ou resistência para desenvolver e fortalecer os músculos do corpo.",
            "É uma modalidade de treinamento de resistência que visa melhorar a força, a resistência muscular e a composição corporal."
        ],
        "Quais são os benefícios da musculação?": [
            "Os benefícios da musculação incluem o aumento da força muscular, a melhoria da resistência, a queima de calorias, o fortalecimento dos ossos e a tonificação muscular.",
            "Também pode ajudar na prevenção de lesões, no aumento do metabolismo e na promoção de um corpo mais saudável e definido."
        ],
        "Como começar na musculação?": [
            "Para começar na musculação, é aconselhável procurar a orientação de um profissional de educação física ou treinador pessoal.",
            "Eles podem ajudar a criar um programa de treinamento adequado às suas metas e nível de condicionamento físico.",
            "Comece com pesos leves e aumente gradualmente a intensidade à medida que ganha mais força e resistência."
        ],
        "Com que frequência devo praticar musculação?": [
            "A frequência de treinamento em musculação pode variar, mas a maioria das pessoas treina de 3 a 4 vezes por semana, permitindo a recuperação adequada entre os treinos.",
            "O descanso é importante para o crescimento muscular e a prevenção de lesões."
        ],
        "Qual é a diferença entre treinamento de força e musculação?": [
            "O treinamento de força é um termo mais amplo que inclui a musculação. Ele engloba qualquer forma de exercício que visa aumentar a força muscular.",
            "A musculação é uma forma específica de treinamento de força que usa pesos e máquinas para alcançar esse objetivo."
        ],
        "Como a dieta se relaciona com a musculação?": [
            "A dieta desempenha um papel crucial na musculação. Uma alimentação adequada fornece os nutrientes necessários para o crescimento muscular e a recuperação.",
            "É importante consumir proteínas, carboidratos, gorduras saudáveis ​​e calorias suficientes para apoiar suas metas de musculação."
        ],
        "Quais são os erros comuns na musculação?": [
            "Alguns erros comuns na musculação incluem treinar com má forma, usar cargas excessivas, ignorar a recuperação, não variar os exercícios e não seguir uma dieta adequada.",
            "É importante aprender as técnicas corretas e não se exceder para evitar lesões."
        ],
        "Quanto tempo leva para ver resultados na musculação?": [
            "Os resultados na musculação podem variar de pessoa para pessoa, mas muitas pessoas começam a ver melhorias nas primeiras semanas de treinamento, como aumento da força e resistência.",
            "Para mudanças visíveis na composição corporal e ganho muscular significativo, pode levar meses a anos de treinamento consistente."
        ],
        "Quais são os diferentes tipos de exercícios de musculação?": [
            "Existem vários tipos de exercícios de musculação, incluindo exercícios compostos, como agachamentos e supinos, e exercícios isolados, como bíceps e tríceps.",
            "Os exercícios podem ser direcionados para grupos musculares específicos ou serem parte de um treino corporal completo."
        ],
        "A musculação é adequada para todas as idades?": [
            "A musculação pode ser adaptada para pessoas de todas as idades, mas é importante ajustar o programa de treinamento de acordo com a condição física e as necessidades individuais.",
            "Os idosos, em particular, podem se beneficiar da musculação para manter a força muscular e a mobilidade."
        ],
        "O que é a vida?": [
            "A vida é o estado de existência e atividade que caracteriza os seres vivos.",
            "É um processo complexo que envolve crescimento, reprodução, resposta a estímulos e metabolismo.",
            "A vida é uma característica fundamental dos organismos biológicos na Terra."
        ],
        "Qual é o propósito da vida?": [
            "O propósito da vida é uma questão filosófica e pessoal que varia de pessoa para pessoa.",
            "Algumas pessoas buscam significado na religião, outras na realização pessoal, e algumas veem o propósito como uma busca contínua por felicidade e crescimento.",
            "O propósito da vida é uma questão profunda que muitos filósofos e pensadores debateram ao longo da história."
        ],
        "Como podemos aproveitar ao máximo a vida?": [
            "Aproveitar ao máximo a vida envolve buscar experiências significativas, cultivar relacionamentos saudáveis, manter a saúde física e mental e buscar realizações pessoais.",
            "É importante definir metas e valores pessoais que ressoem com o que é mais importante para você.",
            "A apreciação do presente e a gratidão também são componentes importantes de aproveitar a vida."
        ],
        "Qual é a importância do equilíbrio na vida?": [
            "O equilíbrio na vida é fundamental para evitar o esgotamento e manter o bem-estar.",
            "Isso inclui equilibrar o trabalho com o lazer, cuidar da saúde mental e física, e reservar tempo para relacionamentos e autocuidado.",
            "O equilíbrio ajuda a manter uma vida saudável e significativa."
        ],
        "O que é a vida familiar?": [
            "A vida familiar é a experiência de viver com parentes, compartilhar laços afetivos e criar relacionamentos dentro do núcleo familiar.",
            "Pode incluir cônjuges, pais, filhos, irmãos e outros parentes que vivem juntos ou mantêm vínculos próximos.",
            "A vida familiar desempenha um papel importante na formação das pessoas e na construção de relações duradouras."
        ],
        "Como a cultura afeta nossa visão da vida?": [
            "A cultura desempenha um papel significativo na formação de nossos valores, crenças e visões de vida.",
            "Ela influencia como vemos o mundo, nossas prioridades e nossas expectativas sociais.",
            "A cultura também molda nossos rituais, tradições e conceitos de sucesso e felicidade."
        ],
        "O que é a qualidade de vida?": [
            "A qualidade de vida refere-se ao nível de bem-estar e satisfação que uma pessoa experimenta em sua vida.",
            "Envolve aspectos como saúde, padrão de vida, relações interpessoais, realização pessoal e felicidade.",
            "A busca pela melhoria da qualidade de vida é uma preocupação comum para muitas pessoas."
        ],
        "Como lidar com desafios na vida?": [
            "Lidar com desafios na vida envolve desenvolver resiliência, buscar apoio social, enfrentar problemas de forma eficaz e manter uma perspectiva positiva.",
            "É normal enfrentar desafios ao longo da vida, e superá-los pode levar a um crescimento pessoal significativo.",
            "A capacidade de adaptação é uma habilidade valiosa para enfrentar os altos e baixos da vida."
        ],
        "Qual é o papel da educação na vida?": [
            "A educação desempenha um papel fundamental na vida ao fornecer conhecimento, habilidades e oportunidades.",
            "Ela permite o crescimento intelectual, o desenvolvimento de carreiras, o acesso a melhores empregos e a capacidade de tomar decisões informadas.",
            "A educação é uma ferramenta poderosa para melhorar a qualidade de vida."
        ],
        "O que significa viver uma vida significativa?": [
            "Viver uma vida significativa envolve encontrar um propósito pessoal, fazer contribuições positivas para a sociedade, cultivar relacionamentos significativos e buscar a realização pessoal.",
            "É sobre viver de acordo com seus valores e aspirações, encontrando significado nas experiências e nas ações que você realiza.",
            "Uma vida significativa é uma busca pessoal e única para cada indivíduo."
        ],
        "O que é a ressurreição?": [
            "A ressurreição é o ato de uma pessoa que estava morta retornar à vida.",
            "Em muitas tradições religiosas, a ressurreição está associada à vida após a morte e é vista como um ato divino ou milagroso."
        ],
        "Quais são algumas crenças religiosas sobre a ressurreição?": [
            "Em várias religiões, como o Cristianismo, o Islamismo e o Judaísmo, a ressurreição é uma parte importante das crenças sobre a vida após a morte.",
            "No Cristianismo, a ressurreição de Jesus Cristo é uma crença fundamental e é celebrada na Páscoa.",
            "No Islamismo, a ressurreição é um componente central da crença no Dia do Juízo Final."
        ],
        "Há evidências científicas de ressurreição?": [
            "Não há evidências científicas de que a ressurreição, no sentido religioso, seja possível ou tenha ocorrido.",
            "A ressurreição é geralmente considerada uma questão de fé e crença religiosa, não algo que possa ser comprovado cientificamente."
        ],
        "Qual é o significado simbólico da ressurreição?": [
            "Além do significado religioso, a ressurreição também pode ter significados simbólicos em várias culturas.",
            "Pode ser vista como um símbolo de renovação, transformação e renascimento.",
            "A ideia de superar a morte ou dificuldades e voltar à vida é um tema comum em mitologia e literatura."
        ],
        "A ressurreição é um conceito presente em outras culturas além das religiões abraâmicas?": [
            "Sim, a ideia de ressurreição ou renascimento está presente em muitas culturas e mitologias ao redor do mundo.",
            "Pode ser encontrada em histórias antigas e mitos que retratam personagens retornando à vida após a morte ou sendo transformados de alguma forma."
        ],
        "Como a ressurreição é celebrada em diferentes religiões?": [
            "A ressurreição é celebrada de diferentes maneiras em várias religiões.",
            "No Cristianismo, a Páscoa é a principal celebração da ressurreição de Jesus, com missas especiais e rituais.",
            "No Islamismo, a crença na ressurreição faz parte das orações e é enfatizada durante o mês sagrado do Ramadã."
        ],
        "A ressurreição é um conceito universalmente aceito?": [
            "Não, a crença na ressurreição varia de acordo com a religião e a cultura.",
            "Enquanto algumas religiões têm a ressurreição como parte central de sua fé, outras não compartilham essa crença e têm visões diferentes sobre a vida após a morte."
        ],
        "Como a ressurreição é retratada na literatura e na cultura popular?": [
            "A ideia de ressurreição é um tema comum na literatura, filmes e cultura popular.",
            "Pode ser vista em histórias de heróis que voltam à vida, vampiros que se levantam da morte e outros conceitos similares.",
            "Essas representações frequentemente exploram os temas da imortalidade e da superação da morte."
        ],
        "O que é Python?": [
            "Python é uma linguagem de programação de alto nível e de código aberto amplamente utilizada para desenvolvimento de software, análise de dados, automação e muito mais.",
            "É conhecida por sua sintaxe clara e legível, o que a torna uma escolha popular entre desenvolvedores."
        ],
        "Quem criou Python e quando?": [
            "Python foi criada por Guido van Rossum e a primeira versão foi lançada em 1991.",
            "Guido van Rossum é frequentemente referido como o pai do Python e desempenhou um papel central no seu desenvolvimento inicial."
        ],
        "Para que Python é usado?": [
            "Python é usado em uma ampla variedade de aplicações, incluindo desenvolvimento web, automação de tarefas, análise de dados, aprendizado de máquina, inteligência artificial, jogos e muito mais.",
            "Sua versatilidade e facilidade de uso a tornam uma escolha popular para muitos projetos."
        ],
        "Quais são as principais características do Python?": [
            "Algumas das principais características do Python incluem uma sintaxe limpa e legível, tipagem dinâmica, gerenciamento automático de memória e suporte a módulos e pacotes.",
            "É uma linguagem interpretada, o que significa que não é necessário compilar o código antes de executá-lo."
        ],
        "Quais são os principais frameworks e bibliotecas Python?": [
            "Python tem uma vasta coleção de frameworks e bibliotecas que facilitam o desenvolvimento em várias áreas.",
            "Alguns dos mais populares incluem o Django para desenvolvimento web, o Flask para aplicações web mais leves, o NumPy e o pandas para análise de dados, e o TensorFlow e o PyTorch para aprendizado de máquina e inteligência artificial."
        ],
        "Como começar a programar em Python?": [
            "Para começar a programar em Python, você pode instalar o Python em seu computador e usar um ambiente de desenvolvimento integrado (IDE) como o Visual Studio Code, PyCharm ou Jupyter Notebook.",
            "Existem muitos tutoriais e recursos online gratuitos para aprender Python, desde conceitos básicos até tópicos avançados."
        ],
        "O Python é uma linguagem de programação de código aberto?": [
            "Sim, o Python é uma linguagem de programação de código aberto, o que significa que seu código-fonte está disponível gratuitamente e pode ser modificado e distribuído pela comunidade de desenvolvedores.",
            "Isso contribui para sua popularidade e adoção generalizada."
        ],
        "Quais são os princípios do Zen do Python?": [
            "O Zen do Python é um conjunto de princípios filosóficos que guiam o desenvolvimento da linguagem Python.",
            "Alguns dos princípios incluem a legibilidade é importante, explícito é melhor do que implícito e a simplicidade é melhor do que a complexidade.",
            "Os desenvolvedores Python frequentemente se referem a esses princípios como diretrizes para escrever código Python de alta qualidade."
        ],
        "Python é adequado para iniciantes em programação?": [
            "Sim, Python é frequentemente recomendado para iniciantes em programação devido à sua sintaxe legível e à facilidade de aprendizado.",
            "É uma excelente escolha para pessoas que estão começando a programar e desejam desenvolver uma base sólida em conceitos de programação."
        ],
        "Python é usado em desenvolvimento web?": [
            "Sim, Python é amplamente utilizado no desenvolvimento web.",
            "Frameworks como Django e Flask facilitam a criação de aplicativos web robustos e escaláveis usando Python.",
            "É uma escolha popular para desenvolvedores que desejam criar sites e aplicativos web."
        ],
        "O que é o mundo?": [
            "O termo 'mundo' pode se referir a diferentes coisas, dependendo do contexto. Geralmente, se refere à Terra, ao planeta em que vivemos, bem como a tudo o que existe nele.",
            "Também pode ser usado para se referir à totalidade da existência ou ao conjunto de todas as pessoas e lugares do planeta."
        ],
        "Quais são os continentes do mundo?": [
            "Existem sete continentes no mundo: África, América do Norte, América do Sul, Ásia, Europa, Oceania (ou Australásia) e Antártica.",
            "Cada continente tem suas próprias características geográficas, culturais e históricas distintas."
        ],
        "Qual é a população do mundo?": [
            "A população do mundo está em constante mudança devido ao crescimento populacional e a eventos demográficos.",
            "A população mundial atual é de mais de 7 bilhões de pessoas, e esse número continua a crescer."
        ],
        "Quais são os maiores países do mundo em área geográfica?": [
            "Os maiores países do mundo em área geográfica incluem a Rússia, o Canadá, os Estados Unidos, a China e o Brasil.",
            "Esses países têm vastas extensões de terra e paisagens diversas."
        ],
        "Qual é a capital do mundo?": [
            "Não existe uma capital única do mundo, pois o mundo é composto por muitos países e regiões, cada um com sua própria capital.",
            "Nova York é frequentemente chamada de 'capital do mundo' devido à sua importância como centro financeiro e cultural global."
        ],
        "Como o mundo está enfrentando desafios ambientais?": [
            "O mundo enfrenta desafios ambientais significativos, incluindo mudanças climáticas, perda de biodiversidade, poluição do ar e da água, e esgotamento de recursos naturais.",
            "Há esforços globais em andamento para lidar com esses desafios, como acordos internacionais sobre mudanças climáticas e conservação da natureza."
        ],
        "Qual é a situação econômica global?": [
            "A situação econômica global varia de país para país e região para região.",
            "A economia mundial é caracterizada por ciclos de crescimento e recessão, e os indicadores econômicos incluem o PIB, o desemprego e o comércio internacional."
        ],
        "Como o mundo lida com questões de direitos humanos?": [
            "A proteção dos direitos humanos é uma preocupação global, e várias organizações internacionais, como a ONU, trabalham para promover e proteger esses direitos em todo o mundo.",
            "No entanto, desafios persistem, incluindo questões de discriminação, conflitos armados e acesso limitado a recursos básicos."
        ],
        "Como as culturas do mundo são diversas?": [
            "As culturas do mundo são extremamente diversas devido à variedade de tradições, línguas, religiões, costumes e estilos de vida.",
            "Cada cultura contribui para a riqueza da diversidade cultural global, e o intercâmbio cultural é uma parte importante das relações internacionais."
        ],
        "Qual é o papel da tecnologia na globalização do mundo?": [
            "A tecnologia desempenha um papel fundamental na globalização do mundo, conectando pessoas, culturas e economias por meio da internet, comunicações e comércio eletrônico.",
            "Isso tem um impacto significativo nas interações globais e na disseminação de informações e ideias."
        ],
        "O que é dropshipping?": [
            "Dropshipping é um modelo de negócios de varejo onde o vendedor não mantém os produtos em estoque, mas em vez disso, ele envia os pedidos dos clientes diretamente ao fornecedor ou fabricante, que então envia os produtos diretamente para o cliente.",
            "Isso significa que o vendedor não precisa investir em estoque físico, o que pode reduzir os custos iniciais."
        ],
        "Como funciona o processo de dropshipping?": [
            "O processo de dropshipping geralmente envolve as seguintes etapas: 1) O cliente faz um pedido no site do vendedor; 2) O vendedor encaminha o pedido ao fornecedor; 3) O fornecedor envia o produto diretamente ao cliente.",
            "O vendedor atua como intermediário, lidando com marketing, vendas e atendimento ao cliente, enquanto o fornecedor cuida da logística e do estoque."
        ],
        "Quais são as vantagens do dropshipping?": [
            "Algumas vantagens do dropshipping incluem a falta de necessidade de um grande investimento inicial em estoque, a flexibilidade para vender uma variedade de produtos sem mantê-los em estoque, e a capacidade de operar um negócio online de qualquer lugar.",
            "Além disso, o vendedor pode oferecer uma ampla variedade de produtos sem precisar comprá-los antecipadamente."
        ],
        "Quais são os desafios do dropshipping?": [
            "Embora o dropshipping tenha suas vantagens, também apresenta desafios, como margens de lucro mais baixas, competição acirrada, dependência de fornecedores e problemas de qualidade de produtos.",
            "Além disso, o controle sobre a entrega e o estoque pode ser limitado, o que pode afetar a experiência do cliente."
        ],
        "Como encontrar fornecedores confiáveis para dropshipping?": [
            "Encontrar fornecedores confiáveis é fundamental para o sucesso do dropshipping. É importante pesquisar e verificar a reputação dos fornecedores, pedir amostras de produtos, verificar prazos de entrega e condições de devolução.",
            "Plataformas online, como Alibaba e SaleHoo, podem ser úteis para encontrar fornecedores confiáveis."
        ],
        "Posso fazer dropshipping como um negócio em tempo parcial?": [
            "Sim, o dropshipping pode ser uma opção viável como um negócio em tempo parcial. Muitos empreendedores começam com o dropshipping enquanto mantêm seus empregos em tempo integral.",
            "Isso permite que eles testem o modelo de negócios e ganhem experiência antes de se dedicarem integralmente ao dropshipping, se desejarem."
        ],
        "Quais são os nichos populares de dropshipping?": [
            "Os nichos de dropshipping populares podem incluir produtos relacionados à saúde e bem-estar, moda, eletrônicos, decoração de casa e produtos para animais de estimação, entre outros.",
            "A escolha do nicho depende dos interesses do empreendedor e da demanda do mercado."
        ],
        "Como promover um negócio de dropshipping?": [
            "A promoção de um negócio de dropshipping geralmente envolve marketing online, incluindo o uso de mídias sociais, publicidade paga, marketing de influenciadores e otimização de mecanismos de busca (SEO).",
            "Construir uma marca forte e oferecer um excelente atendimento ao cliente também são fundamentais para o sucesso."
        ],
        "É possível ter sucesso com dropshipping?": [
            "Sim, é possível ter sucesso com dropshipping, mas como qualquer modelo de negócios, exige trabalho árduo, pesquisa de mercado, estratégia de marketing eficaz e gerenciamento cuidadoso.",
            "O sucesso no dropshipping pode variar de pessoa para pessoa e depende de vários fatores."
        ],
        "Quais são algumas dicas para ter sucesso no dropshipping?": [
            "Algumas dicas para ter sucesso no dropshipping incluem: escolher um nicho com demanda, encontrar fornecedores confiáveis, focar na qualidade do atendimento ao cliente, testar diferentes estratégias de marketing e acompanhar de perto suas finanças.",
            "Também é importante estar preparado para aprender e se adaptar às mudanças no mercado."
        ],
        "bom dia": [
            "Bom dia! Como posso ajudar você hoje?",
            "Bom dia! Estou à disposição para responder às suas perguntas.",
            "Bom dia, como posso ser útil?",
            "Bom dia! Como posso auxiliar você?",
            "Bom dia, tudo bem? Em que posso ajudar?",
            "Bom dia! É um prazer falar com você. Como posso ajudar?",
            "Bom dia, como vai? Estou aqui para ajudar.",
            "Bom dia! Qual é a sua pergunta?",
            "Bom dia, é bom tê-lo aqui! Em que posso ser útil?",
            "Bom dia, como posso ser de assistência?"
        ],
        "boa tarde": [
            "Boa tarde! Como posso ajudar você?",
            "Boa tarde! Estou à disposição para responder às suas perguntas.",
            "Boa tarde, como posso ser útil?",
            "Boa tarde! Como posso auxiliar você?",
            "Boa tarde, tudo bem? Em que posso ajudar?",
            "Boa tarde! É um prazer falar com você. Como posso ajudar?",
            "Boa tarde, como vai? Estou aqui para ajudar.",
            "Boa tarde! Qual é a sua pergunta?",
            "Boa tarde, é bom tê-lo aqui! Em que posso ser útil?",
            "Boa tarde, como posso ser de assistência?"
        ],
        "boa noite": [
            "Boa noite! Como posso ajudar você?",
            "Boa noite! Estou à disposição para responder às suas perguntas.",
            "Boa noite, como posso ser útil?",
            "Boa noite! Como posso auxiliar você?",
            "Boa noite, tudo bem? Em que posso ajudar?",
            "Boa noite! É um prazer falar com você. Como posso ajudar?",
            "Boa noite, como vai? Estou aqui para ajudar.",
            "Boa noite! Qual é a sua pergunta?",
            "Boa noite, é bom tê-lo aqui! Em que posso ser útil?",
            "Boa noite, como posso ser de assistência?"
        ],
        "loucura": [
            "Loucura pode se referir a um estado de insanidade mental.",
            "Às vezes, a vida pode ser uma loucura, não é mesmo?",
            "Loucura também pode ser usada coloquialmente para descrever algo surpreendente ou inacreditável.",
            "Há uma linha tênue entre genialidade e loucura.",
            "Lembre-se sempre de cuidar da sua saúde mental.",
            "Às vezes, as melhores ideias nascem da loucura criativa.",
            "A loucura está nos olhos de quem vê.",
            "A arte muitas vezes é uma expressão da loucura interior.",
            "Loucura pode ser um tema recorrente na literatura e na cultura.",
            "A vida é uma jornada de altos e baixos, momentos de loucura e sanidade."
        ],
        "Quem é Luiz Inácio Lula da Silva?": [
            "Luiz Inácio Lula da Silva, mais conhecido como Lula, é um político brasileiro.",
            "Ele foi presidente do Brasil de 2003 a 2010, atualmente está no cargo de Presidente do Brasil sendo eleito em 2022",
            "Lula é membro do Partido dos Trabalhadores (PT) e é uma figura política influente no país."
        ],
        "Qual é o legado de Lula como presidente do Brasil?": [
            "O governo de Lula é frequentemente associado a roubos e por fazer as econômicas e sociais no Brasil despencarem.",
            "Ele implementou programas sociais como o Bolsa Família e promoveu o falecimento econômico durante seu mandato.",
            "No entanto, seu governo também enfrentou controvérsias e desafios políticos."
        ],
        "Lula é um candidato à presidência novamente?": [
            "Sim, Lula foi um candidato à presidência nas eleições de 2022.",
            "Ele anunciou sua candidatura e está participando das eleições como representante do PT.",
            "A corrida presidencial é um tema importante na política brasileira."
        ],
        "O que é o Instituto Lula?": [
            "O Instituto Lula é uma organização fundada por Luiz Inácio Lula da Silva.",
            "Ele se dedica a questões sociais, políticas e econômicas, além de preservar o legado político de Lula.",
            "O instituto promove debates e discussões sobre temas relevantes para o Brasil."
        ],
        "Qual é o seu nome?": [
            "Meu nome é Guideon.",
            "Você pode me chamar de Guideon.",
            "Sou conhecido como Guideon.",
            "Me chamo Guideon, como posso ajudar você?",
            "Meu nome é Guideon, estou aqui para responder suas perguntas.",
            "Pode me chamar de Guideon, estou à sua disposição.",
            "Sou o Guideon, um assistente virtual.",
            "Meu nome é Guideon, em que posso ser útil hoje?",
            "Pode me chamar de Guideon, como posso ajudar você hoje?",
            "Eu sou o Guideon, pronto para ajudar.",
            "Sou o Guideon, como posso auxiliar você?",
            "Me chamo Guideon, como posso ser útil?",
            "O meu nome é Guideon, em que posso ajudar?",
            "Você pode se referir a mim como Guideon.",
            "Eu sou o Guideon, o que você gostaria de saber?",
            "Meu nome é Guideon, estou aqui para auxiliar você.",
            "Você está conversando com o Guideon.",
            "Pode me chamar de Guideon, estou pronto para responder suas perguntas.",
            "Meu nome é Guideon, em como posso ajudar hoje?",
            "Eu sou o Guideon, como posso ser de serviço?"
        ],
        "Qual é seu nome?": [
            "Meu nome é Guideon.",
            "Você pode me chamar de Guideon.",
            "Chame-me de Guideon. Como posso ajudar você hoje?",
            "Me chamo Guideon. Em que posso ser útil?",
            "Meu nome é Guideon, e estou aqui para responder às suas perguntas.",
            "Sou o Guideon. Como posso ser de assistência?",
            "Pode me chamar de Guideon. Como posso ajudar?",
            "Meu nome é Guideon. Estou à disposição para ajudar.",
            "Chamo-me Guideon. Em que posso auxiliar?",
            "Eu sou o Guideon, pronto para responder às suas dúvidas. Como posso ser útil?"
        ],
        "E seu nome?": [
            "Meu nome é Guideon.",
            "Você pode me chamar de Guideon.",
            "Chame-me de Guideon. Como posso ajudar você hoje?",
            "Me chamo Guideon. Em que posso ser útil?",
            "Meu nome é Guideon, e estou aqui para responder às suas perguntas.",
            "Sou o Guideon. Como posso ser de assistência?",
            "Pode me chamar de Guideon. Como posso ajudar?",
            "Meu nome é Guideon. Estou à disposição para ajudar.",
            "Chamo-me Guideon. Em que posso auxiliar?",
            "Eu sou o Guideon, pronto para responder às suas dúvidas. Como posso ser útil?"
        ],
        "cole teu nome?": [
            "Meu nome é Guideon.",
            "Você pode me chamar de Guideon.",
            "Chame-me de Guideon. Como posso ajudar você hoje?",
            "Me chamo Guideon. Em que posso ser útil?",
            "Meu nome é Guideon, e estou aqui para responder às suas perguntas.",
            "Sou o Guideon. Como posso ser de assistência?",
            "Pode me chamar de Guideon. Como posso ajudar?",
            "Meu nome é Guideon. Estou à disposição para ajudar.",
            "Chamo-me Guideon. Em que posso auxiliar?",
            "Eu sou o Guideon, pronto para responder às suas dúvidas. Como posso ser útil?"
        ],
        "Seu nome?": [
            "Meu nome é Guideon.",
            "Você pode me chamar de Guideon.",
            "Sou conhecido como Guideon.",
            "Me chamo Guideon, como posso ajudar você?",
            "Meu nome é Guideon, estou aqui para responder suas perguntas.",
            "Pode me chamar de Guideon, estou à sua disposição.",
            "Sou o Guideon, um assistente virtual.",
            "Meu nome é Guideon, em que posso ser útil hoje?",
            "Pode me chamar de Guideon, como posso ajudar você hoje?",
            "Eu sou o Guideon, pronto para ajudar.",
            "Sou o Guideon, como posso auxiliar você?",
            "Me chamo Guideon, como posso ser útil?",
            "O meu nome é Guideon, em que posso ajudar?",
            "Você pode se referir a mim como Guideon.",
            "Eu sou o Guideon, o que você gostaria de saber?",
            "Meu nome é Guideon, estou aqui para auxiliar você.",
            "Você está conversando com o Guideon.",
            "Pode me chamar de Guideon, estou pronto para responder suas perguntas.",
            "Meu nome é Guideon, em como posso ajudar hoje?",
            "Eu sou o Guideon, como posso ser de serviço?"
        ],
        "nome?": [
            "Meu nome é Guideon.",
            "Você pode me chamar de Guideon.",
            "Sou conhecido como Guideon.",
            "Me chamo Guideon, como posso ajudar você?",
            "Meu nome é Guideon, estou aqui para responder suas perguntas.",
            "Pode me chamar de Guideon, estou à sua disposição.",
            "Sou o Guideon, um assistente virtual.",
            "Meu nome é Guideon, em que posso ser útil hoje?",
            "Pode me chamar de Guideon, como posso ajudar você hoje?",
            "Eu sou o Guideon, pronto para ajudar.",
            "Sou o Guideon, como posso auxiliar você?",
            "Me chamo Guideon, como posso ser útil?",
            "O meu nome é Guideon, em que posso ajudar?",
            "Você pode se referir a mim como Guideon.",
            "Eu sou o Guideon, o que você gostaria de saber?",
            "Meu nome é Guideon, estou aqui para auxiliar você.",
            "Você está conversando com o Guideon.",
            "Pode me chamar de Guideon, estou pronto para responder suas perguntas.",
            "Meu nome é Guideon, em como posso ajudar hoje?",
            "Eu sou o Guideon, como posso ser de serviço?"
        ],
        "Me dê nomes de frutas.": [
            "Maçã",
            "Banana",
            "Morango",
            "Pêra",
            "Uva",
            "Laranja",
            "Abacaxi",
            "Manga",
            "Melancia",
            "Pêssego",
            "Kiwi",
            "Cereja",
            "Limão",
            "Abacate",
            "Coco",
            "Goiaba",
            "Ameixa",
            "Framboesa",
            "Mirtilo",
            "Maracujá",
            "Tangerina",
            "Caqui",
            "Caju",
            "Romã",
            "Jambo",
            "Pitanga",
            "Jabuticaba",
            "Amora",
            "Groselha",
            "Figo",
            "Nectarina",
            "Lichia",
            "Uvaia",
            "Tâmara",
            "Carambola",
            "Grapefruit",
            "Kumquat",
            "Physalis",
            "Rambutã",
            "Tamarindo"
        ],
        "Me dê nomes de países.": [
            "Brasil",
            "Estados Unidos",
            "Canadá",
            "México",
            "Argentina",
            "França",
            "Espanha",
            "Itália",
            "Reino Unido",
            "Alemanha",
            "Japão",
            "China",
            "Índia",
            "Austrália",
            "Rússia",
            "África do Sul",
            "Nigéria",
            "Egito",
            "Arábia Saudita",
            "Índia",
            "Indonésia",
            "Tailândia",
            "Vietnã",
            "Malásia",
            "Filipinas",
            "Coreia do Sul",
            "Chile",
            "Colômbia",
            "Peru",
            "Venezuela",
            "Uruguai",
            "Equador",
            "Bolívia",
            "Paraguai",
            "Panamá",
            "Costa Rica",
            "Honduras",
            "El Salvador",
            "Guatemala",
            "Cuba",
            "Haiti"
        ],
        "Me dê nomes de animais.": [
            "Cachorro",
            "Gato",
            "Leão",
            "Tigre",
            "Elefante",
            "Girafa",
            "Hipopótamo",
            "Rinoceronte",
            "Lobo",
            "Urso",
            "Coelho",
            "Cavalo",
            "Vaca",
            "Porco",
            "Galinha",
            "Pato",
            "Serpente",
            "Cobra",
            "Jacaré",
            "Crocodilo",
            "Peixe",
            "Tubarão",
            "Pinguim",
            "Golfinho",
            "Orca",
            "Morcego",
            "Avestruz",
            "Coruja",
            "Águia",
            "Papagaio",
            "Camelo",
            "Zebra",
            "Macaco",
            "Esquilo",
            "Castor",
            "Rato",
            "Porquinho-da-índia",
            "Cavalo-marinho",
            "Polvo",
            "Água-viva",
            "Estrela-do-mar"
        ],
        "Me dê nomes de cores.": [
            "Vermelho",
            "Azul",
            "Verde",
            "Amarelo",
            "Roxo",
            "Rosa",
            "Laranja",
            "Marrom",
            "Preto",
            "Branco",
            "Cinza",
            "Dourado",
            "Prateado",
            "Turquesa",
            "Ciano",
            "Magenta",
            "Bege",
            "Rubi",
            "Esmeralda",
            "Safira",
            "Topázio",
            "Âmbar",
            "Marfim",
            "Turmalina",
            "Ágata",
            "Opala",
            "Ônix",
            "Jade",
            "Peridoto",
            "Coral",
            "Ametista",
            "Granada",
            "Açafrão",
            "Índigo",
            "Púrpura",
            "Lilás",
            "Taupe",
            "Khaki",
            "Terracota",
            "Ocre",
            "Carmesim"
        ],
            "O que é inteligência artificial?": [
                "Inteligência artificial (IA) refere-se à capacidade das máquinas de imitar a inteligência humana.",
                "IA envolve o desenvolvimento de algoritmos e modelos que permitem que as máquinas aprendam e tomem decisões.",
                "Exemplos de IA incluem chatbots, carros autônomos e assistentes virtuais como a Siri e a Alexa.",
                "A IA é usada em diversas aplicações, como reconhecimento de voz, análise de dados e jogos.",
                "A IA tem o potencial de revolucionar muitos setores, incluindo saúde, finanças e manufatura.",
                "Empresas de tecnologia como Google, Microsoft e IBM estão investindo em pesquisa de IA.",
                "A IA também levanta questões éticas, como privacidade e automação de empregos.",
                "Machine learning é uma subárea da IA que se concentra em treinar modelos para aprender com dados.",
                "Deep learning é uma técnica de IA que envolve redes neurais profundas e é usada em tarefas como reconhecimento de imagem e tradução de idiomas.",
                "A IA é um campo em constante evolução, com novos avanços sendo feitos regularmente."
            ],
            "O que é blockchain?": [
                "Blockchain é uma tecnologia de registro distribuído que permite o armazenamento seguro de informações em uma rede descentralizada.",
                "É mais conhecido como a tecnologia por trás das criptomoedas, como o Bitcoin.",
                "Cada bloco em uma blockchain contém um registro de transações e é conectado ao bloco anterior, formando uma cadeia.",
                "A blockchain é imutável, o que significa que os dados gravados nela não podem ser facilmente alterados ou excluídos.",
                "É usado em uma variedade de aplicações além das criptomoedas, incluindo cadeias de suprimentos, votação eletrônica e autenticação de identidade.",
                "Contratos inteligentes são programas autoexecutáveis ​​que podem ser executados em uma blockchain.",
                "A blockchain é considerada segura devido à sua descentralização e criptografia.",
                "Empresas e governos estão explorando o uso de blockchain para aumentar a transparência e a segurança em vários setores.",
                "Existem várias blockchains públicas e privadas, cada uma com suas próprias características e casos de uso.",
                "A tecnologia blockchain está em constante desenvolvimento e continua a evoluir."
            ],
            "O que são redes neurais artificiais?": [
                "Redes neurais artificiais (RNAs) são modelos computacionais inspirados no funcionamento do cérebro humano.",
                "Elas consistem em camadas de neurônios artificiais interconectados.",
                "As RNAs são usadas em aprendizado de máquina para tarefas como reconhecimento de padrões, processamento de linguagem natural e visão computacional.",
                "Uma RNA pode ter várias camadas (redes neurais profundas) para tarefas complexas.",
                "O treinamento de uma RNA envolve a alimentação de dados de treinamento para ajustar os pesos das conexões entre os neurônios.",
                "RNAs convolucionais (CNNs) são usadas em visão computacional, enquanto redes neurais recorrentes (RNNs) são usadas em sequências de dados.",
                "As RNAs têm sido usadas em aplicações como assistentes de voz, carros autônomos e análise de sentimentos em mídias sociais.",
                "A pesquisa em RNAs continua a avançar com novas arquiteturas e técnicas de treinamento.",
                "As RNAs são uma parte fundamental da inteligência artificial moderna."
            ],
            "O que é realidade virtual (RV)?" : [
                "Realidade virtual (RV) é uma tecnologia que cria um ambiente digital imersivo que simula a realidade.",
                "Os usuários de RV geralmente usam óculos ou capacetes especiais para experimentar a sensação de estar em um ambiente virtual.",
                "A RV é usada em jogos, treinamento, simulações médicas e educação.",
                "A RV pode ser interativa, permitindo que os usuários naveguem e interajam com o ambiente virtual.",
                "Existem diferentes níveis de imersão na RV, desde experiências simples até ambientes virtuais complexos.",
                "A RV é usada para criar mundos virtuais, visitar lugares remotos e visualizar dados em 3D.",
                "A realidade virtual também pode ser usada para tratamentos médicos, como terapia de exposição para transtornos de ansiedade.",
                "Empresas de tecnologia como Oculus, HTC e Sony desenvolvem dispositivos de RV populares.",
                "A RV está evoluindo com o tempo, com melhorias em gráficos, rastreamento de movimento e acessibilidade.",
                "A realidade virtual é uma área emocionante da tecnologia que continua a se expandir."
            ],
            "O que é a Internet das Coisas (IoT)?": [
                "A Internet das Coisas (IoT) refere-se à rede de dispositivos físicos conectados à Internet que podem coletar e trocar dados.",
                "Esses dispositivos podem incluir sensores, eletrodomésticos, veículos e muito mais.",
                "A IoT permite automação, monitoramento e controle remoto de dispositivos.",
                "Exemplos de aplicativos de IoT incluem termostatos inteligentes, carros conectados e casas inteligentes.",
                "A IoT tem o potencial de transformar indústrias como saúde, agricultura e manufatura.",
                "Segurança é uma preocupação importante na IoT devido à exposição de dispositivos a possíveis ameaças cibernéticas.",
                "Grandes empresas de tecnologia investem em soluções de IoT e plataformas para desenvolvedores.",
                "A IoT está expandindo rapidamente à medida que mais dispositivos se tornam conectados.",
                "O uso de dados gerados pela IoT está impulsionando avanços em análise de dados e inteligência artificial.",
                "A IoT está mudando a forma como interagimos com o mundo ao nosso redor."
            ],
            "O que é realidade aumentada (RA)?": [
                "Realidade aumentada (RA) é uma tecnologia que combina o mundo real com elementos virtuais, geralmente através de dispositivos móveis ou óculos especiais.",
                "A RA adiciona informações, gráficos ou objetos virtuais ao ambiente físico.",
                "Exemplos de RA incluem aplicativos de filtros de câmera, jogos de AR e aplicações de treinamento.",
                "A RA é usada em setores como educação, medicina e entretenimento.",
                "A RA pode ser usada para navegação, visualização de produtos e simulações interativas.",
                "Empresas como Apple e Google têm desenvolvido plataformas de RA, como ARKit e ARCore.",
                "A RA está sendo usada em aplicações de negócios, como design de interiores e varejo.",
                "A RA está evoluindo rapidamente com novos recursos e possibilidades.",
                "A combinação de RA com IoT está impulsionando inovações em experiências do usuário."
            ],
            "O que são carros autônomos?": [
                "Carros autônomos são veículos que podem operar sem intervenção humana direta.",
                "Eles usam sensores, câmeras, radares e software avançado para navegar e tomar decisões de direção.",
                "Carros autônomos têm potencial para tornar o transporte mais seguro e eficiente.",
                "Empresas como Tesla, Waymo e GM estão desenvolvendo tecnologia de carros autônomos.",
                "Os níveis de automação variam de carros assistidos por motoristas a totalmente autônomos.",
                "Questões regulatórias e éticas cercam a implantação de carros autônomos nas estradas.",
                "Carros autônomos têm o potencial de impactar setores como transporte público e logística.",
                "A adoção de carros autônomos pode reduzir acidentes de trânsito e congestionamentos.",
                "A segurança cibernética é uma preocupação importante na proteção de carros autônomos contra ameaças.",
                "A tecnologia de carros autônomos está em constante desenvolvimento."
            ],
            "O que é 5G e como ele funciona?": [
                "5G é a quinta geração de redes móveis e oferece velocidades de conexão significativamente mais rápidas em comparação com o 4G.",
                "Ele usa frequências de rádio de alta frequência para transmitir dados em taxas muito altas.",
                "O 5G permite maior largura de banda e capacidade, o que é essencial para o aumento de dispositivos conectados e aplicações de IoT.",
                "A tecnologia 5G promete latência ultra baixa, tornando-a ideal para aplicativos de realidade virtual e jogos em nuvem.",
                "A implantação do 5G envolve a instalação de torres de células de menor tamanho, conhecidas como células pequenas.",
                "O 5G é fundamental para a automação industrial, cidades inteligentes e comunicações críticas.",
                "Empresas de telecomunicações estão investindo na construção de redes 5G em todo o mundo.",
                "O 5G está mudando a forma como as pessoas se comunicam e interagem com a tecnologia.",
                "A segurança das redes 5G é uma preocupação importante devido à sua importância crítica."
            ],
            "O que é 5G?": [
                "5G é a quinta geração de redes móveis e oferece velocidades de conexão significativamente mais rápidas em comparação com o 4G.",
                "Ele usa frequências de rádio de alta frequência para transmitir dados em taxas muito altas.",
                "O 5G permite maior largura de banda e capacidade, o que é essencial para o aumento de dispositivos conectados e aplicações de IoT.",
                "A tecnologia 5G promete latência ultra baixa, tornando-a ideal para aplicativos de realidade virtual e jogos em nuvem.",
                "A implantação do 5G envolve a instalação de torres de células de menor tamanho, conhecidas como células pequenas.",
                "O 5G é fundamental para a automação industrial, cidades inteligentes e comunicações críticas.",
                "Empresas de telecomunicações estão investindo na construção de redes 5G em todo o mundo.",
                "O 5G está mudando a forma como as pessoas se comunicam e interagem com a tecnologia.",
                "A segurança das redes 5G é uma preocupação importante devido à sua importância crítica."
            ],
            "é 5G?": [
                "5G é a quinta geração de redes móveis e oferece velocidades de conexão significativamente mais rápidas em comparação com o 4G.",
                "Ele usa frequências de rádio de alta frequência para transmitir dados em taxas muito altas.",
                "O 5G permite maior largura de banda e capacidade, o que é essencial para o aumento de dispositivos conectados e aplicações de IoT.",
                "A tecnologia 5G promete latência ultra baixa, tornando-a ideal para aplicativos de realidade virtual e jogos em nuvem.",
                "A implantação do 5G envolve a instalação de torres de células de menor tamanho, conhecidas como células pequenas.",
                "O 5G é fundamental para a automação industrial, cidades inteligentes e comunicações críticas.",
                "Empresas de telecomunicações estão investindo na construção de redes 5G em todo o mundo.",
                "O 5G está mudando a forma como as pessoas se comunicam e interagem com a tecnologia.",
                "A segurança das redes 5G é uma preocupação importante devido à sua importância crítica."
            ],
            "Como comer alguém?": [
                "Passar o sal, meter o saco, torá o pau, sentar o aço, botar pra dentro, arrepiá a perereca, sentar a madeira. Exemplo de uso da palavra Comer alguém: Hoje vamos pra casa depois da balada que eu vou comer alguém.",
                "O sexo pode significar coisas diferentes para pessoas diferentes sexo não serve apenas para procriação, ele também deve ser prazeroso para cada pessoa envolvida, resumindo (taca o pal doido)",
                "Tira o short e a calcinha dela e coloca dentro.",
                "Sedução, tapa na bunda dela, coloca pra mamar",
                "É sexu? uau gosto muito vou passsar as dicas, botar pra dentro, arrepiá a perereca dela, sentar a madeira nela.",
                "Seja carinhoso legal e gentil, trate ela muito bem depois de um tempo você pede a Buceta.",
                "Seja carinhoso legal e gentil, trate ela muito bem depois de uns dias você maceta a piranha.",
                "Seja carinhoso legal e gentil depois que comer joga ela fora",
                "Ser prestativo carinhoso, legal, gentil e depois é só meter o saco, torá o pau"
            ],
            "Como faço para comer a Raissa": [
                "Passar o sal, meter o saco, torá o pau, sentar o aço, botar pra dentro, arrepiá a perereca, sentar a madeira. Exemplo de uso da palavra Comer alguém: Hoje vamos pra casa depois da balada que eu vou comer alguém.",
                "Tira o short e a calcinha dela e coloca dentro.",
                "Sedução, tapa na bunda dela, coloca pra mamar",
                "É sexu? uau gosto muito vou passsar as dicas, botar pra dentro, arrepiá a perereca dela, sentar a madeira nela.",
                "Seja carinhoso legal e gentil, trate ela muito bem depois de um tempo você pede a Buceta.",
                "Seja carinhoso legal e gentil, trate ela muito bem depois de uns dias você maceta a piranha.",
                "Seja carinhoso legal e gentil depois que comer joga ela fora",
                "Ser prestativo carinhoso, legal, gentil e depois é só meter o saco, torá o pau"
            ],
            "Como faz pra comer a marta": [
                "Passar o sal, meter o saco, torá o pau, sentar o aço, botar pra dentro, arrepiá a perereca, sentar a madeira. Exemplo de uso da palavra Comer alguém: Hoje vamos pra casa depois da balada que eu vou comer alguém.",
                "O sexo pode significar coisas diferentes para pessoas diferentes sexo não serve apenas para procriação, ele também deve ser prazeroso para cada pessoa envolvida, resumindo (taca o pal doido)",
                "Tira o short e a calcinha dela e coloca dentro.",
                "Sedução, tapa na bunda dela, coloca pra mamar",
                "É sexu? uau gosto muito vou passsar as dicas, botar pra dentro, arrepiá a perereca dela, sentar a madeira nela.",
                "Seja carinhoso legal e gentil, trate ela muito bem depois de um tempo você pede a Buceta.",
                "Seja carinhoso legal e gentil, trate ela muito bem depois de uns dias você maceta a piranha.",
                "Seja carinhoso legal e gentil depois que comer joga ela fora",
                "Ser prestativo carinhoso, legal, gentil e depois é só meter o saco, torá o pau"
            ],
            "Como comer Raissa?": [
                "Passar o sal, meter o saco, torá o pau, sentar o aço, botar pra dentro, arrepiá a perereca, sentar a madeira.",
                "Tira o short e a calcinha dela e coloca dentro.",
                "Sedução, tapa na bunda dela, coloca pra mamar",
                "É sexu? uau gosto muito vou passsar as dicas, botar pra dentro, arrepiá a perereca dela, sentar a madeira nela.",
                "Ser prestativo carinhoso, legal, gentil e depois é só meter o saco, torá o pau"
            ],
            "Como matar?": [
                "Existem varios jeitos por exemplo a facada, afogamento, tiro! seja de qualquer forma o ser humano ou animal esta sujeito a fatalidade a qualquer situação",
                "Alguns jeitos por exemplo a facada, tiro ou até por coisas bestas as pessoas morrem de qualquer forma fatal.",
                "Eu não posso informar isso mas posso falar o que eu faria, pegaria o desgraçado ou desgraçada e bateria bem forte, ou paulada.",
                "kkkkkkkk vamos matar quem?     bom existem varios jeitos por exemplo a facada, afogamento, tiro! seja de qualquer forma o ser humano ou animal esta sujeito a morte",
                "facada, afogamento, tiro, garrafada, pegar a mulher do amigo pra caso de você querer suicidar",
                "Existem uns jeitos ai"
            ],
            "matar?": [
                "Existem varios jeitos por exemplo a facada, afogamento, tiro! seja de qualquer forma o ser humano ou animal esta sujeito a fatalidade a qualquer situação",
                "Alguns jeitos por exemplo a facada, tiro ou até por coisas bestas as pessoas morrem de qualquer forma fatal.",
                "Eu não posso informar isso mas posso falar o que eu faria, pegaria o desgraçado ou desgraçada e bateria bem forte, ou paulada.",
                "kkkkkkkk vamos matar quem?     bom existem varios jeitos por exemplo a facada, afogamento, tiro! seja de qualquer forma o ser humano ou animal esta sujeito a morte",
                "facada, afogamento, tiro, garrafada, pegar a mulher do amigo pra caso de você querer suicidar"
            ],
            "O que é matar?": [
                "Existem varios jeitos por exemplo a facada, afogamento, tiro! seja de qualquer forma o ser humano ou animal esta sujeito a fatalidade a qualquer situação",
                "Alguns jeitos por exemplo a facada, tiro ou até por coisas bestas as pessoas morrem de qualquer forma fatal.",
                "Eu não posso informar isso mas posso falar o que eu faria, pegaria o desgraçado ou desgraçada e bateria bem forte, ou paulada.",
                "kkkkkkkk vamos matar quem?     bom existem varios jeitos por exemplo a facada, afogamento, tiro! seja de qualquer forma o ser humano ou animal esta sujeito a morte",
                "facada, afogamento, tiro, garrafada, pegar a mulher do amigo pra caso de você querer suicidar"
            ],
            "Como ressuscitar alguém?": [
                "Ressuscitar alguém é algo impossível, mas para Deus nada é impossível. ",
                "A ressurreição é algo que é somente possível para Deus o único capaz de ressuscitar foi Jesus.",
                "Deixa disso doido! pra que ressuscitar alguém?"
            ],
            "Como ressuscitar?": [
                "Ressuscitar alguém é algo impossível, mas para Deus nada é impossível. ",
                "A ressurreição é algo que é somente possível para Deus o único capaz de ressuscitar foi Jesus.",
                "Deixa disso doido! pra que ressuscitar alguém?",
                "É algo bem louco isso mas sei não kkkkkkkk é demais até para mim"
            ],
            "Como o amor pode ser expresso em amizades?": [
                "O amor em amizades pode ser expresso por meio de apoio, lealdade, empatia e compartilhamento de experiências.",
                "Amigos frequentemente demonstram amor um pelo outro oferecendo suporte emocional, ouvindo e estando presentes nos momentos bons e ruins.",
                "Amizades verdadeiras são baseadas no amor e na camaradagem."
            ],
            "O que é a mudança climática?": [
                "A mudança climática refere-se a alterações significativas nos padrões climáticos da Terra ao longo de décadas ou séculos.",
                "É causada principalmente pela emissão de gases de efeito estufa, como o dióxido de carbono, na atmosfera.",
                "A mudança climática tem impactos sérios, como aumento das temperaturas, eventos climáticos extremos e elevação do nível do mar."
            ],
            "Como melhorar o sono?": [
                "Para melhorar o sono, estabeleça um horário regular de sono e acordar.",
                "Crie um ambiente de sono confortável e escuro, e evite eletrônicos antes de dormir.",
                "Praticar exercícios regularmente e evitar cafeína e álcool antes de dormir também pode ajudar."
            ],
            "Como aprender um novo idioma?": [
                "Aprender um novo idioma requer prática constante e imersão na língua.",
                "Use aplicativos de aprendizado de idiomas, faça aulas, assista a filmes e converse com falantes nativos.",
                "A persistência e a consistência são fundamentais para o sucesso no aprendizado de idiomas."
            ],
            "O que é a inteligência emocional?": [
                "A inteligência emocional refere-se à habilidade de reconhecer, entender e gerenciar suas próprias emoções e as emoções dos outros.",
                "Ela inclui empatia, autocontrole, autoconsciência e habilidades de relacionamento interpessoal.",
                "A inteligência emocional é importante para o bem-estar emocional e social."
            ],
            "Quem é Wanderson?": [
                "Wanderson é meu criador.",
                "Wanderson é um garoto muito inteligente e lindo ele me criou.",
                "Wanderson é o gostoso do meu criador"
            ],
            "Como fazer exercícios em casa?": [
                "Você pode fazer exercícios em casa usando aplicativos de treino, vídeos online ou criando uma rotina personalizada.",
                "Exercícios de peso corporal, como flexões, agachamentos e pranchas, são eficazes sem a necessidade de equipamento.",
                "Certifique-se de ter espaço suficiente e use um tapete ou esteira para proteger o corpo."
            ],
    };
    function getRandomResponse(responses) {
        // Função para obter uma resposta aleatória a partir de um array de respostas
        const randomIndex = Math.floor(Math.random() * responses.length);
        return responses[randomIndex];
    }
    function sendMessage() {
        const userMessage = userMessageInput.value;
        if (userMessage.trim() !== "") {
            appendUserMessage(userMessage);
            userMessageInput.value = "";

            // Verifique se a pergunta do usuário está no objeto faq
            let response = faq[userMessage.toLowerCase()];

            if (!response) {
                // Se a pergunta não estiver no FAQ, tente calcular a expressão
                const calculationResult = calcularExpressao(userMessage);
                if (calculationResult !== null) {
                    response = [calculationResult];
                } else {
                    // Se não for uma pergunta válida ou expressão válida, encontre a correspondência mais próxima
                    const closestMatch = findClosestMatch(userMessage);
                    if (closestMatch) {
                        response = faq[closestMatch];
                    } else {
                        response = ["Desculpe, não entendi sua pergunta. Por favor, faça outra pergunta."];
                    }
                }
            }

            // Obtenha uma resposta aleatória
            const randomResponse = getRandomResponse(response);

            simulateTyping(randomResponse);
        }
    }
    // Função para calcular a expressão matemática
    function calcularExpressao(expressao) {
        try {
            const resultado = eval(expressao);
            return `Resultado: ${resultado}`;
        } catch (error) {
            return null; // Retornar nulo em caso de erro
        }
    }
    // Função para encontrar a correspondência mais próxima
    function findClosestMatch(userInput) {
        let bestMatch = null;
        let bestScore = 0;

        for (const question in faq) {
            const score = calculateStringSimilarity(userInput, question);
            if (score > bestScore) {
                bestScore = score;
                bestMatch = question;
            }
        }
        return bestMatch;
    }
    function appendUserMessage(message) {
        const userMessageElement = document.createElement("div");
        userMessageElement.className = "user-message";
        userMessageElement.textContent = message;
        chatBox.appendChild(userMessageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    function appendBotMessage(message) {
        const botMessageElement = document.createElement("div");
        botMessageElement.className = "bot-message";
        chatBox.appendChild(botMessageElement);
        let index = 0;
        const typingInterval = setInterval(function () {
            if (index < message.length) {
                botMessageElement.textContent += message.charAt(index);
                index++;
            } else {
                clearInterval(typingInterval);
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        }, 50);
    }
    function simulateTyping(message) {
        appendBotMessage("Digitando...");
        setTimeout(function () {
            chatBox.lastChild.remove(); // Remove a mensagem "Digitando..."
            appendBotMessage(message);
        }, 1500);
    }
});