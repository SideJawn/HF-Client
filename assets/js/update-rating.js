var price_rating = document.querySelector('#price-rating');
var quality_rating = document.querySelector('#quality-rating');
var environment_rating = document.querySelector('#environment-rating');
var service_rating = document.querySelector('#service-rating');


function rangeValue(){
  var newValue = this.value;
  const name = this.id.split('-');
  var selector = '.' + name[0] + '-value';
  var target = document.querySelector(selector);
  if(newValue != 0){
    target.innerHTML = newValue;
    target.style.display = "block";

}
  else
    target.style.display = "none";
}

price_rating.addEventListener("input", rangeValue);
quality_rating.addEventListener("input", rangeValue);
environment_rating.addEventListener("input", rangeValue);
service_rating.addEventListener("input", rangeValue);
