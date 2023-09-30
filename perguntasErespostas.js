 document.addEventListener("DOMContentLoaded", function () {
            const perguntasErespostas = {
                "Qual é a capital do Brasil?": "Brasília",
                "Quem escreveu 'Dom Quixote'?": "Miguel de Cervantes",
                // Adicione mais perguntas e respostas conforme necessário
            };

            // Função para adicionar uma mensagem ao chat box
            function adicionarMensagem(mensagem) {
                const chatBox = document.getElementById("chat-box");
                const mensagemDiv = document.createElement("div");
                mensagemDiv.textContent = mensagem;
                chatBox.appendChild(mensagemDiv);
            }

            // Função para obter a resposta das perguntas
            function obterResposta(pergunta) {
                pergunta = pergunta.toLowerCase(); // Trate a pergunta como minúscula para evitar discrepâncias de capitalização
                if (pergunta in perguntasErespostas) {
                    return perguntasErespostas[pergunta];
                } else {
                    return "Desculpe, não sei a resposta para essa pergunta.";
                }
            }

            // Função para lidar com o envio da pergunta
            document.getElementById("enviar").addEventListener("click", function () {
                const pergunta = document.getElementById("pergunta").value;
                adicionarMensagem("Você: " + pergunta);
                const resposta = obterResposta(pergunta);
                adicionarMensagem("Chatbot: " + resposta);
                document.getElementById("pergunta").value = "";
            });

            // Inicializa o chatbot com uma saudação
            adicionarMensagem("Chatbot: Olá! Como posso ajudar você?");
        });
    </script>
