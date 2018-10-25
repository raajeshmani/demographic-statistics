var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');



var db = require('./app/models/db');


app.listen(3000, () => {
  console.log('Port started successfully on : 3000');
});

app.get("/", function (req, res) {
  res.render("index.ejs", { toUpdate: false });
});

app.get("/newcitizen",function(req,res){
  res.render("citizen.ejs");
});

app.get("/barchart",function(req,res){
  res.render("barchart.ejs",);
});

//CREATE
app.post("/addcitizen", function (req, res) {
  // var enroll=new user({fname:req.body.fname,lname:req.body.lname,edate:req.body.edate});
  var citizen = new db.citizen({
    fname: req.body.fname,
    lname: req.body.lname,
    dob: req.body.dob,
    dod: req.body.dod,          //date of death
    gender: req.body.gender,
    state: req.body.state,
    email: req.body.email,
    aadhaarID: req.body.aadhaarID
  });


  // console.log("New citizen:"+citizen);
  citizen.save(function (err, enroll) {
    if (err) return console.error(err);
    console.log("Saved:" + citizen);
  });
  res.render('vehicle.ejs', { aadhaarID: req.body.aadhaarID });
});

app.post("/addvehicle", function (req, res) {

  if (req.body.isSkip == "false") {         //If not skip, then enter a record
    var vehicle = new db.vehicle({
      model: req.body.model,
      registration_no: req.body.registration_no,
      aadhaarID: req.body.aadhaarID
    });
    // console.log(":"+citizen);
    vehicle.save(function (err, enroll) {
      if (err) return console.error(err);
      console.log("Saved:" + vehicle);
    });
  }

  res.render('marriage.ejs', { aadhaarID: req.body.aadhaarID });
});


app.post("/addmarriage", function (req, res) {
  // var enroll=new user({fname:req.body.fname,lname:req.body.lname,edate:req.body.edate});

  if (req.body.isSkip == "false") {         //If not skip, then enter a record
    var marriage = new db.marriage({
      dom: req.body.dom,            //date of marriage
      status: req.body.status,
      aadhaarID1: req.body.aadhaarID1,
      aadhaarID2: req.body.aadhaarID2
    });
    // console.log(":"+citizen);
    marriage.save(function (err, enroll) {
      if (err) return console.error(err);
      console.log("Saved:" + marriage);
    });
  }
  res.render('kids.ejs', { aadhaarID: req.body.aadhaarID });
});


app.post("/addkids", function (req, res) {
  // var enroll=new user({fname:req.body.fname,lname:req.body.lname,edate:req.body.edate});

  if (req.body.isSkip == "false") {         //If not skip, then enter a record
    var kids = new db.kids({
      paadhaarID: req.body.paadhaarID,
      aadhaarID: req.body.kaadhaarID
    });
    // console.log(":"+citizen);
    kids.save(function (err, enroll) {
      if (err) return console.error(err);
      console.log("Saved:" + kids);
    });
  }
  res.render('education.ejs', { aadhaarID: req.body.aadhaarID });
});


app.post("/addeducation", function (req, res) {

  if (req.body.isSkip == "false") {         //If not skip, then enter a record
    var education = new db.education({
      primary: req.body.primary,
      secondary: req.body.secondary,
      college: req.body.college,
      doctrate: req.body.doctrate,
      aadhaarID: req.body.aadhaarID
    });
    // console.log(":"+citizen);
    education.save(function (err, enroll) {
      if (err) return console.error(err);
      console.log("Saved:" + education);
    });
  }
  res.render('job.ejs', { aadhaarID: req.body.aadhaarID });
});


app.post("/addjob", function (req, res) {
  if (req.body.isSkip == "false") {         //If not skip, then enter a record

    var sal=Number(req.body.salary);
    var taxBracket=0;
    if(sal>250000&&sal<500000){
      taxBracket=.05;
    }

    else if(sal>500000&&sal<1000000){
      taxBracket=.2;
    }

    var job = new db.job({
      doe: req.body.doe,                //employment date
      position: req.body.position,
      department: req.body.department,
      company: req.body.company,
      salary: req.body.salary,
      taxBracket: taxBracket,
      aadhaarID: req.body.aadhaarID,
      empID: req.body.empID

    });
    // console.log(":"+citizen);
    job.save(function (err, enroll) {
      if (err) return console.error(err);
      console.log("Saved:" + job);
    });
  }

  res.redirect('/');
});


app.get("/bar-education",function(req,res){
  var doctrate;
  var college;
  var secondary;
  var primary;
  db.education.find({},function(err,rst){
    var total=rst.length;
    db.education.find({
      doctrate:""
    },function(err,rst){
      doctrate=rst.length;      //This value, is the no. of people who DONT have a doctrate
      db.education.find({
        college:""
      },function(err,rst){
        college=rst.length;

        db.education.find({
          secondary:""
        },function(err,rst){
          secondary=rst.length;

          db.education.find({
            primary:""
          },function(err,rst){
            primary=rst.length;
            // console.log("total:"+total);
            doctrate=total-doctrate;
            // console.log("Doctrate :"+doctrate);
            college=total-college-doctrate;
            // console.log("college :"+college);
            secondary=total-doctrate-college-secondary;
            // console.log("secondary :"+secondary);
            primary=total-doctrate-college-secondary-primary;
            // console.log("primary :"+primary);

            res.render("barchart/education-barchart.ejs",{doctrate:doctrate,college:college,secondary:secondary,primary:primary});
          });
        });
      });
    });
  });

});


app.get('/bar-age-population',function(req,res){
  var age0_20=0;
  var age20_40=0;
  var age40_60=0;
  var age60_80=0;
  var age80=0;
  db.citizen.find({},function(err,rst){
    for(i=0;i<rst.length;i++){
      var age=getAge(rst[i].dob);
      if(age<20)
      age0_20++;
      else if (age<40)
      age20_40++;
      else if(age<60)
      age40_60++;
      else if(age<80)
      age60_80++;
      else if(age>=80)
      age80++;
    }
    res.render("barchart/age-barchart.ejs",{age0_20:age0_20,age20_40:age20_40,age40_60:age40_60,age60_80:age60_80,age80:age80});
  });
});


app.get("/bar-salary-population",function(req,res){
  db.job.find({},function(err,rst){
    var sal0to2_5l=0;
    var sal2_5to5l=0;
    var sal5to10l=0;
    var sal10l=0;
    var sal;
    for(i=0;i<rst.length;i++){
      sal=rst[i].salary;
      if(sal<250000){
        sal0to2_5l++;
      }
      else if(sal>=250000&&sal<500000){
        sal2_5to5l++;
      }

      else if(sal>=500000&&sal<1000000){
        sal5to10l++;
      }
      else if(sal>1000000){
        sal10l++;
      }
    }
    res.render("barchart/salary-barchart.ejs",{sal0to2_5l:sal0to2_5l,sal2_5to5l:sal2_5to5l,sal5to10l:sal5to10l,sal10l:sal10l});
  });
});


app.get("/pie-sex-ratio",function(req,res){
    db.citizen.find({},function(err,rst){
      var male=0;
      var female=0;
      var other=0;
      for(i=0;i<rst.length;i++){
        if(rst[i].gender=="male"){
          male++;
        }

        if(rst[i].gender=="female"){
          female++;
        }
        if(rst[i].gender=="other"){
          other++;
        }
      }
      res.render('piechart/gender-piechart.ejs',{male:male,female:female,other:other});
    });

});

app.get("/pie-marriage-ratio",function(req,res){
    db.citizen.find({},function(err,rst){
      var total=rst.length;
      var married=0;
      var divorced=0;
      db.marriage.find({},function(err,rst){
        for(i=0;i<rst.length;i++){
          if(rst[i].status=='married')
            married++;
          if(rst[i].status=='divorced')
            divorced++;
        }
        res.render('piechart/marriage-piechart.ejs',{neverMarried:total-married*2-divorced*2,married:married*2,divorced:divorced*2});
      });
    });

});

function getAge(dob) {
  var today = new Date();
  var birthDate = new Date(dob);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

app.get("/read", function (req, res) {
    db.citizen.find({},function(err,totalData){
        res.render('read.ejs',{displayData:totalData});
    });
});


app.post("/delete",function(req,res){
    var toDelete=req.body.deleteByFname;
    console.log("Deleting :"+toDelete);
    db.citizen.deleteOne({aadhaarID:toDelete},function(err){
        // console.log("Error @deleteOne:"+err);
    });
    res.redirect("/read");
});
//
// //UPDATE
//
//
// app.post("/update", function (req, res) {
//     var toUpdate = req.body.updateByFname;
//     console.log("Updating :" + toUpdate);
//     user.find({ fname: toUpdate }, function (err, updateData) {
//         res.render("create.ejs", { toUpdate: true, fnameVal: updateData[0].fname, lnameVal: updateData[0].lname, edateVal: updateData[0].edate });
//         // var dateAsDateObject = new Date(Date.parse(dateInRFC822Format));
//         console.log("Fetched document to be updated:" + updateData[0].edate);
//
//         //Delete Record
//         user.deleteOne({ fname: toUpdate }, function (err) { });
//     });
// });
//
//
//
// //DELETE
// app.post("/delete", function (req, res) {
//     var toDelete = req.body.deleteByFname;
//     console.log("Deleting :" + toDelete);
//     user.deleteOne({ fname: toDelete }, function (err) {
//         // console.log("Error @deleteOne:"+err);
//     });
//     res.redirect("/read");
// });
