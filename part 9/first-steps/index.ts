import express from "express";
import { calculateBMI } from "./bmiCalculator";
const app = express();


app.get('/bmi', (req, res) => {
    const mass = req.query.mass;
    const height = req.query.height;
    if(!mass || !height){
        
        res.status(400).send({error: 'missing parameter'});
    } else {
        try{
            const bmi = calculateBMI(Number(height), Number(mass));
            res.send({
                mass: mass,
                height: height,
                bmi: bmi
            })

        } catch(e : unknown ){
            res.status(400).send({error: "error"})
        }
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});