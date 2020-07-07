var priceSlider = document.querySelector('#price-rating');
var qualitySlider = document.querySelector('#quality-rating');
var environmentSlider = document.querySelector('#environment-rating');
var serviceSlider = document.querySelector('#service-rating');

var priceSuggestionBox = document.querySelector('#price-suggestion');
var qualitySuggestionBox = document.querySelector('#quality-suggestion');
var environmentSuggestionBox = document.querySelector('#environment-suggestion');
var serviceSuggestionBox = document.querySelector('#service-suggestion');

var modal = $('.js-modal')[0];
var svgElement = document.getElementById('status-svg');

var uuidMap = {
    ratings : {
        1 : "76781f4e-4529-4b9a-81ad-4d7c9b59ad73",
        2 : "2344ac49-bb5a-44df-b716-36d32db2c5f2",
        3 : "8baa3e6f-f669-43af-bb90-93f25135dd20",
        4 : "a4a52d20-018d-4ed2-ac3b-b5a2865391e3",
        5 : "4174fd8d-e4a5-42eb-8bbb-4be373967691",
        6 : "fc760bf4-28de-4345-949c-9a75f9ad46bc",
        7 : "b5411e5f-bfe3-4f94-97ff-20a92f59879b",
        8 : "bf8b9a1e-0403-436b-a888-11bce76b6246",
        9 : "d9268ebd-1672-4e73-958f-1830788a9bdb",
        10 : "7071d5e9-c1ed-4479-87c3-f48313155d5e"
    }
};

var submissionPayload = {
    data :{
        business_id: null,
        price: 
            {category: "9c3d6209-30e1-474e-8c1a-975ea1273e07",
            rating: null, 
            suggestion: null}
        ,
        quality:
            {category: "c06077d1-a248-418f-899b-bffa2eaa0738",
            rating: null, 
            suggestion: null}
        ,
        environment:
            {category: "8fdd15ad-785c-4d87-8f78-3021afaba95f",
            rating: null, 
            suggestion: null}
        ,
        service:
            {category: "22ab38bc-71c0-438f-a1ac-3fa0d4213d8f",
            rating: null, 
            suggestion: null}
    }
};

function mapSubmissionData(){
    var priceRating = priceSlider.value;
    var qualityRating = qualitySlider.value;
    var environmentRating = environmentSlider.value;
    var serviceRating = serviceSlider.value;
    var business_id = $('#business').attr('business-id');

    submissionPayload.data.business_id = business_id;

    if(priceRating != 0){
        submissionPayload.data.price.rating = uuidMap.ratings[priceRating];
        submissionPayload.data.price.suggestion = priceSuggestionBox.value;
    }
    if(qualityRating != 0){
        submissionPayload.data.quality.rating = uuidMap.ratings[qualityRating];
        submissionPayload.data.quality.suggestion = qualitySuggestionBox.value;
    }
    if(environmentRating != 0){
        submissionPayload.data.environment.rating = uuidMap.ratings[environmentRating];
        submissionPayload.data.environment.suggestion = environmentSuggestionBox.value;
    }
    if(serviceRating != 0){
        submissionPayload.data.service.rating = uuidMap.ratings[serviceRating];
        submissionPayload.data.service.suggestion = serviceSuggestionBox.value;
    }
}

function createFailureDisplay(responseCode){
    if(svgElement.childNodes[0] == null){
        svgElement.setAttribute('viewBox', '0 0 32 50');

        var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('transform', 'matrix(2.32559 0 0 2.16757 -3.08855 -5.39032)');
        group.setAttribute('stroke', '#F00');
        group.setAttribute('stroke-linecap', 'round');
        group.setAttribute('stroke-miterlimit', 4);
        group.setAttribute('stroke-width', 1.867);
        group.setAttribute('fill', 'none');

        var path1 = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
        path1.setAttribute("d","m2.34081,3.47772l5.7749,6.0785"); //Set path's data
        var path2 = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
        path2.setAttribute("d","m13.92071,3.45412l-5.775,6.0781"); //Set path's data
        var path3 = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
        path3.setAttribute("d","m2.34071,15.41022l5.775,-6.078"); //Set path's data
        var path4 = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
        path4.setAttribute("d","m13.92071,15.43322l-5.776,-6.078"); //Set path's data

        group.appendChild(path1);
        group.appendChild(path2);
        group.appendChild(path3);
        group.appendChild(path4);
        svgElement.appendChild(group);  
        $('.modal-image').css('color', '#F00');
    }

    if(responseCode == 404){
        $('#modal-header').text("Sorry, we can't find this business in our database!");
        $('#modal-first-line').text("If you still want to provide feedback, please let the staff know.");
        $('#modal-second-line').text("If they don't use us, please let them know about us!");
    }
    else if(responseCode == 1){
        $('#modal-header').text("Missing information!");
        $('#modal-first-line').text("Please provide us with a rating before submitting");
    }
    else{
        $('#modal-header').text("Sorry, we messed up on our end!");
        $('#modal-first-line').text("If you still want to provide feedback, please let the staff know!");
    }
}

function createSuccessDisplay(){
    if(svgElement.childNodes[0] != null)
        svgElement.removeChild(svgElement.childNodes[0]);
    var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
    newElement.setAttribute("d","m0.44134,10.27561l4,-4l8,8l14,-14l4,4l-18,18l-12,-12z"); //Set path's data
    svgElement.setAttribute('viewBox', '0 0 32 32');
    svgElement.appendChild(newElement);
    svgElement.style.fill = "#48DB71";
    $('.modal-image').css('color', '#48DB71');

    $('#modal-header').text("Your honest feedback has been submitted!");
    $('#modal-first-line').text("We appreciate you and will be doing our best to do better!");
    $('#modal-second-line').text("Your mission is now complete. Carry on.");
}

function validateForm(){
    if(priceSlider.value == 0 && qualitySlider.value == 0 && environmentSlider.value == 0 && serviceSlider.value == 0)
      return false;
    return true;
  }

function showModal() {
    // Define initial properties
    dynamics.css(modal, {
    opacity: 0,
    scale: .5
    });
    
    // Animate to final properties
    dynamics.animate(modal, {
    opacity: 1,
    scale: 1
    }, {
    type: dynamics.spring,
    frequency: 300,
    friction: 400,
    duration: 1000
    });
}

// toggleClass
function toggleClass(elem, className) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
      while (newClass.indexOf(' ' + className + ' ') >= 0) {
        newClass = newClass.replace(' ' + className + ' ', ' ');
      }
      elem.className = newClass.replace(/^\s+|\s+$/g, '');
    } else {
      elem.className += ' ' + className;
    }
}


function showModalChildren() {
    // Animate each child individually
    for(var i=0; i<modalChildren.length; i++) {
      var item = modalChildren[i];
      
      // Define initial properties
      dynamics.css(item, {
        opacity: 0,
        translateY: 30
      });
  
      // Animate to final properties
      dynamics.animate(item, {
        opacity: 1,
        translateY: 0
      }, {
        type: dynamics.spring,
        frequency: 300,
        friction: 400,
        duration: 1000,
        delay: 100 + i * 40
      });
    } 
}


window.onload = function getBusinessId(){
    var businessName = new URLSearchParams(window.location.search).get('b');
    var xhttp = new XMLHttpRequest();
    var urlBusinessName = businessName.replace('/', "");
    var url = "/api/business/alias/" + urlBusinessName;

    xhttp.onreadystatechange = function() {
        window.history.pushState(null, null, businessName);
        if(this.readyState == 4) {
            if(this.status == 200){
                var response = JSON.parse(this.response);
                responseCode = response['status']['code'];
                console.log(responseCode + ':' + response['status']['msg']);
                if(responseCode == 200){
                    if(response['business'] != null){
                        $('#business').attr('business-id', response['business']['id']);
                        $('#business').text(response['business']['name']);
                    }
                }
                else{
                    createFailureDisplay(responseCode);
                    toggleClasses();
                    showModal();
                    showModalChildren();
                }
            }
            else{
                console.log(this.status);
                createFailureDisplay(this.status);
                toggleClasses();
                showModal();
                showModalChildren();
            }
        }
    };

    try{
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send();
    }
    catch(error){
        console.error("Failed to connect to the back-end. Error code: " + error);
    }
}

function sendSubmissionData(){
    if(validateForm()){
        mapSubmissionData();
        var xhttp = new XMLHttpRequest();
        var url = "/api/business/submission";

        xhttp.onreadystatechange = function() {
            if(this.readyState == 4) {
                if(this.status == 200){
                    var response = JSON.parse(this.response);
                    responseCode = response['status']['code'];
                    console.log(responseCode + ':' + response['status']['msg'])
                    if(responseCode == 200) {
                        createSuccessDisplay();
                    }
                    else if(responseCode == 500){
                        createFailureDisplay(responseCode);
                    }
                }
                else {
                    console.log(this.status);
                    createFailureDisplay(this.status);
                }
            }
        };

        try{
            xhttp.open("PUT", url, true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify(submissionPayload));
        }
        catch(error){
            console.error("Failed to send form data to flask. Error code: " + error);
        }
    }
    else{
        createFailureDisplay(1);
    }
}

document.querySelector('#submit-button').addEventListener("click", sendSubmissionData);