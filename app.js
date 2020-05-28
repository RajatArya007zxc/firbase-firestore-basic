const cafeList =document.querySelector('#cafe-list');
const form=document.querySelector('#add-cafe-form')
// create element and render cafe
function renderCafe(doc){


    let li =document.createElement('li');
    let name=document.createElement('span');
    let city=document.createElement('span');
    let cross=document.createElement('div');


    li.setAttribute('data-id',doc.id);
    name.textContent=doc.data().name;
    city.textContent=doc.data().city;
    cross.textContent='x';

 
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);


    ////// DElETING Data
  cross.addEventListener('click',e=>{
    e.stopPropagation(); //no need 
    let id= e.target.parentElement.getAttribute('data-id');
    db.collection('cafes').doc(id).delete();
  })

}
/*
// Ordering data by name or city
db.collection('cafes').orderBy('name') .get().then(
  //  db.collection('cafes').where('city','==','delhi').orderBy('name') .get().then(
// its show first error then go to the link and then its work fine
        (snapshot)=>{
       snapshot.docs.forEach(doc=>{

        renderCafe(doc)
       })
    }
)  
*/

///// Real time Data

db.collection('cafes').orderBy('name').onSnapshot(snapshot=>{
    let changes= snapshot.docChanges();  // cl type=added or remove
    changes.forEach(change=>{
       // console.log(change.doc.data())
     
       if(change.type== 'added'){
           renderCafe(change.doc)
       }
       else if(change.type ==  'removed'){
           let li =cafeList.querySelector('[data-id=' + change.doc.id + ']');
           cafeList.removeChild(li);
       }

    })
})











//saving data

/*form.addEventListener('submit',(e)=>{
    e.preventDefault(); // not going to refresh the page 

    db.collection('cafes').add({
        name:form.name.value,
        city:form.city.value
    })
})


it store into the firestore and also work without refresh */

form.addEventListener('submit',(e)=>{
    e.preventDefault(); // not going to refresh the page 

    db.collection('cafes').add({
        name:form.name.value,
        city:form.city.value
    })
    form.name.value ='';
    form.city.value='';
})