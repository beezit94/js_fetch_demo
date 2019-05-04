var url = "https://randomuser.me/api/";
var fullnameDisp = document.querySelector("#fullname");
var avatar = document.querySelector("#avatar");
var username = document.querySelector("#username");
var city = document.querySelector("#city");
var email = document.querySelector("#email");

var btn = document.querySelector("#btn");
btn.addEventListener("click", function() {
  fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(updateProfile)
    .catch(displayErrors);
});

function handleErrors(res) {
  if (!res.ok) {
    throw Error(res.status);
  }
  return res;
}

function parseJSON(res) {
  return res.json().then(function(parsedData) {
    return parsedData.results[0];
  });
}

function updateProfile(data) {
  var fullname = data.name.first + " " + data.name.last;
  fullnameDisp.innerText = fullname;
  avatar.src = data.picture.medium;
  username.innerText = data.login.username;
  city.innerText = data.location.city;
  email.innerText = data.email;
}

function displayErrors(err) {
  console.log("INSIDE displayErrors!");
  console.log(err);
}

$.ajax({
  type: "POST",
  url: url,
  data: data,
  success: success,
  dataType: dataType
})
  .done(function() {})
  .fail(function() {});

$.getJSON("url")
  .done(function() {})
  .fail(function() {});
$.post("url", data)
  .done()
  .fail();

//making request

$("#btn").click(function() {
  $.getJSON("https://random.cat/meow")
    .done(function(data) {
      $("#catImg").attr("src", data.file);
    })
    .fail(function() {
      alert("REQUEST IS NOT PAWSIBBLE");
    });
});

//axios error handling

var btn = document.querySelector("button");
var section = document.querySelector("#comments");
btn.addEventListener("click", sendRequest);

function sendRequest() {
  axios
    .get("https://jsonplaaskjldceholder.typicode.com/comments", {
      params: {
        postId: 1
      }
    })
    .then(addComments)
    .catch(handleErrors);
}

function addComments(res) {
  res.data.forEach(function(comment) {
    appendComment(comment);
  });
}

function appendComment(comment) {
  var newP = document.createElement("p");
  newP.innerText = comment.email;
  section.appendChild(newP);
}

function handleErrors(err) {
  if (err.response) {
    console.log("Problem With Response ", err.response.status);
  } else if (err.request) {
    console.log("Problem With Request!");
  } else {
    console.log("Error", err.message);
  }
}

//making same req by diff methods
var url = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
var xhrbtn = document.querySelector("#xhr");
var fetchbtn = document.querySelector("#fetch");
var axiosbtn = document.querySelector("#axios");
var display = document.querySelector("#quote");

xhrbtn.addEventListener("click", function() {
  var XHR = new XMLHttpRequest();
  XHR.onreadystatechange = function() {
    if (XHR.readyState == 4 && XHR.status == 200) {
      var quote = JSON.parse(XHR.responseText)[0];
      display.innerText = quote;
    }
  };
  XHR.open("GET", url);
  XHR.send();
});

fetchbtn.addEventListener("click", function() {
  fetch(url)
    .then(function(req) {
      req.json().then(function(data) {
        display.innerText = data[0];
      });
    })
    .catch(function() {
      alert("ERROR!");
    });
});

$("#jquery").click(function() {
  $.getJSON(url).done(function(data) {
    $("#quote").text(data[0]);
  });
});

axiosbtn.addEventListener("click", function() {
  axios
    .get(url)
    .then(function(res) {
      display.innerText = res.data[0];
    })
    .catch(function() {
      alert("ERROR!");
    });
});
