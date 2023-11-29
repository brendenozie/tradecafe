// Retrieve Firebase Messaging object.
firebase.initializeApp({
  apiKey: "AIzaSyDMw-nzlsau7yp-Oti96ytYEPbJm34Qq4Q",
  authDomain: "tradecafe58-d616c.firebaseapp.com",
  databaseURL: "https://tradecafe58-d616c-default-rtdb.firebaseio.com",
  projectId: "tradecafe58-d616c",
  storageBucket: "tradecafe58-d616c.appspot.com",
  messagingSenderId: "120194219146",
  appId: "1:120194219146:web:5d4bfda6e476c1a755c173",
  measurementId: "G-DEF5XZT1XV"
});

const messaging = firebase.messaging();

function sendProduct(item) {

var popup = document.getElementById(item.sti_id);
$('#img_'+item.sti_id).show();
$.ajax({
  url: "/counter",
  type: "POST",
  data: item,
    success: function(text) {
        $('.shopping-cart-list').html("");          
        
        if(text){

          popup.classList.toggle("show");
          var obj=JSON.parse(text);
          $('#img_'+item.sti_id).hide();
          $('.qty').html(obj.totals);
        
        for (var key in obj.items) 
        {
          var obj1 = obj.items[key];
          
          var mainElement = document.querySelector(".shopping-cart-list");
          var strt = document.createElement("div");
          strt.classList="product product-widget";
          strt.id="crtProduct";
          
          var start2 = document.createElement("div");
          start2.classList="product-thumb";
          var img= document.createElement("img");
          img.src=JSON.parse(obj1.item_image)[0];
          
          var prdctbdy=document.createElement('div');
          prdctbdy.classList='product-body ';
          var h3=document.createElement('h3');
          h3.classList='product-price';
          h3.innerText=obj1.item_pae;

          var spqty=document.createElement('span');
          spqty.classList='qty';
          spqty.innerText="  x "+obj1.item_qty;

          var h2=document.createElement('h2');
          h2.classList='product-name ';
          var a=document.createElement('a');
          a.innerText=obj1.item_name;
          var prdctbtns=document.createElement('button');
          prdctbtns.classList='cancel-btn';
          prdctbtns.onclick="";
          var btti=document.createElement('i');
          btti.classList='fa fa-trash';
          
          strt.appendChild(start2);
          start2.appendChild(img);

          strt.appendChild(prdctbdy);
          prdctbdy.appendChild(h3);
          h3.appendChild(spqty);
          prdctbdy.appendChild(h2);
          h2.appendChild(a);
          prdctbdy.appendChild(prdctbtns);
          
          prdctbtns.appendChild(btti);
          
          mainElement.appendChild(strt);
      }
      
    }else{
      console.log("ERRROR");
      $('#img').hide();
    }
    }
    
  });
}

function sendPending(item) {
  $.ajax({
    url: "/lpding",
    type: "GET",
    data:"ord"+ item,
    success: function(text) {
        
    }  
    });
}

function sendShopPage(item) {
  console.log(arguments);
}

function getImage(item) {
    myObject = JSON.parse(item);
    
    return myObject[0];

}

function doLogin(){
  var userid=document.getElementById('username').value;
  var password=document.getElementById('lpassword').value;
  if(userid==='' && password===''){
      alert("Enter all values");
  }
  else{

      $.ajax({
        url: "/logins",
        type: "POST",
        dataType:"json",
        contentType: "application/json",
        data:JSON.stringify({email : userid,password :password}),
          success: function(text) {
              // console.log(text);

              var x = document.getElementById("logjoin");
              var y = document.getElementById("logout");
              if (x.style.display === "none") {
                x.style.display = "block";
                y.style.display = "none";
              } else {
                x.style.display = "none";
                $('#myModal').modal('hide');
                y.style.display = "block";
              }

          }
        });
  }
}

function formatPhoneNumber(phoneNumber) {
  if (/^(254)[17]\d{8}$/.test(phoneNumber)){
    return phoneNumber;
  }else if (/^(0)[17]\d{8}$/.test(phoneNumber)){
    return `254${phoneNumber.substring(1, phoneNumber.length)}`
  }else if (/^(\+254)[17]\d{8}$/.test(phoneNumber)){
    return `${phoneNumber.substring(1, phoneNumber.length)}`
  }else{
    return ''
  }
  
}

function doNumberCheck(){

  var fname=document.getElementById('fname').value;  
  var lname=document.getElementById('lname').value; 
  var email=document.getElementById('email').value;
  var referralcode=document.getElementById('referralcode').value;
  var selCourse= $('#selCourse').find(":selected").text();
  var selSubscription= $('#selSubscription').find(":selected").text();
  var lphone=document.getElementById('lipapendingphone').value;
  var mess=document.getElementById('mess').value;
  var password=document.getElementById('password').value;
  
  var flphone=formatPhoneNumber(lphone);

  if(flphone===''){
      alert("No Phone number Detected..");
  }
  else{

    // messaging.requestPermission()
    // .then(function() {
    //   console.log('Notification permission granted.');
    //   // TODO(developer): Retrieve a Instance ID token for use with FCM.
    //   // ...
    //   // Get registration token. Initially this makes a network call, once retrieved
    // // subsequent calls to getToken will return from cache.
    // messaging.getToken({vapidKey: 'BEI_woLIVm6dvaqauqbuZE8-W5sTh4tInHNOP1s5z5CQnK8ROAD7d3fGhG1JdaIG8387kIiRGlxMatr5Fe4fVWw'})
    // .then((currentToken) => {

    //   // console.log('Message received. ', currentToken);
      
    //   if (currentToken) {

        // $("#preloader").on(100).fadeIn();
        // $(".preloader").on(150).fadeIn("slow");
        $('#ftco-loader').addClass('show');
        // $('.progress-br').removeClass('done');	

        $.ajax({
          url: "/lipa-na-mpesa",
          type: "POST",
          data:{token:"currentToken",password: password,phone: flphone,email: email,firstname: fname,lastname: lname,course: selCourse,subscription: selSubscription,message: mess,referralcode:referralcode},
          success: function(text) {
            
            // messaging.onMessage(function(payload) {
              
              // $('#ftco-loader').removeClass('show');
              // var jsonData = JSON.parse(payload.data.score);

              // console.log(jsonData);
              
              // // $('.progress-br').addClass('done');	
              
              // if(jsonData.ResultCode=="0"){
                if(text && selSubscription){
                  location.href="/blog";//"https://api.whatsapp.com/send?phone=254701958738";//"/confirmed";
                }else{
                  location.href="https://api.whatsapp.com/send?phone=254701958738";
                }
              // }else{
              //   location.href="/fconfirmed";
              // }

            // });
      
          }
            // success: function(text) {
              
            //   // console.log(text);
            //   // location.href="/confirmed";        
            //    messaging.onMessage(function(payload) {
            //     console.log('Message received. ', payload);
            //     // Update the UI to include the received message.
            //     // appendMessage(payload);
            //     // location.href="/confirmed";
            //    // console.log(payload);
            //    var jsonData = JSON.parse(payload.data.score);
            //   //  $("#preloader").on(500).fadeOut();
            //   //  $(".preloader").on(600).fadeOut("slow");
            //    $('.loader-container').addClass('done');
            //    $('.progress-br').addClass('done');	
            //    if(jsonData.ResultCode=="0"){
            //     location.href="/confirmed";
            //    }else{
            //     location.href="/fconfirmed";
            //    }

            //   });
        
            // }
          });
  //     } else {
  //       // Show permission request.
  //       console.log('No registration token available. Request permission to generate one.');
        
  //     }
  //   }).catch((err) => {
  //     console.log('An error occurred while retrieving token. ', err);
  //   });
  //   })
  //   .catch(function(err) {
  //     console.log('Unable to get permission to notify. ', err);
  //   });
  }
}

//resetUI();
function doCompletePay(){
  
  // Initialize the Firebase app in the service worker by passing in
 // your app's Firebase config object.
 // https://firebase.google.com/docs/web/setup#config-object
//  const fb =firebase.initializeApp({
//   apiKey: "AIzaSyDMw-nzlsau7yp-Oti96ytYEPbJm34Qq4Q",
//   authDomain: "tradecafe58-d616c.firebaseapp.com",
//   databaseURL: "https://tradecafe58-d616c-default-rtdb.firebaseio.com",
//   projectId: "tradecafe58-d616c",
//   storageBucket: "tradecafe58-d616c.appspot.com",
//   messagingSenderId: "120194219146",
//   appId: "1:120194219146:web:5d4bfda6e476c1a755c173",
//   measurementId: "G-DEF5XZT1XV"
// });
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// const messaging = firebase.messaging();

  var fname=$('#fname').val();    
  var lname=$('#lname').val();
  var selCourse=$('#selCourse').find(":selected").text();
  var lphone=$('#lipapendingphone').val();
  var mess=$('#mess').val();
  
  // var mrview=document.getElementById('lipapendingphone').value;
  var flphone=formatPhoneNumber(lphone);

  if(flphone===''){
      alert("No Phone number Detected..");
  }
  else{
    messaging.requestPermission().then(function() {
      console.log('Notification permission granted.');
      // TODO(developer): Retrieve a Instance ID token for use with FCM.
      // ...
      // Get registration token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken({vapidKey: 'BJUbGVPjcvvPAxPICDF0XTXj24OiNB4AWg9fXWUGCDlHC4_WEzhQva67Zznf8N5trnQ-JQLq_P0gWFno6PrjGPo'})
    .then((currentToken) => {
      // console.log('Message received. ', currentToken);
      if (currentToken) {
        $("#preloader").on(100).fadeIn();
        $(".preloader").on(150).fadeIn("slow");
        $('.loader-container').removeClass('done');
        $('.progress-br').removeClass('done');	
  
        $.ajax({
          url: "/lipa-pending",
          type: "POST",
          data:{token:currentToken,phone: flphone,firstname: fname,lastname: lname,course: selCourse,message: mess},
            success: function(text) {
                messaging.onMessage(function(payload) {
                
                var jsonData = JSON.parse(payload.data.score);
              
                $('.loader-container').addClass('done');
                $('.progress-br').addClass('done');	
                if(jsonData.ResultCode=="0"){
                location.href="/confirmed";
                }else{
                location.href="/fconfirmed";
                }

              });
        
            }
          });
      } else {
        // Show permission request.
        console.log('No registration token available. Request permission to generate one.');
        
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
    })
    .catch(function(err) {
      console.log('Unable to get permission to notify. ', err);
    });
  }
}

function doSignup(){

  var username=document.getElementById('rusername').value;
  var email=document.getElementById('email').value;
  var pnumb=document.getElementById('pnumb').value;
  var password=document.getElementById('password').value;
  var rpassword=document.getElementById('rpassword').value;
  var utype="user";
  var uid="";

  if(username!=='' && email!==''  && pnumb!=='' && password!=='' &&  rpassword!=='' && password !==rpassword || password !==rpassword){
      alert("Enter all values Correctly. Check your passwords..");
  }
  else{

      $.ajax({
        url: "/signups",
        type: "POST",
        dataType:"json",
        contentType: "application/json",
        data:JSON.stringify({
                              username : username,
                              email : email,
                              pnumb : pnumb,
                              password : password,
                              utype : utype,
                              uid : uid}),
          success: function(text) {
            
                var x = document.getElementById("logjoin");
              var y = document.getElementById("logout");
              if (x.style.display === "none") {
                x.style.display = "block";
                y.style.display = "none";
              } else {
                x.style.display = "none";
                $('#myModal').modal('hide');
                y.style.display = "block";
              }

          }
        });
  }
}

function doReview(item){

  var flphone=document.getElementById('myreview').value;
  const rbs = document.querySelectorAll('input[name="rating"]');
  let selectedValue;
  for (const rb of rbs) {
      if (rb.checked) {
          selectedValue = rb.value;
          break;
      }
  }

  if(flphone===''){
      alert("No review entered...");
  }
  else{

      $.ajax({
        url: "/rview",
        type: "POST",
        dataType:"json",
        contentType: "application/json",
        data:JSON.stringify({ itm : item,
                              mrview : flphone,
                            rating:selectedValue}),
          success: function(text) {
            
              // console.log(text);

              location.reload();

              // var x = document.getElementById("logjoin");
              // if (x.style.display === "none") {
              //   x.style.display = "block";
              //   var y = document.getElementById("logout");
              //   y.style.display = "none";
              // } else {
              //   x.style.display = "none";
              //   $('#myModal').modal('hide');
              //   var z = document.getElementById("logout");
              //   z.style.display = "block";
              // }

          }
        });
  }
}

function resetUI() {
  clearMessages();
  showToken('loading...');
  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  messaging.getToken({vapidKey: 'BEI_woLIVm6dvaqauqbuZE8-W5sTh4tInHNOP1s5z5CQnK8ROAD7d3fGhG1JdaIG8387kIiRGlxMatr5Fe4fVWw'})
  .then((currentToken) => {
    if (currentToken) {
      sendTokenToServer(currentToken);
      updateUIForPushEnabled(currentToken);
    } else {
      // Show permission request.
      console.log('No registration token available. Request permission to generate one.');
      // Show permission UI.
      updateUIForPushPermissionRequired();
      setTokenSentToServer(false);
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    showToken('Error retrieving registration token. ', err);
    setTokenSentToServer(false);
  });
}

function showToken(currentToken) {
  // Show token in console and UI.
  const tokenElement = document.querySelector('#token');
  tokenElement.textContent = currentToken;
}

// Send the registration token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
function sendTokenToServer(currentToken) {
  if (!isTokenSentToServer()) {
    console.log('Sending token to server...');
    // TODO(developer): Send the current token to your server.
    setTokenSentToServer(true);
  } else {
    console.log('Token already sent to server so won\'t send it again ' +
        'unless it changes');
  }
}

function isTokenSentToServer() {
  return window.localStorage.getItem('sentToServer') === '1';
}

function setTokenSentToServer(sent) {
  window.localStorage.setItem('sentToServer', sent ? '1' : '0');
}

function showHideDiv(divId, show) {
  const div = document.querySelector('#' + divId);
  if (show) {
    div.style = 'display: visible';
  } else {
    div.style = 'display: none';
  }
}

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // TODO(developer): Retrieve a registration token for use with FCM.
      // In many cases once an app has been granted notification permission,
      // it should update its UI reflecting this.
      resetUI();
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
}

function deleteToken() {
  // Delete registration token.
  messaging.getToken().then((currentToken) => {
    messaging.deleteToken(currentToken).then(() => {
      console.log('Token deleted.');
      setTokenSentToServer(false);
      // Once token is deleted update UI.
      resetUI();
    }).catch((err) => {
      console.log('Unable to delete token. ', err);
    });
  }).catch((err) => {
    console.log('Error retrieving registration token. ', err);
    showToken('Error retrieving registration token. ', err);
  });
}

// Add a message to the messages element.
function appendMessage(payload) {
  const messagesElement = document.querySelector('#messages');
  const dataHeaderElement = document.createElement('h5');
  const dataElement = document.createElement('pre');
  dataElement.style = 'overflow-x:hidden;';
  dataHeaderElement.textContent = 'Received message:';
  dataElement.textContent = JSON.stringify(payload, null, 2);
  messagesElement.appendChild(dataHeaderElement);
  messagesElement.appendChild(dataElement);
}

// Clear the messages element of all children.
function clearMessages() {
  const messagesElement = document.querySelector('#messages');
  while (messagesElement.hasChildNodes()) {
    messagesElement.removeChild(messagesElement.lastChild);
  }
}

function updateUIForPushEnabled(currentToken) {
  showHideDiv(tokenDivId, true);
  showHideDiv(permissionDivId, false);
  showToken(currentToken);
}

function updateUIForPushPermissionRequired() {
  showHideDiv(tokenDivId, false);
  showHideDiv(permissionDivId, true);
}

function updateProduct(item) {

  var pname = document.getElementById('prn_'+item.sti_id).value;
  var pprice = document.getElementById('prpr_'+item.sti_id).value;
  var pdescription = document.getElementById('prd_'+item.sti_id).value;

  item.sti_name=pname;
  item.sti_retail_price=pprice;
  item.st_desc=pdescription;

  var popup = document.getElementById(item.sti_id);
  $('#img_'+item.sti_id).show();

  $.ajax({
    url: "/updateProduct",
    type: "POST",
    data: item,
      success: function(text) {       
          if(text){
                popup.classList.toggle("show");
                $('#img_'+item.sti_id).hide();
          }else{
            console.log("ERRROR");
            $('#img').hide();
          }
      }
    });
  }
