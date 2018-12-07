document.getElementById("myBtn").addEventListener("click", function mybtn() {
    let get = document.getElementById("get").checked;
    let post = document.getElementById("post").checked;
    let delet = document.getElementById("delete").checked;
    let put = document.getElementById("put").checked;
    let urlContry = "http://localhost:8080/country";

    if (get === true || post === true || delet === true || put === true) {
        requeste(this);
    };
});
function requeste(meth) {
    ae = meth.checked;
    const myHeaders = new Headers();
    const init = {
        method: ae,
        headers: myHeaders,
        cache: "default",
        credentials: "same-origin",
        ContentType: "application/json"
    };

    fetch('http://localhost:8080/country', init)
        .then(resp => resp.json())
        .then(response => {
            console.log(response)
            for (i in response) {
                console.log(response[i])
            }
        })
        .catch(resp => {
            console.error(resp);
        });
};

    function countryFind(contr) {
        countryName = contr.value.toUpperCase();
        console.log(countryName)
    }
   
   function capitalFInd(capitalF){
    capitalName = capitalF.value.toUpperCase();
    console.log(capitalName)
   }
