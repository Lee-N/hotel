$(function () {
    //列表
    $('#table').bootstrapTable({
        url: "http://localhost:8888/checkin?method=get",
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
            title: 'ID',
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
        let result = "<button class='btn btn-xs btn-primary' onclick=checkinForm("
            + ID
            + ") title='办理入住'><i class=\"fa fa-id-card\" aria-hidden=\"true\"></i></button>";
        return result;
    }

    //办理入住
    function checkin() {
        $.ajax({
            url:"http://localhost:8888/checkin?method=checkin",
            dataType: "jsonp",
            jsonp:"callback",
            jsonpCallback: "callback",
            data:{
                ID:$("#ID").val(),
                Cname:$("#Cname").val(),
                CID:$("#CID").val(),
                fromDate:$("#from").val(),
                toDate:$("#to").val(),
                CustomerID:sessionStorage.getItem("ID")
            },
            success: function (data) {
                if (data.error == 1) {
                    alert("预定失败")
                } else {
                    alert("预定成功")
                    $("#checkin-form").modal('hide');
                    $("#table").bootstrapTable('refresh')
                }
            }
        })
    }
    $("#checkin-button").click(function () {
        checkin();
    })
})
//打开办理入住模态框
function checkinForm(id) {
    let row = $("#table").bootstrapTable('getRowByUniqueId', id);
    $("#ID").val(id);
    $("#name").val(row.name);
    $("#type").val(row.type);
    $("#price").val(row.price);
    $("#checkin-form").modal('show');
}
