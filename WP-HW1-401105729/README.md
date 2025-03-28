# محاسبات محیط زیستی

## معرفی پروژه
این پروژه یک وب‌سایت محاسبات محیط زیستی است که شامل سه بخش اصلی است:
1. **شاخص کیفیت هوا (AQI)**: بر اساس ورودی‌های مربوط به آلاینده‌های مختلف، مقدار AQI محاسبه می‌شود.
2. **میزان انتشار کربن خودروها**: محاسبه میزان CO₂ منتشر شده توسط خودرو بر اساس مصرف سوخت، ضریب انتشار و مسافت طی شده.
3. **جذب CO₂ توسط فضای سبز**: محاسبه میزان CO₂ جذب شده توسط درختان با در نظر گرفتن تعداد درختان و مساحت تحت پوشش.

## فرمول‌های ریاضی

### 1. شاخص کیفیت هوا (AQI)
\[
AQI = (CO \times 0.3) + (NO_2 \times 0.25) + (SO_2 \times 0.2) + (PM_{2.5} \times 0.15) + (PM_{10} \times 0.1)
\]

### 2. میزان انتشار کربن خودروها
\[
CO₂ = \frac{fuelConsumption \times emissionFactor \times distance}{efficiency}
\]

### 3. جذب CO₂ توسط فضای سبز
\[
CO₂_{absorbed} = (treeCount \times absorptionRate \times areaCovered) - pollutionGenerated
\]

## بررسی بخش HTML

### ورودی‌های مربوط به AQI
```html
<label for="CO">مونوکسید کربن (ppm)</label>
<input type="number" id="CO" value="5">

<label for="NO2">دی‌اکسید نیتروژن (ppm)</label>
<input type="number" id="NO2" value="10">

<label for="SO2">دی‌اکسید گوگرد (ppm)</label>
<input type="number" id="SO2" value="8">
```
این بخش مقدار مونوکسید کربن، دی‌اکسید نیتروژن و دی‌اکسید گوگرد را از کاربر دریافت می‌کند.

## بررسی کد JavaScript

### بررسی مقداردهی اولیه و تنظیم رویدادها
```js
document.addEventListener('DOMContentLoaded', function() {
    class EnvironmentalCalculator {
        constructor() {
            this.formulaElements = document.querySelectorAll('formula');
            this.inputElements = document.querySelectorAll('input');
            this.initialize();
        }
```
این کلاس برای مدیریت محاسبات مختلف در صفحه طراحی شده است و مقادیر اولیه را مقداردهی می‌کند.

### بررسی محاسبه فرمول AQI
```js
this.formulaElements.forEach(formula => {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'result';
    resultDiv.textContent = '0';
    formula.appendChild(resultDiv);
});
```
در این بخش، برای هر فرمول یک خروجی مقداردهی می‌شود.

### بررسی مدیریت خطاها و ورودی‌های نامعتبر
```js
validateInput(input) {
    input.value = input.value.replace(/[^0-9.]/g, '');
    
    if ((input.value.match(/\./g) || []).length > 1) {
        input.value = input.value.substring(0, input.value.lastIndexOf('.'));
    }

    if (parseFloat(input.value) < 0) {
        input.style.borderColor = '#e74c3c';
        throw new Error('مقادیر منفی مجاز نیستند');
    }
}
```
در این بخش، اطمینان حاصل می‌شود که فقط اعداد مثبت و مقادیر معتبر در ورودی قرار داده شوند.

## نتیجه‌گیری
این پروژه با استفاده از HTML، CSS و JavaScript توسعه داده شده است تا محاسبات محیط زیستی را به صورت پویا انجام دهد. فرمول‌ها به درستی پیاده‌سازی شده‌اند و مدیریت خطاها نیز در نظر گرفته شده است.

