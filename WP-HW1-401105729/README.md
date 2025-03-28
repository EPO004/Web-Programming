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

### 2. میزان انتشار کربن خودروها

$$
CO₂ = \frac{fuelConsumption \times emissionFactor \times distance}{efficiency}
$$

### 3. جذب CO₂ توسط فضای سبز

$$
CO₂_{absorbed} = (treeCount \times absorptionRate \times areaCovered) - pollutionGenerated
$$

## ورودی‌ها و بررسی آن‌ها در JavaScript

### 1. ورودی‌های مربوط به AQI

```html
<label for="CO">مونوکسید کربن (ppm)</label>
<input type="number" id="CO" value="5">

<label for="NO2">دی‌اکسید نیتروژن (ppm)</label>
<input type="number" id="NO2" value="10">

<label for="SO2">دی‌اکسید گوگرد (ppm)</label>
<input type="number" id="SO2" value="8">
```

این بخش مقدار مونوکسید کربن، دی‌اکسید نیتروژن و دی‌اکسید گوگرد را از کاربر دریافت می‌کند.

### 2. ورودی‌های میزان انتشار کربن خودروها

```html
<label for="fuel">مصرف سوخت (لیتر در هر 100 کیلومتر)</label>
<input type="number" id="fuel" value="8">

<label for="distance">مسافت طی شده (کیلومتر)</label>
<input type="number" id="distance" value="150">
```

### 3. ورودی‌های جذب CO₂ توسط فضای سبز

```html
<label for="treeCount">تعداد درختان</label>
<input type="number" id="treeCount" value="50">

<label for="area">مساحت تحت پوشش (متر مربع)</label>
<input type="number" id="area" value="200">
```

## بررسی کد JavaScript

### 1. محاسبه AQI

```js
function calculateAQI(CO, NO2, SO2, PM25, PM10) {
    return (CO * 0.3) + (NO2 * 0.25) + (SO2 * 0.2) + (PM25 * 0.15) + (PM10 * 0.1);
}
```

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

