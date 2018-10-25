    



//mongoose starts here
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/demograph-stats-project',{ useNewUrlParser: true } );
var db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); //incase of error


var citizenSchema=new mongoose.Schema({
    fname: String,
    lname: String,
    dob: Date,
    dod: Date,          //date of death
    gender: String,
    state: String,
    email: String,
    aadhaarID: {
        type:String,
        required:true,
        unique:true
    }
});
var citizen=mongoose.model('citizen',citizenSchema);

var vehicleSchema=new mongoose.Schema({
    model: String,
    registration_no: String,
    aadhaarID: {
        type:String,
        required:true,
        unique:true
    }
});

var vehicle=mongoose.model('vehicle',vehicleSchema);

var marriageSchema=new mongoose.Schema({
    dom: String,            //date of marriage
    status: String,
    aadhaarID1: {
        type:String,
        required:true,
        unique:true
    },
    aadhaarID2: {
        type:String,
        required:true,
        unique:true
    }
});

var marriage=mongoose.model('marriage',marriageSchema);




var kidsSchema=new mongoose.Schema({
    paadhaarID: {           //parent aadhar
        type:String,
        required:true
    },
    aadhaarID: {
        type:String,
        required:true,
        unique:true
    }
});

var kids=mongoose.model('kids',kidsSchema);

var educationSchema=new mongoose.Schema({
    primary: String,
    secondary: String,
    college: String,
    doctrate: String,
    aadhaarID: {
        type:String,
        required:true,
        unique:true
    }
});

var education=mongoose.model('education',educationSchema);

//JOB
var jobSchema=new mongoose.Schema({
    // status: String,
    doe: String,                //employment date
    position: String,
    department: String,
    company: String,
    salary: String,
    // taxID: String,
    taxBracket:String,
    empID:{
        type:String,
        unique:true
    },
    aadhaarID: {
        type:String,
        required:true,
        unique:true
    }
});


var job=mongoose.model('job',jobSchema);


//mongoose ends


module.exports={
   citizen:citizen,
   vehicle:vehicle,
   marriage:marriage,
   kids:kids,
   education:education,
   job:job
};
