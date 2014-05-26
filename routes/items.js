// items

var mongo = require('mongoose');

// model definition
var ItemSchema = mongoose.Schema({
    id:         String,
    value:      String,
    index:      Number,
    checked:    Boolean
});

ItemSchema.post('init', function(item) {
    item.id = item._id;
});
ItemSchema.post('save', function(item) {
    item.id = item._id;
    item.update({id: item.id}, function(err) {});
});

Item = mongoose.model('Item', ItemSchema);

var errorResponse = { 'error': 'An error has occurred.' };


// module functions
exports.findAll = function(req, res) {
    console.log('Finding all items');
    return Item.find(function (err, items) {
        if (err) {
            console.log(err);
            return res.status(500).send(errorResponse);
        }
        res.send(items);
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    return Item.findById(id, function(err, item) {
        if (err) {
            console.log(err);
            return res.status(500).send(errorResponse);
        }
        res.send(item);
        console.log('Found item: ' + JSON.stringify(item));
    });
};

exports.create = function(req, res) {
    var item = new Item(req.body);
    return item.save(function(err) {
        if (err) {
            console.log(err);
            return res.status(500).send(errorResponse);
        }
        res.send(item);
        console.log('Created new item: ' + JSON.stringify(item));
    });
};

exports.update = function(req, res) {
    var id = req.params.id;
    return Item.findOneAndUpdate({'_id':id}, req.body, {}, function(err, item) {
        if (err) {
            console.log(err);
            return res.status(500).send(errorResponse);
        }
        res.send(item);
        console.log('Updated item: ' + JSON.stringify(item));
    });
};

exports.delete = function(req, res) {
    var id = req.params.id;
    return Item.remove({'_id':id}, function(err) {
        if (err) {
            console.log(err);
            return res.status(500).send(errorResponse);
        }
        res.send({});
        console.log('Deleted item: ' + id);
    });
};

