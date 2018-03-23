(() => {
    let totalavg = 0;
    let count = 0;
    let ects = 0;

    document.getElementById("marksForm:marksWidget:coursesTable_data").childNodes.forEach(elem => {
        let avg = -1;
        let markcount = 0;

        for (let i = 4; i < elem.childNodes.length; i++) {
            if (elem.childNodes[i].innerHTML) {
                if (avg === -1) avg = 0;

                avg += parseFloat(elem.childNodes[i].innerHTML);
                markcount++;
            }
        }

        if (avg > -1) {
            let coef = parseFloat(elem.childNodes[2].innerHTML);

            avg = (avg * coef) / (coef * markcount);
            totalavg += avg;
            count++;

            if(avg >= 11) {
                ects += parseFloat(elem.childNodes[3].innerHTML);
            }

            console.log(`Moyenne pour ${elem.childNodes[0].firstChild.innerHTML} : ${avg} (coef ${coef}) ${avg >= 11 ? `(+${elem.childNodes[2].innerHTML} ECTS)` : ''}`);
        }
    });

    console.log(`Moyenne totale: ${totalavg/count}`);
    console.log(`ECTS gagnés: ${ects}`);    
})();
