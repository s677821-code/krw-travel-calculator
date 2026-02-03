let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const list = document.getElementById("list");
const totalEl = document.getElementById("total");
const summaryEl = document.getElementById("summary");

function getTWD(e, rate) {
  return e.currency === "KRW" ? e.amount * rate : e.amount;
}

function render() {
  list.innerHTML = "";
  summaryEl.innerHTML = "";

  const rate = Number(document.getElementById("rate").value);
  let total = 0;

  const categoryTotal = {
    餐飲: 0,
    交通: 0,
    購物: 0,
    其他: 0
  };

  expenses.forEach((e, index) => {
    const twd = getTWD(e, rate);
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

  Object.keys(categoryTotal).forEach(cat => {
    summaryEl.innerHTML += `
      <div>${cat}：${categoryTotal[cat].toFixed(2)} TWD</div>
    `;
  });

  localStorage.setItem("expenses", JSON.stringify(expenses));
}

/* ⭐ 事件委派：刪除永遠有效 */
list.addEventListener("click", e => {
  if (e.target.classList.contains("delete-btn")) {
    const index = Number(e.target.dataset.index);
    expenses.splice(index, 1);
    render();
  }
});

function addExpense() {
  const item = document.getElementById("item").value.trim();
  const category = document.getElementById("category").value;
  const currency = document.getElementById("currency").value;
  const amount = Number(document.getElementById("krw").value);

  if (!item || amount <= 0) {
    alert("請輸入正確資料");
    return;
  }

  expenses.push({ item, category, currency, amount });
  render();

  document.getElementById("item").value = "";
  document.getElementById("krw").value = "";
}

/* 初始載入 */
render();
