var oracledb = require('oracledb');
var config = require('../config.js');
var SimpleOracleDB = require('simple-oracledb');
var charge_id;
var shipdetailno;
SimpleOracleDB.extend(oracledb);

exports.shipmentOrderNo = function(clientRequest, carrierShipResponse) {
//console.log(clientRequest);
//console.log(carrierShipResponse);

var sql = "INSERT into Ship_Detail(shipper_city, shipper_state_code, shipper_zipcode, shipper_country, shipper_country_name, shipper_phone, "+
"shipper_email, Sunapsis_Internal_Id, Sunapsis_Context_Id, Sunapsis_University_Id, Sunapsis_Department_Id ) "+
"VALUES ( )"

return new Promise(function(resolve, reject) {
  oracledb.run({
   user: config.Development.user,
   password: config.Development.password,
   connectString: config.Development.connectString
  }, function (connection) {
    //run some database operations in a transaction and return a promise
    return connection.transaction([
      function firstAction() {
        return connection.execute("INSERT into Ship_Header (User_Id, From_Loc, Total_Amount, Closed_Status_Flag,Ship_Date_Created, billto, billto_acctnum, billto_zipcode )VALUES ()");
   //returns a promise
      },
      function secondAction() {
        return connection.execute("SELECT Order_No.CurrVal From Dual", function(err,result){
          console.log(result);
        }); //returns a promise
      },function secondAction() {
        return connection.execute("SELECT Shp_No.CurrVal From Dual", function(err,result){
          console.log(result);
        }); //returns a promise
      },function thirdAction() {
        return connection.execute("SELECT Order_No.CurrVal From Dual", function(err,result){
          console.log(result);
        }); //returns a promise
      },function fourthAction() {
        return connection.execute("SELECT Shpdtl_No.CurrVal From Dual", function(err,result){
          console.log(result);
        }); //returns a promise
      },function fifthAction() {
        return connection.execute("INSERT into scan (scan_id, track_no, ship_date, activity, create_date) VALUES ( '', , sysdate, 'No signature requried', sysdate )", function(err,result){
          console.log(result);
        }); //returns a promise
      },function sixthAction() {
        return connection.execute("insert into creditcard_charges (user_id, cc_name, cc_no, cc_type, cc_exp_date, cvv_number, chrg_date, chrg_amnt, chrg_pnref, chrg_rslt, chrg_respmsg, chrg_authcode, cc_charge_status, currency, base_amnt, trans_chrg, chrg_ref, chrg_src_type, chrg_pending) VALUES (100012682, 'Harsha', 'XXXXXXXXXXXX1111', 'DISCOVER', '0920', '120', sysdate, '13.10', 'V79E0ACF096C', 0, 'Approved', '010101', 'S', 'USD', '13.10', '0', '9961515844', 'CC', '')", function(err,result){
          console.log(result);
        }); //returns a promise
      },function seventhdAction() {
        return connection.execute("SELECT SQ_CC_CHARGE_ID.CURRVAL FROM DUAL", function(err,result){
          console.log(result);
        }); //returns a promise
      },
    ]);
  }).then(function (result) {
    //do something with the result
  });
})

};
