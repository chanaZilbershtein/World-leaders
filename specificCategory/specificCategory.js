//  שמירה ל local storg בjs בשביל השוואה לגמחים  
//ובשביל הניווט והפוטר
function saveTosessionStorage(value) {
    // שמירה ל-sessionStorage
    sessionStorage.setItem("category", value);
    // alert(`Item with key "${key}" and value "${value}" saved to sessionStorage!`);

    // הפניה לעמוד אחר
    // window.location.href = "./specificCategory.html";
}

//קבלת הניווט
const currentNav = document.getElementsByClassName('navC');
//קבלת ה-h1 -לצורך הופעה מתי שאין תוצאות בסינון
const noResults = document.querySelector('h1');

const currentCategory = sessionStorage.getItem('category');
const gmachim = document.getElementById('gmachim');
const titleCategory = document.getElementById('titleCategory');
//   לכפתור החיפוש של העיר
const btnF = document.getElementById('filt');
const valueFilt = document.getElementById('valueFilt');
let areaUser;

//לכפתור השחזור של העיר
const btnR = document.getElementById('btnReset');
let copyArrGmachim;

//לכפתור  החיפוש של התת קטגוריה
const btnSubCategoryF = document.getElementById('filtSub');
const valueFiltSub = document.getElementById('valueFiltSub');
let subCategoryUser;
//לכפתור השחזור של תת הקטגוריה
const btnSubCategoryR = document.getElementById('btnResetSub');

// הקצאת אוביקט שיכיל כל פעם את מערך הגמחים
const allGmach = {
    arrGmachim: [],
}

//לצביעת הקטגוריה המתאימה בניווט בעמוד הנוכחי
for (let i = 0; i < currentNav.length; i++) {
    if (currentNav[i].innerHTML === currentCategory) {
        currentNav[i].style.color = '#536493';
    }
}

//דיב אחד של גמחים ובתוכו כל התוכן. בתוכו עוד דיב רק של בגמ"ים ובתוכו עוד דיבים לכל גמ"ח בפני עמצו שבתוכו דיב לתמונה ודיב לכיתוב
// לשליפת הגמחים ע"פ הקטגוריה שבחר
$.ajax({
    url: '../date/gmach.json',
    // data-הבאת הנתונים מ 
    success(data) {

        //json-שליפת הנתונים התואמים מתוך ה 
        const arrGmachim = data.filter(gm => gm.category === currentCategory);
        const newG = localStorage.getItem('gmach');
        //המרה לאוביקט רגיל
        const newGmach = JSON.parse(newG);
        if (newGmach != null && newGmach.category === currentCategory) {
            arrGmachim.push(newGmach);
        }
        //לכותרת בעמוד
        //לצורך הכנסה של התוכן אליו html-הבאת הדיב הקיים כבר ב
        //לאוביקט data-העתקת המערך מה  
        allGmach.arrGmachim = arrGmachim;
        copyArrGmachim = arrGmachim;
        //dom-קריאה לפונקציה המבצעת תצוגה בעמוד ה
        setArrGmachim();
    }
})
//dom-פונקציה להדפסת המערך של הגמחים שהתקבל ל
const setArrGmachim = () => {
    // dom-אתחול הדף של ה
    gmachim.innerHTML = '';
    titleCategory.innerHTML = '';
    //יצירת שם הגמ"ח בתור כותרת
    const h2 = document.createElement('h2');
    h2.innerHTML = currentCategory;
    //dom- המתאים בעמוד ה div-הכנסת הכותרת ל 
    titleCategory.appendChild(h2);

    // console.log(arrGmachim);
    // דיב לכל הגמחים
    const divgmachim = document.createElement('div');
    //ריקון הגמ"חים שכבר נמצאים לפני הצגת החדשים

    //dom-מעבר על כל מערך הגמ"חים שהתקבל והצגתו ב
    allGmach.arrGmachim.forEach(e => {
        //div-לגמ"ח הנוכחי
        const a = document.createElement("a");
        //קישור לתגית הa-
        a.href = "../products/products.html";
        //לתמונה בפני עצמה
        const divPic = document.createElement("div");
        divPic.className = "picture";
        //לכיתוב בפני עצמו
        const divWri = document.createElement("div");
        divWri.className = "write";

        //dom-הכנסת כל המידע למשתנים בשביל העברת ל

        const subcategory = document.createElement('h3');
        subcategory.innerHTML = e.subCategory;
        const nameOfGmach = document.createElement('h3');
        nameOfGmach.innerHTML = e.nameOfGmach;
        const lastName = document.createElement('h5');
        lastName.innerHTML = e.lastName;
        const area = document.createElement('h5');
        area.innerHTML = e.address.area;
        const city = document.createElement('h5');
        city.innerHTML = e.address.city;
        const phone = document.createElement('h5');
        phone.innerHTML = e.phone;
        const mail = document.createElement('h5');
        mail.innerHTML = e.mail;
        const image = document.createElement('img');
        image.src = e.image;

        divWri.appendChild(subcategory);
        divWri.appendChild(nameOfGmach);
        divWri.appendChild(lastName);
        divWri.appendChild(area);
        divWri.appendChild(city);
        divWri.appendChild(phone);
        divWri.appendChild(mail);

        a.appendChild(divWri);

        divPic.appendChild(image);
        a.appendChild(divPic);

        // div.style.background="black";
        // div.style.color="white";

        //css-קריאת קלאס משותף לכל הגמ"חים בשביל העיצוב ב
        a.className = "gmach";
        //הכנסה לדיב שכולל את הגמ"ח הנוכחי
        divgmachim.appendChild(a);
        //הכנס לדיב שכולל את הגמחים
        gmachim.appendChild(divgmachim);

        //שליחת הגמ"ח הנוכחי בשביל שליפת המוצרים שלו בעמוד של המוצרים
        a.addEventListener("click", () => saveTosessionStorageNameOfGmach(nameOfGmach.innerHTML));
    });

}
//שמירה מעמוד ספיציפי גמ"ח בשביל שליפה בעמוד מוצרים
function saveTosessionStorageNameOfGmach(value) {
    // שמירה ל-sessionStorage
    sessionStorage.setItem("nameOfGmach", value);
}
//פילטר לסינון אזור מגורים
const filterGmachim = (arr, areaUser) => {
    // החזרת מערך מסונן כל פעם ע"פ הנתון שהוכנס
    return arr.filter(g => (g.address.area.includes(areaUser)) || (g.address.city.includes(areaUser)));
}
// לכפתור החיפוש
// const botnS = document.getElementById('search');
// const valueSearch = document.getElementById('valueSearch');

//לעיר
//פונקציה המתרחשת בעת לחיצה על כפתור הסינון
btnF.onclick = (e) => {
    e.preven
    //קבלת הפרמטר לסינון שהכניס המשתמש
    areaUser = valueFilt.value; // search.filter.value;
    //שליחה לפונקצית הפילטר ושמירה באוביקט של התצוגה
    allGmach.arrGmachim = filterGmachim(allGmach.arrGmachim, areaUser);
    if (allGmach.arrGmachim.length === 0) {
        noResults.style.display = 'block';
    }

    //dom-לתצוגה בעמוד ה
    setArrGmachim();
}
//פונקציה המתרחשת בעת לחיצה על כפתור השחזור
btnR.onclick = () => {
    // input- ריקון ה
    valueFilt.value = '';
    //ביטול ההודעה של חוסר תוצאות במלאי
    noResults.style.display = 'none';
    //ריקון המשתנה המכיל את הערך לחיפוש
    areaUser = '';
    //שליחת המערך הראשוני לפונקצית הפילטר ושמירה באוביקט של התצוגה
    allGmach.arrGmachim = filterGmachim(copyArrGmachim, areaUser);
    //dom-לתצוגה בעמוד ה
    setArrGmachim();
}


//לתת הקטגוריה

// פונקציה המבצעת את הסינון
const filterGmachimBySubCategory = (arr, subCategoryUser) => {
    // החזרת מערך מסונן כל פעם ע"פ הנתון שהוכנס
    return arr.filter(g => g.subCategory.includes(subCategoryUser));
}

//פונקציה המתרחשת בעת לחיצה על כפתור הסינון
btnSubCategoryF.onclick = (e) => {
    // e.preven
    //קבלת הפרמטר לסינון שהכניס המשתמש
    subCategoryUser = valueFiltSub.value;
    //שליחה לפונקצית הפילטר ושמירה באוביקט של התצוגה
    allGmach.arrGmachim = filterGmachimBySubCategory(allGmach.arrGmachim, subCategoryUser);
    if (allGmach.arrGmachim.length === 0) {
        noResults.style.display = 'block';
    }

    //dom-לתצוגה בעמוד ה
    setArrGmachim();
}
//פונקציה המתרחשת בעת לחיצה על כפתור השחזור
btnSubCategoryR.onclick = () => {
    // input- ריקון ה
    valueFiltSub.value = '';
    //ביטול ההודעה של חוסר תוצאות במלאי
    noResults.style.display = 'none';
    //ריקון המשתנה המכיל את הערך לחיפוש
    areaUser = '';
    //שליחת המערך הראשוני לפונקצית הפילטר ושמירה באוביקט של התצוגה
    allGmach.arrGmachim = filterGmachim(copyArrGmachim, areaUser);
    //dom-לתצוגה בעמוד ה
    setArrGmachim();
}
