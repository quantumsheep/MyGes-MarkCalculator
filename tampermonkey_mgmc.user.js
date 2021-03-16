// ==UserScript==
// @name         MyGes-MarkCalculator
// @namespace    https://github.com/QuantumSheep/MyGes-MarkCalculator
// @version      1.6
// @description  Calculateur de moyenne et de gains d'ECTS pour MyGES (Intranet du groupe GES)
// @author       QuantumSheep
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @include      *://*.myges.fr/student/marks*
// ==/UserScript==

(function () {
  if (document.getElementById("myges-markcalculator") != null) return;

  const calculate = () => {
    document.querySelector('#marksForm\\:marksWidget\\:coursesTable_head tr').innerHTML += `<th id="marksForm:marksWidget:coursesTable:j_idt183" class="ui-state-default" role="columnheader" style="width:55px;text-align: center"><span class="ui-column-title">Moyenne</span></th>`

    const marksTable = document.getElementById("marksForm:marksWidget:coursesTable_data");

    let totalavg = 0;
    let avgcount = 0;
    let rowcount = 0;
    let ects = 0;

    marksTable.childNodes.forEach(elem => {
      const td = document.createElement('td');

      td.setAttribute('role', 'gridcell');
      td.style.width = '55px';
      td.style.textAlign = 'center';

      let avg = 0;
      let markcount = 0;

      rowcount++;

      for (let i = 4; i < elem.childNodes.length - 1; i++) {
        if (elem.childNodes[i].innerHTML) {
          avg += parseFloat(elem.childNodes[i].innerHTML.replace(',', '.'));
          markcount++;
        }
      }

      let coefIsNaN = false;

      const noCC = markcount === 0;

      if (noCC) {
        avg = 0;
      }

      let coef = parseFloat(elem.childNodes[2].innerHTML);

      if (isNaN(coef)) {
        coef = parseFloat(elem.childNodes[3].innerHTML) || 1;
        coefIsNaN = true;
      }

      const exam = parseFloat(elem.childNodes[elem.childNodes.length - 1].innerHTML.replace(',', '.'));

      if (!noCC) {
        avg = (avg / markcount);

        if (exam) {
          avg = (avg + exam) / 2;
        }
      } else {
        avg = exam;
      }

      if (!isNaN(avg)) {
        totalavg += avg * coef;
        avgcount += coef;

        let thisects = 0;

        if (avg >= 10) {
          thisects = parseFloat(elem.childNodes[3].innerHTML);

          if (!isNaN(thisects)) {
            ects += thisects;
          }
        }

        console.log(`Moyenne pour ${elem.childNodes[0].firstChild.innerHTML} : ${avg} (coef ${coefIsNaN ? `inconnu (remplacé par ${coef})` : parseInt(elem.childNodes[3].innerHTML)}) ${thisects > 0 ? `(+${thisects} ECTS)` : ''}`);
        td.innerText = (((avg % 1) === 0) ? avg : avg.toFixed(2));
      }

      elem.appendChild(td);
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
  }

  let actual = document.querySelector('[id^="marksForm:"][id$=":periodSelect_panel"] div ul li.ui-state-highlight').innerText;

  document.querySelectorAll('[id^="marksForm:"][id$=":periodSelect_panel"] div ul li').forEach(elem => elem.addEventListener('click', function (e) {
    if (this.innerText !== actual) {
      actual = this.innerText;

      setTimeout(calculate, 500);
    }
  }));

  calculate();
})();
