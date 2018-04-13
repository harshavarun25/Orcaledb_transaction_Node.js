var oracledb = require('oracledb');
var config = require('../config.js');
var SimpleOracleDB = require('simple-oracledb');
var charge_id;
var shipdetailno;
SimpleOracleDB.extend(oracledb);

exports.shipmentOrderNo = function(clientRequest, carrierShipResponse) {
//console.log(clientRequest);
//console.log(carrierShipResponse);

var sql = "INSERT into Ship_Detail(Ship_No, Pckage_Id, Track_No, Service_Code, User_Id, Item_No, Qty, Length, Width, height, Pckage_Wt, Ship_Date_Entered, Ship_Item_Amount, carrier_item_amount, To_Loc, Decl_Value, "+
"Sat_Del_Flag, Addl_Handling_Flag, Oversize_Flag, Del_Conf_Flag, Deliver_By, Project_Id, CostCode, Dept_Id, Void_Flag, Ship_Date_Created, Sign_req_flag, Hold_At_Loc_Flag, Res_Delv_Flag, Currency_Type, "+
"ShipApp_Used, Pending, Closeout_status_id,prod_title, prod_detail_no, NOTIFY_SHPR_FLAG, NOTIFY_RCPT_FLAG, pickup_flag, CARRIER_FRIEGHT_CHARGE, PUBLIC_FRIEGHT_CHARGE, PUBLIC_RATE, BASE_FRIEGHT_CHARGE, "+
"FUEL_SURCHARGE, DECLVALUE_SURCHARGE, SIGNREQ_CHARGE, SATDELV_CHARGE, SATPICKUP_CHARGE, RESDELV_CHARGE, ADDLHANDL_CHARGE, PICKUP_CHARGE, MISC_CHARGE, TRANSACTION_CHARGE, DEL_CONF_EMAILS, sign_release, "+
"operating_unit, fund_code, program_code, class_fld, dryice_flag, dryice_wgt, dgoods_flag, dgoods_chrg, ship_type, ship_pay_type, from_loc, shmt_reference, univ_adv_id, out_delv_flag, outdelv_charge, "+
"consignee_location_name, consignee_contact_name, consignee_address1, consignee_address2, consignee_city, consignee_state_code, consignee_zipcode, consignee_country, consignee_country_name, consignee_phone, "+
"consignee_email, shipper_location_name, shipper_contact_name, shipper_address1, shipper_address2, shipper_city, shipper_state_code, shipper_zipcode, shipper_country, shipper_country_name, shipper_phone, "+
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
