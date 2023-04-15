const calculateBmi = (height: number, weight: number) => {
  const BMI = weight / ((height / 100) * (height / 100))
  if ( BMI > 18.5 ||BMI< 24.9){
    return 'Normal (healthy weight)'
  }
  else if (BMI <= 18.5){
    return 'Underweight'
  }
  else if (BMI > 25 || BMI < 29.9){
    return 'Overweight'
  }
  else{
    return 'Obese'
  }
}

console.log(calculateBmi(180, 74))
