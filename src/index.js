function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  // write your solution here
  const str = expr.replace(/\s/g, '');

  checkBracketsInExpr([...str]);
  checkExprDivByZero([...str]);
  const arr = checkArray([...str]);
  const result = bracketsExpresCalculate(arr);

  return result;
}

function checkExprDivByZero(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == '/' && arr[i + 1] == 0) {
      throw new Error('TypeError: Division by zero.');
    }
  }
}


function checkBracketsInExpr(arr) {
  const leftBracket = arr.filter(a => a === '(').length;
  const rightBracket = arr.filter(a => a === ')').length;

  if (leftBracket !== rightBracket) {
    throw new Error('ExpressionError: Brackets must be paired');
  }
}


function checkArray(arr) {
  let str = '';
  arr.forEach(el => {
    if (/\d/.test(el)) {
      str += el;
    }
    if (/[\+\-\*\/\()]/.test(el)) {
      str += ' ';
      str += el;
      str += ' ';
    }
  });

  return str.split(' ').map(el => el.match(/\d/g) ? el = +el : el).filter(el => el !== '');
}

function calculate(prev, oper, next) {
  if (oper === '+') {
    return prev + next;
  } else if (oper === '-') {
    return prev - next;
  } else if (oper === '*') {
    return prev * next;
  } else if (oper === '/') {
    return prev / next;
  }
}

function expreCalculate(arr) {
  let prev = arr[0],
    next, operator = '';
  for (let i = 1; i < arr.length; i++) {
    if (/[\-\+]/.test(arr[i]) && isNaN(arr[i])) {
      if (operator == '') {
        operator = arr[i];
        next = arr[i + 1];
      } else if (operator != '') {
        prev = calculate(prev, operator, next);
        operator = arr[i];
        next = arr[i + 1];
      }
    }

    if (/[\*\/]/.test(arr[i])) {
      if (operator == '') {
        prev = calculate(prev, arr[i], arr[i + 1]);
      } else {
        next = calculate(next, arr[i], arr[i + 1]);
      }
    }
  }
  if (operator !== '') {
    prev = calculate(prev, operator, next);
  }

  return prev;
}


function bracketsExpresCalculate(arr) {
  arr.push(')');
  arr.unshift('(');
  let array = [];
  for (let i = 0; arr.length > 1; i++) {
    if (arr[i] === ')') {
      let j = i - 1;
      while (arr[j] !== '(') {
        j--;
      }
      array = arr.splice(j + 1, i - j - 1);
      let num = expreCalculate(array);
      arr.splice(j, 2, num);
      i = 1;
    }
  }
  return Number(arr);
}




module.exports = {
  expressionCalculator
}
