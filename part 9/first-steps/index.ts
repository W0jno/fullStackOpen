import express from "express";
import { calculateBMI } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());

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

app.post('/exercises', (req, res) => {
    const dailyExercises = req.body.dailyExercises;
    const target = req.body.target;

    if(!dailyExercises || !target){
        res.status(400).send({error: "missing parameter"});
    } else {
        try{
            const parsedDailyExercises = dailyExercises.map(Number);
            res.send(calculateExercises(parsedDailyExercises, Number(target)));
        } catch (e){
            res.status(400).send({error: "error"})
        }
    }
})

//SERVER CONFIGURATION
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});