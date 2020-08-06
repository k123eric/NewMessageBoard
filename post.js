jQuery(document).ready(initialize);

let id = 1;
let editId = 1;

function initialize() {
    $("#loading").remove();
    initTable();
    $("#postButton").on('click', newPost);
    $("#sendButton").on('click', sendPost);
    $("#editButton").on('click', editPost);
    $("#deleteButton").on('click', deleted);
}

function initTable() {
    let tr = document.createElement("tr");

    $('<th scope="row">標題</th>').appendTo(tr);
    $('<th scope="row">內容</th>').appendTo(tr);
    $('<th scope="row">最後編輯時間</th>').appendTo(tr);
    $('<th scope="row">編輯</th>').appendTo(tr);
    $('<th scope="row">刪除</th>').appendTo(tr);

    $("tHead").append(tr);
}

function newPost() {
    $("#title").val("");
    $("#content").val("");
    $("#sendButton").show();
    $("#editButton").hide();
}

function sendPost() {
    let tr = document.createElement("tr");
    tr.id = id;

    let thTitle = document.createElement("th");
    thTitle.className = "AutoNewline";
    thTitle.id = "Title" + id;

    let thContent = document.createElement("th");
    thContent.className = "AutoNewline";
    thContent.id = "Content" + id;

    if ($("#title").val() == "" || $("#content").val() == "") {
        window.alert("標題與內容不能為空!");
        return;
    }

    thTitle.append($("#title").val());
    thContent.append($("#content").val());

    let time = document.createElement("th");
    time.append(new Date().toLocaleString());
    time.id = "Time" + id;

    let editTh = document.createElement("th");
    let editButton = document.createElement("button");
    editButton.classList.add("btn");
    editButton.classList.add("btn-warning");
    editButton.innerHTML = "編輯";
    editButton.addEventListener('click', function () {
        editId = tr.id;
        editModal();
    });
    editTh.append(editButton);

    let deleteTh = document.createElement("th");
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");
    deleteButton.innerHTML = "刪除";
    deleteButton.addEventListener('click', function () {
        editId = tr.id;
        $('#deleteModal').modal('show');
    });
    deleteTh.append(deleteButton);

    tr.append(thTitle, thContent, time, editTh, deleteTh);
    table.prepend(tr);

    $('#modal').modal('hide')
    window.alert("發送成功");

    id++;
}

function editModal() {
    $(".modal-title").html("編輯");
    $('#modal').modal('show');
    $("#editButton").show();
    $("#sendButton").hide();
    $("#title").val($("#Title" + editId).html());
    $("#content").val($("#Content" + editId).html());
}

function editPost() {
    if ($("#title").val() == "" || $("#content").val() == "") {
        window.alert("標題與內容不能為空!");
        return;
    }
    $("#Title" + editId).html($("#title").val());
    $("#Content" + editId).html($("#content").val());
    $("#Time" + editId).html(new Date().toLocaleString());
    $('#modal').modal('hide');
}

function deleted() {
    $("#" + editId).remove();
    $('#deleteModal').modal('hide');
}