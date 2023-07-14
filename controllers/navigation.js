




function home (req, res) {
    res.render('index', { title: 'Home' });
};

function basket (req, res) {
    res.render('basket', { title: 'Basket' });
};

function sell (req, res) {
    res.render('sell', { title: 'New Product' });
};

module.exports = {
    sell,
    basket,
    home
}