let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const list = document.getElementById("list");
const totalEl = document.getElementById("total");
const summaryEl = document.getElementById("summary");

function render() {
  list.innerHTML = "";
  summaryEl.innerHTML = "";

  let total = 0;
  const rate = Number(document.getElementById("rate").value);

  const categoryTotal = {
    餐飲: 0,
    交通: 0,
    購物: 0,
    其他: 0
  };

  expenses.forEach((e, index) => {
    const twd = e.currency === "KRW"
      ? e.amount * rate
      : e.amount;

    total += twd;
    categoryTotal[e.category] += twd;

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${e.item}</td>
      <td>${e.currency} ${e.amount}</td>
      <td>${twd.toFixed(2)}</td>
      <td>
        <button class="delete-btn" data-index="${index}">🗑️</button>
      </td>
    `;

    list.appendChild(tr);
  });

  totalEl.innerText = total.toFixed(2);

  for (const cat in categoryTotal) {
    summaryEl.innerHTML += `<div>${cat}：${categoryTotal[cat].toFixed(2)} TWD</div>`;
  }

  // ⭐ 關鍵：這裡才綁事件
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.currentTarget.dataset.index;
      expenses
