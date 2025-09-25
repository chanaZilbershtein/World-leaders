//sessionStorage-שליפה מה
const currentProducts = sessionStorage.getItem('nameOfGmach');
//קבלת הניווט
const currentNav = document.getElementsByClassName('navC');

//קבלת הקטגוריה הנוכחית
const currentCategory = sessionStorage.getItem('category');


const allproductsOfGmach = document.getElementById("products");
const titleNameOfGmach = document.getElementById('titleNameOfGmach');

// עמוד מוצר
const popupSpecificProduct = document.getElementById('popupSpecificProduct');
const popupBackground = document.querySelector('.popupBackground');

//לכפתור החיפוש
const btnS = document.getElementById('search');
const valueSearch = document.getElementById('valueSearch');
let nameOfGmach;
const btnR = document.getElementById('btnReset');
let copyArrProducts;
let nameProduct;
let address;

//קבלת ה-h1 -לצורך הודעה מתי שאין תוצאות בסינון
const noResults = document.querySelector('h1');

const allproducts = {
    arrProducts: [],
}

//לצביעת הקטגוריה המתאימה בניווט בעמוד הנוכחי
for (let i = 0; i < currentNav.length; i++) {
    if (currentNav[i].innerHTML === currentCategory) {
        currentNav[i].style.color = '#536493';
    }
}
//מחיקת שם הקטגוריה מהסשן
sessionStorage.removeItem('category');


$.ajax({
    url: '../date/gmach.json',
    // data-הבאת הנתונים מ 
    success(data) {
        //json-שליפת הנתונים התואמים מתוך ה 
        const arrProducts = data.filter(p => p.nameOfGmach === currentProducts);
        //שליפת גמ"ח חדש-אם הוסיפו
        let newP;
        try {
            newP = localStorage.getItem('gmach');
            //המרה לאוביקט רגיל
            const newGmach = JSON.parse(newP);

            if (newGmach != null && newGmach.nameOfGmach === currentProducts) {
                arrProducts.push(newGmach);
            }

        }
        catch { };

        //לחילוץ הכתובת של הגמ"ח
        address = `${arrProducts[0].address.street} ${arrProducts[0].address.houseNumber} ${arrProducts[0].address.city}`;
        //לכותרת בעמוד
        //לצורך הכנסה של התוכן אליו html-הבאת הדיב הקיים כבר ב
        //לאוביקט data-העתקת המערך מה  
        allproducts.arrProducts = arrProducts[0].products;
        //בשביל השחזור מאוחר יותר
        copyArrProducts = allproducts.arrProducts;//arrProducts[0].products;
        //dom-קריאה לפונקציה המבצעת תצוגה בעמוד ה
        setArrProducts();
    }
    // error: function (res, stat) {
    //     alert(res.toString());
    //     alert(stat.toString());
    // }
})
const setArrProducts = () => {
    allproductsOfGmach.innerHTML = '';
    titleNameOfGmach.innerHTML = '';
    address.innerHTML = '';
    const h2 = document.createElement('h2');
    h2.innerHTML = currentProducts;

    const h3 = document.createElement('h3');
    h3.innerHTML = address;

    // הדיב הקיים כבר ב html
    titleNameOfGmach.appendChild(h2);
    titleNameOfGmach.appendChild(h3);

    h2.className = 'titleH2';

    const divProducts = document.createElement('div');

    allproducts.arrProducts.forEach(e => {
        const a = document.createElement('a');
        a.href = "#popupSpecificProduct";

        const image = document.createElement('img');
        image.src = e.image;

        const nameOfProducts = document.createElement('h5');
        nameOfProducts.innerHTML = e.name;


        a.appendChild(image);
        a.appendChild(nameOfProducts);
        console.log("בדיקה");

        divProducts.appendChild(a);

        allproductsOfGmach.appendChild(divProducts);

        // בעת לחיצה על מוצר ספציפי
        a.onclick = () => {
            popupSpecificProduct.innerHTML = '';
            const divPic = document.createElement('div');
            const divWri = document.createElement('div');
            divWri.id = 'write';

            const close = document.createElement('h3');
            close.innerHTML = 'X';
            popupSpecificProduct.appendChild(close);
            close.id = 'close';

            const imageA = document.createElement('img');
            imageA.src = e.image;
            divPic.appendChild(imageA);

            const codeA = document.createElement('h6');
            codeA.innerHTML = `קוד:  ${e.code}`;
            divWri.appendChild(codeA);

            const nameOfProductA = document.createElement('h5');
            nameOfProductA.innerHTML = `שם מוצר:  ${e.name}`;
            divWri.appendChild(nameOfProductA);

            const siteRrgulationI = document.createElement('input');
            siteRrgulationI.type = 'checkbox';
            siteRrgulationI.required = true;
            divWri.appendChild(siteRrgulationI);


            const siteRrgulationL = document.createElement('label');
            siteRrgulationL.innerHTML = `קראתי את <a href="../siteRegulatoins/siteRegulations.html" target="_blank">התקנון </a>ואני מתחייב לעמוד בתנאים`;
            divWri.appendChild(siteRrgulationL);

            //הוספה כיתוב לשדה החובה

            const sendI = document.createElement('input');
            sendI.type = 'checkbox';
            divWri.appendChild(sendI);

            const sendL = document.createElement('label');
            sendL.innerHTML = `משלוח בעלות 12 ₪ בלבד`;
            divWri.appendChild(sendL);
            //הוספת תגית ספן



            const p = document.createElement('p');
            p.innerHTML = `יש להחזיר בתוך 5-7 ימים <br> וכן יש לשמור על שלמות המוצר`
            divWri.appendChild(p);

            const btnOK = document.createElement('button');
            btnOK.innerHTML = `אישור`;
            btnOK.type = 'submit';
            //   btnOK.disabled = true;//התחלה עם כפתור כבוי
            popupSpecificProduct.appendChild(divPic);
            popupSpecificProduct.appendChild(divWri);
            popupSpecificProduct.appendChild(btnOK);

            popupSpecificProduct.style.display = 'block';
            popupBackground.style.display = 'block';
            //פונקציה לצקבוקס -לעשות אותו חובה


            close.onclick = () => {
                popupSpecificProduct.innerHTML = '';
                popupSpecificProduct.style.display = 'none';
                popupBackground.style.display = 'none';
            }
            btnOK.onclick = (e) => {

                if (!siteRrgulationI.checked) {
                    e.preventDefault();
                    alert('יש לאשר קריאת תקנון');
                } else {
                    alert('הנתונים נשמרו בהצלחה!!');
                    popupSpecificProduct.innerHTML = '';
                    popupSpecificProduct.style.display = 'none';
                    popupBackground.style.display = 'none'
                }
            }
            popupBackground.onclick = () => {
                popupSpecificProduct.innerHTML = '';
                popupSpecificProduct.style.display = 'none';
                popupBackground.style.display = 'none';
            }
        }
    });
}

const searchProducts = (arr, nameProduct) => {
    return arr.filter(p => p.name.includes(nameProduct));
}

btnS.onclick = () => {
    nameProduct = valueSearch.value;
    allproducts.arrProducts = searchProducts(allproducts.arrProducts, nameProduct);
    if (allproducts.arrProducts.length === 0) {
        noResults.style.display = 'block';
    }
    setArrProducts();
}
btnR.onclick = () => {

    noResults.style.display = 'none';

    valueSearch.value = '';
    nameProduct = '';
    allproducts.arrProducts = searchProducts(copyArrProducts, nameProduct);
    setArrProducts();
}
