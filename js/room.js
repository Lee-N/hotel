$(function () {
    //列表
    $('#table').bootstrapTable({
        url: "http://localhost:8888/room?method=get",
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
        let result = "<button class='btn btn-xs btn-primary' onclick=updateForm("
            + ID
            + ") title='修改房间信息'><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></button>";
        return result;
    }

    // 添加房间
    function add() {
        $.ajax({
            url: "http://localhost:8888/room",
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "callback",
            data: {
                method: "add",
                name: $("#name").val(),
                type: $("#type").val(),
                price: $("#price").val(),
            },
            success: function (data) {
                if (data.error == 1) {
                    alert("添加失败")
                } else {
                    alert("添加成功")
                    $("#add-form").modal('hide');
                    $("#table").bootstrapTable('refresh')
                }
            }
        })
    }

    $("#add-button").click(function () {
        add();
    })


    // 更新房间信息
    function update() {
        $.ajax({
            url: "http://localhost:8888/room",
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "callback",
            data: {
                method: "update",
                ID:$("#ID").val(),
                name: $("#newName").val(),
                type: $("#newType").val(),
                price: $("#newPrice").val(),
            },
            success: function (data) {
                if (data.error == 1) {
                    alert("修改失败")
                } else {
                    alert("修改成功")
                    $("#update-form").modal('hide');
                    $("#table").bootstrapTable('refresh')
                }
            }
        })
    }

    $("#update-button").click(function () {
        update();
    })
})
// 更新按钮
function updateForm(id) {
    let row = $("#table").bootstrapTable('getRowByUniqueId', id);
    $("#ID").val(id);
    $("#newName").val(row.name);
    $("#newType").val(row.type);
    $("#newPrice").val(row.price);
    $("#update-form").modal('show');
}