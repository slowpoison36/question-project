const router = require('express').Router();
const Question = require("../models/question");
const Answer = require("../models/answer");

router.post("/new-question", (req, res, next) => {
    let ques = new Question();
    ques.question = req.body.question;
    ques.description = req.body.description;

    ques.save((err, savedQuestion) => {
        if (err) {
            return next(err);
        }
        res.status(201).json({ success: true, message: "Question Successfully Saved" });
    })

})


router.get("/questions", (req, res, next) => {
    Question.find({})
        .populate("answer")
        .sort({created:"desc"})
        .exec((err, questions) => {
            if (err) {
                return next(err);
            }
            console.log(questions);
            return res.status(200).json({ success: true, questions: questions });
        })
})

router.get("/question/:id", (req, res, next) => {
    let param = req.params.id;
    Question.findOne({ _id: param })
        .populate('answer')
        .exec((err, foundQuestion) => {
            if (err) {
                return next(err);
            }
            res.status(200).json({ success: true, question: foundQuestion });
        })

})

router.post("/question/:quesId/create-answer", (req, res, next) => {
    let answer = new Answer();
    answer.answer = req.body.answer;
    answer.answerBy = req.body.answerBy;
    answer.description = req.body.description;

    Question.findOne({ _id: req.params.quesId }, (err, foundQuestion) => {
        if (err) {
            return next(err);
        }
        if (!foundQuestion) {
            res.status(404).json({ success: false, message: "Question not found" });
        }

        console.log(foundQuestion)
        answer.save((err, savedAnswer) => {
            if (err) {
                return next(err);
            }

            foundQuestion.answer.push(savedAnswer._id);
            foundQuestion.save()
            res.status(201).json({ success: true, message: "Successfully Added Your Answer" });
        })


    })
})

router.post("/:questionId/:answerId/like",(req,res,next)=>{
    let questionParam = req.params.questionId;
    let answerParam = req.params.answerId;
    let like = req.body.like;
    Question.findOne({_id:questionParam},(err,foundQuestion)=>{
           if(err){
               return next(err);
           }

           Answer.findOne({_id:answerParam},(err,foundAnswer)=>{
                if(err){
                     return next(err);
                }

                foundAnswer.likes.push(like);
                foundAnswer.save();
                foundQuestion.save()

                res.status(201).json({success:true,message:"Likes Saved"})



           })
    })

})
module.exports = router;