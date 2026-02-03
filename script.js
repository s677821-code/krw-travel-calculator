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
    let twd = e.currency === "KRW"
      ? e.amount * rate
      : e.amount;

    total += twd;
    categoryTotal[e.category] += twd;

    list.innerHTML += `
      <tr>
        <td>${e.item}</td>
        <td>${e.currency} ${e.amount}</td>
        <td>${twd.toFixed(2)}</td>
        <td>
          <button onclick="removeExpense(${index})">🗑️</button>
        </td>
      </tr>
    `;
  });

  totalEl.innerText = total.toFixed(2);

  for (const cat in categoryTotal) {
    summaryEl.innerHTML += `
      <div>${cat}：${categoryTotal[cat].toFixed(2)} TWD</div>
    `;
  }

  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense() {
  const item = document.getElementById("item").value;
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

function removeExpense(index) {
  expenses.splice(index, 1);
  render();
}

render();
