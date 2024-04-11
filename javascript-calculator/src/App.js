import {useState} from 'react';
import './App.css';

function App() {
  const [answer, setAnswer] = useState("0");
  const [expression, setExpression] = useState("");
  const [equalPressed, setEqualPressed] = useState(false);

  const buttonPress = (key) => {
    switch(key){
      //clear is pressed, answer set to 0 and expression empty
      case "clear":
        setAnswer("0");
        setExpression("");
        setEqualPressed(false);
        break;
      //neg/pos is pressed, if 0 do nothing, if neg turn pos, if pos turn neg, expression unaffected
      case "negative":
        if (answer === "0"){
          break;
        } else if (answer.toString().charAt(0) === "-"){
          setAnswer(answer.slice(1));
        } else {
          setAnswer("-".concat(answer));
        }
        break;
      //percentage divides answer by 100, turns into percentage, expression unaffected
      case "percentage":
        if (answer === "0"){
          break;
        }
        setAnswer((parseFloat(answer)/100).toString());
        break;
      /* (math operations)
        if answer already includes operation or the expression is empty, do nothing
        if equal is recently pressed, set answer to operation and set the expression to the result and the operation
        if answer is already other operation, set answer to new operation and replace previous operation in expression with new one
        else set answer to the math operation and add the current answer and operation to expression
      */
      case "divide":
        if (answer.includes("/")){
          break;
        } else if (equalPressed){
          setExpression(answer.concat("/"));
          setAnswer("/");
          setEqualPressed(false);
        } else if (answer === "+" || answer === "-" || answer === "*" ) {
          setAnswer("/");
          setExpression((expression.slice(0,expression.length-1)).concat("/"));
        } else {
          setAnswer("/");
          setExpression(expression.concat(answer).concat("/"));
        }
        break;
      case "multiply":
        if (answer.includes("*")){
          break;
        } else if (equalPressed){
          setExpression(answer.concat("*"));
          setAnswer("*");
          setEqualPressed(false);
        } else if (answer === "+" || answer === "-" || answer === "/" ) {
          setAnswer("*");
          setExpression((expression.slice(0,expression.length-1)).concat("*"));
        } else {
          setAnswer("*");
          setExpression(expression.concat(answer).concat("*"));
        }
        break;
      case "plus":
        if (answer === ("+")){
          break;
        } else if (equalPressed){
          setExpression(answer.concat("+"));
          setAnswer("+");
          setEqualPressed(false);
        } else if (answer === "/" || answer === "-" || answer === "*" ) {
          setAnswer("+");
          setExpression((expression.slice(0,expression.length-1)).concat("+"));
        } else {
          setAnswer("+");
          setExpression(expression.concat(answer).concat("+"));
        }
        break;
      case "minus":
        if (answer.includes("-")){
          break;
        } else if (equalPressed){
          setExpression(answer.concat("-"));
          setAnswer("-");
          setEqualPressed(false);
        } else if (answer === "+" || answer === "/" || answer === "*" ) {
          setAnswer("-");
          setExpression((expression.slice(0,expression.length-1)).concat("-"));
        } else {
          setAnswer("-");
          setExpression(expression.concat(answer).concat("-"));
        }
        break;
      /* (decimal)
      if answer already includes a decimal, do nothing
      if math operation or 0 is answer, set the answer to 0.
      if equal recently pressed, set answer to 0. and empty expression
      else (answer is a digit), add decimal to the answer
      */
      case "dot":
        if (answer.includes(".")){
          break;
        } else if (answer === "+" || answer === "-" || answer === "*" || answer === "/" || answer === "0") {
          setAnswer("0.");
        } else if (equalPressed) {
          setAnswer("0.");
          setExpression("");
          setEqualPressed(false);
        } else {
          setAnswer(answer.concat("."));
        }
        break;
      /*(equal)
      if answer is a math operation, evaluate the current expression and remove the last operation and set equal pressed to true
      else (answer is digit), evaluate current expression with answer added to it and set equal pressed to true
      */
      case "equal":
        if (answer === "+" || answer === "-" || answer === "*" || answer === "/"){
          setExpression((expression.slice(0,expression.length-1)).concat("="));
          setAnswer(eval(expression.slice(0,expression.length-1)));
          setEqualPressed(true);
        } else {
          setExpression((expression.concat(answer)).concat("="));
          setAnswer(eval(expression.concat(answer)));
          setEqualPressed(true);
        }
        break;
      /* (for numbers)
      if answer is 0 set the answer to digit
      if equal is recently pressed, set answer to digit and empty expression
      else (if answer is digit not 0 and equal not recently pressed), add digit to answer
      */
      case "seven":
        if(answer === "0"){
          setAnswer("7");
        } else if (equalPressed){
          setAnswer("7");
          setExpression("");
          setEqualPressed(false);
        } else if(answer === "+" || answer === "-" || answer === "*" || answer === "/"){
          setAnswer("7");
        }else {
          setAnswer(answer.concat("7"));
        }
        break;
      case "eight":
        if(answer === "0" || (equalPressed)){
          setAnswer("8");
        } else if (equalPressed){
          setAnswer("8");
          setExpression("");
          setEqualPressed(false);
        } else if(answer === "+" || answer === "-" || answer === "*" || answer === "/"){
          setAnswer("8");
        } else {
          setAnswer(answer.concat("8"));
        }
        break;
      case "nine":
        if(answer === "0" || (equalPressed)){
          setAnswer("9");
        } else if (equalPressed){
          setAnswer("9");
          setExpression("");
          setEqualPressed(false);
        } else if(answer === "+" || answer === "-" || answer === "*" || answer === "/"){
          setAnswer("9");
        } else {
          setAnswer(answer.concat("9"));
        }
        break;
      case "four":
        if(answer === "0" || (equalPressed)){
          setAnswer("4");
        } else if (equalPressed){
          setAnswer("4");
          setExpression("");
          setEqualPressed(false);
        } else if(answer === "+" || answer === "-" || answer === "*" || answer === "/"){
          setAnswer("4");
        } else {
          setAnswer(answer.concat("4"));
        }
        break;
      case "five":
        if(answer === "0" || (equalPressed)){
          setAnswer("5");
        } else if (equalPressed){
          setAnswer("5");
          setExpression("");
          setEqualPressed(false);
        } else if(answer === "+" || answer === "-" || answer === "*" || answer === "/"){
          setAnswer("5");
        } else {
          setAnswer(answer.concat("5"));
        }
        break;
      case "six":
        if(answer === "0" || (equalPressed)){
          setAnswer("6");
        } else if (equalPressed){
          setAnswer("6");
          setExpression("");
          setEqualPressed(false);
        } else if(answer === "+" || answer === "-" || answer === "*" || answer === "/"){
          setAnswer("6");
        } else {
          setAnswer(answer.concat("6"));
        }
        break;
      case "one":
        if(answer === "0" || (equalPressed)){
          setAnswer("1");
        } else if (equalPressed){
          setAnswer("1");
          setExpression("");
          setEqualPressed(false);
        } else if(answer === "+" || answer === "-" || answer === "*" || answer === "/"){
          setAnswer("1");
        } else {
          setAnswer(answer.concat("1"));
        }
        break;
      case "two":
        if(answer === "0" || (equalPressed)){
          setAnswer("2");
        } else if (equalPressed){
          setAnswer("2");
          setExpression("");
          setEqualPressed(false);
        } else if(answer === "+" || answer === "-" || answer === "*" || answer === "/"){
          setAnswer("2");
        } else {
          setAnswer(answer.concat("2"));
        }
        break;
      case "three":
        if(answer === "0" || (equalPressed)){
          setAnswer("3");
        } else if (equalPressed){
          setAnswer("3");
          setExpression("");
          setEqualPressed(false);
        } else if(answer === "+" || answer === "-" || answer === "*" || answer === "/"){
          setAnswer("3");
        } else {
          setAnswer(answer.concat("3"));
        }
        break;
      case "zero":
        if(answer === "0" || (equalPressed)){
          setAnswer("0");
        } else if (equalPressed){
          setAnswer("0");
          setExpression("");
          setEqualPressed(false);
        } else if(answer === "+" || answer === "-" || answer === "*" || answer === "/"){
          setAnswer("0");
        } else {
          setAnswer(answer.concat("0"));
        }
        break;
      default:
        setAnswer(answer);

    }
  }

  return (
    <>
      <div className='container'>
        <h1>Calculator App</h1>
        <div id="calc">
          <div id="display" style={{textAlign: "right"}}>
            <div id="expression">{expression}</div>
            <div id="answer">{answer}</div>
          </div>
          <button className='light-grey' id='clear' onClick={() => buttonPress("clear")}>AC</button>
          <button className='light-grey' id='negative' onClick={() => buttonPress("negative")}>+/-</button>
          <button className='light-grey' id='percentage' onClick={() => buttonPress("percentage")}>%</button>
          <button className='blue' id='divide' onClick={() => buttonPress("divide")}>/</button>
          <button className='grey' id='seven' onClick={() => buttonPress("seven")}>7</button>
          <button className='grey' id='eight' onClick={() => buttonPress("eight")}>8</button>
          <button className='grey' id='nine' onClick={() => buttonPress("nine")}>9</button>
          <button className='blue' id='multiply' onClick={() => buttonPress("multiply")}>x</button>
          <button className='grey' id='four' onClick={() => buttonPress("four")}>4</button>
          <button className='grey' id='five' onClick={() => buttonPress("five")}>5</button>
          <button className='grey' id='six' onClick={() => buttonPress("six")}>6</button>
          <button className='blue' id='minus' onClick={() => buttonPress("minus")}>-</button>
          <button className='grey' id='one' onClick={() => buttonPress("one")}>1</button>
          <button className='grey' id='two' onClick={() => buttonPress("two")}>2</button>
          <button className='grey' id='three' onClick={() => buttonPress("three")}>3</button>
          <button className='blue' id='plus' onClick={() => buttonPress("plus")}>+</button>
          <button className='grey' id='zero' onClick={() => buttonPress("zero")}>0</button>
          <button className='grey' id='dot' onClick={() => buttonPress("dot")}>.</button>
          <button className='blue' id='equal' onClick={() => buttonPress("equal")}>=</button>
        </div>
      </div>
    </>
  );
}

export default App;
