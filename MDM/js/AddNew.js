$(function() {
  $('input[type="submit"]').button();
  $('input[type="reset"]').button();
  $("#Mobile").numericInput();
  $('#ReportDate').datepicker({
    dateFormat: 'dd-mm-yy',
    showOn: "both",
    buttonImage: "images/calendar.gif",
    buttonImageOnly: true
  });
  $("#BlockID").chosen({width: "250px",
    no_results_text: "Oops, nothing found!"
  });
  $("#SubDivID").chosen({width: "250px",
    no_results_text: "Oops, nothing found!"
  });
  $("#DesigID").chosen({width: "250px",
    no_results_text: "Oops, nothing found!"
  });
  //call ajax for fetch data......
  $.ajax({
    type: 'POST',
    url: 'AjaxData.php',
    dataType: 'html',
    xhrFields: {
      withCredentials: true
    },
    data: {
      'AjaxToken': $('#AjaxToken').val(),
      'CallAPI': 'GetChosenData'
    }
  }).done(function(data) {
    try {
      var DataResp = $.parseJSON(data);
      $('#Error').html(data);
      delete data;
      // $('#AjaxToken').val(DataResp.AjaxToken);
      $('#Msg').html(DataResp.Msg);
      $('#ED').html(DataResp.RT);
      var Options = '<option value=""></option>';
      $.each(DataResp.SubDivID.Data,
              function(index, value) {
                //option for Projects...
                Options += '<option value="' + value.SubDivID + '">'
                        + value.SubDivID + ' - ' + value.SubDivName
                        + '</option>';
              });
      $('#SubDivID').html(Options)
              .trigger("chosen:updated");
      $('#SubDivID').data('SubDivID', DataResp.SubDivID);
      //option for BlockID...
      Options = '<option value=""></option>';
      $.each(DataResp.BlockID.Data,
              function(index, value) {
                Options += '<option value="' + value.BlockID + '">'
                        + value.BlockID + ' - ' + value.BlockName
                        + '</option>';
              });
      $('#BlockID').html(Options)
              .trigger("chosen:updated");
      $('#BlockID').data('BlockID', DataResp.BlockID);
      delete DataResp;
      $("#Msg").html('');
    }
    catch (e) {
      $('#Msg').html('Server Error:' + e);
      $('#Error').html(data);
    }
  }).fail(function(msg) {
    $('#Msg').html(msg);
  });
//calling ajax for saving data.............
//  $("form").on("submit", function(event) {
//    event.preventDefault();
//    $('#Msg').html('Saving Please Wait...');
//    $.ajax({
//      type: 'POST',
//      url: 'AjaxSaveData.php',
//      dataType: 'html',
//      xhrFields: {
//        withCredentials: true
//      },
//      //data: $("#frmDepartment").serialize(),
//      data: {
//        'FormToken': $('#FormToken').val(),
//        'AjaxToken': $('#AjaxToken').val(),
//        'CmdSubmit': 'Create Department',
//        'DeptName': $("#DeptName").val(),
//        'HODName': $("#HODName").val(),
//        'HODMobile': $("#HODMobile").val(),
//        'HODEmail': $("#HODEmail").val(),
//        'DeptNumber': $("#DeptNumber").val(),
//        'Strength': $("#Strength").val(),
//        'DeptAddress': $("#DeptAddress").val()
//      }
//    }).done(function(data) {
//      try {
//        var DataResp = $.parseJSON(data);
//        delete data;
//        $("#FormToken").val(DataResp.FormToken);
//        $("#Ajax").val(DataResp.FormToken);
//        $("#Msg").html(DataResp.Msg + DataResp.CheckVal);
//        if (DataResp.CheckVal === null)
//        {
//          $('#frmDepartment').trigger("reset");
//        }
//        delete DataResp;
//      }
//      catch (e) {
//        $('#Msg').html('Server Error:' + e);
//        $('#Error').html(data);
//      }
//    }).fail(function(msg) {
//      $('#Msg').html(msg);
//    });
//  });
//  $('#Msg').html('Loaded Successfully');
});