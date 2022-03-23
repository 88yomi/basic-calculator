import { useState } from 'react';

import './App.scss';

import Button from './components/Button';

function App() {
  const digits = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  const signs = ["+", "-", "/", "*"];
  const ids = {
    7: 'seven',
    8: 'eight',
    9: 'nine',
    4: 'four',
    5: 'five',
    6: 'six',
    1: 'one',
    2: 'two',
    3: 'three',
    0: 'zero',
    '/': 'divide',
    '*': 'multiply',
    '-': 'subtract',
    '+': 'add'
  }

  const [lastPressed, setLastPressed] = useState(undefined);
  const [calc, setCalc] = useState('0');

  // 5 - 2 = / 2 =
  const handleClick = e => {
    const { innerText } = e.target;

    switch (innerText) {
      case 'AC':
        setCalc('0');
        break;

      case 'C':
        // console.log(calc.split('')).pop().pop();
        break;

      case '=':
        const evaluated = eval(calc);
        setCalc(evaluated);
        break;

      case '.':
        const chopped = calc.split(/[\+\-\*\/]/);
        const last = chopped.slice(-1)[0];

        if (!last.includes('.')) {
          setCalc(calc => calc + '.');
        }
        break;

      default:
        let e = undefined;
        // check for other sign
        if (signs.includes(innerText)) {
          if (signs.includes(lastPressed) && innerText !== '-') {
            const lastNumberIdx = calc.split('').reverse()
              .findIndex(char => char !== ' ' && digits.includes(+char));
            e = calc.slice(0, calc.length - lastNumberIdx) + ` ${innerText} `;
          }
          else {
            e = `${calc} ${innerText} `;
          }
        }
        else {
          e = (calc === '0') ? innerText : (calc + innerText);
        }

        setCalc(e);
    }
    setLastPressed(innerText);
  }

  return (
    <>
      <h1>Calculator</h1>
      <main>
        <div id="calculator" className="calculator">
          <div id="display" className="calculator__screen">
            {calc}
          </div>
          <div className="calculator__buttons">
            <div className="calculator__buttons-numbers">
              <div />
              <Button
                handleClick={handleClick}
                id='clear'
                content="AC"
              />
              <Button
                handleClick={handleClick}
                id='clear-disabled'
                content="C"
                disabled
              />
              {digits.map(digit =>
                <Button
                  key={digit}
                  handleClick={handleClick}
                  id={ids[digit]}
                  content={digit}
                />)
              }
              <Button
                handleClick={handleClick}
                id="decimal"
                content="."
              />
            </div>

            <div className="calculator__buttons-signs">
              {signs.map(sign =>
                <Button
                  key={sign}
                  handleClick={handleClick}
                  id={ids[sign]}
                  content={sign}
                />)
              }
              <Button
                handleClick={handleClick}
                id="equals"
                content="="
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
