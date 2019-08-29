document.querySelector('#output').style.visibility = 'hidden';
document.querySelector('#lbsinput').addEventListener('input',(e) => {
    document.querySelector('#output').style.visibility = 'visible';
    let lb=e.target.value;
    document.querySelector('#gramsOutput').innerHTML = lb/0.0022046;
    document.querySelector('#kgOutput').innerHTML = lb/2.2046;
    document.querySelector('#ozOutput').innerHTML = lb*16;
})