let allData = [];

const container = document.getElementById("questionContainer");
const searchBox = document.getElementById("searchBox");
const categoryFilter = document.getElementById("categoryFilter");
const toggleTheme = document.getElementById("toggleTheme");

// Load JSON data
fetch("data.json")
    .then(res => res.json())
    .then(data => {
        allData = data;
        displayData(allData);
    });

// Display function
function displayData(data) {
    container.innerHTML = "";

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        const question = document.createElement("div");
        question.className = "question";
        question.textContent = item.question;

        const answer = document.createElement("div");
        answer.className = "answer";
        answer.innerHTML = `
            <p>${item.answer}</p>
            <code>${item.example}</code>
        `;

        question.onclick = () => {
            answer.style.display =
                answer.style.display === "block" ? "none" : "block";
        };

        card.appendChild(question);
        card.appendChild(answer);
        container.appendChild(card);
    });
}

// Search
searchBox.addEventListener("input", () => {
    filterData();
});

// Category filter
categoryFilter.addEventListener("change", () => {
    filterData();
});

// Filter logic
function filterData() {
    let searchText = searchBox.value.toLowerCase();
    let category = categoryFilter.value;

    let filtered = allData.filter(item => {
        let matchesSearch = item.question.toLowerCase().includes(searchText);
        let matchesCategory = category === "all" || item.category === category;
        return matchesSearch && matchesCategory;
    });

    displayData(filtered);
}

// Dark Mode
toggleTheme.onclick = () => {
    document.body.classList.toggle("dark");
};