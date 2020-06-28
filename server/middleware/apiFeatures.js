const apiFeatures = (model, populate) => async (req, res, next) => {
    // FILTERING
    const queryObj = { ...req.query };
    const excludeFields = ['select', 'sort', 'page', 'limit'];
    excludeFields.forEach( el => delete queryObj[el]);
    
    // Create a query string
    let queryStr = JSON.stringify(queryObj);

    // Create operatore
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query;
    
    // Finding resource
    // query = model.find(JSON.parse(queryStr)).populate('profile');
    query = model.find(JSON.parse(queryStr));

    // Select fields
    if ( req.query.select ) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    // Sort fields
    if ( req.query.sort ) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }
    else {
        query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;
    const total = await model.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Populate when necessary
    if ( populate ) {
        query = query.populate(populate);
    }

    // EXECUTE query
    const results = await query;

    // Pagination result
    const pagination = {};
    
    if ( lastIndex < total ) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    if ( startIndex > 0 ) {
        pagination.previous = {
            page: page -1,
            limit
        }
    }

    res.apiFeatures = {
        status: 'success',
        count: results.length,
        pagination,
        data: results
    }

    next();
}

module.exports = apiFeatures;