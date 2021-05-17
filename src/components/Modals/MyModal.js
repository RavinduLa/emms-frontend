import React from "react";

const MyModal  = props => {
    return(
        <div className={'modal'}>
            <div className={'modal-content'}>
                <div className={'modal-header'}>
                    <h4 className={'modal-title'}>Modal title</h4>
                </div>
                <div className={'modal-body'}>
                    modal content
                </div>

                <div className={'modal-footer'}>
                    <button className={'button'}>Button</button>
                </div>
            </div>

        </div>
    )
}

export default MyModal