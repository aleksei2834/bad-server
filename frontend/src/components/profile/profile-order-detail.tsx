import Button from '@components/button'
import DetailInfo from '@components/detail-info'
import { OrderData } from '@slices/orders/type'
import clsx from 'clsx'
import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from '../../services/hooks'
import { selectOrderByNumber } from '../../services/selector'
import { getCurrentUserOrderByNumber } from '../../services/slice/profile-orders/thunk'
import { Preloader } from '../preloader'
import styles from './profile.module.scss'
import { sanitizeComment } from '../../utils/sanitizeHtml'

const CloseButton = () => {
    const navigate = useNavigate()
    return <Button onClick={() => navigate(-1)}>Понятно!</Button>
}

export default function ProfileOrderDetail() {
    const number = useParams().number || ''
    const dispatch = useDispatch()
    const orderData = useSelector(selectOrderByNumber(+number))
    console.log(orderData)

    useEffect(() => {
        dispatch(getCurrentUserOrderByNumber(number))
    }, [dispatch, number])

    const orderHeaders = useMemo(
        () => [
            {
                key: 'productNames',
                label: 'Товары',
                render: (dataInfo: OrderData) => (
                    <ul className={styles.profile__dataList}>
                        {dataInfo.productNames.map(
                            (element: string, idx: number) => (
                                <li key={idx}>{element}</li>
                            )
                        )}
                    </ul>
                ),
            },
            { key: 'totalAmount', label: 'Стоимость' },
            {
                key: 'status',
                label: 'Статус заказа',
                render: (dataInfo: OrderData) => (
                    <span
                        className={clsx({
                            [styles[orderData!.status]]: dataInfo.status,
                        })}
                    >
                        {dataInfo.status}
                    </span>
                ),
            },
            { key: 'payment', label: 'Способ оплаты' },
            {
                key: 'deliveryAddress',
                label: 'Адрес доставки',
                extraClass: styles.profile__gridRowFullWidth,
            },
            {
                key: 'comment',
                label: 'Ваш комментарий к заказу',
                extraClass: styles.profile__gridRowFullWidth,
                render: (dataInfo: OrderData) => (
                    <>
                        {dataInfo.comment ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeComment(dataInfo.comment),
                                }}
                            />
                        ) : (
                            'Комментариев нет'
                        )}
                    </>
                ),
            },
        ],
        [orderData]
    )

    if (!orderData) {
        return <Preloader />
    }

    return (
        <DetailInfo
            header={`Заказ № ${orderData.orderNumber}`}
            subheader={`от ${orderData.orderDate}`}
            data={orderData}
            headers={orderHeaders}
            actions={[CloseButton]}
        />
    )
}
