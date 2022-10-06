function add(a,b) {
    return a+b;
};

function substract(a,b) {
    return a-b;
};

function multiply(a,b) {
    return a*b;
};

function divide(a,b) {
    return a/b;
};

function operate(a,b,operator) {
    if (operator=='+') {
        return add(a,b);
    } else if (operator=='-') {
        return substract(a,b);
    } else if (operator=='*') {
        return multiply(a,b);
    } else if (operator=='/') {
        return divide(a,b);
    }
}


buttons=document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseenter',function(e) {
        e.target.classList.add('hover');
    });
    button.addEventListener('mouseout',function(e) {
        e.target.classList.remove('hover');
    });
});

display= document.querySelector('.display');
displayContent= '';
display.textContent= displayContent;

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        if (e.target.textContent!='=') {
            displayContent=displayContent+e.target.textContent;
            display.textContent=displayContent;
        };
    });
});

equals=document.querySelector('.equals');

equals.addEventListener('mousedown', function(){
    (evaluate(displayContent))});

equals.addEventListener('mouseup',calculate)

function evaluate(str) {
    let numbers = '';
    let operators = '';
    for (let i=0;i<=str.length-1;i++) {
        if (isNaN(Number(str[i]))&& str[i]!='.')  {
            numbers+=' ';
            if (str[i]=='×') {
                operators+='*';
            } else if (str[i]=='÷') {
                operators+='/';
            } else {
                operators+=str[i];
            }
        } else {
            numbers+=str[i];
        }
    }
    numbersArray=numbers.split(' ');
    operatorsArray=operators.split('');
    
}


function calculate ()  {
    let result=0;
    let firstMultiply=operatorsArray.indexOf('*');
    let firstDivide=operatorsArray.indexOf('/');
    let firstCalculated=0;
    while (!(firstMultiply==-1 && firstDivide==-1)) {

        if (firstDivide==-1) {
            firstCalculated=firstMultiply;
        } else if (firstMultiply==-1) {
            firstCalculated=firstDivide;
        }else {
            firstCalculated=Math.min(firstDivide,firstMultiply)
        }

        result=operate(Number(numbersArray[firstCalculated]),Number(numbersArray[firstCalculated+1]),operatorsArray[firstCalculated]);
            
        let temporaryNumbersMD = numbersArray;
        numbersArray=[]; 
        for (let i=0;i<=temporaryNumbersMD.length-1;i++) {
            if (i==firstCalculated) {
                numbersArray[i]=result;
            } else if (i<firstCalculated) {
                numbersArray[i]=temporaryNumbersMD[i];
            } else {
                numbersArray[i]=temporaryNumbersMD[i+1];
            }
        }
        operatorsArray[firstCalculated]=' '

        console.log(operatorsArray)

        firstMultiply=operatorsArray.indexOf('*');
        firstDivide=operatorsArray.indexOf('/');

        console.log(firstDivide,firstMultiply)
        console.log(result)
        console.log('numbersArray '+numbersArray)
    }  
    
    for (let k=0;k<=operatorsArray.length-1;k++) {

        

        result=operate(Number(numbersArray[0]),Number(numbersArray[1]),operatorsArray[k]);
        let temporaryNumbers = numbersArray
        numbersArray = [];
        numbersArray[0]=result;

        for (let i=1; i<=temporaryNumbers.length-2;i++) {
            numbersArray[i]=temporaryNumbers[i+1];
        }
        console.log('Numbersarray ' +numbersArray+ ' temp '+temporaryNumbers);

    }
    displayContent=result;
    display.textContent=displayContent;
    return result
}

function cancel() {
    displayContent='';
    display.textContent=displayContent;
}

cancelButton = document.querySelector('.AC');

cancelButton.addEventListener('click',cancel);