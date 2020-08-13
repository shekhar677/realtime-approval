const Department = require('../models/department');
const mongoose = require('mongoose');

exports.create_department = (req, res, next) => {
  if (req.body.name) {
    const department = new Department({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      users: []
    })
  
    department.save().then(result => {
      return res.status(201).json({
        message: 'Department created'
      })
    }).catch(err => {
      return res.status(500).json({
        message: 'Failed to create department'
      });
    });
  } else {
    return res.status(500).json({
      message: 'department name is required'
    });
  }
}

exports.all_department = (req, res, next) => {
  const exclude = req.query.exclude;
  const departmentId = req.query.departmentId;
  const query = exclude? { _id: { $ne: departmentId } } : {};

  Department.find(query).populate('users', '-password').exec().then(department => {
    return res.status(200).json({
      message: 'success',
      data: department
    })
  })
}

exports.department_users = (req, res, next) => {
  const departmentId = req.params.departmentId;
  Department.find({ _id: departmentId }).populate('users', '_id email department').exec().then(users => {
    return res.status(200).json({
      message: 'success',
      data: users
    })
  })
}