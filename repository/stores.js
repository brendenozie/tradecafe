// const { database, initializeApp , firestore, messaging } = require('firebase-admin');
var admin = require('firebase-admin');
const serviceccount = require('../sa.json');

admin.database.enableLogging(true);

admin.initializeApp({
    credential: admin.credential.cert(serviceccount),
    databaseURL: 'https://tradecafe58-d616c-default-rtdb.firebaseio.com/'
});


var db = admin.firestore();

module.exports.database=db;


module.exports.setUser = async function getUser(id) {
                            await db.collection('users').doc(id).set({
                                first: 'Liam',
                                last: 'Ragozzine',
                                address: '133 5th St., San Francisco, CA',
                                birthday: '05/13/1990',
                                age: '30'
                            });
                        }

module.exports.getUser = async function getUser(id) {
                            await db.collection('users').doc('vpeluso').set({
                                first: 'Vanessa',
                                last: 'Peluso',
                                address: '49 Main St., Tampa, FL',
                                birthday: '11/30/1977',
                                age: '47'
                            });
                        }

// get collection
module.exports.getAllusers = async function getUser() {
    const path_ref = db.collection("users");
    
    let collection = {};
    
    await path_ref.get().then((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
            collection[doc.id] = doc.data();
        })
      })

    return collection;

}

// get specifi document
// const liam = await db.collection('users').doc('liam').get();

module.exports.under30 = async function getUser(id) {
                                await db.collection('users').where('age', '<=', 40).get();
                            }

module.exports.observer = async function getUser(id) {
                                db.collection('users').doc('liam').onSnapshot(snapshot => {
                                    console.log(`changes: ${snapshot}`);
                                }, err => {
                                    console.log(`Error: ${err}`);
                                });
                            }

module.exports.updateUser = async function getUser(id) {
                                await db.collection('users').doc('lragozzine').set({
                                        married: true
                                        }, { merge: true });
                            }

 module.exports.liam = async function getUser(id) {
                            await db.collection('users').doc('lragozzine').update({
                                married: true
                            });
                        }

module.exports.deleteUser = async function getUser(id) {
                                    await db.collection('users').doc('lragozzine').delete(); 
                            }

module.exports.liamOrders = async function getUser(id) {
                                await db.collection('users').doc('lragozzine').collection('orders').doc('123').get();
                            }

module.exports.FieldValue = admin.firestore.FieldValue;

module.exports.r = async function getUser(id) {
                        await db.collection('users').doc('lragozzine').update({
                            married: FieldValue.delete(),
                        });
                    }

module.exports.getSubscibe = async function getSubscibe(id){
                                    await admin.messaging().subscribeToTopic(id.token, "topic")
                                            .then((response) => {
                                                    // See the MessagingTopicManagementResponse reference documentation
                                                    // for the contents of response.
                                                    console.log('Successfully subscribed to topic:', response);
                                                    return response;
                                                })
                                }

module.exports.getAccessToken = function getAccessToken() {
                                    return new Promise(function(resolve, reject) {
                                    const key = require(serviceccount);
                                    const jwtClient = new google.auth.JWT(
                                        key.client_email,
                                        null,
                                        key.private_key,
                                        SCOPES,
                                        null
                                    );
                                    jwtClient.authorize(function(err, tokens) {
                                        if (err) {
                                        reject(err);
                                        return;
                                        }
                                        resolve(tokens.access_token);
                                    });
                                    });
                                }

module.exports.getStores = function getStores(){
                                console.log("loading");
                                var st;
                                db.collection('Stores').once('value', (snashot) => {
                                    st = snashot.val();
                                }).catch(error => {
                                    console.error(error);
                                });

                            }

module.exports.getRestaurentStores=async function getstoreitemscat(id){
                                    console.log("loading");
                                    var st;
                                    await db.collection('Stores').orderByChild("sc_id").equalTo("restaurant").once('value', (snashot) => {
                                        var st = snashot.val();
                                        return st;
                                    }).catch(error => {
                                        console.error(error);
                                    });
                                };

module.exports.getShopsStores=async function getstoreitemscat(id){
                                console.log("loading");
                                var st;
                                await db.collection('Stores').orderByChild("sc_id").equalTo("shop").once('value', (snashot) => {
                                    var st = snashot.val();                                    
                                    console.log(st);
                                    return st;
                                }).catch(error => {
                                    console.error(error);
                                });
};

module.exports.getUserOrderCart=async function getUserOrderCart(uid){
    const path_ref = db.collection("orders");
    
    let collection = {};

    await path_ref.where('u_id', '==', `${uid}`)
    .get()
    .then(snapshots => {
            snapshots.docs.map((doc) => {
                collection[doc.id] = doc.data();
            })
    });  
    
    return collection;

};


module.exports.updatePayment=async function updatePayment(post){

    const path_ref =await db.collection("orders").doc(`${post.id}`).set({status:post.status}); 
    
    return path_ref;

};


module.exports.getMyReferrals=async function getMyReferrals(uid){
    const path_ref = db.collection("users");
    
    let collection = {};
    
    await path_ref.where("referralcode", '==', `${uid}`)
    .get()
    .then((querySnapshot) => {
        if (querySnapshot.size > 0){
            console.log("something");
            querySnapshot.docs.map((doc) => {
                collection[doc.id] = doc.data();
            })
    } else{
        console.log("nothinnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnng")
    }
    }
); 


      return collection;

};

module.exports.getChatDetails=async function getChatDetails(uid){
    const path_ref = db.collection("chats").doc(`${uid}`).collection('messages');
    
    let collection = {};

    await path_ref.where('u_id', '==', `${uid}`)
    .get()
    .then(snapshots => {
            snapshots.docs.map((doc) => {
                collection[doc.id] = doc.data();
            })
    });  
    
    return collection;

};

module.exports.getOrderHistory=async function getOrderHistory(uid){
    const path_ref = db.collection("orders");
    
    let collection = {};
    
    await path_ref.get().then((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
            collection[doc.id] = doc.data();
        })
      })

    return collection;

};

module.exports.getOrderCart=async function getOrderCart(uid){
    const path_ref = db.collection("payments");
    
    let collection = {};

    await path_ref.where('CheckoutRequestID', '==', `${uid}`)
    .get()
    .then(snapshots => {
            snapshots.docs.map((doc) => {
                collection[doc.id] = doc.data();
            })
    });  
    
    return collection;

};

module.exports.uploadPost = async function uploadPost(post){

    await db.collection('posts').add(post); 
  
    return post;
}

module.exports.uploadChat = async function uploadChat(post){

    // await db.collection('chats').doc(`${post.u_id}`);//.add(post); 
    const washingtonRef = db.collection('chats').doc(`${post.u_id}`).collection('messages').add(post);

    // Atomically add a new region to the "regions" array field.
    // const unionRes = await washingtonRef.set({
    //     messages: FieldValue.arrayUnion('greater_virginia')
    // });
  
    return post;
}

module.exports.editPost = async function editPost(post){

    await db.collection('posts').doc(`${post.id}`).set(post); 
  
    return post;
}


module.exports.loginCheck = async function loginCheck(message){

    var usr = {};

    const userS = db.collection("users");

    await userS.where('email', '==', `${message.email}`)
    .get()
    .then(async snapshots => {
        if (snapshots.size > 0){
           snapshots.docs.map((doc) => {
                let usl = doc.data();
                if (usl.password == message.password) {
                    usl.id=doc.id;
                    usr=usl;
                }
            });
        } 
    }); 
    
    return usr;
}

module.exports.uploadMessageBody = async function uploadMessageBody(message){

    await db.collection('emailmessages').add(message);
  
    return message;
}

module.exports.subMessageBody = async function subMessageBody(message){

    await db.collection('subscriber').add(message);
  
    return message;
}

module.exports.deleteBlog = async function deleteBlog(kid){

    await db.collection('posts').doc(`${kid}`).delete();
  
    return kid;
}

module.exports.uploadZoomLink = async function uploadZoomLink(zoom){

    await db.collection('zoomlink').doc("zoom1").set(zoom);
  
    return zoom;
}

module.exports.uploadTestimonial = async function uploadTestimonial(testimony){

        await db.collection('testimonial').doc(testimony.uid).set(testimony);
  
    return testimony;
}


module.exports.getApprovedTestimonials=async function getApprovedTestimonials(){
    const path_ref = db.collection("testimonial");
    
    let collection = {};

    await path_ref.where('status', '==', `approved`)
    .get()
    .then(snapshots => {
            snapshots.docs.map((doc) => {
                collection[doc.id] = doc.data();
            })
    });  
    
    return collection;

};

// get collection
module.exports.getAllTestimonials = async function getAllTestimonials() {
    const path_ref = db.collection("testimonial");
    
    let collection = {};
    
    await path_ref.get().then((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
            collection[doc.id] = doc.data();
        })
      })

    return collection;

}

// get collection
module.exports.getAllzoom = async function getZoom() {
    const path_ref = db.collection("zoomlink");
    
    let collection = {};
    
    await path_ref.get().then((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
            collection[doc.id] = doc.data();
        })
      })

    return collection;

}

// get collection
module.exports.getAllposts = async function getPosts() {
    const path_ref = db.collection("posts");
    
    let collection = {};
    
    await path_ref.get().then((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
            collection[doc.id] = doc.data();
        })
      })

    return collection;

}
// get collection
module.exports.getAllEmails = async function getEmails() {
    const path_ref = db.collection("emailmessages");
    
    let collection = {};
    
    await path_ref.get().then((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
            collection[doc.id] = doc.data();
        })
      })

    return collection;

}
// get collection
module.exports.getAllChats = async function getAllChats() {
    
    const path_ref = db.collection("chats");
    
    let collection = {};
    
    await path_ref.get().then((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
            collection[doc.id] = doc.data();
        })
      })

    return collection;

}


module.exports.getSpecificBlog=async function getSpecificBlog(id){
    // const path_ref = db.collection("posts");
    
    let collection = {};

    const cityRef = db.collection('posts').doc(`${id}`);
    
    const doc = await cityRef.get();
    if (!doc.exists) {
        collection='No such document!';
    } else {
        collection[id] = doc.data();
    } 
    
    return collection;

};

module.exports.uploadCart = async function uploadCart(cart){
    
    var usr =  {};

    const userS = db.collection("users");

    await userS.where('email', '==', `${cart.email}`)
    .get()
    .then(async snapshots => {
        if (snapshots.size > 0){
            usr = snapshots.docs[0].data();
            usr.id=snapshots.docs[0].id;
        } else {                
                usr=await userS.add({
                    phone: cart.phone,
                    firstname: cart.firstname,
                    lastname: cart.lastname,
                    message: cart.message,
                    password: cart.password,
                    email: cart.email,       
                    myreferralcode: cart.myreferralcode,
                    referralcode:cart.myreferralcode,                
                    subscription: cart.subscription,
                    course: cart.course
                });
        }
    });  

    var ord = {
        address:"web",
        amount_paid:"0.00",
        order_date:Date.now(),
        course: cart.course,
        merchantRequestID:cart.merchantRequestID,
        checkoutRequestID:cart.checkoutRequestID,
        status:"pending",
        total:"1",
        u_id:usr.id,
        username:`${cart.firstname} ${cart.lastname} `
    }
    if(cart.subscription=='Monthly Ksh 5000'){
        ord.amount_paid=5000;
    }else if(cart.subscription=='Annually Ksh 10000'){
        ord.amount_paid=10000;
    }else if(cart.subscription=='Lifetime ksh 20000'){
        ord.amount_paid=20000;
    } else{
        ord.total=cart.subscription;
        ord.amount_paid=cart.subscription;
    } 

    await db.collection('orders').add(ord); 
  
    return usr;
}

module.exports.updateTestimonial= async function updateTestimonial(id) {
    const testimonials = db.collection("testimonial");

    await testimonials.doc(id).update({ status: "approved" });

    return id;
}

module.exports.updateDenyTestimonial= async function updateDenyTestimonial(id) {
    const testimonials = db.collection("testimonial");

    await testimonials.doc(id).update({ status: "notapproved" });

    return id;
}


module.exports.updateOrder = async function updateOrder(details,resp){
                                //get orders
                                var st;
                                if(resp.ResultCode=='0'){

                                    const ORDER_ITEMS = db.collection("orders");

                                    ORDER_ITEMS.where('checkoutRequestID', '==', `${resp.CheckoutRequestID}`)
                                    .get()
                                    .then(snapshots => {
                                        if (snapshots.size > 0) {
                                            snapshots.forEach(orderItem => {
                                                ORDER_ITEMS.doc(orderItem.id).update({ status: "paid" })
                                            })
                                        }
                                    });
                                    
                                }
                                
                                ///save payment details
                                const ord_ref = await db.collection("payments").add(resp);

                                const message = {
                                                    data: {
                                                        score: JSON.stringify(resp)
                                                    },
                                                    token: details
                                                };
                                    
                                    // Send a message to the device corresponding to the provided
                                    // registration token.
                                    admin.messaging().send(message)
                                        .then((response) => {
                                            // Response is a message ID string.
                                            console.log('Successfully sent message:', response);
                                        })
                                        .catch((error) => {
                                            console.log('Error sending message:', error);
                                        });

                                return resp;
}

module.exports.updateCurrentOrder = async function updateCurrentOrder(resp){
                                            await db.collection('orders/'+ resp.order_id).set(resp, async function(error) {
                                            });
                                        return resp;
                                    }

module.exports.updateItem=async function updateItem(details){

    const path_ref = db.ref("store_items").child(details.sti_id);

    await path_ref.set(details, function(error) {

        if (error) {
            console.log("Data could not be saved." + error);
            details="";
        } else {
            console.log("Data saved successfully.");
            
        }        

    });

    return details;

}