$(function () {
    //列表
    $('#table').bootstrapTable({
        url: "http://localhost:8888/order?method=unfinished",
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
            title: '订单号',
            sortable: true,
        }, {
            field: 'time',
            title: '订单时间',
            sortable: true,
        },{
            field: 'RID',
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
        let result = "<button class='btn btn-xs btn-primary' onclick=acceptIt("
            + ID
            + ") title='接受'><i class=\"fa fa-check\" aria-hidden=\"true\"></i></button>" +
            "&nbsp;<button class='btn btn-xs btn-primary' onclick=deniedIt("
            + ID
            + ") title='拒绝'><i class=\"fa fa-close\" aria-hidden=\"true\"></i></button>"
        return result;
    }
})
// 接受订单
function acceptIt(id) {
    let row=$("#table").bootstrapTable('getRowByUniqueId',id)
    let c=confirm("确定接受吗？")
    if(c==true){
        $.ajax({
            url:"http://localhost:8888/order",
            dataType: "jsonp",
            jsonp:"callback",
            jsonpCallback: "callback",
            data:{
                method:"accept",
                data:row,
            },
            success: function (data) {
                if (data.error == 1) {
                    alert("接受订单失败")
                } else {
                    alert("接受订单成功")
                    $("#table").bootstrapTable('refresh')
                }
            }
        })
    }
}
// 拒绝订单
function deniedIt(id) {
    let c=confirm("确定拒绝吗？")
    if(c==true){
        $.ajax({
            url:"http://localhost:8888/order",
            dataType: "jsonp",
            jsonp:"callback",
            jsonpCallback: "callback",
            data:{
                method:"denied",
                ID:id
            },
            success: function (data) {
                if (data.error == 1) {
                    alert("拒绝订单失败")
                } else {
                    alert("拒绝订单成功")
                    $("#table").bootstrapTable('refresh')
                }
            }
        })
    }
}