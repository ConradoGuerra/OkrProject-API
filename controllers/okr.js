const Okr = require("../models/okr");

exports.getOkrs = async (req, res, next) => {
  try {
    const okrs = await Okr.find();
    res.status(200).json({ message: "Okrs fetched!", data: okrs });
  } catch (err) {
    //If an error exists then will be send to error middleware the error and its status
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createOkr = async (req, res, next) => {
  try {
    const { okrName, planned, done } = req.body;
    const okr = new Okr({
      okrName: okrName,
      planned: planned,
      done: done,
    });
    const result = await okr.save();
    res
      .status(201)
      .json({ message: "Okr created successfully!", data: result });
  } catch (err) {
    //If an error exists then will be send to error middleware the error and its status
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getOkr = async (req, res, next) => {
  try {
    const okrId = req.params.okrId;
    const okr = await Okr.findById(okrId);
    res.status(200).json({ message: `Okr ${okr.okrName} fetched!`, data: okr });
  } catch (err) {
    //If an error exists then will be send to error middleware the error and its status
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateOkr = async (req, res, next) => {
  try {
    const okrId = req.params.okrId;
    const okr = await Okr.findById(okrId);
    okr.okrName = req.body.okrName;
    okr.planned = req.body.planned;
    okr.done = req.body.done;
    res.status(200).json({ message: `Okr ${okr.okrName} updated!`, data: okr });
  } catch (err) {
    //If an error exists then will be send to error middleware the error and its status
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteOkr = async (req, res, next) => {
    try {
      const okrId = req.params.okrId;
      await Okr.findByIdAndRemove(okrId)
      res.status(200).json({message: 'Okr deleted.'})
    } catch (err) {
      //If an error exists then will be send to error middleware the error and its status
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }};
