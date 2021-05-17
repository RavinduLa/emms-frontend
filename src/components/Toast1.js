import React from "react";
import {Toast, ToastBody} from "react-bootstrap";

class Toast1 extends React.Component{
    render() {
        const toastCss= {
            position: 'fixed',
            top: '20px',
            right: '20px',
            boxShadow: '0 40px 80px 0 rgba(0,0,0,0.2), 0 60px 200px o rgba(0,0,0,0.9)',

        }
        return(
            <div style={this.props.children.show ? toastCss : null }>
                <Toast
                    className={
                        `"border border-dark "`
                        /*${this.props.children.type === "success" ? "bg-success":"bg-danger"}` */
                    }
                    show={this.props.children.show}

                >
                    <Toast.Header className={
                        `"bg-warning" ${this.props.children.type === 'success' ? 
                            'bg-success text-white':'bg-danger text-white'}`} closeButton={true}>
                        <strong className={'mr-auto'}>Success</strong>

                    </Toast.Header>
                    <Toast.Body>
                        {this.props.children.message}
                    </Toast.Body>

                </Toast>
            </div>
        )
    }
}
export default Toast1;