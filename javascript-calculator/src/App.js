import {useState} from 'react';
import './App.css';

function App() {
  const [answer, setAnswer] = useState("0");
  const [expression, setExpression] = useState("");
  const [equalPressed, setEqualPressed] = useState(false);
  const [isError, setError] = useState(false);

  const buttonPress = (key) => {
    switch(key){
      //clear is pressed, answer set to 0 and expression empty
      case "clear":
        setAnswer("0");
        setExpression("");
        setEqualPressed(false);
        setError(false);
        break;
      /* (neg/pos)
      if 0 or math operation or infinity, do nothing, 
      if neg turn pos, 
      if pos turn neg
      */
      case "negative":
        if (answer === "0" || answer === "+" || answer === "-" || answer === "*" || answer === "/" || isError || Number(answer) > Number.MAX_VALUE){
          break;
        } else if (answer.toString().charAt(0) === "-"){
          setAnswer(answer.slice(1));
        } else {
          setAnswer("-".concat(answer));
        }
        break;
      /* (percentage) 
      divides answer by 100, turns into percentage,
      if answer is 0 or error or infinity, do nothing
      */
      case "percentage":
        if (answer === "0" || isError || Number(answer) > Number.MAX_VALUE){
          break;
        }
        setAnswer((parseFloat(answer)/100).toString());
        break;
      /* (math operations)
        if answer already includes current operation or error or answer is larger than MAX_VALUE, do nothing
        if equal is recently pressed, set answer to operation and set the expression to the result and the operation
        if answer is already other operation, set answer to new operation and replace previous operation in expression with new one
        if answer is negative, add parenthesis around it in the expression and add operation
        if answer ends in decimal, remove decimal in answer and add to expression with operation
        else set answer to the math operation and add the current answer and operation to expression
      */
      case "divide":
        if (answer === "/" || isError || Number(answer) > Number.MAX_VALUE){
          break;
        } else {
          operationPress("/");
        }
        break;
      case "multiply":
        if (answer === "*" || isError || Number(answer) > Number.MAX_VALUE){
          break;
        } else {
          operationPress("*");}
        break;
      case "plus":
        if (answer === "+" || isError || Number(answer) > Number.MAX_VALUE){
          break;
        } else {
          operationPress("+");
        }
        break;
      case "minus":
        if (answer === "-" || isError || Number(answer) > Number.MAX_VALUE){
          break;
        } else {
          operationPress("-");
        }
        break;
      /* (decimal)
      if answer already includes a decimal, do nothing
      if math operation or 0 is answer, set the answer to 0.
      if equal recently pressed, set answer to 0. and empty expression
      else (answer is a digit), add decimal to the answer
      */
      case "dot":
        if (answer.toString().includes(".") || isError){
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
      if answer is a math operation, evaluate the current expression and remove the last operation and set equal pressed to true, if answer is longer than 33 digits round it
      if answer is negative, wrap the answer in parenthesis and add to expression and evaluate it
      if error is true or answer is larger than MAX_VALUE, do nothing
      else (answer is positive digit), evaluate current expression with answer added to it and set equal pressed to true
      */
      case "equal":
        if (answer === "+" || answer === "-" || answer === "*" || answer === "/"){
          setExpression((expression.slice(0,expression.length-1)).concat("="));
          setAnswer(eval(expression.slice(0,expression.length-1)).length > 33 ? eval(expression.slice(0,expression.length-1)).toPrecision(25) : eval(expression.slice(0,expression.length-1)));
          setEqualPressed(true);
        } else if(answer.toString().charAt(0) === "-") {
          setExpression(expression.concat("(").concat(answer).concat(")").concat("="));
          setAnswer(eval(expression.concat("(").concat(answer).concat(")")).length > 33 ? eval(expression.concat("(").concat(answer).concat(")")).toPrecision(25) : eval(expression.concat("(").concat(answer).concat(")")));
          setEqualPressed(true);
        } else if(isError || Number(answer) > Number.MAX_VALUE || equalPressed) {
          break;
        } else {
          setExpression((expression.concat(answer)).concat("="));
          setAnswer(eval(expression.concat(answer)).length > 33 ? eval(expression.concat(answer)).toPrecision(25) : eval(expression.concat(answer)));
          setEqualPressed(true);
        }
        break;
      /* (for numbers)
      if answer is 0 set the answer to digit
      if equal is recently pressed or there is an error, set answer to digit and empty expression
      if answer is a math operation, set the answer to digit
      else (answer is non zero digit), add digit to answer
      */
      case "seven":
        numPress("7");
        break;
      case "eight":
        numPress("8");
        break;
      case "nine":
        numPress("9");
        break;
      case "four":
        numPress("4");
        break;
      case "five":
        numPress("5");
        break;
      case "six":
        numPress("6");
        break;
      case "one":
        numPress("1");
        break;
      case "two":
        numPress("2");
        break;
      case "three":
        numPress("3");
        break;
      case "zero":
        numPress("0");
        break;
      default:
        setAnswer(answer);

    }

    if (answer.toString().length > 33){
      setAnswer("ERROR: NUMBER TOO LARGE FOR DISPLAY");
      setError(true);
    }
  }

  const numPress = (num) => {
    if(answer === "0"){
      setAnswer(num);
    } else if (equalPressed || isError){
      setAnswer(num);
      setExpression("");
      setEqualPressed(false);
      setError(false);
    } else if(answer === "+" || answer === "-" || answer === "*" || answer === "/"){
      setAnswer(num);
    } else {
      setAnswer(answer.concat(num));
    }
  }

  const operationPress = (operation) => {
    if (equalPressed){
      setExpression(answer.toString() + operation);
      setAnswer(operation);
      setEqualPressed(false);
    } else if (answer === "+" || answer === "/" || answer === "*" || answer === "-") {
      setAnswer(operation);
      setExpression((expression.slice(0,expression.length-1)).concat(operation));
    } else if(answer.toString().charAt(0) === "-") {
      setAnswer(operation);
      setExpression(expression.concat("(").concat(answer).concat(")").concat(operation));
    } else if(answer.toString().charAt(answer.length-1) === ".") {
      setAnswer(operation);
      setExpression(expression.concat(answer.slice(0,answer.length-1)).concat(operation));
    } else {
      setAnswer(operation);
      setExpression(expression.concat(answer).concat(operation));
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
