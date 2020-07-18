class ApiFeatures {
    
    /* query is from mongoose and queryStr is from express coming from route */
    constructor(query, queryStr, populate) {
        this.query = query;
        this.queryStr = queryStr;
        this.populate = populate;
    }

    filter() {
        // copy of the queryStr object
        const queryObj = { ...this.queryStr };

        // exclude these fields when querying
        const excludeFields = ['select', 'sort', 'page', 'limit'];
        excludeFields.forEach( el => delete queryObj[el]);

        // Create a query string
        let queryStr = JSON.stringify(queryObj);

        // Create operators
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        
        // Convert to json object
        queryStr = JSON.parse(queryStr);

        // Search params
        if ( queryStr.search ) {
            queryStr = {
                $text : {
                    $search: this.queryStr.search,
                    $caseSensitive: false
                }
            }
        }

        // Find the queryString object(s)
        this.query = this.query.find(queryStr);

        // Populate when necessary
        if ( this.populate ) {
            this.query = this.query.populate(this.populate);
        }
        return this;
    }

    sort() {
        if ( this.queryStr.sort ) {
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    select() {
        if ( this.queryStr.select ) {
            const fields = this.queryStr.select.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    paginate() {
        const page = +this.queryStr.page || 1;
        const limit = +this.queryStr.limit || 10;
        const startIndex = (page - 1) * limit;
       
        this.query = this.query.skip(startIndex).limit(limit);
        return this;
    }
}

const apiFeatures = (model, populate) => async(req, res, next) => {
    try {
        const apiFeatures = new ApiFeatures(model.find(), req.query, populate)
            .filter()
            .sort()
            .select()
            .paginate();
        
        const results = await apiFeatures.query;
        res.apiFeatures = {
            status: 'success',
            count: results.length,
            data: results
        }
    } catch (error) {
        return next( new AppError('Bad request', 500) );
    }

    next();
}

module.exports = apiFeatures;