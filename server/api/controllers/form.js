const Form = require('../models/form');
const mongoose = require('mongoose');

exports.createForm = (req, res, next) => {
  const { created_by, assigned_to, status, message, department } = req.body;
  
  if (created_by && assigned_to && department) {
    const form = new Form({
      _id: mongoose.Types.ObjectId(),
      ...req.body
    })
    
    form.save().then(result => {
      // send a notification to all the users in that department
      const socket = require('../helpers/socket');
      socket.notifyUsers(result.department, result)
      return res.status(201).json({
        message: 'form created'
      })
    }).catch(err => {
      return res.status(500).json({
        message: 'Failed to create form'
      });
    });
  } else {
    return res.status(500).json({
      message: 'created_by, assigned_to and department field is required'
    });
  }
}

exports.getAllForms = (req, res, next) => {
  const status = req.query.status;
  const query = status? { status: status } : {};

  Form.find(query).populate('created_by assigned_to department', '-password').limit(5).then(forms => {
    return res.status(200).json({
      message: 'success',
      data: forms
    })
  }).catch(err => {
    return res.status(500).json({
      message: 'Failed to get forms: '+err
    });
  })
}

exports.getForms = (req, res, next) => {
  const departmentId = req.params.departmentId;
  const status = req.query.status;
  const query = status? { status: status, department: { $ne: departmentId } } : { department: { $ne: departmentId } };

  Form.find(query).populate('created_by assigned_to department', '-password').limit(5).then(forms => {
    return res.status(200).json({
      message: 'success',
      data: forms
    })
  }).catch(err => {
    return res.status(500).json({
      message: 'Failed to get forms: '+err
    });
  })
}

exports.getFormsCreatedByUser = (req, res, next) => {
  const status = req.query.status;
  const userId = req.params.userId;
  
  const query = status? { $and: [{ status: status }, { created_by: userId }] } : { created_by: userId };

  Form.find(query).populate('created_by assigned_to department', '-password').then(forms => {
    return res.status(200).json({
      message: 'success',
      data: forms
    })
  }).catch(err => {
    return res.status(500).json({
      message: 'Failed to get forms: '+err
    });
  })
}

exports.getFormsAssignedToUser = (req, res, next) => {
  const status = req.query.status;
  const userId = req.params.userId;
  
  const query = status? { $and: [{ status: status }, { assigned_to: userId }] } : { assigned_to: userId };

  Form.find(query).populate('created_by assigned_to department', '-password').then(forms => {
    return res.status(200).json({
      message: 'success',
      data: forms
    })
  }).catch(err => {
    return res.status(500).json({
      message: 'Failed to get forms: '+err
    });
  })
}

exports.updateStatus = (req, res, next) => {
  const statusList = require('../const').STATUS;
  const userData = req.decoded;
  const formId = req.params.formId;
  const status = req.params.status;
  // update form status login
  if (statusList.includes(status)) {
    Form.findOneAndUpdate({ _id: formId, assigned_to: userData.userId }, { $set: { status: status } }, { new: true }).then(result => {
      // send a notification to the user who created the form
      const socket = require('../helpers/socket');
      socket.notifyUsers(result.created_by, result)
      return res.status(200).json({
        message: 'form status updated',
        result: result
      })
    }).catch(err => {
      return res.status(409).json({
        message: 'Failed to update form: '+err
      })
    });
  } else {
    return res.status(409).json({
      message: 'send proper form status'
    });
  }
}