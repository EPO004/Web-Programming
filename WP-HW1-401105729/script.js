document.addEventListener('DOMContentLoaded', function() {
    class EnvironmentalCalculator {
        constructor() {
            this.formulaElements = document.querySelectorAll('formula');
            this.inputElements = document.querySelectorAll('input');
            this.initialize();
        }

        initialize() {
            document.querySelectorAll('input').forEach(input => {
                input.style.direction = 'ltr';
                input.style.textAlign = 'left';
            });

            this.formulaElements.forEach(formula => {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'result';
                resultDiv.textContent = '0';
                formula.appendChild(resultDiv);
            });

            this.inputElements.forEach(input => {
                input.addEventListener('input', () => {
                    this.validateInput(input);
                    this.evaluateAllFormulas();
                    this.updateDescriptions();
                });
            });

            this.evaluateAllFormulas();
            this.updateDescriptions();
        }

        validateInput(input) {
            input.value = input.value.replace(/[^0-9.]/g, '');
            
            if ((input.value.match(/\./g) || []).length > 1) {
                input.value = input.value.substring(0, input.value.lastIndexOf('.'));
            }
            
            input.style.direction = 'ltr';
            input.style.textAlign = 'left';
        }

        evaluateAllFormulas() {
            this.formulaElements.forEach(formula => {
                this.evaluateFormula(formula);
            });
        }

        evaluateFormula(formulaElement) {
            const expression = formulaElement.getAttribute('evaluator');
            const resultElement = formulaElement.querySelector('.result');
            
            try {
                const variablePattern = /[a-zA-Z_][a-zA-Z0-9_]*/g;
                const variables = expression.match(variablePattern) || [];
                const context = {};
                let hasEmptyField = false;
                
                variables.forEach(variable => {
                    const element = document.getElementById(variable);
                    const valueStr = element.value.trim();
                    
                    if (valueStr === '' || valueStr === '.') {
                        hasEmptyField = true;
                        element.style.borderColor = '#e74c3c';
                        return;
                    } else {
                        element.style.borderColor = '';
                    }
                    
                    const value = parseFloat(valueStr);
                    
                    if (value < 0) {
                        element.style.borderColor = '#e74c3c';
                        throw new Error('مقادیر منفی مجاز نیستند');
                    }
                    
                    context[variable] = value;
                });

                if (hasEmptyField) {
                    throw new Error('لطفاً تمام فیلدها را پر کنید');
                }

                const result = new Function(...Object.keys(context), `return ${expression}`)(...Object.values(context));
                
                if (!isNaN(result)) {
                    resultElement.textContent = result.toFixed(2);
                    resultElement.style.color = '#2c5e2c';
                    resultElement.style.direction = 'ltr';
                    resultElement.style.textAlign = 'left';
                } else {
                    throw new Error('خطا در محاسبه');
                }
            } catch (error) {
                resultElement.textContent = error.message || 'خطا در فرمول';
                resultElement.style.color = '#e74c3c';
                console.error('Error:', error.message);
            }
        }

        updateDescriptions() {
            const aqiValue = parseFloat(document.querySelector('[evaluator*="CO*0.3"] .result').textContent) || 0;
            const aqiDesc = document.querySelector('.aqi-description');
            
            if (isNaN(aqiValue)) {
                aqiDesc.textContent = 'لطفاً مقادیر معتبر وارد کنید';
                aqiDesc.style.backgroundColor = '#f8fcf8';
                aqiDesc.style.color = '#e74c3c';
                aqiDesc.style.border = '1px solid #e74c3c';
                return;
            }
            
            let aqiText = '';
            let aqiColor = '';
            
            if (aqiValue <= 50) {
                aqiText = 'کیفیت هوا: پاک ✅';
                aqiColor = '#016b11';
            } else if (aqiValue <= 100) {
                aqiText = 'کیفیت هوا: قابل قبول 🟡';
                aqiColor = '#f39c12';
            } else if (aqiValue <= 150) {
                aqiText = 'کیفیت هوا: ناسالم برای گروه‌های حساس 🔶';
                aqiColor = '#e67e22';
            } else if (aqiValue <= 200) {
                aqiText = 'کیفیت هوا: ناسالم ⚠️';
                aqiColor = '#e74c3c';
            } else if (aqiValue <= 300) {
                aqiText = 'کیفیت هوا: بسیار ناسالم ❗';
                aqiColor = '#9b59b6';
            } else {
                aqiText = 'کیفیت هوا: خطرناک ☢️';
                aqiColor = '#c0392b';
            }
            
            aqiDesc.textContent = aqiText;
            aqiDesc.style.backgroundColor = `${aqiColor}20`;
            aqiDesc.style.color = aqiColor;
            aqiDesc.style.border = `1px solid ${aqiColor}`;
        }
    }

    new EnvironmentalCalculator();
});