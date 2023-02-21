const cityupdates=()=>{
    fetch('cities.json')
    .then(Response => Response.json())
    .then(data => {
        let a=document.getElementById("city");
        let country=document.getElementById("states");
        let html=``;
        data.map((e)=>{
            // console.log(e)
            if(e.state_code===country.value)
            html+=`<option value=${e.country_name}>${e.name}</option>`
        })
        a.innerHTML=html;
    });
}
const stateupdate=()=>{
    fetch('states.json')
    .then(Response => Response.json())
    .then(data => {
        let a=document.getElementById("states");
        let country=document.getElementById("country");
        let html=``;
        data.map((e)=>{
            // console.log(e)
            if(e.country_code===country.value)
            html+=`<option value=${e.state_code}>${e.name}</option>`
        })
        a.innerHTML=html;
        cityupdates();
    });
}


fetch('countries.json')
.then(Response => Response.json())
.then(data => {
    let a=document.getElementById("country");
    let html=``;
    data.map((e)=>{
        html+=`<option value=${e.iso2}>${e.name}</option>`
    })
    a.innerHTML=html;
    stateupdate();
    cityupdates();
});
let a=document.getElementById("country");
a.addEventListener('change',stateupdate)

let b=document.getElementById("state");
b.addEventListener('change',cityupdates)

var selectedRow = null

function onFormSubmit() {
    if (validate()) { //if(isValid())
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["empemail"] = document.getElementById("empemail").value;
    formData["gender"] = document.getElementById("gender").value;
    formData["date"] = document.getElementById("date").value;
    formData["hobbies"] = document.getElementById("hobbies").value;
    formData["country"] = document.getElementById("country").value;
    formData["state"] = document.getElementById("state").value;
    formData["city"] = document.getElementById("city").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.empemail;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.gender;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.date;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.hobbies;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.country;
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.state;
    cell8 = newRow.insertCell(7);
    cell8.innerHTML = data.city;
    cell9 = newRow.insertCell(8);
    cell9.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("empemail").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("date").value = "";
    document.getElementById("hobbies").value = "";
    document.getElementById("country").value = "";
    document.getElementById("state").value = "";
    document.getElementById("city").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("empemail").value = selectedRow.cells[1].innerHTML;
    document.getElementById("gender").value = selectedRow.cells[2].innerHTML;
    document.getElementById("date").value = selectedRow.cells[3].innerHTML;
    document.getElementById("hobbies").value = selectedRow.cells[4].innerHTML;
    document.getElementById("country").value = selectedRow.cells[5].innerHTML;
    document.getElementById("state").value = selectedRow.cells[6].innerHTML;
    document.getElementById("city").value = selectedRow.cells[7].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.empemail;
    selectedRow.cells[2].innerHTML = formData.gender;
    selectedRow.cells[3].innerHTML = formData.date;
    selectedRow.cells[4].innerHTML = formData.hobbies;
    selectedRow.cells[5].innerHTML = formData.country;
    selectedRow.cells[6].innerHTML = formData.state;
    selectedRow.cells[7].innerHTML = formData.city;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("fullName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}
