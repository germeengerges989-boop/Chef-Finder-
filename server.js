const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// إعدادات السيرفر لفهم البيانات والملفات
app.use(express.json()); 
app.use(express.static(path.join(__dirname))); 

// 1. API لجلب بيانات الشيفات
app.get('/api/chefs', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync('chefs.json', 'utf8'));
        res.json(data);
    } catch (err) {
        res.status(500).send("خطأ في قراءة ملف الشيفات");
    }
});

// 2. API لاستقبال وحفظ الحجوزات مع ميزة منع التكرار
app.post('/api/bookings', (req, res) => {
    const newBooking = req.body; 
    let bookings = [];
    
    // قراءة الحجوزات الحالية من الملف
    if (fs.existsSync('bookings.json')) {
        const fileData = fs.readFileSync('bookings.json', 'utf8');
        bookings = fileData ? JSON.parse(fileData) : [];
    }
    
    // التحقق: هل الشيف محجوز فعلياً في نفس التاريخ؟
    const isBusy = bookings.find(b => b.chefId === newBooking.chefId && b.date === newBooking.date);

    if (isBusy) {
        // إرسال رد بالرفض إذا كان الموعد مشغولاً
        return res.status(400).json({ 
            success: false, 
            message: "عذراً، هذا الشيف محجوز بالفعل في هذا التاريخ. من فضلك اختر موعداً آخر." 
        });
    }
    
    // إذا كان الموعد متاحاً، يتم إضافة الحجز الجديد
    bookings.push(newBooking);
    fs.writeFileSync('bookings.json', JSON.stringify(bookings, null, 2));
    
    res.json({ 
        success: true, 
        message: "تم تسجيل الحجز بنجاح في النظام!" 
    });
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`http://localhost:${PORT}`);
    console.log(`====================================================`);
});