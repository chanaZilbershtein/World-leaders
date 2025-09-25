const logo=document.getElementById('logo');
logo.onclick=()=>{
    window.location.href="../home/home.html";
}

function saveTosessionStorage(value) {
    // שמירה ל-sessionStorage
    sessionStorage.setItem("category", value);
    // alert(`Item with key "${key}" and value "${value}" saved to sessionStorage!`);

    // הפניה לעמוד אחר
    // window.location.href = "./specificCaterory.html";
}

//שמירה מעמוד ספיציפי גמ"ח בשביל שליפה בעמוד מוצרים
function saveTosessionStorageNameOfGmach(value) {
    // שמירה ל-sessionStorage
    sessionStorage.setItem("nameOfGmach", value);
}