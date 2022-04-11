const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const axios = require('axios').default;

// var handlebars = require('handlebars');
// var fs = require('fs');

const DoctorOrder = require('../models/doctorOrders');

router.patch("/fhir/rems/:id", async (req, res, next) => {
  const documentId = req.params.id;
  let documentOrder = await DoctorOrder.findById(documentId);
  const crdUrl = (process.env.CRD_BASE_URL ? process.env.CRD_BASE_URL : "http://localhost:8090/") + "api/rems/" + documentOrder.caseNumber;
  const updatedComplianceResponse = await axios.get(crdUrl);
  const updatedCompliance = updatedComplianceResponse.data;

  documentOrder = parseRemsAdminRequest(updatedCompliance, documentOrder);
  documentOrder.save().then(updatedDocOrder => {
    res.status(201).json({
      message: 'Doctor Order Updated Successfully',
      doctorOrderId: updatedDocOrder._id
    });

  });
});

router.patch("/fhir/rems/pickedUp/:id", async (req, res, next) => {
  const documentId = req.params.id;
  const documentOrder = await DoctorOrder.findById(documentId);
  documentOrder.dispenseStatus = "Picked Up"
  documentOrder.save().then(updatedDocOrder => {
    res.status(201).json({
      message: 'Doctor Order Updated Successfully',
      doctorOrderId: updatedDocOrder._id
    });

  });
});


router.post("/fhir/rems", (req, res, next) => {
  const docOrder = parseRemsAdminRequest(req.body);
  docOrder.save().then(createdDocOrder => {
    res.status(201).json({
      message: 'Doctor Order Added Successfully',
      doctorOrderId: createdDocOrder._id
    });

  });
});
//getting the first one can use this to get the parameter id 
// getClaimResponse(): ClaimResponse {
//   const bundleEntries = this.bundle.entry!;
//   return bundleEntries[0]?.resource as ClaimResponse;
// }

// getInsurerOrganization(): Organization {
//   // Get Claim.insurer => Organization
//   const bundleEntries = this.bundle.entry!;
//   const insurerRef = this.getClaim().insurer.reference;
//   const insurer = bundleEntries.find((entry) => entry.fullUrl?.includes(insurerRef));
//   if (!insurer) throw new Error('No insurer Organization found');
//   return insurer.resource as Organization;
// }


router.post("", (req, res, next) => {
  const docOrder = new DoctorOrder({
    patientName: req.body.patientName,
    patientDOB: req.body.patientDOB,
    doctorName: req.body.doctorName,
    doctorContact: req.body.doctorContact,
    doctorID: req.body.doctorId,
    doctorEmail: req.body.doctorEmail,
    drugId: req.body.drugId,
    drugNames: req.body.drugName,
    drugPrice: req.body.drugPrice,
    drugQuantity: req.body.drugQuantity,
    realQuantity: req.body.realQuantity,
    totalAmount: req.body.totalAmount,
    pickupDate: req.body.pickupDate,
    dispenseStatus: "N/A",
  });
  docOrder.save().then(createdDocOrder => {
    res.status(201).json({
      message: 'Doctor Order Added Successfully',
      doctorOrderId: createdDocOrder._id
    });

  });

});

router.get("", (req, res, next) => {
  DoctorOrder.find().then(documents => {
    res.status(200).json({
      message: 'Doctor order found Successfully',
      doctorOrders: documents
    });
  });
});

router.delete("/:id", (req, res, next) => {
  DoctorOrder.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Doctor order deleted!' });
  });
});

router.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has been send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});


async function sendMail(user, callback) {
  // reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "pharmacare.contactus@gmail.com",
      pass: "lalana1011294"
    }
  });

  let mailOptions = {
    from: '"Pharma Care Pharmacies"<example.gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: "We Recived Your Order 👻", // Subject line
    html: `
      <head>
      <style>
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }

        td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }

        tr:nth-child(even) {
          background-color: #dddddd;
        }
        </style>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <script>

            $(function(){
              var results = [], row;
              $('#table1').find('th, td').each(function(){
                  if(!this.previousElementSibling && typeof(this) != 'undefined'){ //New Row?
                      row = [];
                      results.push(row);
                  }
                  row.push(this.textContent || this.innerText); //Add the values (textContent is standard while innerText is not)
              });
              console.log(results);
          });

        </script>
        </head>

      <body>
      <h1>Hey Dr. ${user.name}</h1><br>
      <h3>Thanks for placing an order with us </h3><br>
      <h2>Your order has been verified</h2><br>
      <h3>You can pick up the ordered packaged on or after ${user.pickupDate}</h3>

      <h2>These are the orders you placed on our online shop</h2>

      <table id="table1">
        <tr>
          <th>Ordered Drug Name</th>
          <th>Drug Quantity</th>
          <th>Price per unit (Rs.)</th>
        </tr>
        <tr>
          <td>${user.drugName[0]}</td>
          <td>${user.drugQuantity[0]}</td>
          <td>${user.drugPrice[0]}</td>
        </tr>
        <tr>
          <td>${user.drugName[1]}</td>
          <td>${user.drugQuantity[1]}</td>
          <td>${user.drugPrice[1]}</td>
        </tr>
        <tr>
          <td>${user.drugName[2]}</td>
          <td>${user.drugQuantity[2]}</td>
          <td>${user.drugPrice[2]}</td>
        </tr>
        <tr>
          <td>${user.drugName[3]}</td>
          <td>${user.drugQuantity[3]}</td>
          <td>${user.drugPrice[3]}</td>
        </tr>
        <tr>
          <td>${user.drugName[4]}</td>
          <td>${user.drugQuantity[4]}</td>
          <td>${user.drugPrice[4]}</td>
        </tr>
        <tr>
          <td>${user.drugName[5]}</td>
          <td>${user.drugQuantity[5]}</td>
          <td>${user.drugPrice[5]}</td>
        </tr>
        <tr>
          <td>${user.drugName[6]}</td>
          <td>${user.drugQuantity[6]}</td>
          <td>${user.drugPrice[6]}</td>
        </tr>
      </table><br>
      <h2>Total Amount :Rs. ${user.total}</h2><br>
      <h3>Info* : </h3>
      <h4>If there is any issue regarding the order please be free to contact us or email us (pharmacare.contactus@gmail.com) 😃 </h4>
      </body>
      `
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

function parseRemsAdminRequest(requestBody , existingDocOrder = undefined) {
  const complianceBundle = requestBody.complianceBundle;
  //Main paremter that points to the the resourceType and id for all the other resources 
  const parameterReference = getResource(complianceBundle, complianceBundle.entry[0].resource.focus.parameters.reference);

  //patientName
  const patient = getResource(complianceBundle, parameterReference.parameter.find(param => param.name === "source-patient").reference);
  const _patientName = patient.name[0].given.join(" ") + " "
                      + patient.name[0].family;

  //patientDOB
  const _patientDOB = patient.birthDate;

  // doctorName
  const doctor = getResource(complianceBundle, parameterReference.parameter.find(param => param.name === "prescriber").reference);

  const _doctorName = doctor.name[0].prefix[0] + " "
    + doctor.name[0].given.join(" ")  + " "
    + doctor.name[0].family;

  // doctorContact
  const _doctorContact = doctor.telecom.find(telecom => telecom.system === "phone").value;

  // doctorEmail
  const _doctorEmail = doctor.telecom.find(telecom => telecom.system === "email").value;

  // doctorId
  const _doctorId = doctor.identifier[0].value;

  // drugId
  const presciption = getResource(complianceBundle, parameterReference.parameter.find(param => param.name === "prescription").reference);

  //come back and verify rxnorm 
  const _drugId = presciption.medicationCodeableConcept.coding[0].code;

  // drugNames
  const _drugNames = presciption.medicationCodeableConcept.coding[0].display;

  // drugPrice
  const _drugPrice = 200.00;

  // drugQuantity
  const _drugQuantity = presciption.dispenseRequest.quantity.value;

  // realQuantity
  const _realQuantity = presciption.dosageInstruction[0].doseAndRate[0].doseQuantity.value
    + presciption.dosageInstruction[0].doseAndRate[0].doseQuantity.unit;

  // totalAmount
  // make this the 90 
  const _totalAmount = _drugQuantity * _drugPrice;

  // pickupDate
  const _pickupDate = new Date().toDateString();

  let docOrder = existingDocOrder;

  if (existingDocOrder) {
    docOrder.patientName = _patientName;
    docOrder.patientDOB = _patientDOB;
    docOrder.doctorName = _doctorName;
    docOrder.doctorContact = _doctorContact;
    docOrder.doctorID = _doctorId;
    docOrder.doctorEmail = _doctorEmail;
    docOrder.drugId = _drugId;
    docOrder.drugNames = _drugNames;
    docOrder.drugPrice = _drugPrice;
    docOrder.drugQuantity = _drugQuantity;
    docOrder.realQuantity = _realQuantity;
    docOrder.totalAmount = _totalAmount;
    docOrder.pickupDate = _pickupDate;
    docOrder.dispenseStatus = requestBody.status;
    docOrder.caseNumber = requestBody.case_number;
    docOrder.rawFHIRObject = requestBody;
  } else {
    docOrder = new DoctorOrder({
      patientName: _patientName,
      patientDOB: _patientDOB,
      doctorName: _doctorName,
      doctorContact: _doctorContact,
      doctorID: _doctorId,
      doctorEmail: _doctorEmail,
      drugId: _drugId,
      drugNames: _drugNames,
      drugPrice: _drugPrice,
      drugQuantity: _drugQuantity,
      realQuantity: _realQuantity,
      totalAmount: _totalAmount,
      pickupDate: _pickupDate,
      dispenseStatus: requestBody.status,
      caseNumber: requestBody.case_number,
      rawFHIRObject: requestBody
    }); 
  }

  return docOrder;
}


//Given a reference reference of structure resourceType/id (e.g. Practitioner/para1234) 
//Return index of parameter index
function getResourceIndex(resourceReference) {

  console.log(_resourceType + " " + _id);

  //Loop and find the given resource with key value of resourceType and id
  for (var i = 1; ; i++) {
    if ((specialityRx.entry[i].resource.resourceType == _resourceType)
      && (specialityRx.entry[i].resource.id == _id)) {
      return i;
    }
  }
  specialityRx.entry[i]
}

//Find specific parameter within parameters resource 

function getResource(bundle, resourceReference) {
  const temp = resourceReference.split('/')
  const _resourceType = temp[0];
  const _id = temp[1];

  for (var i = 0; i < bundle.entry.length; i++) {
    if ((bundle.entry[i].resource.resourceType == _resourceType)
      && (bundle.entry[i].resource.id == _id)) {
      return bundle.entry[i].resource;
    }
  }
}


module.exports = router;
