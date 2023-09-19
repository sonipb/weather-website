console.log('client side javascript code goes here');


// fetch('http://puzzle.mead.io/puzzle').then( (response) => {
//     response.json().then( (data) => {
//         console.log(data);
//     } );
// });

// fetch('https://puzzle.mead.io/puzzle').then( (response) => {
//     console.log(response);
//     response.json().then( (data) => {
//         console.log(data);
//     });
// });



weatherForm = document.querySelector('form');
searchValue = document.querySelector('input');
//console.log(document.querySelector('form'));

weatherForm.addEventListener( 'submit' , (e) => {
    e.preventDefault();
    //location = searchValue.value;
    //console.log(searchValue.value);
    if( searchValue.value !== '') {
        //console.log(searchValue.value);
        fetch('http://localhost:3000/weather?address=' + searchValue.value).then( (response) => {
            //console.log(response);
            response.json().then( (data) => {
                console.log(data);
            });
        });        
    }
    // console.log('Form is submitted');     
});