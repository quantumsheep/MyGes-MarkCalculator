// ==UserScript==
// @name         MyGes-MarkCalculator
// @namespace    https://github.com/QuantumSheep/MyGes-MarkCalculator
// @version      1.0
// @description  Calculateur de moyenne et de gains d'ECTS pour MyGES (Intranet du groupe GES)
// @author       QuantumSheep
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @include      *://*.myges.fr/student/marks*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

    (() => {
    if (document.getElementById("myges-markcalculator") != null) return;

    const marksTable = document.getElementById("marksForm:marksWidget:coursesTable_data");

    let totalavg = 0;
    let avgcount = 0;
    let rowcount = 0;
    let ects = 0;

    marksTable.childNodes.forEach(elem => {
        let avg = 0;
        let markcount = 0;

        rowcount++;

        for (let i = 4; i < elem.childNodes.length; i++) {
            if (elem.childNodes[i].innerHTML) {
                avg += parseFloat(elem.childNodes[i].innerHTML.replace(',', '.'));
                markcount++;
            }
        }

        let coefIsNaN = false;

        if (markcount > 0) {
            let coef = parseFloat(elem.childNodes[2].innerHTML);

            if(isNaN(coef)) {
                coef = 1;
                coefIsNaN = true;
            }

            avg = (avg * coef) / (coef * markcount);
            totalavg += avg;
            avgcount++;

            let thisects = 0;

            if (avg >= 10) {
                thisects = parseFloat(elem.childNodes[3].innerHTML);

                if(!isNaN(thisects)) {
                    ects += thisects;
                }
            }

            console.log(`Moyenne pour ${elem.childNodes[0].firstChild.innerHTML} : ${avg} (coef ${coefIsNaN ? 'inconnu (remplacé par 1)' : parseInt(elem.childNodes[3].innerHTML)}) ${thisects > 0 ? `(+${thisects} ECTS)` : ''}`);
        }
    });

    totalavg = (totalavg / avgcount).toFixed(2);

    console.log(`Moyenne totale: ${totalavg}`);
    console.log(`ECTS gagnés: ${ects}`);

    marksTable.innerHTML += `
        <tr data-ri="12" class="ui-widget-content ui-datatable-even ${rowcount % 2 == 0 ? 'odd' : 'even'}-row" id="myges-markcalculator" role="row">
            <td role="gridcell" colspan="3" style="width:250px" class="mg_inherit_bg">
                <span class="mg_inherit_color" style="font-weight: bold; font-size: 11px"><b>Moyenne Générale</b></span>
            </td>
            <td role="gridcell" style="width:37px;text-align: center"><b>${ects}</b></td>
            <td role="gridcell" colspan="${marksTable.firstElementChild.childElementCount - 4}" style="width:37px;text-align: center"><b>${totalavg}</b></td>
        </tr>`;
})();

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */
