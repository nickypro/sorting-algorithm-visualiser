function sin(fractionOfFullCircle) {
  const x = fractionOfFullCircle*2*3.14156;
  return (x - (x*x*x)/6 + (x*x*x*x*x)/120);
}

function cos(fractionOfFullCircle) {
  const x = fractionOfFullCircle*2*3.14156;
  return (1 - x*x/2 + (x*x*x*x)/24);
}

export {sin, cos}