let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
const list = document.getElementById("list");
const totalEl = document.getElementById("total");

function render() {
  list.innerHTML = "";
  let total = 0;
  const rate = Number(document.getElementById("rate").value);

  expenses.forEach(e => {
    const twd = (e.krw * rate).toFixed(2);
    total += Number(twd);

    list.innerHTML += `
      <tr>
        <td>${e.item}</td>
        <td>${e.krw}</td>
        <td>${twd}</td>
      </tr>
    `;
  });

  totalEl.innerText = total.toFixed(2);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense() {
  const item = document.getElementById("item").value;
  const category = document.getElementById("category").value;
  const krw = Number(document.getElementById("krw").value);

  if (!item || krw <= 0) {
    alert("請輸入正確資料");
    return;
  }

  expenses.push({ item, category, krw });
  render();

  document.getElementById("item").value = "";
  document.getElementById("krw").value = "";
}

render();
