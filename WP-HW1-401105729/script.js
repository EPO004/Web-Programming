document.addEventListener('DOMContentLoaded', function() {
    class EnvironmentalCalculator {
        constructor() {
            this.formulaElements = document.querySelectorAll('formula');
            this.inputElements = document.querySelectorAll('input');
            this.initialize();
        }

        initialize() {
            this.formulaElements.forEach(formula => {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'result';
                resultDiv.textContent = '0';
                formula.appendChild(resultDiv);
            });

            this.inputElements.forEach(input => {
                input.addEventListener('input', () => {
                    this.evaluateAllFormulas();
                    this.updateDescriptions();
                });
            });

            this.evaluateAllFormulas();
            this.updateDescriptions();
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
                
                variables.forEach(variable => {
                    const element = document.getElementById(variable);
                    const value = parseFloat(element.value) || 0;
                    context[variable] = value;
                });

                const result = new Function(...Object.keys(context), `return ${expression}`)(...Object.values(context));
                
                if (!isNaN(result)) {
                    resultElement.textContent = result.toFixed(2);
                } else {
                    resultElement.textContent = 'خطا در محاسبه';
                }
            } catch (error) {
                resultElement.textContent = 'خطا در فرمول';
                console.error('Error:', error);
            }
        }

        updateDescriptions() {
            const aqiValue = parseFloat(document.querySelector('[evaluator*="CO*0.3"] .result').textContent) || 0;
            const aqiDesc = document.querySelector('.aqi-description');
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