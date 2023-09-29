const { Router}= require('express');
const router = Router();
var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({extended:false});
require('dotenv').config();
var Email = require('../lib/email.js');
var srs = require('../repository/stores');
const mpesa = require('../controller/mpesa');

router.get('/',async function(req, res){

    if(!req.session.cart) {
        req.session.cart = {mtoken:"", 
        id: "",
        phone: "",
        subscription: "",
        firstname: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }    
    
    var psts=await srs.getApprovedTestimonials();

    res.render('index',{cart:req.session.cart,psts:psts});     
});

router.get('/crypto', function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"", 
        id: "",
        phone: "",
        firstname: "",
        subscription: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    res.render('crypto',{cart:req.session.cart});     
});


router.get('/login', function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"", 
        id: "",
        phone: "",
        firstname: "",
        subscription: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    res.render('login');     
});

router.get('/mempro', async function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"", 
        id: "",
        phone: "",
        subscription: "",
        firstname: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   


    res.render('membershippro',{cart:req.session.cart});     
});

router.get('/mentorship', async function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"", 
        id: "",
        phone: "",
        subscription: "",
        firstname: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   


    res.render('mentorship',{cart:req.session.cart});     
});


router.get('/payments', async function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"", 
        id: "",
        phone: "",
        subscription: "",
        firstname: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   


    res.render('paymentsfx',{cart:req.session.cart});     
});

router.get('/signals', async function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"", 
        id: "",
        phone: "",
        subscription: "",
        firstname: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   


    res.render('signals',{cart:req.session.cart});     
});

// router.get('/mempro', async function(req, res){
    
//     if(!req.session.cart) {
//         req.session.cart = {mtoken:"", 
//         id: "",
//         phone: "",
//         subscription: "",
//         firstname: "",
//         lastname: "",
//         course: "",
//         message: "",
//         merchantRequestID:'',
//         checkoutRequestID:''
//         };
//     }   


//     res.render('membershippro',{cart:req.session.cart});     
// });

router.get('/ad23sh', async function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"", 
        id: "",
        phone: "",
        firstname: "",
        subscription: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    var zoom=await srs.getAllzoom();
    res.render('admindash',{cart:req.session.cart,zms:zoom}); 
});

router.post('/sendmail',urlencodedparser,async function(req, res) {
    if(!req.session.cart) {
        req.session.cart = {
            items: [],
            totals: 0.00,
            pricetotals:0.00,
            delivary_payment:0.00,
            subscription: "",
            id:"",
            shipping:"",
            merchantRequestID:"",
            checkoutRequestID:"",
            picktime:"",
            promocode:"",
            promoamount:0.00,
            mtoken:""
        };
    } 

    let messageBody = {message:req.body.message,
                        subject:req.body.subject,
                        dte:Date.now().toLocaleString()};
    
    var lgin=await srs.uploadMessageBody(messageBody);

    var usrs=await srs.getAllusers();

    Object.values(usrs).forEach(item => {
        if(item.email){
            let email=item.email;
            let registerEmailParams = {};
            registerEmailParams.to = email;
            registerEmailParams.subject = `${req.body.subject}`;
            registerEmailParams.text = `Hello ${email}, ${req.body.message} !`;
            let sendRegisterEmail = Email.email(registerEmailParams);
        }
    });

    return res.send({
        success:true,
        data:usrs
    });     
    
});

router.post('/uploadsucriber',urlencodedparser,async function(req, res) {
    if(!req.session.cart) {
        req.session.cart = {
            items: [],
            totals: 0.00,
            pricetotals:0.00,
            delivary_payment:0.00,
            subscription: "",
            id:"",
            shipping:"",
            merchantRequestID:"",
            checkoutRequestID:"",
            picktime:"",
            promocode:"",
            promoamount:0.00,
            mtoken:""
        };
    } 

    let messageBody = {subscriber:req.body.subscriber};
    
    var lgin=await srs.subMessageBody(messageBody);

    return res.send({
        success:true,
        data:lgin
    });     
    
});

router.post('/loginconfirmcheck',urlencodedparser,async function(req, res) {
    if(!req.session.cart) {
        req.session.cart = {
            items: [],
            totals: 0.00,
            pricetotals:0.00,
            delivary_payment:0.00,
            subscription: "",
            id:"",
            shipping:"",
            merchantRequestID:"",
            checkoutRequestID:"",
            picktime:"",
            promocode:"",
            promoamount:0.00,
            mtoken:""
        };
    } 

    let messageBody = {email:req.body.email,
                        password:req.body.password};
    
    var lgin=await srs.loginCheck(messageBody);

    if(lgin){
            req.session.cart = {mtoken:"reqbodytoken",
                phone: lgin.phone,
                id: lgin.id,
                firstname: lgin.firstname,
                lastname: lgin.lastname,
                email: lgin.email,                
                subscription: lgin.subscription,
                course: lgin.course,
                message: lgin.message,
                password: "&&&&&&&",
                merchantRequestID:'',
                checkoutRequestID:''
                };
            }

    return res.send({
        success:true,
        data:lgin
    });     
    
});

router.post('/deleteblog',urlencodedparser,async function(req, res) {
    if(!req.session.cart) {
        req.session.cart = {
            items: [],
            totals: 0.00,
            pricetotals:0.00,
            delivary_payment:0.00,
            subscription: "",
            id:"",
            shipping:"",
            merchantRequestID:"",
            checkoutRequestID:"",
            picktime:"",
            promocode:"",
            promoamount:0.00,
            mtoken:""
        };
    } 

    let keyid = {message:req.body.keyid};
    
    var lgin=await srs.deleteBlog(keyid);

    return res.send({
        success:true,
        data:lgin
    });     
    
});

router.get('/admintestimonial', async function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        lastname: "",
        subscription: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    var psts=await srs.getAllTestimonials();
    res.render('admintestimonials',{cart:req.session.cart,psts:psts});     
});

router.get('/blogposts', async function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        lastname: "",
        subscription: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    var psts=await srs.getAllposts();
    res.render('viewblogpost',{cart:req.session.cart,psts:psts});  
});

router.get('/massemails', async function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        lastname: "",
        course: "",
        subscription: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    
    var psts=await srs.getAllEmails();
    res.render('viewsendemails',{cart:req.session.cart,psts:psts});     
});

router.get('/viewchatsadminn', async function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        lastname: "",
        course: "",
        subscription: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   
    
    var accounts=await srs.getAllusers();

    res.render('viewchatsadmin',{cart:req.session.cart,accs:accounts});     

});

router.get('/viewblog/:id', async function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"", 
        id: "",
        phone: "",
        firstname: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        subscription: "",
        checkoutRequestID:''
        };
    }   

    var stt=await srs.getSpecificBlog(req.params.id);
  

  res.render('singleitem',{stri:stt,cart:req.session.cart});

});

router.get('/accountspayments', async function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        subscription: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    var accounts=await srs.getAllusers();
    res.render('viewaccountpayments',{cart:req.session.cart,accs:accounts});  
});

router.get('/acwriting', function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"", 
        id: "",
        phone: "",
        subscription: "",
        firstname: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    res.render('acwriting',{cart:req.session.cart});     
});

router.get('/createtradingaccount', function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"", 
        id: "",
        phone: "",
        subscription: "",
        firstname: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    res.render('fxaccount',{cart:req.session.cart});     
});

router.get('/contentcreation', function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"", 
        id: "",
        phone: "",
        firstname: "",
        lastname: "",
        course: "",
        message: "",
        subscription: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    res.render('contentcreation',{cart:req.session.cart});     
});

router.get('/dmarketing', function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"", 
        id: "",
        phone: "",
        firstname: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    res.render('digitalmarketing',{cart:req.session.cart});     
});

router.get('/dshipping', function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"", 
        id: "",
        phone: "",
        firstname: "",
        lastname: "",
        subscription: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    res.render('dropshipping',{cart:req.session.cart});     
});

router.get('/forex', function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"", 
        id: "",
        phone: "",
        firstname: "",
        subscription: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    res.render('forex',{cart:req.session.cart});     
});

router.get('/about', function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"", 
        id: "",
        phone: "",
        firstname: "",
        lastname: "",
        subscription: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    res.render('about',{cart:req.session.cart});     
});

router.get('/courses',function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        subscription: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    res.render('courses',{cart:req.session.cart});    
});

router.get('/teacher',function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        subscription: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    res.render('teacher',{cart:req.session.cart});         
});

router.get('/blog',async function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        lastname: "",
        course: "",
        subscription: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    var psts=await srs.getAllposts();
    var zoom=await srs.getAllzoom();
    if(req.session.cart.id) {
        res.render('blog',{cart:req.session.cart,psts:psts,zms:zoom});       
    }else{
        req.session.current_url=req.originalUrl;
        res.redirect('/mempro');
    }
});

router.get('/newpost',function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        subscription: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   
    
    res.render('addpost',{cart:req.session.cart});         
});

router.get('/editblog',function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "",
        firstname: "", 
        id: "",
        subscription: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   
    var veh= JSON.parse(decodeURIComponent(req.query.data));
    var keyid=req.query.field1;
    res.render('editpost',{cart:req.session.cart,vh:veh,ky:keyid});     
});

router.get('/contact',async function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        subscription: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    res.render('contact',{cart:req.session.cart});          
});

router.get('/lpding',function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        subscription: "",
        firstname: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    res.render('lipapending',{cart:req.session.cart});
});

router.get('/lpmding',function(req, res){
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        lastname: "",
        subscription: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    res.render('lipampesa',{cart:req.session.cart});
});

router.get('/accpay/:id',async (req, res)=>{    
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        subscription: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    var ords=await srs.getUserOrderCart(req.params.id);
    res.render('orderhistory',{cart:req.session.cart,ords:ords});
});

router.get('/viewchats/:id',async (req, res)=>{    
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        subscription: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    var ords=await srs.getChatDetails(req.params.id);
    
    const result =  Object.values(ords).sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
       // a=a.replace(/\,/g,'');
        // b=b.replace(/\,/g,'');
        return new Date(parseInt(a.dte.replace(/\,/g,''),10)) - new Date(parseInt(b.dte.replace(/\,/g,''), 10));
      });


    res.render('viewchatstest',{cart:req.session.cart,accs:result});
});

router.get('/phistory',async (req, res)=>{    
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        subscription: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    var ords=await srs.getOrderHistory("id")//cart.userid.u_id);
    res.render('orderhistory',{cart:req.session.cart,ords:ords});
});

router.get('/details/:id',async (req, res)=>{
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        lastname: "",
        course: "",
        message: "",
        subscription: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    let sess = req.session;
    let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
    var ordcs=await srs.getOrderCart(req.params.id);
    res.render('order-details',{cart:req.session.cart,ordcs:ordcs});
});

router.get('/confirmed', (req, res) => {
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        subscription: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    res.render('confirmed',{cart:req.session.cart});     
});

router.get('/fconfirmed', (req, res) => {
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        subscription: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    res.render('fconfirmed',{cart:req.session.cart});     
});

router.post('/addblogpost', async (req, res) => {

    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        subscription: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    let post = {author:req.body.author,
                title: req.body.title,
                post: req.body.post,
                dte: Date.now().toLocaleString()
        };
    
    var lgin=await srs.uploadPost(post);

    if(lgin){                               
        return res.send({
            success:true,
            data:post
        });            
    }else{
        return res.send({
            success:false,
            post
        });
    }
});

router.post('/uploadchat', async (req, res) => {

    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        subscription: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }  

    let cart = req.session.cart;

    if(cart.id){
            let post = {message:req.body.message,
                        u_id: cart.id,
                        firstname: cart.firstname,
                        lastname: cart.lastname,
                        phone: cart.phone,
                        dte: Date.now().toLocaleString()
                };
            
            var lgin=await srs.uploadChat(post);

            if(lgin){                               
                return res.send({
                    success:true,
                    data:post
                });            
            }else{
                return res.send({
                    success:false,
                    post
                });
            }
    }else{
        return res.send({
            success:false,
            data:"something errored"
        });
    }
});

router.post('/uploadadminchat', async (req, res) => {

    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        subscription: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    let post = {message:req.body.message,
                u_id: req.body.id,
                firstname: "admin",
                lastname: "admin",
                phone: "admin",
                dte: Date.now().toLocaleString()
        };
    
    var lgin=await srs.uploadChat(post);

    if(lgin){                               
        return res.send({
            success:true,
            data:post
        });            
    }else{
        return res.send({
            success:false,
            post
        });
    }
});

router.post('/approvePayment', async (req, res) => {

    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        subscription: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    let post = {status:req.body.status,
                ordid: req.body.ordid
        };
    
    var lgin=await srs.updatePayment(post);

    if(lgin){                               
        return res.send({
            success:true,
            data:post
        });            
    }else{
        return res.send({
            success:false,
            post
        });
    }
});

router.post('/editblogpost', async (req, res) => {

    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        subscription: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    let post = {id:req.body.id,
                author:req.body.author,
                title: req.body.title,
                post: req.body.post,
                dte: Date.now().toLocaleString()
        };
    
    var lgin=await srs.editPost(post);

    if(lgin){                               
        return res.send({
            success:true,
            data:post
        });            
    }else{
        return res.send({
            success:false,
            post
        });
    }
});

router.post('/updatezoomlink', async (req, res) => {

    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "",
        firstname: "", 
        id: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    let post = {zoomlink:req.body.zoomlink};
    
    var lgin=await srs.uploadZoomLink(post);

    if(lgin){                               
        return res.send({
            success:true,
            data:post
        });            
    }else{
        return res.send({
            success:false,
            post
        });
    }
});


router.post('/loaduid', async (req, res) => {

    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "",
        firstname: "", 
        id: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    let post = {uid:req.body.uid};
    
    var lgin=await srs.getChatDetails(post.uid);

    if(lgin){                               
        return res.send({
            success:true,
            data:lgin
        });            
    }else{
        return res.send({
            success:false,
            data:"Error"
        });
    }
});

router.post('/updatetestimonial', async (req, res) => {

    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "",
        firstname: "", 
        id: "",
        lastname: "",
        subscription: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    let cart = req.session.cart;

    if(cart.id != ""){
        let post = {uid:cart.id,
                    username: cart.firstname+" "+cart.lastname,
                    testimony: req.body.testimony,
                    state:"notapproved",
                    dte: Date.now().toLocaleString()
                };
        
        var lgin=await srs.uploadTestimonial(post);

        if(lgin){                               
            return res.send({
                success:true,
                data:post
            });            
        }else{
            return res.send({
                success:false,
                post
            });
        }
    }
    else{
        return res.send({
            success:false,
            error:"error sending"
        });
    }
});

router.get('/apprtest/:id', async (req, res) => {

    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        subscription: "",
        firstname: "",
        lastname: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    
    var lgin=await srs.updateTestimonial(req.params.id);

    if(lgin){                               
        return res.send({
            success:true,
            data:lgin
        });            
    }else{
        return res.send({
            success:false,
            post
        });
    }
});

router.get('/appdtest/:id', async (req, res) => {

    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "",
        firstname: "",
        lastname: "",
        subscription: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    
    var lgin=await srs.updateDenyTestimonial(req.params.id);

    if(lgin){                               
        return res.send({
            success:true,
            data:lgin
        });            
    }else{
        return res.send({
            success:false,
            post
        });
    }
});

router.post('/lipa-na-mpesa', async (req, res) => {
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        lastname: "",
        subscription: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    req.session.cart = {mtoken:req.body.token,
                phone: req.body.phone,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,                
                subscription: req.body.subscription,
                course: req.body.course,
                message: req.body.message,
                password: "77777",
                merchantRequestID:'',
                checkoutRequestID:''
                };

    let cart = req.session.cart;
    
    cart.password= req.body.password;
    cart.merchantRequestID="MerchantRequestID";
    cart.checkoutRequestID="CheckoutRequestID";
    var lgin=await srs.uploadCart(cart);

    if(lgin.id){
        req.session.cart.id = lgin.id;
    }

    if(lgin){                               
        return res.send({
            success:true,
            data:lgin
        });            
    }else{
        return res.send({
                    success:false,
                    data
                });
    }
});

router.post('/rview',urlencodedparser,async (req, res)=> {
    
    if(!req.session.cart) {
        req.session.cart = {mtoken:"",
        phone: "", 
        id: "",
        firstname: "",
        lastname: "",
        subscription: "",
        course: "",
        message: "",
        merchantRequestID:'',
        checkoutRequestID:''
        };
    }   

    let sess = req.session;
    let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
    var details=req.body;
    
    var item=details.itm;
    var reviews=[];

    if(item.reviews!==undefined){

        reviews.push(item.reviews);

    }

    reviews.push({
        name:cart.userid.username,
        review:details.mrview,
        rating:details.rating
    });
    item.reviews=reviews;

    await srs.updateItem(item);

    res.send(item);
           
});

//route to get the auth token
router.get('/get-auth-token',mpesa.getOAuthToken);

//lipa na mpesa online 
router.post('/lipa-na-mpesaa',mpesa.getOAuthToken,mpesa.lipaNaMpesaOnline);

//lipa na pending
router.post('/lipa-pending',mpesa.getOAuthToken,mpesa.lipaNaMpesaPending);

//callback url
router.post('/lipa-na-mpesa-callback/:id',mpesa.lipaNaMpesaOnlineCallback);

module.exports = router;



