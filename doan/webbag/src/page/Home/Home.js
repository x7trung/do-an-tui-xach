import React, { useState, useEffect } from 'react'
import Banner from './Banner'
import SaleProduct from './SaleProduct'
import ProductPortfolio from './ProductPortfolio'
import PostItem from './Post'
import Introduce from './Introduce'
import ProductServices from '../../services/productServices'
const Home = () => {
    const [data, setData] = useState([])
    const [dataSale, setDataSale] = useState([])
    const [dataNew, setDataNew] = useState([])
    const [dataHot, setDataHot] = useState([])
    const [dataLike, setDataLike] = useState([])
    const [loading, setLoading] = useState(false)
    console.log(dataSale)
    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            try {
                const saleParams = {
                    limit: 15, page: 1, "discount[gt]": 0
                }
                const newParams = {
                    limit: 15, page: 1, sort: "-created"
                }
                const hotParams = {
                    limit: 15, page: 1, sort: "-sale"
                }
                const likeParams = {
                    limit: 15, page: 1, sort: "-like"
                }
                const saleData = await ProductServices.getProducts(saleParams)
                const newData = await ProductServices.getProducts(newParams)
                const hotData = await ProductServices.getProducts(hotParams)
                const likeData = await ProductServices.getProducts(likeParams)
                const data = await ProductServices.getProducts()
                setData(data.data.map(item => {
                    return {
                        _id: item._id,
                        image: item?.image[0]?.imageUrl || '',
                        imageBh: item?.image[2]?.imageUrl || '',
                        name: item.name,
                        category: item.classify,
                        oldPrice: item.price,
                        price: item.price * (100 - item.discount) / 100,
                        discount: item.discount,
                        sold: item.sale,
                        stock: item.detail.reduce((acc, cur) => {
                            return acc + cur.quantity
                        }, 0),
                        detail: item.detail
                    }
                }))
                setDataSale(saleData.data.map(item => {
                    return {
                        _id: item._id,
                        image: item?.image[0]?.imageUrl || '',
                        imageBh: item?.image[2]?.imageUrl || '',
                        name: item.name,
                        category: item.classify,
                        stock: item.detail.reduce((acc, cur) => {
                            return acc + cur.quantity
                        }),
                        oldPrice: item.price,
                        price: item.price * (100 - item.discount) / 100,
                        discount: item.discount,
                        sold: item.sale, stock: item.detail.reduce((acc, cur) => {
                            return acc + cur.quantity
                        }, 0),
                        detail: item.detail
                    }
                }))
                setDataNew(newData.data.map(item => {
                    return {
                        _id: item._id,
                        image: item?.image[0]?.imageUrl || '',
                        imageBh: item?.image[2]?.imageUrl || '',
                        name: item.name,
                        category: item.classify,
                        oldPrice: item.price,
                        stock: item.detail.reduce((acc, cur) => {
                            return acc + cur.quantity
                        }),
                        price: item.price * (100 - item.discount) / 100,
                        discount: item.discount,
                        sold: item.sale, stock: item.detail.reduce((acc, cur) => {
                            return acc + cur.quantity
                        }, 0),
                        detail: item.detail
                    }
                }))
                setDataHot(hotData.data.map(item => {
                    return {
                        _id: item._id,
                        image: item?.image[0]?.imageUrl || '',
                        imageBh: item?.image[2]?.imageUrl || '',
                        name: item.name,
                        category: item.classify,
                        oldPrice: item.price,
                        stock: item.detail.reduce((acc, cur) => {
                            return acc + cur.quantity
                        }),
                        price: item.price * (100 - item.discount) / 100,
                        discount: item.discount,
                        sold: item.sale, stock: item.detail.reduce((acc, cur) => {
                            return acc + cur.quantity
                        }, 0),
                        detail: item.detail
                    }
                }))
                setDataLike(likeData.data.map(item => {
                    return {
                        _id: item._id,
                        image: item?.image[0]?.imageUrl || '',
                        imageBh: item?.image[2]?.imageUrl || '',
                        name: item.name,
                        category: item.classify,
                        oldPrice: item.price,
                        price: item.price * (100 - item.discount) / 100,
                        discount: item.discount,
                        sold: item.sale,
                        like: item.like,
                        stock: item.detail.reduce((acc, cur) => {
                            return acc + cur.quantity
                        }, 0),
                        detail: item.detail
                    }
                }))

            } catch (error) {
                console.log(error.message)
            }
            setLoading(false);

        }
        getData()
    }, [])

    if (loading) return <div>Loading ...</div>
    return (
        <div>
            <Banner />
            <SaleProduct data={dataSale} title="S???N PH???M KHUY???N M??I" desc="H???p d???n nh???t" findBy="discount" noLike />
            <SaleProduct data={dataNew} title="S???N PH???M M???I " desc="M???u s???n ph???m m???i nh???t d???n ?????u xu h?????ng" findBy="created" noLike />
            <SaleProduct data={dataLike} title="S???N PH???M Y??U TH??CH NH???T " desc="N??m nay" findBy="like" />
            <SaleProduct data={dataHot} title="S???N PH???M B??N CH???Y NH???T " desc="Li??n t???c ch??y h??ng" findBy="sale" noLike />
            <ProductPortfolio />
            {/* <div className="post-title">
                <h2>TIN T???C</h2>
                <h4>C??c tin t???c m???i nh???t</h4>
            </div>
            <div className="post-news">
                {
                    dataPost.map((item, index) => {
                        return <div key={index} >
                            <PostItem data={item} />
                        </div>
                    })
                }
            </div> */}
            <Introduce />

        </div>
    )
}

export default Home