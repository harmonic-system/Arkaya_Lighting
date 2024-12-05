const validate = (schema) => async (req, res, next) => {
    try {
        req.body = await schema.parseAsync(req.body);        
        next();
    } catch (err) {
        res.status(422).json({
            success: false,
            message: err.errors[0].message,
            errors: err.errors.map((issue) => issue.message),
        });
    }
};

module.exports = validate;