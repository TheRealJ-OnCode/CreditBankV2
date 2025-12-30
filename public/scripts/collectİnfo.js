const addCustomerButton = document.querySelector(".add-customer");
addCustomerButton.addEventListener("click", async e => {
    e.preventDefault();
    const inputs = [...document.querySelectorAll("input.form-input")];
    const data = {}
    inputs.forEach(input => input.name && (data[input.name] = input.value.trim()));
    data["specialInfo"] = document.querySelector("textarea").value.trim()
    if (!data.name) return throwMessage("Ad boş olabilməz");
    if (!(Number(data.credit) > 0)) return throwMessage("Qalıq Borc düzgün deyil");
    if (!(Number(data.initialDebt) > 0)) return throwMessage("Başlanğıc Borc düzgün deyil");
    const result = await window.electronAPI.addCustomer(data);
    console.log(result);
    
    if(!result.success){
        return throwMessage(result.message)
    }
    return throwMessage(result.message,"success")
});
