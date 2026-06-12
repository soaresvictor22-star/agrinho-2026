document.getElementById('simuladorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura dos inputs
    const cultura = document.getElementById('cultura').value;
    const manejo = document.getElementById('manejo').value;
    const area = parseFloat(document.getElementById('area').value);

    // Seleção dos elementos do DOM para exibição
    const resultadoSecao = document.getElementById('resultado');
    const resErosao = document.getElementById('resErosao');
    const resAgua = document.getElementById('resAgua');
    const resScore = document.getElementById('resScore');
    const textoRecomendacao = document.getElementById('textoRecomendacao');

    // Variáveis de cálculo lógico
    let pesoManejo = 0;
    let taxaErosaoEstimada = 0; // toneladas por hectare fictícias baseadas no manejo
    let retencaoAgua = "";
    let scoreSustentabilidade = 0;

    // Lógica do impacto do Manejo no Noroeste do PR
    if (manejo === 'convencional') {
        pesoManejo = 10;
        taxaErosaoEstimada = area * 12.5; 
        retencaoAgua = "Baixa Retenção";
        scoreSustentabilidade = 30;
    } else if (manejo === 'direto') {
        pesoManejo = 5;
        taxaErosaoEstimada = area * 2.1;
        retencaoAgua = "Alta Retenção";
        scoreSustentabilidade = 85;
    } else if (manejo === 'integrado') {
        pesoManejo = 2;
        taxaErosaoEstimada = area * 0.8;
        retencaoAgua = "Excelente Retenção";
        scoreSustentabilidade = 98;
    }

    // Ajustes finos baseados na cultura típica da região
    if (cultura === 'mandioca' && manejo === 'convencional') {
        // A mandioca revolve muito o solo Arenito, agravando erosões severas se convencional
        taxaErosaoEstimada *= 1.4;
        scoreSustentabilidade -= 10;
    }

    // Atualização visual do Painel (Nível 4 de Interação UI)
    resErosao.textContent = `${taxaErosaoEstimada.toFixed(1)} t/ano`;
    if (manejo === 'convencional') {
        resErosao.className = "valor text-danger";
        resAgua.className = "valor text-danger";
        resScore.className = "valor text-danger";
    } else {
        resErosao.className = "value text-success";
        resAgua.className = "valor text-success";
        resScore.className = "valor text-success";
    }

    resAgua.textContent = retencaoAgua;
    resScore.textContent = `${scoreSustentabilidade} pts`;

    // Geração da recomendação agronômica regionalizada
    let mensagemContexto = "";
    if (scoreSustentabilidade < 50) {
        textoRecomendacao.className = "recomendacao bg-danger-light";
        mensagemContexto = `<strong>Alerta Crítico para o Noroeste do PR:</strong> O solo Arenito Caiuá é extremamente suscetível a voçorocas e perda de nutrientes. O manejo convencional na cultura da ${cultura} põe em risco a viabilidade da sua terra a longo prazo. Mude para o Plantio Direto imediatamente!`;
    } else {
        textoRecomendacao.className = "recomendacao bg-success-light";
        mensagemContexto = `<strong>Parabéns! Projeto Alinhado ao Agrinho 2026:</strong> O uso de técnicas como ${manejo === 'direto' ? 'Plantio Direto' : 'ILPF'} protege a estrutura arenosa do solo, evita o assoreamento de rios locais e garante o equilíbrio perfeito entre alta produção e conservação ambiental.`;
    }

    textoRecomendacao.innerHTML = mensagemContexto;

    // Torna os resultados visíveis com a animação CSS
    resultadoSecao.classList.remove('hidden');
    resultadoSecao.scrollIntoView({ behavior: 'smooth' });
});