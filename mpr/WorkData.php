<?php
switch (WebLib::GetVal($_POST, 'CmdAction')) {

  case 'Create Work':
    $DB = new MySQLiDBHelper();
    $tableData['SchemeID'] = $_POST['Scheme'];
    $tableData['MprMapID'] = $_POST['MprMapID'];
    $tableData['WorkDescription'] = $_POST['txtWork'];
    $tableData['EstimatedCost'] = $_POST['txtCost'];
    $tableData['WorkRemarks'] = $_POST['txtWorkRemarks'];
    $SchemeID = $DB->insert(MySQL_Pre . 'MPR_Works', $tableData);
    unset($tableData);
    unset($DB);
    break;

  case 'Release Fund':
    $DB = new MySQLiDBHelper();
    $tableData['WorkID'] = $_POST['WorkID'];
    $tableData['SanctionOrderNo'] = $_POST['txtOrderNo'];
    $tableData['SanctionDate'] = WebLib::ToDBDate($_POST['txtDate']);
    $tableData['SanctionAmount'] = $_POST['txtAmount'];
    $tableData['SanctionRemarks'] = $_POST['txtSanctionRemarks'];
    $SchemeID = $DB->insert(MySQL_Pre . 'MPR_Sanctions', $tableData);
    unset($tableData);
    unset($DB);
    break;
}
?>
<span class="Message" id="Msg" style="float: right;"></span>
<pre id="Error">
   <?php //print_r($_POST); ?>
</pre>