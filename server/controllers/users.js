/* 
    @desc       Get all users
    @route      GET api/users
    @access     Public
*/ 
exports.getUsers = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Showing all users'
    })
}

/* 
    @desc       Get a single user
    @route      GET api/users/:id
    @access     Public
*/ 
exports.getUser = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Show single user'
    })   
}

/* 
    @desc       Create a new user
    @route      POST api/users
    @access     Private
*/ 
exports.createUser = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Create new user'
    })   
}

/* 
    @desc       Update a user
    @route      PUT api/users/:id
    @access     Private
*/ 
exports.updateUser = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: `Update a user with id of ${req.params.id}`
    })
}

/* 
    @desc       Delete a single user
    @route      DELETE api/users/:id
    @access     private
*/ 
exports.deleteUser = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: `Delete a user with id of ${req.params.id}`
    })
}