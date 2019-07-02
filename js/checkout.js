$(function () {
    //列表
    $('#table').bootstrapTable({
        url: "http://localhost:8888/checkout?method=get",
        pagination: true,
        search: true,
        dataType: 'jsonp',
        jsonp: "callback",
        jsonpCallback: "callback",
        uniqueId: "ID",
        striped: true,
        toolbar: '#toolbar',
        dataField: 'data',
        sidePagination: 'client',
        pageSize: '15',
        pageList: [10, 25, 50, 100],
        showRefresh: true,
        contentType: "application/x-www-form-urlencoded",
        columns: [{
            field: 'ID',
            title: '房间号',
            sortable: true,
        }, {
            field: 'name',
            title: '房间名称',
            sortable: true,
        }, {
            field: 'type',
            title: '房间类型',
            sortable: true,
        }, {
            field: 'price',
            title: '房间价格',
            sortable: true,
        }, {
            field: 'rent',
            title: '入住',
            sortable: true,
        }, {
            field: 'Cname',
            title: '入住人姓名',
            sortable: true,
        }, {
            field: 'CID',
            title: '入住人身份证',
            sortable: true,
        }, {
            field: 'fromDate',
            title: '入住时间',
            sortable: true,
        }, {
            field: 'toDate',
            title: '退房时间',
            sortable: true,
        }, {
            field: 'null',
            title: '操作',
            formatter: actionFormatter,
        }
        ]
    });

    // 渲染修改按钮
    function actionFormatter(value, row, index) {
        let ID = row.ID;
        let result = "<button class='btn btn-xs btn-primary' onclick=continueForm("
            + ID
            + ") title='续住'><i class=\"fa fa-calendar-plus-o\" aria-hidden=\"true\"></i></button>" +
            "&nbsp;<button class='btn btn-xs btn-primary' onclick=checkout("
            + ID
            + ") title='退房'><i class=\"fa fa-sign-out\" aria-hidden=\"true\"></i></button>"
        return result;
    }

    //续住
    function continuted() {
        $.ajax({
            url:"http://localhost:8888/checkout?method=continue",
            dataType: "jsonp",
            jsonp:"callback",
            jsonpCallback: "callback",
            data:{
                ID:$("#ID").val(),
                toDate:$("#to").val()
            },
            success: function (data) {
                if (data.error == 1) {
                    alert("续住失败")
                } else {
                    alert("续住成功")
                    $("#continue-form").modal('hide');
                    $("#table").bootstrapTable('refresh')
                }
            }
        })
    }
    $("#continue-button").click(function () {
        continuted();
    })
})
//打开办理入住模态框
function continueForm(id) {
    let row = $("#table").bootstrapTable('getRowByUniqueId', id);
    $("#ID").val(id);
    $("#from").val(row.fromDate);
    $("#to").val(row.toDate);
    $("#continue-form").modal('show');
}
function checkout(id) {
    let c=confirm("确定退房吗");
    if(c==true){
        $.ajax({
            url:"http://localhost:8888/checkout?method=checkout",
            dataType: "jsonp",
            jsonp:"callback",
            jsonpCallback: "callback",
            data:{
                ID:id
            },
            success: function (data) {
                if (data.error == 1) {
                    alert("退房失败")
                } else {
                    alert("退房成功")
                    $("#table").bootstrapTable('refresh')
                }
            }
        })
    }


}
