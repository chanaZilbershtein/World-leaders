const a1 = document.getElementById('a1');
const a2 = document.getElementById('a2');
const a3 = document.getElementById('a3');
const a4 = document.getElementById('a4');
const a5 = document.getElementById('a5');
//מערך תמונות
let allPictuers = ["../img/גמחים/רפואה/מכשור רפואי/מכשיר רפואי חדשים.jpg", "../img/גמחים/שמחות/מפות/מפה חדשים.jpg",
    "../img/גמחים/ציוד לתינוק/מוצצים ובקבוקים/חדשים מוצצים ובקבוקים.jpg", "../img/גמחים/שמחות/ברכונים/ברכון חדשים.jpg",
    "../img/חדשים/3.jpg", "../img/גמחים/ציוד לתינוק/עגלות ועריסות/טיולון תאומים.jpg", "../img/גמחים/שבת/פלטות ומיחמים/פלטה.png", "../img/גמחים/ריהוט/כסא מתקפל.jpg",
    "../img/גמחים/שמחות/קישוטי שיער/קישוט לכלות.png"
];

//מערך של שמות גמחים
let allNamesOfGmachim = ["נר לאה", "זכר יצחק", "נר מרדכי", "בכרת אשר", "שמחת אליהו", "זכרון תמר", "מגן ישראל", "זכרון ישעיהו", "שמחה בשמחה"];

//קבלת הכפתורים למעבר תמונות
const prevBut = document.getElementById('prev');
const nextBut = document.getElementById('next');

a1.addEventListener('click', () => saveTosessionStorageNameOfGmach(allNamesOfGmachim[0]));
a2.addEventListener('click', () => saveTosessionStorageNameOfGmach(allNamesOfGmachim[1]));
a3.addEventListener('click', () => saveTosessionStorageNameOfGmach(allNamesOfGmachim[2]));
a4.addEventListener('click', () => saveTosessionStorageNameOfGmach(allNamesOfGmachim[3]));
a5.addEventListener('click', () => saveTosessionStorageNameOfGmach(allNamesOfGmachim[4]));

// let i = 0; //2;
// let len = allPictuers.length; //9
// פונקציה בעת לחיצה על כפתור הקודם
prevBut.onclick = () => {
    //דרך אחת להזיז את התמונות במערך עצמו
    let tempP = allPictuers[allPictuers.length - 1];
    let tempN = allNamesOfGmachim[allNamesOfGmachim.length - 1];
    for (let i = allPictuers.length - 1; i > 0; i--) {
        allPictuers[i] = allPictuers[i - 1];
        allNamesOfGmachim[i] = allNamesOfGmachim[i - 1];
    }
    allPictuers[0] = tempP;
    allNamesOfGmachim[0] = tempN;

    document.getElementById('picture1').src = allPictuers[0];   //תמונה 1 במקום 0 במערך.
    document.getElementById('picture2').src = allPictuers[1];  //תמונה 2 מקום 1 במערך
    document.getElementById('picture3').src = allPictuers[2];  //תמונה 3 מקום 2 במערך
    document.getElementById('picture4').src = allPictuers[3];  //תמונה 4 מקום 3 במערך
    document.getElementById('picture5').src = allPictuers[4];  //תמונה 5 מקום 4 במערך

    //שמירה לsassestorage בשביל קישור מהתמונה הנוכחית לגמ"ח שלה
    a1.addEventListener('click', () => saveTosessionStorageNameOfGmach(allNamesOfGmachim[0]));
    a2.addEventListener('click', () => saveTosessionStorageNameOfGmach(allNamesOfGmachim[1]));
    a3.addEventListener('click', () => saveTosessionStorageNameOfGmach(allNamesOfGmachim[2]));
    a4.addEventListener('click', () => saveTosessionStorageNameOfGmach(allNamesOfGmachim[3]));
    a5.addEventListener('click', () => saveTosessionStorageNameOfGmach(allNamesOfGmachim[4]));
}
// פונקציה בעת לחיצה על כפתור הבא
nextBut.onclick = () => {
    let tempP = allPictuers[0];
    let tempN = allNamesOfGmachim[0];

    for (let i = 0; i < allPictuers.length - 1; i++) {
        allPictuers[i] = allPictuers[i + 1];
        allNamesOfGmachim[i] = allNamesOfGmachim[i + 1];
    }
    allPictuers[allPictuers.length - 1] = tempP;
    allNamesOfGmachim[allNamesOfGmachim.length - 1] = tempN;

    document.getElementById('picture1').src = allPictuers[0]; //תמונה 1 במקום 0 במערך.
    document.getElementById('picture2').src = allPictuers[1]; //תמונה 2 מקום 1 במערך
    document.getElementById('picture3').src = allPictuers[2];
    document.getElementById('picture4').src = allPictuers[3];
    document.getElementById('picture5').src = allPictuers[4];

    //שמירה לsassestorage בשביל קישור מהתמונה הנוכחית לגמ"ח שלה
    a1.addEventListener('click', () => saveTosessionStorageNameOfGmach(allNamesOfGmachim[0]));
    a2.addEventListener('click', () => saveTosessionStorageNameOfGmach(allNamesOfGmachim[1]));
    a3.addEventListener('click', () => saveTosessionStorageNameOfGmach(allNamesOfGmachim[2]));
    a4.addEventListener('click', () => saveTosessionStorageNameOfGmach(allNamesOfGmachim[3]));
    a5.addEventListener('click', () => saveTosessionStorageNameOfGmach(allNamesOfGmachim[4]));
}

