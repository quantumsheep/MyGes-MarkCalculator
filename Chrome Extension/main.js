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

        if (markcount > 0) {
            const coef = parseFloat(elem.childNodes[2].innerHTML);

            avg = (avg * coef) / (coef * markcount);
            totalavg += avg;
            avgcount++;

            if (avg >= 10) {
                ects += parseFloat(elem.childNodes[3].innerHTML);
            }

            console.log(`Moyenne pour ${elem.childNodes[0].firstChild.innerHTML} : ${avg} (coef ${elem.childNodes[2].innerHTML}) ${avg >= 10 ? `(+${elem.childNodes[2].innerHTML} ECTS)` : ''}`);
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