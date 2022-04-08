const express = require("express");
const router = express.Router();

const cumulHeureLog = (donnee) => {

    let result = donnee.map((item, index) => {
        return(
            {
                heure: parseInt(item['Heure loguées'].split(":")[0]),
                minute: parseInt(item['Heure loguées'].split(":")[1]),
                seconde: parseInt(item['Heure loguées'].split(":")[2]),

            }
        )
        
    })
    console.log(result)
    result = result.map((item, index) => (item.heure*3600) + item.minute*60 + item.seconde)
    total = result.reduce((a, b) => a + b, 0)
    return new Date(total * 1000).toISOString().slice(11, 19);
    // return total
}



router.get("/", (req, res) => {
    //require client 
    const client = require("../elasticsearch/client");

    client.search({
        index: "pembas",
        type: "_doc",
        size: 300
    })
        .then((pemba) => {
            const result = pemba.hits.hits.map((pemba) => pemba._source);

            const stageContrat = result.filter((item, index) => item['Type de contrat'] === "Stage");
            const cdiContrat = result.filter((item, index) => item['Type de contrat'] === "CDI");
            const cddContrat = result.filter((item, index) => item['Type de contrat'] === "CDD");

            const final  =  {
                cdd :cumulHeureLog(cddContrat),
                cdi: cumulHeureLog(cdiContrat),
                stage: cumulHeureLog(stageContrat),
            }


            res.status(200).json([final]);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
});





//export router
module.exports = router;
