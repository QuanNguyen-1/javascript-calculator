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
        }
        setAnswer(answer.toString().charAt(0) === "-"? answer.slice(0) : "-" + answer);
        break;
      //percentage divides answer by 100, turns into percentage, expression unaffected
      case "percentage":
        if (answer === "0"){
          break;
        }
        setAnswer((parseFloat(answer)/100).toString());
        break;
      /* (math operations)
        if expression empty and answer is 0 or answer already includes operation, do nothing
        if equal is recently pressed, set answer to operation and set the expression to the result and the operation
        if answer is already an operation, set answer to new operation and replace last operation with new operation
        if last char in answer is decimal, clear answer and last operation from expression and replace with new operation
        else set answer to the math operation and add the operation to expression
      */
      case "divide":
        if ((answer === "0" && !expression) || answer.includes("/")){
          break;
        } else if (equalPressed){
          setExpression(answer.concat("/"));
          setAnswer("/");
          setEqualPressed(false);
        } else if (answer === "+" || answer === "-" || answer === "*" || answer === "/") {
          setAnswer("/");
          setExpression((expression.slice(0,expression.length-1)).concat(answer));
        } else if (answer.toString().charAt(answer.length-1) === ".") {
          setExpression((expression.slice(0, expression.length - answer.length - 1)).concat("/"));
          setAnswer("/");
        } else {
          setAnswer("/");
          setExpression(expression.concat(answer));
        }
        break;
      case "multiply":
        if (answer === "0" && !expression){
          break;
        } else if (equalPressed){
          setExpression(answer.concat("*"));
          setAnswer("*");
          setEqualPressed(false);
        } else if (answer === "+" || answer === "-" || answer === "*" || answer === "/") {
          setAnswer("*");
          setExpression((expression.slice(0,expression.length-1)).concat(answer));
        } else if (answer.toString().charAt(answer.length-1) === ".") {
          setExpression((expression.slice(0, expression.length - answer.length - 1)).concat("*"));
          setAnswer("*");
        } else {
          setAnswer("*");
          setExpression(expression.concat(answer));
        }
        break;
      case "plus":
        if (answer === "0" && !expression){
          break;
        } else if (equalPressed){
          setExpression(answer.concat("+"));
          setAnswer("+");
          setEqualPressed(false);
        } else if (answer === "+" || answer === "-" || answer === "*" || answer === "/") {
          setAnswer("+");
          setExpression((expression.slice(0,expression.length-1)).concat(answer));
        } else if (answer.toString().charAt(answer.length-1) === ".") {
          setExpression((expression.slice(0, expression.length - answer.length - 1)).concat("+"));
          setAnswer("+");
        } else {
          setAnswer("+");
          setExpression(expression.concat(answer));
        }
        break;
      case "minus":
        if (answer === "0" && !expression){
          break;
        } else if (equalPressed){
          setExpression(answer.concat("-"));
          setAnswer("-");
          setEqualPressed(false);
        } else if (answer === "+" || answer === "-" || answer === "*" || answer === "/") {
          setAnswer("-");
          setExpression((expression.slice(0,expression.length-1)).concat(answer));
        } else if (answer.toString().charAt(answer.length-1) === ".") {
          setExpression((expression.slice(0, expression.length - answer.length - 1)).concat("-"));
          setAnswer("-");
        } else {
          setAnswer("-");
          setExpression(expression.concat(answer));
        }
        break;
      /* (decimal)
      if answer already includes a decimal, do nothing
      */
      case "dot":
        if (answer.includes(".")){
          break;
        } else if (answer === "+" || answer === "-" || answer === "*" || answer === "/" || answer === "0") {
          setAnswer("0.");
          setExpression(expression.concat(answer));
        } else if (equalPressed) {
          setAnswer("0.");
          setExpression(answer);
          setEqualPressed(false);
        } else {
          setAnswer(answer.concat("."));
          setExpression(expression.concat(answer));
        }
        break;

      case "equal":

      /* (for numbers)
      if answer only 0 and empty expression or 0 expression or if equal is pressed recently, answer and expression becomes num, 
      if answer only 0 and last char in expression is 0, answer and last char in expression becomes num
      else add num to answer and to expression
      */
      case "seven":
        if((answer === "0" && (!expression || expression === "0")) || (equalPressed)){
          setAnswer("7");
          setExpression("7");
          setEqualPressed(false);
        } else if(answer === "0" && expression.slice(-1) === "0"){
          setAnswer("7");
          setExpression((expression.slice(0,expression.length-1)).concat("7"));
        } else {
          setAnswer(answer.concat("7"));
          setExpression(expression.concat("7"));
        }
        break;
      case "eight":
        if((answer === "0" && (!expression || expression === "0")) || (equalPressed)){
          setAnswer("8");
          setExpression("8");
          setEqualPressed(false);
        } else if(answer === "0" && expression.slice(-1) === "0"){
          setAnswer("8");
          setExpression((expression.slice(0,expression.length-1)).concat("8"));
        } else {
          setAnswer(answer.concat("8"));
          setExpression(expression.concat("8"));
        }
        break;
      case "nine":
        if((answer === "0" && (!expression || expression === "0")) || (equalPressed)){
          setAnswer("9");
          setExpression("9");
          setEqualPressed(false);
        } else if(answer === "0" && expression.slice(-1) === "0"){
          setAnswer("9");
          setExpression((expression.slice(0,expression.length-1)).concat("9"));
        } else {
          setAnswer(answer.concat("9"));
          setExpression(expression.concat("9"));
        }
        break;
      case "four":
        if((answer === "0" && (!expression || expression === "0")) || (equalPressed)){
          setAnswer("4");
          setExpression("4");
          setEqualPressed(false);
        } else if(answer === "0" && expression.slice(-1) === "0"){
          setAnswer("4");
          setExpression((expression.slice(0,expression.length-1)).concat("4"));
        } else {
          setAnswer(answer.concat("4"));
          setExpression(expression.concat("4"));
        }
        break;
      case "five":
        if((answer === "0" && (!expression || expression === "0")) || (equalPressed)){
          setAnswer("5");
          setExpression("5");
          setEqualPressed(false);
        } else if(answer === "0" && expression.slice(-1) === "0"){
          setAnswer("5");
          setExpression((expression.slice(0,expression.length-1)).concat("5"));
        } else {
          setAnswer(answer.concat("5"));
          setExpression(expression.concat("5"));
        }
        break;
      case "six":
        if((answer === "0" && (!expression || expression === "0")) || (equalPressed)){
          setAnswer("6");
          setExpression("6");
          setEqualPressed(false);
        } else if(answer === "0" && expression.slice(-1) === "0"){
          setAnswer("6");
          setExpression((expression.slice(0,expression.length-1)).concat("6"));
        } else {
          setAnswer(answer.concat("6"));
          setExpression(expression.concat("6"));
        }
        break;
      case "one":
        if((answer === "0" && (!expression || expression === "0")) || (equalPressed)){
          setAnswer("1");
          setExpression("1");
          setEqualPressed(false);
        } else if(answer === "0" && expression.slice(-1) === "0"){
          setAnswer("1");
          setExpression((expression.slice(0,expression.length-1)).concat("1"));
        } else {
          setAnswer(answer.concat("1"));
          setExpression(expression.concat("1"));
        }
        break;
      case "two":
        if((answer === "0" && (!expression || expression === "0")) || (equalPressed)){
          setAnswer("2");
          setExpression("2");
          setEqualPressed(false);

        } else if(answer === "0" && expression.slice(-1) === "0"){
          setAnswer("2");
          setExpression((expression.slice(0,expression.length-1)).concat("2"));
        } else {
          setAnswer(answer.concat("2"));
          setExpression(expression.concat("2"));
        }
        break;
      case "three":
        if((answer === "0" && (!expression || expression === "0")) || (equalPressed)){
          setAnswer("3");
          setExpression("3");
          setEqualPressed(false);
        } else if(answer === "0" && expression.slice(-1) === "0"){
          setAnswer("3");
          setExpression((expression.slice(0,expression.length-1)).concat("3"));
        } else {
          setAnswer(answer.concat("3"));
          setExpression(expression.concat("3"));
        }
        break;
      /* (for zero)
      if answer is 0 and there is empty expression, set expression to 0 
      if answer is 0 and there is expression already, set answer to 0
      if equal recently pressed, set answer to 0 and empty expression
      if answer is math operation, set answer to 0 and add 0 to expression
      else add zero to answer and expression
      */
      case "zero":
        if(answer === "0" && !expression){
          setExpression("0");
        } else if(answer === "0" && expression) {
          setAnswer("0");
        } else if(equalPressed) {
          setAnswer("0");
          setExpression("");
          setEqualPressed(false);
        } else if(answer === "+" || answer === "-" || answer === "*" || answer === "/") {
          setAnswer("0");
          setExpression(expression.concat("0"));
        } else {
          setAnswer(answer.concat("0"));
          setExpression(expression.concat("0"));
        }
        break;
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
