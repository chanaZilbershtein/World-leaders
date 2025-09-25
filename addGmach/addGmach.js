const btnAddP = document.querySelector('#up');
const form = document.querySelector('form');
const btnEnd = document.getElementById('end');
const thanks = document.getElementById('thanks');
const thanksBackground = document.getElementById('thanksBackground');
//html-הבאת הדברים מ 
const nameOfGmach = document.getElementById('nameOfGmach');
const lastName = document.getElementById('lastName');
const city = document.getElementById('city');
const area = document.getElementById('area');
const street = document.getElementById('street');
const houseNumber = document.getElementById('houseNumber');
const phone = document.getElementById('phone');
const mail = document.getElementById('mail');
const category = document.getElementById('category');
const subCategory = document.getElementById('subCategory');
const inputImage = document.getElementById('inputImage');

//יצירת מערך ואוביקט
let products = [];
let addNewGmach = {};

//בעת לחיצה על הוספת-העלאת מוצר
btnAddP.onclick = () => {

    const divPop = document.createElement('div');
    divPop.id = 'divPop';
    form.appendChild(divPop);
    const formPop = document.createElement('form');
    divPop.appendChild(formPop);
    // הוספת תגית בשביל קוד המוצר
    const codeL = document.createElement('label');
    codeL.innerHTML = 'קוד מוצר : ';
    const codeI = document.createElement('input');
    codeI.type = "number";
    const br1 = document.createElement('br');
    formPop.appendChild(codeL);
    formPop.appendChild(codeI);
    formPop.appendChild(br1);
    // הוספת תגית בשביל שם המוצר
    const nameL = document.createElement('label');
    nameL.innerHTML = 'שם מוצר: ';
    const nameI = document.createElement('input');
    const br2 = document.createElement('br');
    formPop.appendChild(nameL);
    formPop.appendChild(nameI);
    formPop.appendChild(br2);

    //הוספת תמונה
    const imgL = document.createElement('label');
    imgL.innerHTML = 'העלאת תמונה: ';
    formPop.appendChild(imgL);
    const imgI = document.createElement('input');
    imgI.type = "file";
    imgI.accept = "image/*";
    formPop.appendChild(imgI);
    const br3 = document.createElement('br');
    formPop.appendChild(br3);

    //כפתורים לסיום ושמירה
    const btnSave = document.createElement('button');
    btnSave.innerHTML = 'שמור';
    const btnFinish = document.createElement('button');
    btnFinish.innerHTML = 'סיום';
    formPop.appendChild(btnSave);
    formPop.appendChild(btnFinish);

    divPop.style.display = 'block';

    // btnSave.onclick="return onClick();";
    btnSave.onclick = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = () => {
            const product = {
                code: codeI.value,
                name: nameI.value,
                image: reader.result // שמירת מחרוזת Base64
            };
            products.push(product);
            codeI.value = '';
            nameI.value = '';
            imgI.value = '';
        };
        reader.readAsDataURL(imgI.files[0]);
    };
    //local storage-בכפתור הסיום שמירה ל 
    btnFinish.onclick = (e) => {
        e.preventDefault();
        // localStorage.setItem("products", products);
        btnEnd.disabled = false;
        divPop.style.display = 'none';
        // הסתרת הטופס הפנימי לאחר סיום
        // divPop.style.display = 'none';
    }
}




function areFieldsValid() {
    // בדוק אם כל השדות חובה מולאו
    return nameOfGmach.value.trim() &&
        lastName.value.trim() &&
        city.value.trim() &&
        area.value.trim() &&
        street.value.trim() &&
        houseNumber.value.trim() &&
        phone.value.trim() &&
        mail.value.trim() &&
        category.value.trim() &&
        subCategory.value.trim() &&
        inputImage.files.length > 0;
}




//בלחיצה על סיום של כל העמוד
btnEnd.onclick = (e) => {
    //ביטול ברירת מחדל
    e.preventDefault();
    
//לשאול את חיה וחני
    // בדוק אם כל השדות חובה מולאו
    if (!areFieldsValid()) {
        alert('אנא מלא את כל השדות הנדרשים.');
        return;
    }


    const reader = new FileReader();
    reader.onload = () => {
        //יצירת האוביקט של הגמ"ח החדש
        addNewGmach = {
            lastName: lastName.value,
            address: {
                area: area.value,
                city: city.value,
                street: street.value,
                houseNumber: houseNumber.value
            },
            phone: phone.value,
            mail: mail.value,
            category: category.value,
            subCategory: subCategory.value,
            nameOfGmach: nameOfGmach.value,
            image: reader.result, // שמירת מחרוזת Base64
            products: products,
        };
        //שמירת האוביקט של הגמ"ח החדש
        localStorage.setItem("gmach", JSON.stringify(addNewGmach));
    };
    reader.readAsDataURL(inputImage.files[0]);

    //טיימר של תודה רבה
    thanksBackground.style.display = "block";
    thanks.style.display = "block";
    setTimeout(function () {
        window.location.href = "../home/home.html";
    }, 4000)

};
