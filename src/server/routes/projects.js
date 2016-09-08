const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const periods = require('../periods');

function Projects() {return knex('proposals');}

//The / route redirects the user to the projects/index.html page.
//The projects page will display the projects in a table.
router.get('/', (req, res, next) => {
  Projects().select()
  .then(projects => {
    res.render('projects/index', {
      title: 'Projects',
      proposals: projects
    });
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
  .then (() => {
    res.redirect('/projects');
  });
});

router.delete('/delete/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  //console.log(id);
  knex('proposals')
  .del()
  .where('id', id)
  .returning('*')
  .then ((results) => {
    console.log(results);
    if (results.length) {
      res.status(200).json({
        status: 'success',
        message: `${results[0].student_name} your project has been deleted.`
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'The id you entered does not exist.'
      });
    }
  })
  .catch((err) => {
    res.status(500).json({
      status: 'error',
      message: 'An error has occured.'
    });
  });
});

module.exports = router;
