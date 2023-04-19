const calculateBmi = (height: number, weight: number) => {
  const BMI = weight / ((height / 100) * (height / 100))
  if ( BMI > 18.5 ||BMI< 24.9){
    console.log('Normal (healthy weight)')
  }
  else if (BMI <= 18.5){
    console.log('Underweight')
  }
  else if (BMI > 25 || BMI < 29.9){
    console.log('Overweight')
  }
  else{
    console.log('Obese')
  }
}

const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

calculateBmi(height, weight)
