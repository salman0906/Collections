const express = require('express');
const bodyParser = require('body-parser');
const app = express();
global.code="";
app.set('view engine', 'ejs');
let ejs = require('ejs');
app.use(bodyParser.urlencoded({extended: true}));
const mongoose = require('mongoose');
tdate = new Date();
require('dotenv').config();
const PDFDocument = require('pdfkit');
const fs = require('fs');
const pdf = new PDFDocument();
ACCOUNT_SID = 'ACac4b0eeaa5f41eeffacba00f9d8fbedf'
AUTH_TOKEN = '69213db7f2d597d9536fc6759932e4f3'
SERVICE_SID = 'ISd191298ae8d8d252cf187baef8b7c069'
const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);
mongoose.connect('mongodb+srv://admin-magus:1306@collections.rgdh6.mongodb.net/cash', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
function dte(a){
  if((a!=null)&&(a!="")){
   var date = (String((a).getDate())).length==1 ? ('0' + (String((a).getDate()))) : (String((a).getDate()));
   var mon = (String((a).getMonth()+1)).length==1 ? ('0' + (String((a).getMonth()+1))) : (String((a).getMonth()+1));
   return(date + '/' + mon + '/' + (String((a).getFullYear())));
 }
  else{
    var date = (String((tdate).getDate())).length==1 ? ('0' + (String((tdate).getDate()))) : (String((tdate).getDate()));
    var mon = (String((tdate).getMonth()+1)).length==1 ? ('0' + (String((tdate).getMonth()+1))) : (String((tdate).getMonth()+1));
    return(date + '/' + mon + '/' + (String((tdate).getFullYear())));
  }
}
global.cname="";
global.gst="";
global.cpno="";
global.cemail="";
global.address="";
const createrSchema = new mongoose.Schema({
  Company:String,
  n:Number,
  gst:String,
  phone:String,
  username:String,
  psw:String,
  Address:String,
  email:String,
  code:String,
  state:String,
  pan:String,
  sac:String,
  cin:String,
  cst:String
});

const stockschema = new mongoose.Schema({
  Beatname:String,
  Shopname:String,
  amt:String,
  code:String,
  date:String
});

const collSchema = new mongoose.Schema({
  date:String,
  Shopname: String,
  Beatname: String,
  amt:String,
  code:String
});

const saleSchema = new mongoose.Schema({
  Name: String,
  Uname: String,
  Phone: String,
  psw: String,
  code:String
});

const assignSchema = new mongoose.Schema({
  Name: String,
  Type:String,
  Bname: String,
  code:String
});

const returnschema = new mongoose.Schema({
  shop:String,
  billn:String,
  date:String,
  amt:String,
  code:String
});

const beatSchema = new mongoose.Schema({
  Beatname: String,
  Shopname: String,
  Phone: String,
  code:String,
  b1: String,
  b2: String,
  b3: String,
  b4: String,
  b5: String,
  d1: String,
  d2: String,
  d3: String,
  d4: String,
  d5: String,
  a1: String,
  a2: String,
  a3: String,
  a4: String,
  a5: String
});

const tempschema = new mongoose.Schema({
  Beatname: String,
  Shopname: String,
  code:String,
  billn: String,
  amt: String
});

const beatlSchema = new mongoose.Schema({
  Beatname: String,
  code:String
});

const Collection = mongoose.model("Collection", collSchema);

const Stock = mongoose.model("Stock",stockschema);

const Return = mongoose.model("Return", returnschema);

const Temp = mongoose.model("Temp", tempschema);

const Sale = mongoose.model("Sale", saleSchema);

const Creater = mongoose.model("Creater", createrSchema);

const Assign = mongoose.model("Assign", assignSchema);

function sendBulkMessages(messageBody, numberList){
    var numbers = [];
    for(i = 0; i < numberList.length; i++)
    {
        numbers.push(JSON.stringify({
            binding_type: 'sms', address: numberList[i]}))
    }

    const notificationOpts = {
      toBinding: numbers,
      body: messageBody,
    };

    client.notify
    .services(SERVICE_SID)
    .notifications.create(notificationOpts)
    .then(notification => console.log(notification.sid))
    .catch(error => console.log(error));
}

function de(s){
  if(s==''){
    return(dte(null));
  }
  var y=s.slice(0,4);
  var m=s.slice(5,7);
  var d=s.slice(8,10);
  return(d + '/' + m + '/' + y);
}
function ed(s){
  var y = s.slice(6,10);
  var m = s.slice(3,5);
  var d = s.slice(0,2);
  return(y + '-' + m + '-' + d);
}
const Beat = mongoose.model("Beat", beatSchema);

const BeatL = mongoose.model("BeatL", beatlSchema);
var name="",uname="",pno="" ,psw="",ph="";
global.beat="";
global.b111="";
global.a11=0;
global.a22=0;
global.a33=0;
global.a44=0;
global.a55=0;
global.amt=0;
global.b11="";
global.b22="";
global.b33="";
global.b44="";
global.pdf="";
global.b55="";
global.d11="";
global.d22="";
global.d33="";
global.d44="";
global.d55="";
global.ph="";
global.a=[];
global.b=[];
global.s=[];
global.p=[];
global.status;
global.shop="";
global.un="";
global.psw="";
global.name="";
global.pan="";
global.sac="";
global.cin="";
global.cst="";
global.h=[];
global.r=[];
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/alogin.html")
});
app.get('/alogin', function (req, res) {
  res.sendFile(__dirname + "/alogin.html")
});
app.post('/',function(req,res){
  global.un=req.body.uname;
  global.ps=req.body.psw;
  if(un=='creater'){
    if(ps=='74123'){
      res.sendFile(__dirname + '/creater.html');
    }
    else{
      res.sendFile(__dirname + '/invalid.html')
    }
  }
  else{
      Creater.findOne({username:req.body.uname},function(err,admins){
        if(admins!=null){
          global.cname=admins.Company;

          global.gst=admins.gst;
          global.cpno=admins.phone;
          global.cemail=admins.email;
          global.address=admins.Address;
          global.code=admins.code;
          if(admins.psw==req.body.psw){
            console.log(global.cname);
            res.redirect('/bill');
          }
          else{
            res.sendFile(__dirname + "/invalid.html")
          }
        }
      });
  }
});
app.post('/creater', function(req,res){
  const creater = new Creater ({
    Company:req.body.name,
    n:req.body.n,
    gst:req.body.gst,
    phone:req.body.phone,
    username:req.body.un,
    psw:req.body.psw,
    Address:(req.body.ad1) + ', ' + (req.body.ad2) + ', ' +  (req.body.city),
    state:req.body.state,
    code:req.body.name.slice(0,2) + req.body.phone.slice(0,3),
    email:req.body.email
  });
  creater.save();
  res.sendFile(__dirname + "/creater.html");
});
app.get('/bill', function (req, res) {
  var cs=[];
  BeatL.find({code:global.code},function(err,beatls){
  beatls.forEach(function(beatl) {
    cl=beatl.Beatname;
      cs.push(cl);
    });
    cs.sort();
    res.render("billing",{ss:cs,cname:global.cname});
    });
});
app.post('/bill', function(req,res){
  global.beat=req.body.sname;
  res.redirect('/bill1');
});
app.get('/bill1', function(req,res){
  var bs=[];
  Beat.find({code:global.code},function(err,beats){
  beats.forEach(function(beat) {
    if(global.beat==beat.Beatname){
      bs.push(beat.Shopname);
    }
    });
    bs.sort();
    console.log(bs);
    res.render("billing1",{shops:bs, beat:global.beat,cname:global.cname});
    });
});
app.post('/bill1', function(req,res){
  const temp = new Temp ({
    Beatname:global.beat,
    Shopname: req.body.Shopname,
    billn:req.body.bn,
    amt:req.body.ba,
    code:global.code
  });
  temp.save();
  res.redirect('/bill1');
});
app.get('/reports', function(req,res){
  res.render("records",{cname:global.cname})
});
app.get('/add', function (req, res) {
  Sale.find({code:global.code}).count(function(err, count){
    Creater.find({code:global.code},function(err,ns){
      ns.forEach(function(n){
        if(n.n>count){
          res.render('add',{cname:global.cname});
        }
        else{
          res.render('adderr',{cname:global.cname});
        }
      });
    });
  });
});
app.get('/edit', function (req, res) {
  var nsales=[];
  Sale.find({code:global.code},function(err,sales){
  sales.forEach(function(sale) {
    sl=sale.Name;
      nsales.push(sl);
    });
    res.render("edit",{ss:nsales,cname:global.cname});
    });
});
app.post('/edit', function (req, res) {
  Sale.find({code:global.code},function(err,sales){
    sales.forEach(function(sale){
      if(sale.Name == req.body.sname){
    name=sale.Name;
    uname=sale.Uname;
    pno=sale.Phone;
    psw=sale.psw;
  }
    });
    res.render("edit1",{sname:name,uname:uname,pno:pno,psw:psw,cname:global.cname});
});
});
app.post('/edit1', function (req, res){
  var name,uname,pno,psw;
  Sale.findOne({code:global.code,name:req.body.sname},function(err,SS){
    SS.remove();
  })
  const sale = new Sale ({
    code:global.code,
    Name: req.body.uname,
    Uname: req.body.sname,
    Phone: req.body.pno,
    psw: req.body.psw
  });
  sale.save();
  res.redirect("/edit");
});
app.post('/add', function(req,res){
  const sale = new Sale ({
    code:global.code,
    Name: req.body.sname,
    Uname: req.body.uname,
    Phone: req.body.pno,
    psw: req.body.psw
  });
  sale.save();
  res.redirect("/add");
});
app.get('/assign', function (req, res) {
  var nsales=[],bls=[];
  BeatL.find({code:global.code},function(err,beatls){
  beatls.forEach(function(beatl) {
    bl=beatl.Beatname;
      bls.push(bl);
    });
  Sale.find({code:global.code},function(err,sales){
  sales.forEach(function(sale) {
    sl=sale.Name;
      nsales.push(sl);
    });
    nsales.sort();
    bls.sort();
    res.render("assign",{ss:nsales, bb:bls,cname:global.cname});
    });
});
});
app.post('/assign', function(req,res){
  Assign.find({ code:global.code,Name: req.body.name }).remove().exec();
  const assign = new Assign ({
    Type: req.body.type,
    code:global.code,
    Name: req.body.name,
    Bname: req.body.beat
  });
  assign.save();
  res.redirect('assign');
});
app.get('/addbeat', function(req,res){
  res.render('addbeat',{cname:global.cname});
});
app.post('/addbeat', function(req,res){
    global.d1=de(req.body.pending1d);
    global.d2=de(req.body.pending2d);
    global.d3=de(req.body.pending3d);
    global.d4=de(req.body.pending4d);
    global.d5=de(req.body.pending5d);
    const beat = new Beat ({
      code:global.code,
      Beatname: req.body.bname,
      Shopname: req.body.shopname,
      Phone: req.body.pno,
      b1: String(req.body.pending1b),
      b2: String(req.body.pending2b),
      b3: String(req.body.pending3b),
      b4: String(req.body.pending4b),
      b5: String(req.body.pending5b),
      d1:global.d1,
      d2:global.d2,
      d3:global.d3,
      d4:global.d4,
      d5:global.d5,
      a1: String(req.body.pending1a),
      a2: String(req.body.pending2a),
      a3: String(req.body.pending3a),
      a4: String(req.body.pending4a),
      a5: String(req.body.pending5a)
  });
  beat.save();
  const beatl = new BeatL ({Beatname: req.body.bname,code:global.code});
  beatl.save();
  res.redirect('/addbeat');
});
app.get('/editbeat', function(req,res){
  var bls=[];
  BeatL.find({code:global.code},function(err,beatls){
  beatls.forEach(function(beatl) {
    bl=beatl.Beatname;
      bls.push(bl);
    });
    bls.sort();
    res.render("editbeat",{bb:bls,cname:global.cname});
    });
  });
app.post('/editbeat', function(req,res){
        global.d11=de(req.body.pending1d);
        global.d22=de(req.body.pending2d);
        global.d33=de(req.body.pending3d);
        global.d44=de(req.body.pending4d);
        global.d55=de(req.body.pending5d);
        const beat = new Beat ({
          code:global.code,
          Beatname: req.body.bname,
          Shopname: req.body.shopname,
          Phone: req.body.pno,
          b1: String(req.body.pending1b),
          b2: String(req.body.pending2b),
          b3: String(req.body.pending3b),
          b4: String(req.body.pending4b),
          b5: String(req.body.pending5b),
          d1:global.d11,
          d2:global.d22,
          d3:global.d33,
          d4:global.d44,
          d5:global.d55,
          a1: String(req.body.pending1a),
          a2: String(req.body.pending2a),
          a3: String(req.body.pending3a),
          a4: String(req.body.pending4a),
          a5: String(req.body.pending5a)
    });
    beat.save();
    res.redirect('editbeat');
});
app.get('/bd', function(req,res){
  BeatL.find({code:global.code},function(err,beats){
  var b=[];
  beats.forEach(function(beat) {
    b.push(beat.Beatname);
    });
    b.sort();
    res.render("bd",{beats:b,cname:global.cname});
    });
});
app.post('/bd', function(req,res){
  var bl=[];
  global.b=[];
  global.h=[];
  global.r=[];
  BeatL.find({code:global.code},function(err,beats){
  beats.forEach(function(beat) {
    console.log(beat);
    bl.push(beat.Beatname);
    bl.sort();
    });
    });
  Beat.find({code:global.code,Beatname:req.body.beat}, function(err,beats){
    beats.forEach(function(beat){
      global.h.push({bname:beat.Beatname,sname:beat.Shopname,pno:beat.Phone});
    });
    for(var i=0;i<global.h.length;i++){
      global.b.push(global.h[i].sname);
    }
    global.b.sort();
    console.log(global.b,global.h);
    for(i=0;i<global.b.length;++i){
      for(var j=0;j<global.b.length;j++){
      if(global.b[i]==global.h[j].sname){
        global.r.push({bname:global.h[j].bname,sname:global.h[j].sname,pno:global.h[j].pno});
      }
    }
  }
    res.render('bd1',{det:global.r,cname:global.cname,beats:bl});
  });
});
app.get('/dr' ,function(req,res){
  BeatL.find({code:global.code},function(err,beats){
  global.b=[];
  beats.forEach(function(beat) {
    console.log(beat);
    global.b.push(beat.Beatname);
    });
    global.b.sort();
    res.render("dr",{beats:global.b,cname:global.cname});
    });
});
app.post('/dr', function(req,res){
  global.a=[];
  global.h=[];
  global.r=[];
  global.b=[];
  global.s=[];
  global.amt=0;
  global.p=[];
  global.beat=req.body.beat;
  BeatL.find({code:global.code},function(err,beats){
  beats.forEach(function(beat) {
    console.log(beat);
    b.push(beat.Beatname);
    });
    b.sort();
  Collection.find({code:global.code,Beatname:req.body.beat},function(err,colls){
    colls.forEach(function(coll) {
      if((ed(coll.date)==ed(dte(null)))&&(coll.amt!='0')){
          global.h.push({sname:coll.Shopname,amt:coll.amt,date:coll.date});
        global.amt=global.amt+Number(coll.amt);
      }
    });
    for(var i=0;i<global.h.length;i++){
      global.s.push(global.h[i].sname);
    }
    global.s.sort();
    for(i=0;i<global.s.length;i++){
      for(var j=0;j<global.s.length;j++){
        if(global.h[j]!=undefined){
        if(global.s[i]==global.h[j].sname){
          global.r.push({sname:global.h[j].sname,amt:global.h[j].amt,date:global.h[j].date});
          delete global.h[j];
        }
       }
      }
    }
    res.render('dr1',{beats:global.b,det:global.r,tot:global.amt,cname:global.cname})
    });
  });
});
app.get('/cr', function(req,res){
  BeatL.find({code:global.code},function(err,beats){
  global.b=[];
  beats.forEach(function(beat) {
    global.b.push(beat.Beatname);
    });
    global.b.sort();
    res.render("cr",{beats:global.b,cname:global.cname});
    });
});
app.post('/cr', function(req,res){
  global.b=[];
  global.r=[];
  global.h=[];
  global.amt=0;
  BeatL.find({code:global.code},function(err,beats){
  beats.forEach(function(beat) {
    global.b.push(beat.Beatname);
    });
  Collection.find({code:global.code,Beatname:req.body.beat},function(err,colls){
    colls.forEach(function(coll) {
      if(((req.body.from<=ed(coll.date))&&(req.body.to>=ed(coll.date)))&&(coll.amt!='0')){
        global.h.push({sname:coll.Shopname,amt:coll.amt,date:coll.date});
      global.amt=global.amt+Number(coll.amt);
    }
  });
  for(var i=0;i<global.h.length;i++){
    global.s.push(global.h[i].sname);
  }
  global.s.sort();
  for(i=0;i<global.s.length;i++){
    for(var j=0;j<global.h.length;j++){
      if(global.h[j]!=undefined){
      if(global.s[i]==global.h[j].sname){
        global.r.push({sname:global.h[j].sname,amt:global.h[j].amt,date:global.h[j].date});
        delete global.h[j];
      }
    }
   }
  }
  res.render('cr1',{beats:global.b,det:global.r,tot:global.amt,cname:global.cname})
    });
  });
});
app.get('/rr', function(req,res){
  res.render("rr",{cname:global.cname});
});
app.post('/rr', function(req,res){
  global.b=[];
  global.s=[];
  global.h=[];
  global.r=[];
  Return.find({code:global.code},function(err,rets){
    rets.forEach(function(ret) {
      if((req.body.from<=ed(ret.date))&&(req.body.to>=ed(ret.date))){
          global.h.push({sname:ret.shop,amt:ret.amt,bill:ret.billn,date:ret.date});
      }
    });
    for(var i=0;i<global.h.length;i++){
      global.b.push(global.h[i].sname);
    }
    for (i = 0; i < global.b.length; i++) {
      for (var j = 0; j < global.b.length; j++) {
        if(global.h[j]!=undefined){
        if(global.b[i]==global.h[j].sname){
          global.r.push({sname:global.h[j].sname,amt:global.h[j].amt,bill:global.h[j].bill,date:global.h[j].date});
          delete global.h[j];
        }
       }
      }
    }
    res.render('rr1',{det:global.r,cname:global.cname})
});
});
app.get('/or', function(req,res){
  BeatL.find({code:global.code},function(err,beats){
  var b=[];
  beats.forEach(function(beat) {
    b.push(beat.Beatname);
    });
    b.sort();
    res.render("or",{beats:b,cname:global.cname});
    });
});
app.post('/or', function(req,res){
  global.s=[];
  global.a=[];
  global.b=[];
  global.amt=0;
  var s=[],b=[],a=[],c;
  BeatL.find({code:global.code},function(err,beatls){
  var b=[];
  beatls.forEach(function(beatl) {
    b.push(beatl.Beatname);
    });
    b.sort();
  Beat.find({code:global.code,Beatname:req.body.beat},function(err,beats){
  beats.forEach(function(beat) {
          global.s.push(beat.Shopname);
          global.a.push(Number(beat.a1)+Number(beat.a2)+Number(beat.a3)+Number(beat.a4)+Number(beat.a5));
          global.amt=global.amt + (Number(beat.a1)+Number(beat.a2)+Number(beat.a3)+Number(beat.a4)+Number(beat.a5));
          if(beat.a1=='0'){
            c=1;
          }
          else if(beat.a2=='0'){
            c=2;
          }
          else if(beat.a3=='0'){
            c=3;
          }
          else if(beat.a3=='0'){
            c=3;
          }
          else if(beat.a4=='0'){
            c=4;
          }
          else{
            c=5;
          }
          b.push(c-1);
          global.b.push({sname:beat.Shopname,amt:(Number(beat.a1)+Number(beat.a2)+Number(beat.a3)+Number(beat.a4)+Number(beat.a5)),c:c-1});
    });
    res.render('or1',{det:global.b,tot:global.amt,cname:global.cname,beats:b})
});
});
});
app.get('/sr', function(req,res){
  BeatL.find({code:global.code},function(err,beatls){
  var b=[];
  beatls.forEach(function(beatl) {
    b.push(beatl.Beatname);
    });
    b.sort();
  res.render("sr",{beats:b,cname:global.cname});
});
});
app.post('/sr', function(req,res){
  global.b=[];
  global.s=[];
  global.a=[];
  global.p=[];
  BeatL.find({code:global.code},function(err,beatls){
  var b=[];
  beatls.forEach(function(beatl) {
    b.push(beatl.Beatname);
    });
    b.sort();
  Stock.find({Beatname:req.body.beat,code:global.code},function(err,stocks){
    stocks.forEach(function(stock){
    if((ed(stock.date)>=req.body.from)&&ed(stock.date)<=req.body.to){
      global.s.push({bname:stock.Beatname,sname:stock.Shopname,amt:stock.amt,date:stock.date});
    }
    });
    for(var i=0;i<global.s.length;++i){
      global.b.push(global.s[i].sname);
  }
    for(i=0;i<global.s.length;i++){
      for(var j=0;j<global.s.length;j++){
        if(global.s[j]!=undefined){
        if(global.b[i]==global.s[j].sname){
          global.a.push({bname:global.s[i].bname,sname:global.s[i].sname,amt:global.s[i].amt,date:global.s[i].date});
          delete global.s[j];
        }
       }
      }
    }
  res.render('sr1',{beats:b,det:global.a,cname:global.cname})
});
});
});
app.get('/stock', function(req,res){
  var cs=[];
  BeatL.find({code:global.code},function(err,beatls){
  beatls.forEach(function(beatl) {
    cl=beatl.Beatname;
      cs.push(cl);
    });
    cs.sort();
    res.render("stock",{ss:cs,cname:global.cname});
    });
});
app.post('/stock', function(req,res){
  var a=[];
  global.beat=req.body.bname;
  Beat.find({code:global.code,Beatname:req.body.bname},function(err,beats){
    beats.forEach(function(beat){
      a.push(beat.Shopname);
    });
    a.sort();
    res.render('stock1',{ss:a,cname:global.cname});
    });
  });
app.post('/stock1', function(req,res){
  global.amt=Number(req.body.amt);
  global.shop=req.body.sname;
  Beat.find({code:global.code,Shopname:req.body.sname, Beatname:global.beat}, function(err,shs){
    shs.forEach(function(sh){
    global.ph=sh.Phone;
    global.a11=(Number(sh.a1));
    global.a22=(Number(sh.a2));
    global.a33=(Number(sh.a3));
    global.a44=(Number(sh.a4));
    global.a55=(Number(sh.a5));
    global.b11=sh.b1;
    global.b22=sh.b2;
    global.b33=sh.b3;
    global.b44=sh.b4;
    global.b55=sh.b5;
    global.d11=sh.d1;
    global.d22=sh.d2;
    global.d33=sh.d3;
    global.d55=sh.d5;
    global.d44=sh.d4;
      if(global.amt<global.a11){
        global.a11=(global.a11-global.amt);
      }
      else{
          global.a11=global.a11-global.amt;
          if(global.a11<0){
            global.a22=global.a22+global.a11;
            global.a11=0;
            if(global.a22<0){
              global.a33=global.a33+global.a22;
              global.a22=0;
              if(global.a33<0){
                global.a44=global.a44+global.a33;
                global.a33=0;
                if(global.a44<0){
                  global.a55=global.a55+global.a44;
                }
              }
            }
          }
      }
      while(global.a11==0){
        global.a11=global.a22;
        global.d11=global.d22;
        global.b11=global.b22;
        global.a22=global.a33;
        global.d22=global.d33;
        global.b22=global.b33;
        global.a33=global.a44;
        global.d33=global.d44;
        global.b33=global.b44;
        global.a44=global.a55;
        global.d44=global.d55;
        global.b44=global.b55;
        global.a55=0;
      }
  });
  console.log(global.a11);
  res.redirect('/stock2');
  });
});
app.get('/stock2', function(req,res){
  Beat.findOne({code:global.code,Shopname:global.shop, Beatname:global.beat},function(err,bb){
    console.log('Deleted');
    bb.remove();
  });
  console.log(global.a11);
  const beat = new Beat ({
    code:global.code,
    Beatname: global.beat,
    Shopname: global.shop,
    Phone: String(global.ph),
    b1: String(global.b11),
    b2: String(global.b22),
    b3: String(global.b33),
    b4: String(global.b44),
    b5: String(global.b55),
    d1: String(global.d11),
    d2: String(global.d22),
    d3: String(global.d33),
    d4: String(global.d44),
    d5: String(global.d55),
    a1: String(global.a11),
    a2: String(global.a22),
    a3: String(global.a33),
    a4: String(global.a44),
    a5: String(global.a55)
});
beat.save();
  var a='Sum of Rs.' + (global.amt.toString()) + ' has been reduced for stock return on' +  dte(null) + ' Outstanding Amount: ' +(global.a11+global.a22+global.a33+global.a44+global.a55);
  var p=[];
  p.push('+91' + global.ph);
  sendBulkMessages(a,p);
  const stock = new Stock({
    code:global.code,
    Beatname: global.beat,
    Shopname: global.shop,
    amt: String(global.amt),
    date: dte(null)
  });
  stock.save();
  res.redirect('/stock');
});
app.get('/pb', function(req,res){
  pdf.pipe(fs.createWriteStream('beatdetails.pdf'));
  pdf
  .fontSize(32)
  .font('Times-Roman')
  .text(global.cname,{
    align:'center'
  });
  pdf
  .fontSize(12)
  .font('Times-Roman')
  .text(global.address,{
    align:'center'
  });
  pdf
  .fontSize(12)
  .font('Times-Roman')
  .text('  ')
  .text('GSTIN: '+ global.gst + '                                                                            Phone: '+ global.cpno,{
    align:'left'
  });
  pdf.lineJoin('miter')
    .rect(30, 200, 500, 30)
    .stroke();
  pdf.text('Sno.',40,210)
   .lineCap('butt')
   .moveTo(65, 200)
   .lineTo(65, 230)
   .stroke()
   .text('Beat',155,210)
   .lineCap('butt')
   .moveTo(250, 200)
   .lineTo(250, 230)
   .stroke()
   .text('Shop',380,210);
   var recy=230;
  for(var i=0;i<(global.r).length;++i){
    pdf.text(i+1,40,(recy+10))
    .lineCap('butt')
    .moveTo(30, recy)
    .lineTo(30, recy+30)
    .stroke()
     .lineCap('butt')
     .moveTo(65, recy)
     .lineTo(65, recy+30)
     .stroke()
     .text(global.r[i].bname,100,recy+10)
     .lineCap('butt')
     .moveTo(250, recy)
     .lineTo(250, recy+30)
     .stroke()
     .text(global.r[i].sname,280,recy+10)
     .lineCap('butt')
     .moveTo(530, recy)
     .lineTo(530, recy+30)
     .stroke();
     recy=recy+30;
     if(recy>=680){
       pdf.addPage();
       recy=100;
     }
  }
  pdf.lineCap('butt')
  .moveTo(30, recy)
  .lineTo(530, recy)
  .stroke()
  pdf.end();
  global.pdf="beatdetails.pdf";
  res.redirect('/asset');
});
app.get('/dp', function(req,res){
  pdf.pipe(fs.createWriteStream('Collections.pdf'));
  pdf
  .fontSize(32)
  .font('Times-Roman')
  .text(global.cname,{
    align:'center'
  });
  pdf
  .fontSize(12)
  .font('Times-Roman')
  .text(global.address,{
    align:'center'
  });
  pdf
  .fontSize(12)
  .font('Times-Roman')
  .text('  ')
  .text('GSTIN: '+ global.gst + '                                                                            Phone: '+ global.cpno,{
    align:'left'
  });
  pdf
  .fontSize(20)
  .font('Times-Roman')
  .text(' ')
  .text('Beat: ' + global.beat)
  .text('   ')
  .fontSize(12);
  pdf.lineJoin('miter')
    .rect(30, 200, 500, 30)
    .stroke();
  pdf.text('Sno.',40,210)
   .lineCap('butt')
   .moveTo(65, 200)
   .lineTo(65, 230)
   .stroke()
   .text('Date',120,210)
   .lineCap('butt')
   .moveTo(200, 200)
   .lineTo(200, 230)
   .stroke()
   .text('Shop',280,210)
   .lineCap('butt')
   .moveTo(400, 200)
   .lineTo(400, 230)
   .stroke()
   .text('Amount',455,210);
   var recy=230;
  for(var i=0;i<(global.r).length;++i){
    pdf.text(i+1,40,(recy+10))
    .lineCap('butt')
    .moveTo(30, recy)
    .lineTo(30, recy+30)
    .stroke()
     .lineCap('butt')
     .moveTo(65, recy)
     .lineTo(65, recy+30)
     .stroke()
     .text(global.r[i].date,120,recy+10)
     .lineCap('butt')
     .moveTo(200, recy)
     .lineTo(200, recy+30)
     .stroke()
     .text(global.r[i].sname,250,recy+10)
     .lineCap('butt')
     .moveTo(400, recy)
     .lineTo(400, recy+30)
     .stroke()
     .text(global.r[i].amt,415,recy+10)
     .lineCap('butt')
     .moveTo(530, recy)
     .lineTo(530, recy+30)
     .stroke();
     recy=recy+30;
     if(recy>=680){
       pdf.addPage();
       recy=100;
     }
  }
  pdf.lineCap('butt')
  .moveTo(30, recy)
  .lineTo(530, recy)
  .stroke()
  .text('Total: ', 350,recy+10)
  .text(global.amt,415,recy+10);
  pdf.end();
  global.pdf="Collections.pdf";
  res.redirect('/asset');
});
app.get('/rp', function(req,res){
  pdf.pipe(fs.createWriteStream('Returns.pdf'));
  pdf
  .fontSize(32)
  .font('Times-Roman')
  .text(global.cname,{
    align:'center'
  });
  pdf
  .fontSize(12)
  .font('Times-Roman')
  .text(global.address,{
    align:'center'
  });
  pdf
  .fontSize(12)
  .font('Times-Roman')
  .text('  ')
  .text('GSTIN: '+ global.gst + '                                                                            Phone: '+ global.cpno,{
    align:'left'
  });
  pdf
  .fontSize(20)
  .font('Times-Roman')
  .text(' ')
  .text('Beat: ' + global.beat)
  .text('   ')
  .fontSize(12);
  pdf.lineJoin('miter')
    .rect(30, 200, 500, 30)
    .stroke();
  pdf.text('Sno.',40,210)
   .lineCap('butt')
   .moveTo(65, 200)
   .lineTo(65, 230)
   .stroke()
   .text('Date',100,210)
   .lineCap('butt')
   .moveTo(150, 200)
   .lineTo(150, 230)
   .stroke()
   .text('Shop',250,210)
   .lineCap('butt')
   .moveTo(350, 200)
   .lineTo(350, 230)
   .stroke()
   .text('Bill no.',400,210)
   .lineCap('butt')
   .moveTo(450, 200)
   .lineTo(450, 230)
   .stroke()
   .text('Amount',480,210)
   var recy=230;
  for(var i=0;i<(global.r).length;++i){
    pdf.lineCap('butt')
    .moveTo(30, recy)
    .lineTo(30, recy+30)
    .stroke()
    pdf.text(i+1,40,recy+10)
     .lineCap('butt')
     .moveTo(65, recy)
     .lineTo(65, recy+30)
     .stroke()
     .text(global.r[i].date,80,recy+10)
     .lineCap('butt')
     .moveTo(150, recy)
     .lineTo(150, recy+30)
     .stroke()
     .text(global.r[i].sname,220,recy+10)
     .lineCap('butt')
     .moveTo(350, recy)
     .lineTo(350, recy+30)
     .stroke()
     .text(global.r[i].bill,400,recy+10)
     .lineCap('butt')
     .moveTo(450, recy)
     .lineTo(450, recy+30)
     .stroke()
     .text(global.r[i].amt,480,recy+10)
     .lineCap('butt')
     .moveTo(530, recy)
     .lineTo(530, recy+30)
     .stroke()
     recy=recy+30;
     if(recy>=680){
       pdf.addPage();
       recy=100;
     }
  }
  pdf.lineCap('butt')
  .moveTo(30, recy)
  .lineTo(530, recy)
  .stroke()
  pdf.end();
  global.pdf="Returns.pdf";
  res.redirect('/asset');
});
app.get('/op', function(req,res){
  pdf.pipe(fs.createWriteStream('Outstandings.pdf'));
  pdf
  .fontSize(32)
  .font('Times-Roman')
  .text(global.cname,{
    align:'center'
  });
  pdf
  .fontSize(12)
  .font('Times-Roman')
  .text(global.address,{
    align:'center'
  });
  pdf
  .fontSize(12)
  .font('Times-Roman')
  .text('  ')
  .text('GSTIN: '+ global.gst + '                                                                            Phone: '+ global.cpno,{
    align:'left'
  });
  pdf
  .fontSize(20)
  .font('Times-Roman')
  .text(' ')
  .text('Beat: ' + global.beat)
  .text('   ')
  .fontSize(12);
  pdf.lineJoin('miter')
    .rect(30, 200, 500, 30)
    .stroke();
    pdf.text('Sno.',40,210)
     .lineCap('butt')
     .moveTo(65, 200)
     .lineTo(65, 230)
     .stroke()
     .text('Shop',120,210)
     .lineCap('butt')
     .moveTo(200, 200)
     .lineTo(200, 230)
     .stroke()
     .text('Bills',280,210)
     .lineCap('butt')
     .moveTo(400, 200)
     .lineTo(400, 230)
     .stroke()
     .text('Amount',455,210);
     var recy=230;
    for(var i=0;i<(global.b).length;++i){
      pdf.text(i+1,40,(recy+10))
      .lineCap('butt')
      .moveTo(30, recy)
      .lineTo(30, recy+30)
      .stroke()
       .lineCap('butt')
       .moveTo(65, recy)
       .lineTo(65, recy+30)
       .stroke()
       .text(global.b[i].sname,120,recy+10)
       .lineCap('butt')
       .moveTo(200, recy)
       .lineTo(200, recy+30)
       .stroke()
       .text(global.b[i].c,250,recy+10)
       .lineCap('butt')
       .moveTo(400, recy)
       .lineTo(400, recy+30)
       .stroke()
       .text(global.b[i].amt,405,recy+10)
       .lineCap('butt')
       .moveTo(530, recy)
       .lineTo(530, recy+30)
       .stroke();
     recy=recy+30;
     if(recy>=680){
       pdf.addPage();
       recy=100;
     }
  }
  pdf.lineCap('butt')
  .moveTo(30, recy)
  .lineTo(530, recy)
  .stroke()
  .text('Total: ', 350,recy+10)
  .text(global.amt,405,recy+10);
  pdf.end();
  global.pdf="Outstandings.pdf";
  res.redirect('/asset');
});
app.get('/sp',function(req,res){
  pdf.pipe(fs.createWriteStream('Returns.pdf'));
  pdf
  .fontSize(32)
  .font('Times-Roman')
  .text(global.cname,{
    align:'center'
  });
  pdf
  .fontSize(12)
  .font('Times-Roman')
  .text(global.address,{
    align:'center'
  });
  pdf
  .fontSize(12)
  .font('Times-Roman')
  .text('  ')
  .text('GSTIN: '+ global.gst + '                                                                            Phone: '+ global.cpno,{
    align:'left'
  });
  pdf
  .fontSize(20)
  .font('Times-Roman')
  .text(' ')
  .text('Beat: ' + global.beat)
  .text('   ')
  .fontSize(12);
  pdf.lineJoin('miter')
    .rect(30, 200, 500, 30)
    .stroke();
  pdf.text('Sno.',40,210)
   .lineCap('butt')
   .moveTo(65, 200)
   .lineTo(65, 230)
   .stroke()
   .text('Date',100,210)
   .lineCap('butt')
   .moveTo(150, 200)
   .lineTo(150, 230)
   .stroke()
   .text('Shop',220,210)
   .lineCap('butt')
   .moveTo(330, 200)
   .lineTo(330, 230)
   .stroke()
   .text('Beat',380,210)
   .lineCap('butt')
   .moveTo(450, 200)
   .lineTo(450, 230)
   .stroke()
   .text('Amount',480,210)
   var recy=230;
  for(var i=0;i<(global.a).length;++i){
    pdf.lineCap('butt')
    .moveTo(30, recy)
    .lineTo(30, recy+30)
    .stroke()
    pdf.text(i+1,40,recy+10)
     .lineCap('butt')
     .moveTo(65, recy)
     .lineTo(65, recy+30)
     .stroke()
     .text(global.a[i].date,80,recy+10)
     .lineCap('butt')
     .moveTo(150, recy)
     .lineTo(150, recy+30)
     .stroke()
     .text(global.a[i].sname,180,recy+10)
     .lineCap('butt')
     .moveTo(330, recy)
     .lineTo(330, recy+30)
     .stroke()
     .text(global.a[i].bname,350,recy+10)
     .lineCap('butt')
     .moveTo(450, recy)
     .lineTo(450, recy+30)
     .stroke()
     .text(global.a[i].amt,480,recy+10)
     .lineCap('butt')
     .moveTo(530, recy)
     .lineTo(530, recy+30)
     .stroke()
     recy=recy+30;
     if(recy>=680){
       pdf.addPage();
       recy=100;
     }
  }
  pdf.lineCap('butt')
  .moveTo(30, recy)
  .lineTo(530, recy)
  .stroke()
  pdf.end();
  global.pdf="Returns.pdf";
  res.redirect('/asset');
});
app.get('/asset', function(request, response){
  console.log(global.pdf);
  response.download(global.pdf);
});
app.get('/profile',function(req,res){
  Creater.find({code:global.code},function(err,crs){
    crs.forEach(function(cr){
      global.cname=cr.Company;
      global.gst=cr.gst;
      global.cpno=cr.phone;
      global.address=cr.Address;
      global.state=cr.state
      global.un=cr.username;
      global.psw=cr.psw;
      global.email=cr.email;
      global.pan=cr.pan;
      global.sac=cr.sac;
      global.cin=cr.cin;
      global.cst=cr.cst;
    });
    res.render("profile",{cname:global.cname,gst:global.gst,pno:global.cpno,add:global.address,email:global.email,pan:global.pan,sac:global.sac,cin:global.cin,cst:global.cst});
  });
});
app.post('/profile',function(req,res){
  Creater.findOne({code:global.code},function(err,c){
    c.remove();
  });
  const creater = new Creater ({
    Company:req.body.cname,
    gst:req.body.gst,
    phone:req.body.phone,
    username:global.un,
    psw:global.psw,
    Address:(req.body.add),
    state:global.state,
    code:global.code,
    email:req.body.email,
    pan:req.body.pan,
    sac:req.body.sac,
    cin:req.body.cin,
    cst:req.body.cst
  });
  creater.save();
  res.redirect("/profile")
});
app.get('/ua', function(req,res){
  BeatL.find({code:global.code},function(err,beats){
  var b=[];
  beats.forEach(function(beat) {
    b.push(beat.Beatname);
    });
    b.sort();
    res.render("un1",{beats:b,cname:global.cname});
    });
});
app.post("/ua", function(req,res){
  var flag;
  global.q=[];
  global.b=[];
  BeatL.find({code:global.code}, function(err,beats){
    beats.forEach(function(beat){
      global.b.push(beat.Beatname);
  Beat.find({code:global.code,Beatname:req.body.beat}, function(err,beats){
    beats.forEach(function(beat){
      flag=0;
      Collection.find({code:global.code,Beatname:req.body.beat,date:dte(null)},function(err,colls){
        colls.forEach(function(coll){
            if(coll.Shopname==beat.Shopname){
              flag=1;
            }
        });
      });
      if(flag==0){
        global.q.push(beat.Shopname);
      }
    });
    global.q.sort();
    res.render('un',{shop:global.q,beats:global.b,cname:global.cname});
  });
});
});
});
app.get("/up", function(req,res){
  pdf.pipe(fs.createWriteStream('Unattended.pdf'));
  pdf
  .fontSize(32)
  .font('Times-Roman')
  .text(global.cname,{
    align:'center'
  });
  pdf
  .fontSize(12)
  .font('Times-Roman')
  .text(global.address,{
    align:'center'
  });
  pdf
  .fontSize(12)
  .font('Times-Roman')
  .text('  ')
  .text('GSTIN: '+ global.gst + '                                                                            Phone: '+ global.cpno,{
    align:'left'
  });
  pdf
  .fontSize(20)
  .font('Times-Roman')
  .text(' ')
  .text('Beat: ' + global.beat)
  .text('   ')
  .fontSize(12);
  pdf.lineJoin('miter')
    .rect(30, 200, 500, 30)
    .stroke();
    pdf.text('Sno.',60,210)
     .lineCap('butt')
     .moveTo(80, 200)
     .lineTo(80, 230)
     .stroke()
     .text('Shop',250,210)
     .lineCap('butt')
     .moveTo(450, 200)
     .lineTo(450, 230)
     .stroke()
     var recy=230;
    for(var i=0;i<(global.s).length;++i){
      pdf.text(i+1,60,(recy+10))
      .lineCap('butt')
      .moveTo(30, recy)
      .lineTo(30, recy+30)
      .stroke()
       .lineCap('butt')
       .moveTo(80, recy)
       .lineTo(80, recy+30)
       .stroke()
       .text(global.s[i],250,210)
       .lineCap('butt')
       .moveTo(450, recy)
       .lineTo(450, recy+30)
       .stroke()
     recy=recy+30;
     if(recy>=680){
       pdf.addPage();
       recy=100;
     }
  }
  pdf.lineCap('butt')
  .moveTo(30, recy)
  .lineTo(530, recy)
  .stroke()
  pdf.end();
  global.pdf="Unattended.pdf";
  res.redirect('/ua');
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,function(){
  console.log("Server Start")
});
