let router = require('express').Router();
var contactController = require('../controllers/contact');

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API is working',
        message: 'Task B'
    });
});

// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);
router.route('/contacts/:contact_id')
    .get(contactController.view)
    .put(contactController.update)
    .delete(contactController.delete);

// Export API routes
module.exports = router;