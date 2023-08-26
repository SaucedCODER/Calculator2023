class Calc{
    constructor(curr_el_output, prev_el_output) {
        this.curr_el_output = curr_el_output
        this.prev_el_output = prev_el_output
        this.operator_el_output = prev_el_output.nextElementSibling
        this.clear()
    }
    clear(){
        this.currnum =''
        this.prevnum = ''
        this.operator = ''
    }
    delete_digits(){
        this.currnum = this.currnum.toString().slice(0, -1);
    }
    append_digits(digit){
        if(digit == '.' && this.currnum.toString().includes('.')) return
        this.currnum = this.currnum.toString() + digit.toString()
    }
    whatoperator(operator){
        if(this.prevnum !== '' && this.currnum === '') return this.operator = operator
        if(isNaN(this.prevnum) || this.currnum === '' ) return 
        if( this.prevnum !== '' ) {
            this.calculate()
        }
        this.prevnum = parseFloat(this.currnum)
        this.currnum = ''
        this.operator = operator
        this.update_output()
    }
    calculate(){
   if(isNaN(this.prevnum) || isNaN(this.currnum) ) return
  
   if (this.operator == '-')
   this.currnum = parseFloat(this.prevnum) - parseFloat(this.currnum) 
   if (this.operator == '+')
    this.currnum = parseFloat(this.prevnum) + parseFloat(this.currnum) 
   if (this.operator == '÷')
    this.currnum = parseFloat(this.prevnum) / parseFloat(this.currnum) 
   if (this.operator == '*')
    this.currnum = parseFloat(this.prevnum) * parseFloat(this.currnum) 
    this.prevnum = ''
    this.operator = ''
    }

    display_Numbers(digits){
        if( digits === '' || isNaN(digits)) return ''
            const separatevalue_arr = digits.toString().split('.')
            const wholenumpart = separatevalue_arr[0]
            const decpart = separatevalue_arr.length > 1 ? '.'+ separatevalue_arr[1]: ''
          return `${Number(wholenumpart).toLocaleString('en')}${decpart}`
       
    }
    update_output(){
        
        this.curr_el_output.innerText = this.display_Numbers(this.currnum)
        this.prev_el_output.innerText = this.display_Numbers(this.prevnum)
        this.operator_el_output.innerText = this.operator
    }

}

const btn_numbers = document.querySelectorAll('[data-num]')
const btn_operators = document.querySelectorAll('[data-operator]')
const btn_clear = document.querySelector('[data-clear]')
const btn_del = document.querySelector('[data-del]')
const equal = document.querySelector('[data-equals]')
const prev_el_output = document.querySelector('[data-prev-el-output]')
const curr_el_output = document.querySelector('[data-curr-el-output]')

const calc = new Calc(curr_el_output,prev_el_output)

btn_numbers.forEach(e=>{
    e.addEventListener('click',()=>{
        calc.append_digits(e.innerText)
        calc.update_output()
    })
})
btn_del.addEventListener('click',()=>{
    calc.delete_digits()
    calc.update_output()
})
btn_clear.addEventListener('click',()=>{
    calc.clear()
    calc.update_output()
})
btn_operators.forEach(e=>{
    e.addEventListener('click',()=>{
       calc.whatoperator(e.innerText)
       calc.update_output()
    })
})
equal.addEventListener('click',()=>{
    calc.calculate()
    calc.update_output()
})
    
  

