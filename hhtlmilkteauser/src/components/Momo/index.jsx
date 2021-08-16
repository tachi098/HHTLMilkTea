import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import crypto from 'crypto'
import axios from "axios"

Momo.propTypes = {
    orderID: PropTypes.string,
    total: PropTypes.number,
}

Momo.defaultProps = {
    orderID: '',
    total: 0,
}

function Momo({ orderID, total }) {
    const [error, setError] = useState(false)

    useEffect(() => {
        const path = "https://test-payment.momo.vn/gw_payment/transactionProcessor"
        const partnerCode = "MOMOBSNA20210815"
        const accessKey = "P51VpwVYVlbkxvbr"
        const serectkey = "KnaL2zV5esrcV2yiVpkrVsyXoN2o07jC"
        const orderInfo = "Thanh toán MoMo"
        const notifyurl = "http://localhost:3000/api/payment"
        const returnUrl = "http://localhost:3000/checkoutresult"
        const amount = total.toString();
        const orderId = orderID;
        const requestType = "captureMoMoWallet"
        const extraData = "merchantName=HHTLMilktea"
        const rawSignature = `partnerCode=${partnerCode}&accessKey=${accessKey}&requestId=${orderId}&amount=${amount}&orderId=${orderId}&orderInfo=${orderInfo}&returnUrl=${returnUrl}&notifyUrl=${notifyurl}&extraData=${extraData}`

        var signature = crypto.createHmac('sha256', serectkey)
            .update(rawSignature)
            .digest('hex');

        var body = JSON.stringify({
            partnerCode: partnerCode,
            accessKey: accessKey,
            requestId: orderId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            returnUrl: returnUrl,
            notifyUrl: notifyurl,
            extraData: extraData,
            requestType: requestType,
            signature: signature
        })

        axios.post(path, body)
            .then((response) => {
                if (response.data.errorCode !== 0) {
                    setError(true)
                    setTimeout(() => {
                        setError(false)
                    }, 1500)
                } else {
                    window.location.href = response.data.payUrl
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            })
    }, [orderID, total])

    return (
        <div>
            {
                error &&
                <div className="modal_success">
                    <div className="group_model_success pt-3">
                        <div className="text-center p-2">
                            <i className="fa fa-bell fix_icon_bell" style={{ fontSize: '40px', color: '#fff', backgroundColor: '#f84545' }}></i>
                        </div>
                        <h4 className="text-center p-3" style={{ color: '#fff' }}>Lỗi thanh toán!!!</h4>
                    </div>
                </div>
            }
        </div>
    );
}

export default Momo;
