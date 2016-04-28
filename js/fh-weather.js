/*
 Copyright (c) 2016 Fernando Henrique(fhcoder) and other contributors

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
(function ($) {

    $.fn.fhwheather = function (options) {
        var fhelement = this;
        var settings = $.extend({
            timeout: 60,
            unit: 'c'
        }, options);

        function fillElements() {
            fhelement.each(function () {
                var woeid = $(this).attr('data-woeid');
                applyForecast(woeid, $(this));
            });
        }

        function applyForecast(woeid, elemento) {
            var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20%3D%20%22' + woeid + '%22%20and%20u%3D%22' + settings.unit + '%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
            $.ajax({
                dataType: "json",
                url: url,
                success: function (data) {
                    var previsao = {};
                    previsao.wind = data.query.results.channel.wind;
                    previsao.atmosphere = data.query.results.channel.atmosphere;
                    previsao.location = data.query.results.channel.location;
                    previsao.current = data.query.results.channel.item.condition;
                    previsao.forecast = data.query.results.channel.item.forecast;
                    elemento.find('*').each(function () {
                        var dataTempo = $(this).attr('data-tempo');
                        if (dataTempo === "temperatura") {
                            $(this).html(previsao.current.temp);
                        }
                        if (dataTempo === "dia-mes") {
                            $(this).html(translateDays(previsao.forecast[0].date));
                        }
                        if (dataTempo === "dia-semana") {
                            $(this).html(translateWeekdays(previsao.forecast[0].day));
                        }
                        if (dataTempo === "dia-semana-abreviado") {
                            $(this).html(translateAbbreviatedDays(previsao.forecast[0].day));
                        }
                        if (dataTempo === "dia") {
                            $(this).html(getDayMonth(previsao.forecast[0].date));
                        }
                        if (dataTempo === "maxima") {
                            $(this).html(previsao.forecast[0].high);
                        }
                        if (dataTempo === "minima") {
                            $(this).html(previsao.forecast[0].low);
                        }
                        if (dataTempo === "descricao") {
                            $(this).html(getForecastText(previsao.current.code));
                        }
                        if (dataTempo === "icone") {
                            $(this).html(generateIcon(previsao.current.code));
                        }
                        if (dataTempo === "cidade") {
                            $(this).html(previsao.location.city);
                        }
                        if (dataTempo === "humidade") {
                            $(this).html(previsao.atmosphere.humidity);
                        }
                        if (dataTempo === "pressao") {
                            $(this).html(previsao.atmosphere.pressure);
                        }
                        if (dataTempo === "visibilidade") {
                            $(this).html(previsao.atmosphere.visibility);
                        }
                        if (dataTempo === "elevacao") {
                            $(this).html(previsao.atmosphere.rising);
                        }
                        if (dataTempo === "velocidade-vento") {
                            $(this).html(previsao.wind.speed);
                        }
                        if (dataTempo === "unidade-velocidade") {
                            $(this).html(previsao.units.speed);
                        }
                        if (dataTempo === "unidade-distancia") {
                            $(this).html(previsao.units.distance);
                        }
                        if (dataTempo === "unidade-pressao") {
                            $(this).html(previsao.units.pressure);
                        }
                        if (dataTempo === "unidade-temperatura") {
                            $(this).html(previsao.units.temperature);
                        }
                        if (dataTempo === "data-completa") {
                            $(this).html(translateWeekdays(previsao.forecast[0].day) + ', ' + translateDays(previsao.forecast[0].date));
                        }
                        for (i = 1; i <= 4; i++) {
                            if (dataTempo === "temperatura-" + i) {
                                $(this).html(previsao.forecast[i].low);
                            }
                            if (dataTempo === "dia-mes-" + i) {
                                $(this).html(translateDays(previsao.forecast[i].date));
                            }
                            if (dataTempo === "dia-semana-" + i) {
                                $(this).html(translateWeekdays(previsao.forecast[i].day));
                            }
                            if (dataTempo === "dia-semana-abreviado-" + i) {
                                $(this).html(translateAbbreviatedDays(previsao.forecast[i].day));
                            }
                            if (dataTempo === "dia-" + i) {
                                $(this).html(getDayMonth(previsao.forecast[i].date));
                            }
                            if (dataTempo === "maxima-" + i) {
                                $(this).html(previsao.forecast[i].high);
                            }
                            if (dataTempo === "minima-" + i) {
                                $(this).html(previsao.forecast[i].low);
                            }
                            if (dataTempo === "descricao-" + i) {
                                $(this).html(getForecastText(previsao.forecast[i].code));
                            }
                            if (dataTempo === "icone-" + i) {
                                $(this).html(generateIcon(previsao.forecast[i].code));
                            }
                            if (dataTempo === "data-completa-" + i) {
                                $(this).html(translateWeekdays(previsao.forecast[i].day) + ', ' + translateDays(previsao.forecast[i].date));
                            }
                        }
                    });
                }

            });
        }

        function getDayMonth(data) {
            dateArr = data.split(" ");
            return dateArr[0];
        }

        function generateIcon(code) {
            var icones = [];
            icones[0] = 'wi wi-tornado';
            icones[1] = 'wi wi-storm-showers';
            icones[2] = 'wi wi-hurricane';
            icones[3] = 'wi wi-thunderstorm';
            icones[4] = 'wi wi-thunderstorm';
            icones[5] = 'wi wi-rain-mix';
            icones[6] = 'wi wi-sleet';
            icones[7] = 'wi wi-sleet';
            icones[8] = 'wi wi-raindrops';
            icones[9] = 'wi wi-raindrops';
            icones[10] = 'wi wi-rain';
            icones[11] = 'wi wi-showers';
            icones[12] = 'wi wi-showers';
            icones[13] = 'wi wi-snow';
            icones[14] = 'wi wi-snow';
            icones[15] = 'wi wi-snow';
            icones[16] = 'wi wi-snow';
            icones[17] = 'wi wi-hail';
            icones[18] = 'wi wi-sleet';
            icones[19] = 'wi wi-dust';
            icones[20] = 'wi wi-fog';
            icones[21] = 'wi wi-cloudy-windy';
            icones[22] = 'wi wi-smoke';
            icones[23] = 'wi wi-strong-wind';
            icones[24] = 'wi wi-windy';
            icones[25] = 'wi wi-snowflake-cold';
            icones[26] = 'wi wi-cloudy';
            icones[27] = 'wi wi-night-cloudy';
            icones[28] = 'wi wi-day-cloudy';
            icones[29] = 'wi wi-night-partly-cloudy';
            icones[30] = 'wi wi-day-sunny-overcast';
            icones[31] = 'wi wi-night-clear';
            icones[32] = 'wi wi-day-sunny';
            icones[33] = 'wi wi wi-night-clear';
            icones[34] = 'wi wi-day-sunny';
            icones[35] = 'wi wi-hail';
            icones[36] = 'wi wi-hot';
            icones[37] = 'wi wi-day-thunderstorm';
            icones[38] = 'wi wi-thunderstorm';
            icones[39] = 'wi wi-thunderstorm';
            icones[40] = 'wi wi-showers';
            icones[41] = 'wi wi-snow';
            icones[42] = 'wi wi-snow';
            icones[43] = 'wi wi-cloudy';
            icones[44] = 'wi wi-cloudy';
            icones[45] = 'wi wi-thunderstorm';
            icones[46] = 'wi wi-snow';
            icones[47] = 'wi wi-day-sleet-storm';
            icones[3200] = 'wi wi-na';
            return '<i class="' + icones[code] + '"></i>'
        }


        function translateWeekdays(day) {
            switch (day) {
                case 'Sun':
                    return 'Domingo';
                    break;

                case 'Mon':
                    return 'Segunda-Feira';
                    break;

                case 'Tue':
                    return 'Terça-Feira';
                    break;

                case 'Wed':
                    return 'Quarta-Feira';
                    break;

                case 'Thu':
                    return 'Quinta-Feira';
                    break;

                case 'Fri':
                    return 'Sexta-Feira';
                    break;

                case 'Sat':
                    return 'Sábado';
                    break;

            }
        }

        function translateAbbreviatedDays(day) {
            switch (day) {
                case 'Sun':
                    return 'Dom';
                    break;

                case 'Mon':
                    return 'Seg';
                    break;

                case 'Tue':
                    return 'Ter';
                    break;

                case 'Wed':
                    return 'Qua';
                    break;

                case 'Thu':
                    return 'Qui';
                    break;

                case 'Fri':
                    return 'Sex';
                    break;

                case 'Sat':
                    return 'Sáb';
                    break;

            }
        }

        function translateDays(data) {
            var dateArr = data.split(" ");
            switch (dateArr[1]) {
                case 'Jan':
                    return dateArr[0] + ' Janeiro ';
                    break;

                case 'Feb':
                    return dateArr[0] + ' Fevereiro ';
                    break;

                case 'Mar':
                    return dateArr[0] + ' Março ';
                    break;

                case 'Apr':
                    return dateArr[0] + ' Abril ';
                    break;
                case 'May':
                    return dateArr[0] + ' Maio ';
                    break;
                case 'June':
                    return dateArr[0] + ' Junho ';
                    break;

                case 'July':
                    return dateArr[0] + ' Julho ';
                    break;

                case 'Aug':
                    return dateArr[0] + ' Agosto ';
                    break;
                case 'Sept':
                    return dateArr[0] + ' Setembro ';
                    break;
                case 'Oct':
                    return dateArr[0] + ' Outubro ';
                    break;
                case 'Nov':
                    return dateArr[0] + ' Novembro ';
                    break;
                case 'Dec':
                    return dateArr[0] + ' Dezembro ';
                    break;

            }
        }

        function getForecastText(code) {
            var forecastTexts = [];
            forecastTexts[0] = 'Tornado';
            forecastTexts[1] = 'Tempestade';
            forecastTexts[2] = 'Furacão';
            forecastTexts[3] = 'Tempestade de Raios';
            forecastTexts[4] = 'Tempestade de Raios';
            forecastTexts[5] = 'Chuva';
            forecastTexts[6] = 'Chuva com Neve';
            forecastTexts[7] = 'Chuva com Neve';
            forecastTexts[8] = 'Chuva';
            forecastTexts[9] = 'Chuva';
            forecastTexts[10] = 'Chuva';
            forecastTexts[11] = 'Chuva';
            forecastTexts[12] = 'Chuva';
            forecastTexts[13] = 'Nevando';
            forecastTexts[14] = 'Tempestade';
            forecastTexts[15] = 'Nevando';
            forecastTexts[16] = 'Nevando';
            forecastTexts[17] = 'Granizo';
            forecastTexts[18] = 'Chuva com Neve';
            forecastTexts[19] = 'Poeira';
            forecastTexts[20] = 'Névoa';
            forecastTexts[21] = 'Nublado';
            forecastTexts[22] = 'Neblina';
            forecastTexts[23] = 'Nuvens';
            forecastTexts[24] = 'Ventania';
            forecastTexts[25] = 'Nevando';
            forecastTexts[26] = 'Nuvens';
            forecastTexts[27] = 'Nublado';
            forecastTexts[28] = 'Nublado';
            forecastTexts[29] = 'Parcialmente Nublado';
            forecastTexts[30] = 'Parcialmente Nublado';
            forecastTexts[31] = 'Tempo Limpo';
            forecastTexts[32] = 'Ensolarado';
            forecastTexts[33] = 'Parcialmente Nubaldo';
            forecastTexts[34] = 'Ensolarado';
            forecastTexts[35] = 'Chuva';
            forecastTexts[36] = 'Quente';
            forecastTexts[37] = 'Tempestade';
            forecastTexts[38] = 'Tempestade';
            forecastTexts[39] = 'Tempestade';
            forecastTexts[40] = 'Chuva';
            forecastTexts[41] = 'Nevando';
            forecastTexts[42] = 'Nevando';
            forecastTexts[43] = 'Nublado';
            forecastTexts[44] = 'Nublado';
            forecastTexts[45] = 'Tempestade de Raios';
            forecastTexts[46] = 'Nevando';
            forecastTexts[47] = 'Tempestade';
            forecastTexts[3200] = 'NA';
            return forecastTexts[code];
        }

        function updateForecast() {
            fillElements();
            setTimeout(updateForecast, settings.timeout * 1000);
        }

        updateForecast();
    }
}(jQuery));