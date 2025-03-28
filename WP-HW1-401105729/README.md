# راهنمای پروژه: محاسبات محیط زیستی

## معرفی پروژه

این پروژه یک وب‌سایت محاسبات محیط زیستی است که شامل سه بخش اصلی است:

1. **شاخص کیفیت هوا (AQI)**: بر اساس ورودی‌های مربوط به آلاینده‌های مختلف، مقدار AQI محاسبه می‌شود.
2. **میزان انتشار کربن خودروها**: محاسبه میزان CO₂ منتشر شده توسط خودرو بر اساس مصرف سوخت، ضریب انتشار و مسافت طی شده.
3. **جذب CO₂ توسط فضای سبز**: محاسبه میزان CO₂ جذب شده توسط درختان با در نظر گرفتن تعداد درختان و مساحت تحت پوشش.

## فرمول‌های ریاضی

### 1. شاخص کیفیت هوا (AQI)

$$
AQI = (CO \times 0.3) + (NO_2 \times 0.25) + (SO_2 \times 0.2) + (PM_{2.5} \times 0.15) + (PM_{10} \times 0.1)
$$

که به صورت زیر پیاده سازی شده است:
```html
<formula evaluator="(CO*0.3)+(NO2*0.25)+(SO2*0.2)+(PM2_5*0.15)+(PM10*0.1)"></formula>
<div class="aqi-description"></div>
```

### 2. میزان انتشار کربن خودروها

$$
CO₂ = \frac{fuelConsumption \times emissionFactor \times distance}{efficiency}
$$

که به صورت زیر پیاده سازی شده است:
```html
<formula evaluator="(fuelConsumption*emissionFactor*distance)/efficiency"></formula>
<div class="unit">گرم CO₂</div>
```
### 3. جذب CO₂ توسط فضای سبز

$$
CO₂_{absorbed} = (treeCount \times absorptionRate \times areaCovered) - pollutionGenerated
$$


که به صورت زیر پیاده سازی شده است:
```html
<formula evaluator="(treeCount*absorptionRate*areaCovered)-pollutionGenerated"></formula>
<div class="unit">کیلوگرم CO₂ در سال</div>
```
## ورودی‌ها

### 1. ورودی‌های مربوط به AQI

```html
<label for="CO">مونوکسید کربن (ppm)</label>
<input type="number" id="CO" value="5">
            
<label for="NO2">دی‌اکسید نیتروژن (ppm)</label>
<input type="number" id="NO2" value="10">
            
<label for="SO2">دی‌اکسید گوگرد (ppm)</label>
<input type="number" id="SO2" value="8">
            
<label for="PM2_5">ذرات معلق ریز (µg/m³)</label>
<input type="number" id="PM2_5" value="20">
            
<label for="PM10">ذرات معلق درشت (µg/m³)</label>
<input type="number" id="PM10" value="30">
```


### 2. ورودی‌های میزان انتشار کربن خودروها

```html
<label for="fuelConsumption">مصرف سوخت (لیتر/کیلومتر)</label>
<input type="number" id="fuelConsumption" value="0.08" step="0.01">
            
<label for="emissionFactor">ضریب انتشار CO₂ (گرم/لیتر)</label>
<input type="number" id="emissionFactor" value="2392">
            
<label for="distance">مسافت (کیلومتر)</label>
<input type="number" id="distance" value="100">
            
<label for="efficiency">کارایی موتور (0.1 تا 1)</label>
<input type="number" id="efficiency" value="0.85" step="0.01" min="0.1" max="1">
```

### 3. ورودی‌های جذب CO₂ توسط فضای سبز

```html
<label for="treeCount">تعداد درختان</label>
<input type="number" id="treeCount" value="10">
            
<label for="absorptionRate">نرخ جذب (کیلوگرم/درخت/سال)</label>
<input type="number" id="absorptionRate" value="10">
            
<label for="areaCovered">مساحت (مترمربع)</label>
<input type="number" id="areaCovered" value="10">
            
<label for="pollutionGenerated">آلودگی تولیدی (کیلوگرم/سال)</label>
<input type="number" id="pollutionGenerated" value="500">
```

## بررسی کد JavaScrip

### 1. محاسبه AQI

```js
initialize() {
...
}
```
تابع `initialize()` تمامی فیلدهای ورودی را پیدا کرده و جهت آن‌ها را چپ به راست و متن را از چپ تراز می‌کند. سپس برای هر فرمول در صفحه، یک `<div>` با کلاس `result` و مقدار اولیه `0` اضافه می‌کند تا نتیجه محاسبات در آن نمایش داده شود. در ادامه، برای هر ورودی یک رویداد `input` تنظیم می‌کند که هنگام تغییر مقدار، تابع `validateInput()` را اجرا کرده، همه فرمول‌ها را دوباره محاسبه کرده و توضیحات مربوطه را به‌روز می‌کند. در نهایت، هنگام مقداردهی اولیه، تمامی فرمول‌ها محاسبه و توضیحات آن‌ها بروزرسانی می‌شود.

### 2. محاسبه میزان انتشار کربن خودروها

```js
function calculateCO2Emission(fuelConsumption, emissionFactor, distance, efficiency) {
    return (fuelConsumption * emissionFactor * distance) / efficiency;
}
```

### 3. محاسبه جذب CO₂ توسط فضای سبز

```js
function calculateCO2Absorption(treeCount, absorptionRate, areaCovered, pollutionGenerated) {
    return (treeCount * absorptionRate * areaCovered) - pollutionGenerated;
}
```

## بررسی مدیریت خطاها و ورودی‌های نامعتبر

```js
function validateInput(input) {
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

## نتیجه‌گیری

این پروژه با استفاده از HTML، CSS و JavaScript توسعه داده شده است تا محاسبات محیط زیستی را به صورت پویا انجام دهد. فرمول‌ها به درستی پیاده‌سازی شده‌اند و مدیریت خطاها نیز در نظر گرفته شده است.

