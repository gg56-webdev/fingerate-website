const fs = require('fs');
const xlsx = require('xlsx');

const wb = xlsx.readFile('100sot.xlsx');

const s2 = wb.Sheets['Sheet2'];

async function convert() {
    const data = xlsx.utils.sheet_to_json(s2);
    const newData = data.map((i) => {
        i.name = i.SoT;
        i.lati = parseFloat(i['X,Y']?.split(',')[0]);
        i.long = parseFloat(i['X,Y']?.split(',')[1].substring(1));
        delete i['X,Y'];
        delete i['# of SoTs'];
        delete i.Country;
        delete i.SoT;
        return i;
    });

    newData.pop();

    fs.writeFileSync('newData.json', JSON.stringify(newData));
}
convert();
// fs.writeFile('data.json')
