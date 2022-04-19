const express = require("express")

const router = express.Router()

// router.get
router.get('/:id', (req, res) => {
    console.log(req.params.id);
    // res.status('500').json({ 'error': "testing" })
    res.render('index')
})

module.exports = router