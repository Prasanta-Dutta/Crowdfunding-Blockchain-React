import React from "react";

const Profile = () => {
    return (
        <>
            <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="btn m-1">Hover</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li>Item 1</li>
                    <li>Item 2</li>
                </ul>
            </div>
        </>

    )
}

export default Profile;