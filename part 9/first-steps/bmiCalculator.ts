
export const calculateBMI = (height: number, mass: number ): string => {
    
    let BMI: number = mass/((height/100)*(height/100));

    if(BMI < 16){
        return "Underweight";
    } else if (BMI > 16 && BMI < 25){
        return "Normal (healthy weight)";
    } else {
        return"Obese";
    }
}
const height: number = Number(process.argv[2]);
const mass: number = Number(process.argv[3]);

calculateBMI(height, mass)