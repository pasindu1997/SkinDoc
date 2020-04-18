require('app');


module.exports = (req, res) => {
    app.use('/showclinics', () =>
        res.console.log('Fetching the data from database to show clinics'));

};
