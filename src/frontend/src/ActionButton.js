import {Radio, Popconfirm} from "antd";
import {deleteStudent} from "./client";
import {errorNotification, successNotification} from "./Notification";

const ActionButtonClass=({student,fetchStudents})=> {
    console.log("what is student",student.name)
    const removeStudent = (studentId, callback) => {
        deleteStudent(studentId).then(() => {
            successNotification( "Student deleted", `Student with ${studentId} was deleted`);
            callback();
        }).catch(err=>{
            err.response.json().then(res=>{
                console.log(res)
                errorNotification(
                    "There was an issue",
                    `${res.message} ${res.status} ${res.error}`
                )
            })
        })

    }
    return (
        <Radio.Group>
            <Popconfirm
                placement='topRight'
                title={`Are you sure to delete ${student.name}`}
                onConfirm={() => removeStudent(student.id, fetchStudents)}
                okText='Yes'
                cancelText='No'>
                <Radio.Button value="small">Delete</Radio.Button>
            </Popconfirm>
            <Radio.Button value="small">Edit</Radio.Button>
        </Radio.Group>)
}

export default ActionButtonClass;