const OPERATORS = '/x+-';

const Buttons = (props) => {
  return (
    <div id='button-wrapper'>
      <button onClick={props.acPress} className='operation-button wide-button' id='clear'>AC</button>
      <button value='/' onClick={props.operationPress} className='operation-button' id='divide'>/</button>
      <button value='x' onClick={props.operationPress} className='operation-button' id='multiply'>x</button>
      
      <button value='7' onClick={props.numberPress} className='number-button' id='seven'>7</button>
      <button value='8' onClick={props.numberPress} className='number-button' id='eight'>8</button>
      <button value='9' onClick={props.numberPress} className='number-button' id='nine'>9</button>
      <button value='+' onClick={props.operationPress} className='operation-button' id='add'>+</button>
      
      <button value='4' onClick={props.numberPress} className='number-button' id='four'>4</button>
      <button value='5' onClick={props.numberPress} className='number-button' id='five'>5</button>
      <button value='6' onClick={props.numberPress} className='number-button' id='six'>6</button>
      <button value='-' onClick={props.operationPress} className='operation-button' id='subtract'>-</button>
      
      <button value='1' onClick={props.numberPress} className='number-button' id='one'>1</button>
      <button value='2' onClick={props.numberPress} className='number-button' id='two'>2</button>
      <button value='3' onClick={props.numberPress} className='number-button' id='three'>3</button>
      <button value='=' onClick={props.evaluatePress} className='operation-button tall-button' id='equals'>=</button>

      <button value='0' onClick={props.numberPress} className='number-button wide-button' id='zero'>0</button>
      <button value='.' onClick={props.decimalPress} className='number-button' id='decimal'>.</button>
      
    </div>
  )
}

const Display = (props) => {
  return (
  <div id='display-current'>
      {props.displayText}
  </div>
  )
}

const Formula = (props) => {
  return (
  <div id='display-formula'>
    {props.formulaText}
  </div>
  )
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formulaText: '',
      displayText: '0',
      currentVal: '',
      evaluated: false
    };
    this.numberPress = this.numberPress.bind(this);
    this.decimalPress = this.decimalPress.bind(this);
    this.acPress = this.acPress.bind(this);
    this.operationPress = this.operationPress.bind(this);
    this.evaluatePress = this.evaluatePress.bind(this);
  }
  
  numberPress(event) {
    // default state is keep formula, replace display, add value to both
    //
    // if evaluated                              '' / 
    // else if leading 0      rem last formula char / 
    // else if digit/deci                           / keep old display
    // then add value to both texts
    
    let formula = this.state.formulaText;
    let displayOld = this.state.displayText;
    let display = '';
    
    if (this.state.evaluated) {
      this.setState({evaluated: false});
      formula = '';
    } else if (displayOld === '0') {
      formula = formula.slice(0, formula.length - 1);
    } else if ((/(\d|\.)/).test(formula.charAt(formula.length-1))) {
      display = displayOld;
    };
    
    this.setState({
      formulaText: formula + event.target.value,
      displayText: display + event.target.value
    });
  }
  
  decimalPress(event) {
    // default state is to add decimal
    // if no decimals yet or evaluated
    //    evaluated :       replace 0. / replace 0.
    //    formula '':           add 0. /     add  .
    //    operator  :           add 0. / replace 0.
    //    else      :           add  . /     add  .
    
    let formula = this.state.formulaText;
    let display = this.state.displayText;
    
    if (!display.includes('.') || this.state.evaluated) {
      if (this.state.evaluated) {
        this.setState({evaluated: false});
        formula = '0';
        display = '0';
      } else if (OPERATORS.includes(display) || formula === '') {
        formula += '0';
        display = '0';
      }
      
      this.setState({
        formulaText: formula + '.',
        displayText: display + '.'
      });
    };
  }
  
  acPress(event) {
    this.setState({
      formulaText:'',
      displayText:'0'
    });
  }
  
  operationPress(event) {
    // default state is to add to formula, replace display
    // eval     :  dis/ ''
    // 0        :  r0 / ''
    // #        :     / ''
    // .        :  rl / ''
    // operator :  rl / ''
    
    // if value is -, allow after operator
    
    let formula = this.state.formulaText;
    
    if (this.state.evaluated) {
      this.setState({evaluated: false});
      formula = this.state.displayText;  
    } else if (this.state.displayText === '0') {
      formula = '0';
    } else if (OPERATORS.includes(this.state.displayText)) {
      if (!(event.target.value === '-') || formula.charAt(formula.length-1) === '-') {
        formula = formula.slice(0, formula.length-1);
      }
    } else if (formula.charAt(formula.length-1) === '.') {
      formula = formula.slice(0, formula.length-1);
    }
    
    this.setState({
      formulaText: formula + event.target.value,
      displayText: event.target.value
    });
  }
  
  evaluatePress(event) {
    if (!this.state.evaluate) {
      let formula = this.state.formulaText;
      if (isNaN(formula.charAt(formula.length-1))) {
        // if last character was not a number, remove last character
        formula = formula.slice(0,this.state.formulaText.length - 1)
      };
      
      formula = formula.replace(/x/g,'*');
      if (formula === '') {formula = '0'};
      let answer = eval(formula).toString();
      
      this.setState({
        evaluated: true,
        displayText: answer,
        formulaText: formula.replace(/\*/g,'x') + '=' + answer
      });
    }
  }
  
  render() {
    return (
     <div id='calculator'>
        <h2>TI-01</h2>
        <div id='solar-panel'>
          <div className='cell'></div>
          <div className='cell'></div>
          <div className='cell'></div>
          <div className='cell'></div>
        </div>
        <div className='line'></div>
        <div id='display'>
          <Formula formulaText={this.state.formulaText}/>
          <Display displayText={this.state.displayText}/>
        </div>
        <Buttons 
          operationPress={this.operationPress}
          numberPress={this.numberPress}
          acPress={this.acPress}
          decimalPress={this.decimalPress}
          evaluatePress={this.evaluatePress}
        />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));