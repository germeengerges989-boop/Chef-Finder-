// قاعدة بيانات الـ 18 شيف كاملة
const chefsData = {
    // 1. المطبخ العربي
    "C-001": { name: "يوسف محمد", address: "القاهرة", experience: "12 سنه", details: "  أصناف عربيه أكلات خليجيه " },
    "C-002": { name: "أحمد علي", address: "الجيزة", experience: "15 سنه", details: "  أصناف عربيه مقبلات و مشويات  " },
    "C-003": { name: "خالد حسين", address: "اسكندريه سموحه", experience: "10 سنين", details: " أصناف عربيه مصريه  " },

    // 2. المطبخ الغربي
    "C-004": { name: "شيف رنا عادل", address: "المعادي", experience: "10 سنين", details: "وجبات امريكيه " },
    "C-005": { name: "شيف مريم خالد ", address: "الدقي", experience: "8 سنين", details: "أطباق إسبانية وستيك" },
    "C-006": { name: "شيف وليد نبيل  ", address: "الإسكندرية كفر عبده", experience: "5 سنين", details: "تاكو وبريتو مكسيكي" },

    // 3. المطبخ الآسيوي
    "C-007": { name: "شيف محمود السيد", address: "القاهره", experience: "6 سنين", details: "المطبخ الصيني  " },
    "C-008": { name: "شيف عادل كامل", address: "الرحاب", experience: "13 سنين", details: "  مطبخ ياباني  " },
    "C-009": { name: "شيف هدير عماد", address: "حلوان ", experience: "15 سنه", details: "كوري وتايلاندي" },

    // 4. حلويات عربية
    "C-010": { name: "شيف عمار رامي", address: "6 اكتوبر", experience: "4 سنين ", details: "التورتات والكيكات الشرقية" },
    "C-011": { name: "شيف حسن ممدوح", address: "محرم بك", experience: "8 سنين", details: "حلويات شرقيه صحيه" },
    "C-012": { name: "شيف نور علي", address: "القاهرة", experience: "6 سنين", details: "حلويات شرقية" },

    // 5. حلويات غربية
    "C-013": { name: "شيف مصطفي بدر", address: "الزمالك", experience: "3 سنين", details: " حلويات فرنسيه " },
    "C-014": { name: "شيف وليد نبيل", address: "الجيزة ", experience: "7 سنين", details: "حلويات إيطاليه " },
    "C-015": { name: "شيف يوسف جمال", address: "اسكندريه ", experience: "15 سنة", details: "حلويات الامريكيه" },

    // 6. مطبخ نباتي
    "C-016": { name: "شيف امينه توفيق", address: "المعادي ", experience: "10 سنين", details: "أكل كيتو ونباتي" },
    "C-017": { name: "شيف شريف حمدي", address: "الجيزة ", experience: "15 سنة", details: "أطباق الـ رو فود" },
    "C-018": { name: "شيف هاله فؤاد ", address: "الإسكندرية", experience: "3 سنين", details: "المخبوزات والحلويات النباتية " }
};

// وظيفة عرض التفاصيل والحجز
function showChefDetails(id) {
    const chef = chefsData[id];
    if (!chef) {
        alert("بيانات هذا الشيف غير مسجلة حالياً");
        return;
    }

    const modal = document.getElementById('chefModal');
    const body = document.getElementById('modalBody');

    body.innerHTML = `
        <h2 style="color:#e67e22">${chef.name}</h2>
        <p><strong>العنوان:</strong> ${chef.address}</p>
        <p><strong>الخبرة:</strong> ${chef.experience}</p>
        <p><strong>التخصص:</strong> ${chef.details}</p>
        <hr>
        <h3>احجز موعدك الآن</h3>
        <input type="date" id="bookingDate" style="padding:10px; width:80%; margin:10px 0; border:1px solid #ddd; border-radius:5px;">
        <br>
        <button class="view-btn" onclick="checkAvailability('${id}')" style="background:#e67e22; color:white; padding:10px 20px; border:none; border-radius:5px; cursor:pointer;">تحقق من الإتاحة</button>
        <div id="statusResult" style="margin-top:15px; font-weight:bold;"></div>
    `;
    modal.style.display = "block";
}

// وظيفة التحقق من الوقت
function checkAvailability(id) {
    const dateInput = document.getElementById('bookingDate').value;
    const result = document.getElementById('statusResult');

    if (!dateInput) {
        alert("من فضلك اختر التاريخ أولاً");
        return;
    }

    const day = new Date(dateInput).getDate();
    if (day % 2 === 0) { // متاح في الأيام الزوجية كمثال
        result.innerHTML = `
            <span style="color:green">✅ متاح للحجز!</span><br>
            <button onclick="confirmBooking('${id}', '${dateInput}')" style="background:#27ae60; color:white; padding:10px 20px; border:none; border-radius:5px; margin-top:10px; cursor:pointer;">تأكيد وتجهيز الفاتورة</button>
        `;
    } else {
        result.innerHTML = "<span style='color:red'>❌ عذراً، الشيف مشغول في هذا اليوم</span>";
    }
}

// وظيفة تأكيد الحجز وحفظ البيانات للفاتورة
function confirmBooking(id, date) {
    localStorage.setItem('bookedChef', chefsData[id].name);
    localStorage.setItem('bookedDate', date);
    localStorage.setItem('totalPrice', '0'); // السعر صفر
    localStorage.setItem('paymentStatus', 'مجاني (عرض مشروع التخرج)'); 
    
    window.location.href = "invoice.html";
}

// وظيفة إغلاق النافذة
function closeModal() {
    document.getElementById('chefModal').style.display = "none";
}

// وظيفة البحث
function performSearch() {
    const input = document.getElementById('searchInput').value.trim();
    if (!input) return;

    for (let id in chefsData) {
        if (id === input || chefsData[id].name.includes(input)) {
            showChefDetails(id);
            return;
        }
    }
    alert("لم يتم العثور على شيف بهذا الاسم أو الكود");
}

// إغلاق النافذة عند الضغط خارجها
window.onclick = function(event) {
    const modal = document.getElementById('chefModal');
    if (event.target == modal) closeModal();
}