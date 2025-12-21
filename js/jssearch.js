const chefs = [
    { name: "يوسف محمد", type: "عربي", link: "chef.html" },
    { name: "أحمد علي", type: "عربي", link: "chef.html" },
    { name: "خالد حسين", type: "عربي", link: "chef.html" },
    { name: "شيف ربنا عادل", type: "غربي", link: "chef.html" },
    { name: "مريم خالد", type: "غربي", link: "chef.html" },
    { name: "محمود السيد", type: "آسيوي", link: "chef.html" },
    { name: "هدير عماد", type: "آسيوي", link: "chef.html" },
    { name: "أمينة توفيق", type: "نباتي", link: "chef.html" }
];

const input = document.getElementById("searchInput");
const results = document.getElementById("results");

input.addEventListener("keyup", () => {
    const value = input.value.toLowerCase();
    results.innerHTML = "";

    chefs.filter(c =>
        c.name.toLowerCase().includes(value) ||
        c.type.toLowerCase().includes(value)
    ).forEach(c => {
        results.innerHTML += `
            <div class="chef-card">
                <h4>${c.name}</h4>
                <p>${c.type}</p>
                <a href="${c.link}" class="btn">عرض التفاصيل</a>
            </div>
        `;
    });
});

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.onclick = () => {
        const type = btn.dataset.type.toLowerCase();
        results.innerHTML = "";

        chefs.filter(c =>
            c.type.toLowerCase().includes(type)
        ).forEach(c => {
            results.innerHTML += `
                <div class="chef-card">
                    <h4>${c.name}</h4>
                    <p>${c.type}</p>
                    <a href="${c.link}" class="btn">عرض التفاصيل</a>
                </div>
            `;
        });
    };
});
