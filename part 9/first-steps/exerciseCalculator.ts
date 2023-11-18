interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (exerciseHours: number[], targetAmount: number) : Result =>{
    let average: number = 0;
    let temp: number = 0;
    let trainingDays: number = 0;
    for (let i: number = 0; i < exerciseHours.length; i++){
        if(exerciseHours[i] != 0){
            trainingDays++;
        }
        temp += exerciseHours[i];
        average = temp/7;
        
    }

    if(trainingDays == 7 && average > targetAmount){
        return {
            periodLength: exerciseHours.length,
            trainingDays: trainingDays,
            success: true,
            rating: 3,
            ratingDescription: "Good Job! Keep it going!",
            target: targetAmount,
            average: average
        }
    } else if (trainingDays < 7 && trainingDays >= 5 && average < targetAmount){
        return{
            periodLength: exerciseHours.length,
            trainingDays: trainingDays,
            success: false,
            rating: 2,
            ratingDescription: 'not too bad but could be better',
            target: targetAmount,
            average: average
        }
    } else if( trainingDays < 5 && average < targetAmount){
        return{
            periodLength: exerciseHours.length,
            trainingDays: trainingDays,
            success: false,
            rating: 1,
            ratingDescription: 'Train harder!',
            target: targetAmount,
            average: average
        }
    }

}
const targetValue:number = Number(process.argv[2]);
const trainingDays: number[] = process.argv.slice(3).map(Number);

calculateExercises(trainingDays, targetValue)