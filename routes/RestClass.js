class RestfulAPI {
  constructor(resourceName, app, model) {
    this.resource = resourceName;
    this.app = app;
    this.model = model;
  }

  find() {
    this.app.get(`/api/${this.resource}`, (req, res) => {
      this.model.find({})
        .then(function (data) {
          res.json(data);
        })
        .catch(function (err) {
          res.json(err);
        })
    })
  }

  create() {
    this.app.post(`/api/${this.resource}`, (req, res) => {
      this.model.create(req.body)
        .then(function (data) {
          res.json(data);
        })
        .catch(function (err) {
          res.json(err);
        })
    })
  }

  find(alias) {
    this.app.get(`/api/${this.resource}/:${alias}`, (req, res) => {
      this.model.find({
            [alias]: req.params[alias]
        })
        .then(function (data) {
          res.json(data);
        })
        .catch(function (err) {
          res.json(err);
        })
    })
  }
  findRestaurant(alias) {
    this.app.get(`/api/${this.resource}/:${alias}`, (req, res) => {
      let alias = req.params[alias];
      let regex = {
        $regex: new RegExp(alias, 'i')
      };
      this.model.find({
          'alias': alias
        })
        .or([{
          'url': regex
        }])
        .then(function (aliasReview) {
          res.json(aliasReview);
        })
        .catch(function (err) {
          res.json(err);
        });
    });
  }

  findOneAndUpdate(id) {
    this.app.put(`/api/update/:${id}`, (req, res) => {
      this.model.findOneAndUpdate({
          alias: req.params[id]
        }, {
          $set: {
            personal_review: req.body
          }
        })
        .then(function (dbUser) {
          res.json(dbUser)
        })
        .catch(function (err) {
          res.json(err);
        });
    });
  }
}

module.exports = RestfulAPI;
