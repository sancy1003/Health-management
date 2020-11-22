import React, { Fragment } from 'react';

const LockerOne = ({lockers}) => {
    return(
        <Fragment>
            {
                Array.isArray(lockers) ? lockers.map(({_id, number}) => {
                    return(
                        <li key={_id} className="locker-list-item">
                            <div className="locker-number">{number}</div>
                            <div>사용자</div>
                        </li>
                    )
                }) : ""
        }
        </Fragment>
    )
}

export default LockerOne;