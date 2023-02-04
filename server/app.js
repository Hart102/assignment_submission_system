const express = require('express');
const cors =  require('cors');
const session = require('express-session');
const UUID = require('uuid');
const bodyParser = require('body-parser');
const cookieParser =  require('cookie-parser');
const MongoClient  = require('mongodb').MongoClient;
const MULTER = require('multer');
const path = require('path');
const FS = require('fs');
const Buffer = require('buffer')

const { sign_up_auth, login_auth, lecturer_login, level_auth } = require('./Module');
const { resolve } = require('path');
const { ConnectionPoolReadyEvent } = require('mongodb');
const { json } = require('express');
const app = express();

// GLOBAL VARIABLES 
const expDate = 60 * 60 * 1000 * 24; // 1 hour 1 day
const token = UUID.v4()

app.use(cors({
    origin:  ['http://localhost:3000'],
    method: ["GET", "POST"],
    credentials: true,
}));

app.use(bodyParser.urlencoded({extends: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({ // Session
    name: "userId",
    secret: token,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secret: token,
        maxAge: expDate,
        secure: false,
        sameSite: true
    }
}))

let students_collection, question_collection, 
written_test_collection, lecturers_collection,
uri = "mongodb://localhost:27017"; // Database connection uri

const dbConnection = () => { MongoClient.connect(uri, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        //************ Dbname ********************* 
        const db = client.db('e-campus')
        //********** COLLECTION NAME *************** 
        students_collection = db.collection('students')
        question_collection = db.collection('questions')
        written_test_collection = db.collection('assessmentReference')
        lecturers_collection = db.collection('lecturers')
        return students_collection, question_collection, written_test_collection,
        lecturers_collection;
    })
    .catch(error => console.error(error))
}
dbConnection()



//********* */ Handling Lecturer's login ****************
let active_lecturer;
app.post('/lecturer_login', (req, res) => {
    const { error, value } = lecturer_login.validate(req.body)

    if (error) {
        res.json(error.message)

    }else{
        lecturers_collection.findOne({ username: value.username, password: value.password }).then(result => {
            {result != null ? res.json('true') : res.json('user does not exist')}
            active_lecturer = req.session.lecturer = result.uniqueKey
        }).catch(err => {err ? console.log('something went wrong') : null})
    }


    // const user = {...value, uniqueKey: UUID.v4()}

    // if (error) {
    //     console.log(error)

    // }else{
    //     lecturers_collection.insertOne(user).then(result => console.log(result))
    // }

})


//*********************LECTURER SESSION ROUTE ***************************
app.get('/lecturer_login', (req, res) => {
    {active_lecturer ? res.json(active_lecturer) : res.json('false')}
})


//*********************LECTURER LOGOUT ROUTE ***************************
app.get('/lecturer_logout', (req, res) => { 

    req.session.destroy((err) => {
        if(err){
            res.json('something went wrong')

        }else{
            active_lecturer = ''
            res.clearCookie("userId")
        }
    })
})




//************** Handling Student sign up **********************
app.post('/student_sign_up', (req, res) => { 
    let { error, value } = sign_up_auth.validate(req.body),

    assesments = []; // Assigning an assessment array to every student
    value = {...value, newId: UUID.v4(), assesments};

    if(error) {
        res.json(error.message)

    }else{
        students_collection.insertOne(value).then(result => {
            {result.acknowledged ? res.json('true') : res.json('sign up was not successful')}
        }).catch(err => console.log(err))
    }
})



//**************** Handling Student login ***********************
let online;
app.post('/student/login', (req, res) => { 
    let { error, value } = login_auth.validate(req.body);
    
    if(error) {
        res.json(error.message)

    }else{
        students_collection.findOne({ firstname: value.firstname, reg_no: value.reg_no }).then(result => {
            {result != null ? res.json({user: result, res:'true'}) : res.json('user does not exist')}
            online = req.session.user  = result
        }).catch(err => console.log(err))
    }
    
})

//*********************STUDENT SESSION ROUTE ***************************
app.get('/student/login', (req, res) => {
    if (online) {
        res.json(online.newId)
        
    }else{
        res.json({loggedIn: 'false'})
    }
})


//************ Set question route ***************************
app.post('/set_question', (req, res) => {
    question = {...req.body, newId: UUID.v4()};

    question_collection.insertOne(question).then(result => {
        {result.acknowledged ? res.json('Question successfully uploaded') : res.json('an error occured try again !')}
    }).catch(err => console.log(err))
})



// Sending assesment reference to the databse. Which is used in fetching students who participated in the assesments
app.post('/written_test', (req, res) => { 
    written_test_collection.insertOne(req.body).then(result => {
        
    }).catch(err => console.log('cant insert two times'))
    //Removing duplicates in database
    written_test_collection.createIndex( { uniqueId: 1 }, {unique:true} )
    // written_test_collection.createIndex( { date: 1, level: 1, courseTitle: 1 }, {unique:true} )
})




//************ Getting the assesment the students wants to write **************
app.post('/fetch_avaliable_questions', (req, res) => {
    const { dept, level,   } = req.body

    written_test_collection.find(
        {
            department: dept,
            level: level
        }
    ).toArray().then(result => {
        if (result.length != 0) {
            res.json(result)

        }else{
            res.json({err: 'No assignment'})
        }
    })
    .catch(err => {
        if(err) {
            res.json({err: 'An error occured, Please try again!'})
        }
    })   
})


// Fetching the particular assignment the student wants to write at the moment
app.post('/fetch_selected_question', (req, res) => {
    const { courseTitle, department, level, date, question_type } = req.body

    question_collection.find({ 
        department: department, courseTitle: courseTitle, 
        level: level, date: date, question_type: question_type})
        .toArray().then(result => {
        res.json(result)

    }).catch(err => console.log(err))
})





// Storing student assesment answers in a text file, with a tracking id, that wil be stored in his assesment history,
// for recognition purposes
app.post('/store_student_assesment_file', (req, res) => {
    const generateId = UUID.v4() // Generating a file tracking id
    
    // Saving student theory assessment in a text file
    FS.writeFile(`./Storage/${generateId}.txt`, `${req.body.studentAnswer}`, (err) => {
        {err ? console.log(err) : console.log('file created successfully')}
    })
    
    //  ***** Attaching the file tracking id to the student's theory assessment history for recognition purposes ******
    const value = {...req.body, studentAnswer: '', assesment_file_tracking_id: `${generateId}`}
    
    students_collection.findOne({ newId: req.body.studentId }).then(result => {
        if (result != null) {
            let assesments = result.assesments
            assesments.push(value)

            //*** Updating the students assesments array with the current assesment the student wrote ****
            students_collection.updateOne({newId: req.body.studentId}, { $set: {assesments: assesments} }) 
            .then(response => {
                if (response) {res.json('Submission successful')}
            })
            .catch(err => console.log(err))
        }
    }).catch(err => console.log(err))

})


 //********** Store student objective assessment Score **********************
app.post('/post_objective_result', (req, res) => {

    students_collection.findOne({ newId: req.body.studentId }).then(result => {
        if (result != null) {
            let assesments = result.assesments
            assesments.push(req.body)

            //************ Updating the students assesments array with the current assesment **********
            students_collection.updateOne({newId: req.body.studentId}, { $set: {assesments: assesments} }) 
            .then(response => {response ? res.json('true') : null})
            .catch(err => console.log(err))
        }
    })
})


// ********** Awarding score to students by the lecturer ********************
app.post('/award_mark', (req, res) => {
    const { trackingId, score } = req.body
   
    students_collection.updateOne({ assesments: {$elemMatch: {assesment_file_tracking_id: trackingId }}}, 
        {$set : {"assesments.$.score" : score}}).then(result => 
        { result.modifiedCount == 1 ? res.json('Mark awarded successfully.') : null})
    .catch(err => console.log(err))
})


//***** Fetch assignments to display in the admin dashboard *******
app.get('/fetch/assessments', (req, res) => {
    written_test_collection.find().toArray().then(result => {
        if (result != null) {
            res.json(result)
        }
        
    }).catch(err => console.log(err))
})


//*************** Fetch student who participated in the assignment ******************
app.post('/fetch_participated_students', (req, res) => { 
    const { uniqueId } = req.body

    students_collection.find({assesments: {$elemMatch: 
        {uniqueId: uniqueId}

    }}).toArray().then(result => {
        if(result != null) {
            res.json(result)
        }

    }).catch(err => {
        if(err) {
            console.log('an error occured')
        }
    })

    // students_collection.find({assesments: {$elemMatch: 
        // {course: courseTitle, level: level, date: date}
})


//**************** Read student theory assessment file *******************
app.post('/fetch_student_assessment_doc', (req, res) => {

    FS.readFile(`./Storage/${req.body.trackingId}.txt`, 'utf-8', (err, data) => {
        if (err) {
          return console.log('an err occured');

        }else{
            res.json(data);
        }
    });
   
})


//******************** Admin read question Route ********************
app.post('/admin_read_questions', (req, res) => {

    question_collection.find({ uniqueId: req.body.id}).toArray()
    .then(result => res.json(result))
    .catch(err => console.log(err))

})



//****************** Edit theory questions route ******************
app.post('/edit_theory_question', (req, res) => {
    const { dept, title, Level, quest } = req.body.edited_question
    question_collection.updateOne(
        {newId: req.body.questionId},

        {
           $set: {
                department: dept,
                courseTitle: title,
                level: Level,
                question: quest
            } 
        }
    )
    .then(response => {
        if (response.modifiedCount > 0) {
            res.json({true: 'Question edited successfully'})
        }
    })
    .catch(err => {
        if(err) {
            res.json({false: 'cannot edit question. please try again!'})
        }
    })
})



//****************** Edit objective questions route ******************
app.post('/edit_objective_question', (req, res) => {
    const { dept, title, Level, quest, optA, optb, optc, correct } = req.body.edited_question

    question_collection.updateOne(
        {newId: req.body.questionId},

        {
           $set: {
                department: dept,
                courseTitle: title,
                level: Level,
                question: quest,

                a: optA, b: optb, c: optc,
                ans: correct
            } 
        }
    )
    .then(response => {
        if (response.modifiedCount > 0) {
            res.json({true: 'Question edited successfully'})
        }
    })
    .catch(err => {
        if(err) {
            res.json({false: 'cannot edit question. please try again!'})
        }
    })
})



//****************** Delete questions route ******************
app.post('/delete_question', (req, res) => {

    //-------- Deleting questions --------
    question_collection.deleteMany(
        { uniqueId: req.body.id }
    )
    .then(result => {
        if(result.deletedCount > 0) {
            res.json('Question deleted successfully')
        }
    })

    .catch(err => console.log(err))


    //--------- Delete assessment refference ---------
    written_test_collection.deleteOne(
        { uniqueId: req.body.id }
    )
    .then(result => {
        if(result.deletedCount > 0) {
            console.log('refference deleted successfully')
        }
    })
    .catch(err => console.log(err))

})



app.listen(5000, () => console.log('App running on port 5000'))