# FHWeather JQuery plugin

## Como usar
#### Importar os arquivos

    <script src="js/jquery-1.12.3.min.js"></script>
    <script src="js/fh-weather.js"></script>
    <link rel="stylesheet" href="css/weather-icons.min.css">
    <link rel="stylesheet" href="css/weather-icons-wind.min.css">

#### Carregar o plugin

    <script>
    $('.fh-previsao-tempo').fhwheather({
        unit: 'c',                        //'c' para celsius, 'f' para farenheight
        timeout: 30                       //Tempo de atualização em segundos
    });
    </script>
    
#### No html

OBS: *Configure atributo <code>data-woeid=""</code> de acordo com o woeid da cidade, o woeid de cada cidade pode ser encontrado no site http://woeid.rosselliot.co.nz/*

    <div class="fh-previsao-tempo" data-woeid="458150">
        <h1 data-tempo="cidade"></h1>
        <div><span data-tempo="temperatura"></span> Graus</div>
        <div data-tempo="icone"></div>
        <div><span data-tempo="descricao"></span></div>
        <div>Temperatura Máxima: <span data-tempo="maxima"></span> Graus</div>
        <div>Temperatura Mínima: <span data-tempo="minima"></span> Graus</div>
        <div data-tempo="data-completa"></div>
        <div>Dia: <span data-tempo="dia"></span></div>
        <div data-tempo="dia-semana"></div>
        <div data-tempo="dia-mes"></div>
    
        <h2>Próximos dias da semana</h2>
        <ol>
            <li>
                <div><span data-tempo="temperatura-1"></span> Graus</div>
                <div data-tempo="icone-1"></div>
                <div><span data-tempo="descricao-1"></span></div>
                <div>Temperatura Máxima: <span data-tempo="maxima-1"></span> Graus</div>
                <div>Temperatura Mínima: <span data-tempo="minima-1"></span> Graus</div>
                <div data-tempo="data-completa-1"></div>
                <div>Dia: <span data-tempo="dia-1"></span></div>
                <div data-tempo="dia-semana-1"></div>
                <div data-tempo="dia-mes-1"></div>
            </li>
            <li>
                <div><span data-tempo="temperatura-2"></span> Graus</div>
                <div data-tempo="icone-2"></div>
                <div><span data-tempo="descricao-2"></span></div>
                <div>Temperatura Máxima: <span data-tempo="maxima-2"></span> Graus</div>
                <div>Temperatura Mínima: <span data-tempo="minima-2"></span> Graus</div>
                <div data-tempo="data-completa-2"></div>
                <div>Dia: <span data-tempo="dia-2"></span></div>
                <div data-tempo="dia-semana-2"></div>
                <div data-tempo="dia-mes-2"></div>
            </li>
            <li>
                <div><span data-tempo="temperatura-3"></span> Graus</div>
                <div data-tempo="icone-3"></div>
                <div><span data-tempo="descricao-3"></span></div>
                <div>Temperatura Máxima: <span data-tempo="maxima-3"></span> Graus</div>
                <div>Temperatura Mínima: <span data-tempo="minima-3"></span> Graus</div>
                <div data-tempo="data-completa-3"></div>
                <div>Dia: <span data-tempo="dia-3"></span></div>
                <div data-tempo="dia-semana-3"></div>
                <div data-tempo="dia-mes-3"></div>
            </li>
            <li>
                <div><span data-tempo="temperatura-4"></span> Graus</div>
                <div data-tempo="icone-4"></div>
                <div><span data-tempo="descricao-4"></span></div>
                <div>Temperatura Máxima: <span data-tempo="maxima-4"></span> Graus</div>
                <div>Temperatura Mínima: <span data-tempo="minima-4"></span> Graus</div>
                <div data-tempo="data-completa-4"></div>
                <div>Dia: <span data-tempo="dia-4"></span></div>
                <div data-tempo="dia-semana-4"></div>
                <div data-tempo="dia-mes-4"></div>
            </li>
        </ol>
    </div>

#### Lista de parametros disponíveis

<code>data-tempo="temperatura"</code> -> Temperatura

<code>data-tempo="maxima"</code> -> Temperatura máxima

<code>data-tempo="minima"</code> -> Tempera minima

<code>data-tempo="dia"</code> -> Número do dia do mes, exemplo 21

<code>data-tempo="icone"</code> -> Icone do tempo atual

<code>data-tempo="descricao"</code> -> Exibe um texto informando o estado do tempo, por exemplo: ensolarado, nublado, etc

<code>data-tempo="dia-mes"</code> -> Exibe o número do dia seguido do nome do mês, por exemplo: 21 Janeiro

<code>data-tempo="dia-semana"</code> -> Exibe o nome do dia da semana. por exemplo Sexta-Feira

<code>data-tempo="dia-semana-abreviado"</code> -> Exibe o nome do dia da semana abreviado. por exemplo Seg

<code>data-tempo="data-completa"</code> -> Exibe a data completa no formato: Quinta-Feira, 21 Janeiro

<code>data-tempo="cidade"</code> -> Exibe o nome da cidade atual

<code>data-tempo="humidade"</code> -> Humidade do ar

<code>data-tempo="pressao"</code> -> Pressão atmosférica

<code>data-tempo="visibilidade"</code> -> Visibilidade

<code>data-tempo="elevação"</code> -> Elevação

<code>data-tempo="velocidade-vento"</code> -> Velocidade do vento

<code>data-tempo="unidade-velocidade"</code> -> Unidade usada para medir a velocidade

<code>data-tempo="unidade-distancia"</code> -> Unidade para medir distancias

<code>data-tempo="unidade-pressao"</code> -> Unidade para medir pressao

<code>data-tempo="unidade-temperatura"</code> -> Unidade para medir temperatura

#### Previsão dos próximos dias

Para prever os próximos dias, basta acrescentar um indice ao valor do atributo desejado,
por exemplo:

<code>data-tempo="temperatura-1"</code> -> Temperatura de amanha

<code>data-tempo="temperatura-2"</code> -> Temperatura daqui há 2 dias

<code>data-tempo="temperatura-3"</code> -> Temperatura daqui há 3 dias

<code>data-tempo="temperatura-4"</code> -> Temperatura daqui há 4 dias

OBS:*O indice limite para previsão dos próximos dias é 4, sendo assim, so é possivel prever os próximos 4 dias.*
 
Todos os valores dos atributos podem receber um indice, com excessão de:
<code>data-tempo="humidade"</code>, <code>data-tempo="pressao"</code>, <code>data-tempo="visibilidade"</code>, <code>data-tempo="elevação"</code>, <code>data-tempo="velocidade-vento"</code>, <code>data-tempo="unidade-velocidade"</code>, <code>data-tempo="unidade-distancia"</code>, <code>data-tempo="unidade-pressao"</code>, <code>data-tempo="unidade-temperatura"</code>
