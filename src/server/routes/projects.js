const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const periods = require('../periods');

function Projects() {return knex('proposals');}





//This get route adds user input from the form to the index.html page
//This route GETS the index.html page
router.get('/', (req, res, next) => {
  Projects().select()
  .then(projects => {
    res.render('projects/index', {
      title: 'Projects',
      proposals: projects
    })
  })
  .catch((err) => {
    return next (err);
  });
});


//The GET route GETS the new project page to the user
router.get('/new', function (req, res, next) {
  res.render('projects/new', {title: 'Submit New Project', periods: periods});
});


//The POST route redirects the user to the projects page
router.post('/projects',  (req, res, next) => {
  res.redirect('projects');
});


router.post('/', (req, res, next) => {
  let newProposal = {
      student_name: req.body.student_name,
      project_name: req.body.project_name,
      class_period: req.body.class_period,
      testable_question: req.body.testable_question,
      safe: req.body.safe
  };
  Projects().insert(newProposal)
  .then(() => {
    res.redirect('/projects');
  });
});










module.exports = router;
