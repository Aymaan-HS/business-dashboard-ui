let entries = [];

document.getElementById("date").innerText =
new Date().toLocaleDateString();

const ctx = document.getElementById("financeChart").getContext("2d");

const chart = new Chart(ctx,{
    type:"line",
    data:{
        labels:[],
        datasets:[
            {
                label:"Revenue",
                data:[],
                borderWidth:3,
                tension:.4
            },
            {
                label:"Expenses",
                data:[],
                borderWidth:3,
                tension:.4
            }
        ]
    }
});

function addEntry(){
    const revenue = Number(document.getElementById("revenueInput").value);
    const expense = Number(document.getElementById("expenseInput").value);

    if(revenue === 0 && expense === 0) return;

    entries.push({ revenue, expense });

    updateDashboard();
}

function deleteEntry(index){
    entries.splice(index,1);
    updateDashboard();
}

function updateDashboard(){

    let totalRevenue = entries.reduce((sum,e)=>sum+e.revenue,0);
    let totalExpenses = entries.reduce((sum,e)=>sum+e.expense,0);
    let netProfit = totalRevenue-totalExpenses;

    document.getElementById("totalRevenue").innerText = `₹${totalRevenue}`;
    document.getElementById("totalExpenses").innerText = `₹${totalExpenses}`;
    document.getElementById("netProfit").innerText = `₹${netProfit}`;

    chart.data.labels = entries.map((_,i)=>`#${i+1}`);
    chart.data.datasets[0].data = entries.map(e=>e.revenue);
    chart.data.datasets[1].data = entries.map(e=>e.expense);
    chart.update();

    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";

    entries.forEach((entry,index)=>{
        const li = document.createElement("li");

        li.innerHTML = `
            ₹${entry.revenue} / ₹${entry.expense}
            <button class="delete-btn" onclick="deleteEntry(${index})">Delete</button>
        `;

        historyList.appendChild(li);
    });
}